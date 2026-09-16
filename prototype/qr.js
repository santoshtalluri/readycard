/* ReadyCard prototype — QR encoder, written from the ISO/IEC 18004 spec.
   No dependencies. Supports byte mode and alphanumeric mode, versions 1-40,
   error correction levels L/M/Q/H, and mixed-mode segments.

   This file exists to answer one question for the team: how many characters
   actually fit, and how big does the printed code get? Everything else is
   in service of that.  */
(function (global) {
  'use strict';

  /* ---------- Galois field GF(256), primitive polynomial 0x11d ---------- */
  var EXP = new Uint8Array(512), LOG = new Uint8Array(256);
  (function () {
    var x = 1;
    for (var i = 0; i < 255; i++) {
      EXP[i] = x; LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11d;
    }
    for (var j = 255; j < 512; j++) EXP[j] = EXP[j - 255];
  })();

  function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return EXP[LOG[a] + LOG[b]];
  }

  /* Generator polynomial for n error-correction codewords. */
  var GEN_CACHE = {};
  function generatorPoly(n) {
    if (GEN_CACHE[n]) return GEN_CACHE[n];
    var poly = [1];
    for (var i = 0; i < n; i++) {
      var next = new Array(poly.length + 1).fill(0);
      for (var j = 0; j < poly.length; j++) {
        next[j] ^= gfMul(poly[j], 1);
        next[j + 1] ^= gfMul(poly[j], EXP[i]);
      }
      poly = next;
    }
    GEN_CACHE[n] = poly;
    return poly;
  }

  function ecCodewords(data, n) {
    var gen = generatorPoly(n);
    var rem = new Array(data.length + n).fill(0);
    for (var i = 0; i < data.length; i++) rem[i] = data[i];
    for (var i = 0; i < data.length; i++) {
      var lead = rem[i];
      if (lead === 0) continue;
      for (var j = 0; j < gen.length; j++) rem[i + j] ^= gfMul(gen[j], lead);
    }
    return rem.slice(data.length);
  }

  /* ---------- Error-correction block structure ----------
     Per version, for [L, M, Q, H]:
       [ecPerBlock, blocksInGroup1, dataPerBlockG1, blocksInGroup2, dataPerBlockG2]
     Verified at runtime against the module count — see checkBlockTable(). */
  var BLOCKS = [
    null,
    [[7,1,19,0,0],[10,1,16,0,0],[13,1,13,0,0],[17,1,9,0,0]],
    [[10,1,34,0,0],[16,1,28,0,0],[22,1,22,0,0],[28,1,16,0,0]],
    [[15,1,55,0,0],[26,1,44,0,0],[18,2,17,0,0],[22,2,13,0,0]],
    [[20,1,80,0,0],[18,2,32,0,0],[26,2,24,0,0],[16,4,9,0,0]],
    [[26,1,108,0,0],[24,2,43,0,0],[18,2,15,2,16],[22,2,11,2,12]],
    [[18,2,68,0,0],[16,4,27,0,0],[24,4,19,0,0],[28,4,15,0,0]],
    [[20,2,78,0,0],[18,4,31,0,0],[18,2,14,4,15],[26,4,13,1,14]],
    [[24,2,97,0,0],[22,2,38,2,39],[22,4,18,2,19],[26,4,14,2,15]],
    [[30,2,116,0,0],[22,3,36,2,37],[20,4,16,4,17],[24,4,12,4,13]],
    [[18,2,68,2,69],[26,4,43,1,44],[24,6,19,2,20],[28,6,15,2,16]],
    [[20,4,81,0,0],[30,1,50,4,51],[28,4,22,4,23],[24,3,12,8,13]],
    [[24,2,92,2,93],[22,6,36,2,37],[26,4,20,6,21],[28,7,14,4,15]],
    [[26,4,107,0,0],[22,8,37,1,38],[24,8,20,4,21],[22,12,11,4,12]],
    [[30,3,115,1,116],[24,4,40,5,41],[20,11,16,5,17],[24,11,12,5,13]],
    [[22,5,87,1,88],[24,5,41,5,42],[30,5,24,7,25],[24,11,12,7,13]],
    [[24,5,98,1,99],[28,7,45,3,46],[24,15,19,2,20],[30,3,15,13,16]],
    [[28,1,107,5,108],[28,10,46,1,47],[28,1,22,15,23],[28,2,14,17,15]],
    [[30,5,120,1,121],[26,9,43,4,44],[28,17,22,1,23],[28,2,14,19,15]],
    [[28,3,113,4,114],[26,3,44,11,45],[26,17,21,4,22],[26,9,13,16,14]],
    [[28,3,107,5,108],[26,3,41,13,42],[30,15,24,5,25],[28,15,15,10,16]],
    [[28,4,116,4,117],[26,17,42,0,0],[28,17,22,6,23],[30,19,16,6,17]],
    [[28,2,111,7,112],[28,17,46,0,0],[30,7,24,16,25],[24,34,13,0,0]],
    [[30,4,121,5,122],[28,4,47,14,48],[30,11,24,14,25],[30,16,15,14,16]],
    [[30,6,117,4,118],[28,6,45,14,46],[30,11,24,16,25],[30,30,16,2,17]],
    [[26,8,106,4,107],[28,8,47,13,48],[30,7,24,22,25],[30,22,15,13,16]],
    [[28,10,114,2,115],[28,19,46,4,47],[28,28,22,6,23],[30,33,16,4,17]],
    [[30,8,122,4,123],[28,22,45,3,46],[30,8,23,26,24],[30,12,15,28,16]],
    [[30,3,117,10,118],[28,3,45,23,46],[30,4,24,31,25],[30,11,15,31,16]],
    [[30,7,116,7,117],[28,21,45,7,46],[30,1,23,37,24],[30,19,15,26,16]],
    [[30,5,115,10,116],[28,19,47,10,48],[30,15,24,25,25],[30,23,15,25,16]],
    [[30,13,115,3,116],[28,2,46,29,47],[30,42,24,1,25],[30,23,15,28,16]],
    [[30,17,115,0,0],[28,10,46,23,47],[30,10,24,35,25],[30,19,15,35,16]],
    [[30,17,115,1,116],[28,14,46,21,47],[30,29,24,19,25],[30,11,15,46,16]],
    [[30,13,115,6,116],[28,14,46,23,47],[30,44,24,7,25],[30,59,16,1,17]],
    [[30,12,121,7,122],[28,12,47,26,48],[30,39,24,14,25],[30,22,15,41,16]],
    [[30,6,121,14,122],[28,6,47,34,48],[30,46,24,10,25],[30,2,15,64,16]],
    [[30,17,122,4,123],[28,29,46,14,47],[30,49,24,10,25],[30,24,15,46,16]],
    [[30,4,122,18,123],[28,13,46,32,47],[30,48,24,14,25],[30,42,15,32,16]],
    [[30,20,117,4,118],[28,40,47,7,48],[30,43,24,22,25],[30,10,15,67,16]],
    [[30,19,118,6,119],[28,18,47,31,48],[30,34,24,34,25],[30,20,15,61,16]]
  ];

  var ALIGN = [
    null, [], [6,18], [6,22], [6,26], [6,30], [6,34], [6,22,38], [6,24,42],
    [6,26,46], [6,28,50], [6,30,54], [6,32,58], [6,34,62], [6,26,46,66],
    [6,26,48,70], [6,26,50,74], [6,30,54,78], [6,30,56,82], [6,30,58,86],
    [6,34,62,90], [6,28,50,72,94], [6,26,50,74,98], [6,30,54,78,102],
    [6,28,54,80,106], [6,32,58,84,110], [6,30,58,86,114], [6,34,62,90,118],
    [6,26,50,74,98,122], [6,30,54,78,102,126], [6,26,52,78,104,130],
    [6,30,56,82,108,134], [6,34,60,86,112,138], [6,30,58,86,114,142],
    [6,34,62,90,118,146], [6,30,54,78,102,126,150], [6,24,50,76,102,128,154],
    [6,28,54,80,106,132,158], [6,32,58,84,110,136,162], [6,26,54,82,110,138,166],
    [6,30,58,86,114,142,170]
  ];

  var ECC_ORDER = { L: 0, M: 1, Q: 2, H: 3 };
  var ECC_BITS  = { L: 1, M: 0, Q: 3, H: 2 };

  var ALNUM = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';

  function dataCapacityBytes(version, ecc) {
    var b = BLOCKS[version][ECC_ORDER[ecc]];
    return b[1] * b[2] + b[3] * b[4];
  }

  function totalCodewords(version, ecc) {
    var b = BLOCKS[version][ECC_ORDER[ecc]];
    return (b[1] + b[3]) * b[0] + b[1] * b[2] + b[3] * b[4];
  }

  function countBits(mode, version) {
    var tier = version <= 9 ? 0 : version <= 26 ? 1 : 2;
    if (mode === 'byte')  return [8, 16, 16][tier];
    if (mode === 'alnum') return [9, 11, 13][tier];
    throw new Error('unknown mode ' + mode);
  }

  /* ---------- Segments ---------- */
  function byteSegment(str) {
    return { mode: 'byte', data: new TextEncoder().encode(str) };
  }
  function alnumSegment(str) {
    for (var i = 0; i < str.length; i++) {
      if (ALNUM.indexOf(str[i]) < 0) throw new Error('not alphanumeric: ' + str[i]);
    }
    return { mode: 'alnum', data: str };
  }

  function segmentBits(seg, version) {
    var header = 4 + countBits(seg.mode, version);
    if (seg.mode === 'byte') return header + seg.data.length * 8;
    var n = seg.data.length;
    return header + Math.floor(n / 2) * 11 + (n % 2 ? 6 : 0);
  }

  function totalBits(segments, version) {
    var sum = 0;
    for (var i = 0; i < segments.length; i++) sum += segmentBits(segments[i], version);
    return sum;
  }

  /* Smallest version that fits, or null. */
  function chooseVersion(segments, ecc, minVersion, maxVersion) {
    for (var v = minVersion || 1; v <= (maxVersion || 40); v++) {
      if (totalBits(segments, v) <= dataCapacityBytes(v, ecc) * 8) return v;
    }
    return null;
  }

  /* ---------- Bit stream ---------- */
  function BitWriter() { this.bits = []; }
  BitWriter.prototype.put = function (value, length) {
    for (var i = length - 1; i >= 0; i--) this.bits.push((value >>> i) & 1);
  };
  BitWriter.prototype.toBytes = function () {
    var out = new Uint8Array(Math.ceil(this.bits.length / 8));
    for (var i = 0; i < this.bits.length; i++) {
      if (this.bits[i]) out[i >> 3] |= 0x80 >> (i & 7);
    }
    return out;
  };

  function buildDataCodewords(segments, version, ecc) {
    var bw = new BitWriter();
    segments.forEach(function (seg) {
      if (seg.mode === 'byte') {
        bw.put(0x4, 4);
        bw.put(seg.data.length, countBits('byte', version));
        for (var i = 0; i < seg.data.length; i++) bw.put(seg.data[i], 8);
      } else {
        bw.put(0x2, 4);
        bw.put(seg.data.length, countBits('alnum', version));
        for (var i = 0; i + 1 < seg.data.length; i += 2) {
          bw.put(ALNUM.indexOf(seg.data[i]) * 45 + ALNUM.indexOf(seg.data[i + 1]), 11);
        }
        if (seg.data.length % 2) bw.put(ALNUM.indexOf(seg.data[seg.data.length - 1]), 6);
      }
    });

    var capacityBits = dataCapacityBytes(version, ecc) * 8;
    if (bw.bits.length > capacityBits) throw new Error('data too long for version');

    bw.put(0, Math.min(4, capacityBits - bw.bits.length));      // terminator
    while (bw.bits.length % 8) bw.bits.push(0);                  // pad to byte

    var bytes = Array.from(bw.toBytes());
    var pad = [0xEC, 0x11], k = 0;
    while (bytes.length < dataCapacityBytes(version, ecc)) bytes.push(pad[k++ % 2]);
    return bytes;
  }

  /* ---------- Interleaving ---------- */
  function interleave(dataCodewords, version, ecc) {
    var b = BLOCKS[version][ECC_ORDER[ecc]];
    var ecPer = b[0];
    var blocks = [], ecBlocks = [], offset = 0;

    function take(count, size) {
      for (var i = 0; i < count; i++) {
        var chunk = dataCodewords.slice(offset, offset + size);
        offset += size;
        blocks.push(chunk);
        ecBlocks.push(ecCodewords(chunk, ecPer));
      }
    }
    take(b[1], b[2]);
    take(b[3], b[4]);

    var out = [], maxData = Math.max(b[2], b[4] || 0);
    for (var i = 0; i < maxData; i++) {
      for (var j = 0; j < blocks.length; j++) {
        if (i < blocks[j].length) out.push(blocks[j][i]);
      }
    }
    for (var i = 0; i < ecPer; i++) {
      for (var j = 0; j < ecBlocks.length; j++) out.push(ecBlocks[j][i]);
    }
    return out;
  }

  /* ---------- BCH for format and version information ---------- */
  function bch(value, poly, polyBits) {
    var v = value << (polyBits - 1);
    while (bitLength(v) >= polyBits) v ^= poly << (bitLength(v) - polyBits);
    return (value << (polyBits - 1)) | v;
  }
  function bitLength(v) { var n = 0; while (v) { n++; v >>>= 1; } return n; }

  function formatInfo(ecc, mask) {
    var data = (ECC_BITS[ecc] << 3) | mask;
    return (bch(data, 0x537, 11) ^ 0x5412) & 0x7fff;
  }
  function versionInfo(version) {
    return bch(version, 0x1f25, 13) & 0x3ffff;
  }

  /* ---------- Matrix ---------- */
  function Matrix(version) {
    this.version = version;
    this.size = version * 4 + 17;
    this.grid = [];
    this.fixed = [];
    for (var r = 0; r < this.size; r++) {
      this.grid.push(new Uint8Array(this.size));
      this.fixed.push(new Uint8Array(this.size));
    }
  }
  Matrix.prototype.set = function (r, c, dark, isFixed) {
    this.grid[r][c] = dark ? 1 : 0;
    if (isFixed) this.fixed[r][c] = 1;
  };

  function placeFinder(m, row, col) {
    for (var r = -1; r <= 7; r++) {
      for (var c = -1; c <= 7; c++) {
        var rr = row + r, cc = col + c;
        if (rr < 0 || rr >= m.size || cc < 0 || cc >= m.size) continue;
        var inRing = (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
                     (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
                     (r >= 2 && r <= 4 && c >= 2 && c <= 4);
        m.set(rr, cc, inRing, true);
      }
    }
  }

  function buildFunctionPatterns(m) {
    var size = m.size;
    placeFinder(m, 0, 0);
    placeFinder(m, 0, size - 7);
    placeFinder(m, size - 7, 0);

    for (var i = 8; i < size - 8; i++) {
      var dark = i % 2 === 0;
      m.set(6, i, dark, true);
      m.set(i, 6, dark, true);
    }

    var centers = ALIGN[m.version];
    var last = centers.length - 1;
    for (var a = 0; a < centers.length; a++) {
      for (var b = 0; b < centers.length; b++) {
        /* The three finder corners have no alignment pattern. Everything else
           does -- including the ones centred on the timing row or column, which
           is easy to get wrong because their centre module is already fixed. */
        if ((a === 0 && b === 0) || (a === 0 && b === last) || (a === last && b === 0)) continue;
        var cr = centers[a], cc = centers[b];
        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            var ring = Math.max(Math.abs(r), Math.abs(c));
            m.set(cr + r, cc + c, ring !== 1, true);
          }
        }
      }
    }

    m.set(size - 8, 8, true, true);                       // dark module

    for (var i = 0; i < 9; i++) {                          // format areas
      if (!m.fixed[8][i]) m.set(8, i, false, true);
      if (!m.fixed[i][8]) m.set(i, 8, false, true);
    }
    for (var i = 0; i < 8; i++) {
      if (!m.fixed[8][size - 1 - i]) m.set(8, size - 1 - i, false, true);
      if (!m.fixed[size - 1 - i][8]) m.set(size - 1 - i, 8, false, true);
    }

    if (m.version >= 7) {                                  // version areas
      for (var i = 0; i < 18; i++) {
        var r = Math.floor(i / 3), c = size - 11 + (i % 3);
        m.set(r, c, false, true);
        m.set(c, r, false, true);
      }
    }
  }

  function placeData(m, codewords) {
    var size = m.size, bitIndex = 0, upward = true;
    for (var right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (var step = 0; step < size; step++) {
        var row = upward ? size - 1 - step : step;
        for (var k = 0; k < 2; k++) {
          var col = right - k;
          if (m.fixed[row][col]) continue;
          var bit = 0;
          if (bitIndex < codewords.length * 8) {
            bit = (codewords[bitIndex >> 3] >> (7 - (bitIndex & 7))) & 1;
          }
          m.grid[row][col] = bit;
          bitIndex++;
        }
      }
      upward = !upward;
    }
    return bitIndex;
  }

  var MASKS = [
    function (i, j) { return (i + j) % 2 === 0; },
    function (i) { return i % 2 === 0; },
    function (i, j) { return j % 3 === 0; },
    function (i, j) { return (i + j) % 3 === 0; },
    function (i, j) { return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0; },
    function (i, j) { return (i * j) % 2 + (i * j) % 3 === 0; },
    function (i, j) { return ((i * j) % 2 + (i * j) % 3) % 2 === 0; },
    function (i, j) { return ((i + j) % 2 + (i * j) % 3) % 2 === 0; }
  ];

  function penalty(grid, size) {
    var score = 0, dark = 0, i, j, run, prev;

    for (i = 0; i < size; i++) {                          // rule 1, rows then columns
      run = 1; prev = grid[i][0];
      for (j = 1; j < size; j++) {
        if (grid[i][j] === prev) { run++; }
        else { if (run >= 5) score += 3 + (run - 5); run = 1; prev = grid[i][j]; }
      }
      if (run >= 5) score += 3 + (run - 5);
    }
    for (j = 0; j < size; j++) {
      run = 1; prev = grid[0][j];
      for (i = 1; i < size; i++) {
        if (grid[i][j] === prev) { run++; }
        else { if (run >= 5) score += 3 + (run - 5); run = 1; prev = grid[i][j]; }
      }
      if (run >= 5) score += 3 + (run - 5);
    }

    for (i = 0; i < size - 1; i++) {                      // rule 2
      for (j = 0; j < size - 1; j++) {
        var v = grid[i][j];
        if (v === grid[i][j + 1] && v === grid[i + 1][j] && v === grid[i + 1][j + 1]) score += 3;
      }
    }

    var p1 = [1,0,1,1,1,0,1,0,0,0,0], p2 = [0,0,0,0,1,0,1,1,1,0,1];
    function matches(get, n) {
      var hits = 0;
      for (var s = 0; s + 11 <= n; s++) {
        var a = true, b = true;
        for (var t = 0; t < 11; t++) {
          var g = get(s + t);
          if (g !== p1[t]) a = false;
          if (g !== p2[t]) b = false;
        }
        if (a) hits++;
        if (b) hits++;
      }
      return hits;
    }
    for (i = 0; i < size; i++) {                          // rule 3
      (function (row) {
        score += 40 * matches(function (x) { return grid[row][x]; }, size);
      })(i);
      (function (col) {
        score += 40 * matches(function (x) { return grid[x][col]; }, size);
      })(i);
    }

    for (i = 0; i < size; i++) for (j = 0; j < size; j++) if (grid[i][j]) dark++;
    var pct = dark * 100 / (size * size);                 // rule 4
    score += Math.floor(Math.abs(pct - 50) / 5) * 10;
    return score;
  }

  function applyFormat(m, ecc, mask) {
    var bits = formatInfo(ecc, mask), size = m.size;
    for (var i = 0; i < 15; i++) {
      var bit = (bits >> i) & 1;
      if (i < 6) m.grid[i][8] = bit;
      else if (i < 8) m.grid[i + 1][8] = bit;
      else if (i === 8) m.grid[8][7] = bit;
      else m.grid[8][14 - i] = bit;

      if (i < 8) m.grid[8][size - 1 - i] = bit;
      else m.grid[size - 15 + i][8] = bit;
    }
    m.grid[size - 8][8] = 1;
  }

  function applyVersion(m) {
    if (m.version < 7) return;
    var bits = versionInfo(m.version), size = m.size;
    for (var i = 0; i < 18; i++) {
      var bit = (bits >> i) & 1;
      var r = Math.floor(i / 3), c = size - 11 + (i % 3);
      m.grid[r][c] = bit;
      m.grid[c][r] = bit;
    }
  }

  /* ---------- Public API ---------- */
  function encodeSegments(segments, opts) {
    opts = opts || {};
    var ecc = opts.ecc || 'M';
    var version = opts.version || chooseVersion(segments, ecc, opts.minVersion, opts.maxVersion);
    if (!version) throw new Error('data does not fit in any QR version at level ' + ecc);

    var data = buildDataCodewords(segments, version, ecc);
    var codewords = interleave(data, version, ecc);

    var m = new Matrix(version);
    buildFunctionPatterns(m);
    var placed = placeData(m, codewords);
    if (placed !== codewords.length * 8 + remainderBits(version)) {
      throw new Error('module placement mismatch: placed ' + placed +
        ' expected ' + (codewords.length * 8 + remainderBits(version)));
    }

    var best = null, bestScore = Infinity, bestMask = 0;
    for (var mask = 0; mask < 8; mask++) {
      var candidate = maskedCopy(m, mask);
      applyFormatOn(candidate, m, ecc, mask);
      var s = penalty(candidate, m.size);
      if (s < bestScore) { bestScore = s; best = candidate; bestMask = mask; }
    }

    return {
      version: version,
      ecc: ecc,
      mask: bestMask,
      size: m.size,
      modules: best,
      dataCapacityBytes: dataCapacityBytes(version, ecc),
      usedBits: totalBits(segments, version)
    };
  }

  function remainderBits(version) {
    if (version === 1) return 0;
    if (version <= 6) return 7;
    if (version <= 13) return 0;
    if (version <= 20) return 3;
    if (version <= 27) return 4;
    if (version <= 34) return 3;
    return 0;
  }

  function maskedCopy(m, mask) {
    var out = [];
    for (var r = 0; r < m.size; r++) {
      out.push(new Uint8Array(m.size));
      for (var c = 0; c < m.size; c++) {
        out[r][c] = m.fixed[r][c] ? m.grid[r][c]
                                  : (m.grid[r][c] ^ (MASKS[mask](r, c) ? 1 : 0));
      }
    }
    return out;
  }

  function applyFormatOn(grid, m, ecc, mask) {
    var tmp = { grid: grid, size: m.size, version: m.version };
    applyFormat(tmp, ecc, mask);
    applyVersion(tmp);
  }

  /* Convenience: encode a URL whose fragment payload is alphanumeric-safe. */
  function encodeUrl(prefix, payload, opts) {
    var segments;
    try {
      segments = [byteSegment(prefix), alnumSegment(payload)];
    } catch (e) {
      segments = [byteSegment(prefix + payload)];
    }
    return encodeSegments(segments, opts);
  }

  function toSvg(qr, opts) {
    opts = opts || {};
    var quiet = opts.quiet == null ? 4 : opts.quiet;
    var n = qr.size + quiet * 2;
    var path = [];
    for (var r = 0; r < qr.size; r++) {
      for (var c = 0; c < qr.size; c++) {
        if (qr.modules[r][c]) path.push('M' + (c + quiet) + ' ' + (r + quiet) + 'h1v1h-1z');
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + n + ' ' + n +
      '" shape-rendering="crispEdges" role="img" aria-label="QR code">' +
      '<rect width="' + n + '" height="' + n + '" fill="' + (opts.light || '#ffffff') + '"/>' +
      '<path d="' + path.join('') + '" fill="' + (opts.dark || '#000000') + '"/></svg>';
  }

  /* Self-check: the block table must agree with the module count. Runs once. */
  function checkBlockTable() {
    var problems = [];
    for (var v = 1; v <= 40; v++) {
      var m = new Matrix(v);
      buildFunctionPatterns(m);
      var free = 0;
      for (var r = 0; r < m.size; r++) for (var c = 0; c < m.size; c++) if (!m.fixed[r][c]) free++;
      var expected = Math.floor(free / 8);
      ['L', 'M', 'Q', 'H'].forEach(function (ecc) {
        if (totalCodewords(v, ecc) !== expected) {
          problems.push('v' + v + ecc + ': table ' + totalCodewords(v, ecc) + ' vs modules ' + expected);
        }
      });
      if (free % 8 !== remainderBits(v)) {
        problems.push('v' + v + ': remainder ' + (free % 8) + ' vs ' + remainderBits(v));
      }
    }
    return problems;
  }

  global.QR = {
    encodeSegments: encodeSegments,
    encodeUrl: encodeUrl,
    byteSegment: byteSegment,
    alnumSegment: alnumSegment,
    chooseVersion: chooseVersion,
    dataCapacityBytes: dataCapacityBytes,
    totalBits: totalBits,
    toSvg: toSvg,
    checkBlockTable: checkBlockTable,
    ALNUM: ALNUM
  };
})(typeof window !== 'undefined' ? window : globalThis);
