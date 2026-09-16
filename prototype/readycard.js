/* ReadyCard prototype -- everything the app needs, in one file.

   Part 1  a QR encoder written from ISO/IEC 18004: versions 1-40, all four
           error-correction levels, byte and alphanumeric segments
   Part 2  the card itself: which fields exist, which are allowed to leave the
           phone, how a card is packed into a URL fragment, and how much room
           is left

   No dependencies. Nothing here runs on a server. */

/* ===== Part 1 -- the QR encoder ===== */
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

  /* opts.label writes a caption under the code -- whose card this is. It sits
     outside the quiet zone so it cannot interfere with scanning, and it is part
     of the SVG, so it survives being downloaded, printed or stuck on a helmet.
     A sheet of codes that all look identical is useless; this is what makes a
     printed code tell you who it belongs to. */
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

    var label = (opts.label || '').trim();
    var font = Math.max(3.6, n * 0.062);
    var band = label ? font * 1.6 : 0;
    var height = n + band;

    var caption = '';
    if (label) {
      var maxChars = Math.floor(n / (font * 0.52));
      var shown = label.length > maxChars ? label.slice(0, maxChars - 1) + '\u2026' : label;
      caption = '<text x="' + (n / 2) + '" y="' + (n + font * 0.95) +
        '" text-anchor="middle" font-size="' + font.toFixed(2) +
        '" font-family="-apple-system, Segoe UI, Roboto, sans-serif" font-weight="600" fill="' +
        (opts.dark || '#000000') + '">' + escapeXml(shown) + '</text>';
    }

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + n + ' ' + height +
      '" shape-rendering="crispEdges" role="img" aria-label="QR code' +
      (label ? ' for ' + escapeXml(label) : '') + '">' +
      '<rect width="' + n + '" height="' + height + '" fill="' + (opts.light || '#ffffff') + '"/>' +
      '<path d="' + path.join('') + '" fill="' + (opts.dark || '#000000') + '"/>' +
      caption + '</svg>';
  }

  function escapeXml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c];
    });
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
    ALNUM: ALNUM
  };
})(typeof window !== 'undefined' ? window : globalThis);

/* ===== Part 2 -- the card =====
   The Section 4 rule from the product brief lives here, in one place, as data.
   Nothing else in the app decides what may be encoded. */
(function (global) {
  'use strict';

  /* ---------- Fields ----------
     key      short key used inside the QR payload (phone-only fields have none)
     max      hard character limit enforced by the form
     inQr     true  = travels in the QR code
              false = never encoded, stays on this phone  */
  var FIELDS = [
    { id: 'first',    key: 'f', label: 'First name',              max: 20,  inQr: true },
    { id: 'last',     key: 'l', label: 'Last name',               max: 20,  inQr: true },
    { id: 'allergy',  key: 'a', label: 'Allergies and severity',  max: 120, inQr: true, multiline: true,
      hint: 'Peanuts — severe, carries EpiPen' },
    { id: 'meds',     key: 'm', label: 'Medications and where they are kept', max: 160, inQr: true, multiline: true,
      hint: 'Albuterol inhaler — front pocket of green bag' },
    { id: 'cond',     key: 'c', label: 'Conditions that matter right now', max: 120, inQr: true, multiline: true,
      hint: 'Asthma. Exercise-induced.' },
    { id: 'c1name',   key: 'n', label: 'Emergency contact 1 — name', max: 28, inQr: true },
    { id: 'c1phone',  key: 'p', label: 'Emergency contact 1 — phone', max: 18, inQr: true, tel: true },
    { id: 'c2name',   key: 'o', label: 'Emergency contact 2 — name', max: 28, inQr: true },
    { id: 'c2phone',  key: 'q', label: 'Emergency contact 2 — phone', max: 18, inQr: true, tel: true },
    { id: 'kidnote',  key: 'k', label: "The kid's own note",       max: 160, inQr: true, multiline: true,
      hint: 'If I go quiet I am about to have a panic attack.' },

    { id: 'dob',      label: 'Date of birth',            max: 12,  inQr: false },
    { id: 'insurer',  label: 'Insurance carrier',        max: 40,  inQr: false },
    { id: 'member',   label: 'Member number',            max: 30,  inQr: false },
    { id: 'doctor',   label: 'Doctor — name and phone',  max: 60,  inQr: false },
    { id: 'dentist',  label: 'Dentist — name and phone', max: 60,  inQr: false },
    { id: 'hospital', label: 'Preferred hospital',       max: 60,  inQr: false },
    { id: 'history',  label: 'Medical history',          max: 300, inQr: false, multiline: true },
    { id: 'pickup',   label: 'Authorized pickup adults', max: 160, inQr: false, multiline: true },
    { id: 'address',  label: 'Home address',             max: 120, inQr: false, multiline: true }
  ];

  var QR_FIELDS = FIELDS.filter(function (f) { return f.inQr; });

  /* ---------- Presets ----------
     The budget is set by how the code will be used, not by the format's maximum.
     A version-40 code holds far more text than a helmet sticker can physically
     carry at a size a phone can read.  */
  var MODULE_MM = 0.4;          /* conservative printed module size for phone scanning */
  var QUIET = 4;                /* quiet zone, in modules, each side */

  function printedWidthMm(version) {
    return ((version * 4 + 17) + QUIET * 2) * MODULE_MM;
  }

  var PRESETS = {
    sticker: { label: 'Sticker on a helmet or bottle', inches: 1.25, ecc: 'Q',
               note: 'About an inch across, gets scuffed, scanned in a hurry. Strongest error correction.' },
    card:    { label: 'Wallet card, screen or paper',  inches: 2,    ecc: 'M',
               note: 'Two inches, held in a hand or shown on a screen. The usual choice.' },
    max:     { label: 'Absolute maximum',              inches: 3.5,  ecc: 'L',
               note: 'Everything a QR code can hold. Big, dense, and fussy to scan.' }
  };

  /* The largest version that still prints within a target width. This is the
     honest constraint: a helmet sticker is limited by physics, not by the format. */
  function versionForWidth(inches) {
    for (var v = 40; v >= 1; v--) {
      if (printedWidthMm(v) <= inches * 25.4) return v;
    }
    return 1;
  }
  Object.keys(PRESETS).forEach(function (k) {
    PRESETS[k].maxVersion = versionForWidth(PRESETS[k].inches);
  });

  function describeSize(version) {
    var mm = printedWidthMm(version);
    return { mm: Math.round(mm), inches: Math.round(mm / 25.4 * 10) / 10, modules: version * 4 + 17 };
  }

  /* ---------- base43 ----------
     A QR code packs "alphanumeric mode" at 5.5 bits per character instead of
     byte mode's 8, but only for its own 45-character set:
         0-9 A-Z space $ % * + - . / :
     Two of those cannot survive a URL fragment. A space gets rewritten as %20,
     and a literal % starts a percent-escape, so the browser hands back
     something different from what was scanned. Dropping both leaves 43
     characters that are legal in both places.

     Dropping them costs nothing. Alphanumeric mode packs any two characters
     into 11 bits whatever the alphabet size, and 43^3 = 79507 still covers the
     65536 values of a byte pair -- so base43 is still 3 characters per 2 bytes,
     exactly like base45:
         base43 in alnum mode  1.5  x 5.5 = 8.25 bits per source byte
         base64 in byte mode   1.33 x 8   = 10.67 bits per source byte
     which is why the app prefers it and falls back to base64url only when it
     cannot use alphanumeric mode. */
  var B43 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$*+-./:';

  function base43Encode(bytes) {
    var out = '';
    for (var i = 0; i + 1 < bytes.length; i += 2) {
      var v = bytes[i] * 256 + bytes[i + 1];
      out += B43[v % 43] + B43[Math.floor(v / 43) % 43] + B43[Math.floor(v / 43 / 43)];
    }
    if (bytes.length % 2) {
      var x = bytes[bytes.length - 1];
      out += B43[x % 43] + B43[Math.floor(x / 43)];
    }
    return out;
  }

  function base43Decode(str) {
    var out = [];
    for (var i = 0; i < str.length; i += 3) {
      var chunk = str.slice(i, i + 3), vals = [];
      for (var j = 0; j < chunk.length; j++) {
        var idx = B43.indexOf(chunk[j]);
        if (idx < 0) throw new Error('bad character in code: ' + JSON.stringify(chunk[j]));
        vals.push(idx);
      }
      if (vals.length === 3) {
        var v = vals[0] + vals[1] * 43 + vals[2] * 43 * 43;
        if (v > 0xffff) throw new Error('corrupt code');
        out.push(v >> 8, v & 0xff);
      } else if (vals.length === 2) {
        var w = vals[0] + vals[1] * 43;
        if (w > 0xff) throw new Error('corrupt code');
        out.push(w);
      } else throw new Error('truncated code');
    }
    return new Uint8Array(out);
  }

  function base64urlEncode(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function base64urlDecode(str) {
    var s = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    var out = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  }

  /* ---------- deflate, using the browser's own compression ---------- */
  async function squeeze(bytes) {
    var cs = new CompressionStream('deflate-raw');
    var stream = new Blob([bytes]).stream().pipeThrough(cs);
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }
  async function unsqueeze(bytes) {
    var ds = new DecompressionStream('deflate-raw');
    var stream = new Blob([bytes]).stream().pipeThrough(ds);
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  /* ---------- Expiry ----------
     Days since 2020-01-01, so a date costs three or four characters
     instead of ten. 0 means the code never expires. */
  var EPOCH = Date.UTC(2020, 0, 1);
  function dateToDays(iso) {
    if (!iso) return 0;
    var d = Date.parse(iso + 'T00:00:00Z');
    if (isNaN(d)) return 0;
    return Math.round((d - EPOCH) / 86400000);
  }
  function daysToDate(days) {
    if (!days) return null;
    return new Date(EPOCH + days * 86400000).toISOString().slice(0, 10);
  }

  /* ---------- Pack and unpack ----------
     Only fields marked inQr are read. Empty fields are left out entirely,
     which is the single biggest saving -- most parents fill four, not ten. */
  function buildPayloadObject(values, expiryIso) {
    var obj = {};
    QR_FIELDS.forEach(function (f) {
      var v = (values[f.id] || '').trim();
      if (v) obj[f.key] = v.slice(0, f.max);
    });
    var days = dateToDays(expiryIso);
    if (days) obj.x = days;
    return obj;
  }

  async function encodeCard(values, expiryIso) {
    var obj = buildPayloadObject(values, expiryIso);
    var json = JSON.stringify(obj);
    var rawBytes = new TextEncoder().encode(json);
    var packed = await squeeze(rawBytes);
    return {
      json: json,
      rawBytes: rawBytes.length,
      packedBytes: packed.length,
      base43: base43Encode(packed),
      base64: base64urlEncode(packed)
    };
  }

  async function decodeFragment(fragment) {
    if (!fragment) return null;
    var marker = fragment[0], body = fragment.slice(1), bytes;
    if (marker === 'A') bytes = base43Decode(body);
    else if (marker === 'B') bytes = base64urlDecode(body);
    else throw new Error('unrecognised code format');
    var json = new TextDecoder().decode(await unsqueeze(bytes));
    var obj = JSON.parse(json);

    var card = { expiry: daysToDate(obj.x) };
    QR_FIELDS.forEach(function (f) {
      if (obj[f.key] != null) card[f.id] = String(obj[f.key]);
    });
    return card;
  }

  /* ---------- Fitting ----------
     Builds both candidate encodings, asks the QR module what version each needs,
     and keeps the smaller. Returns null for `fits` when neither works. */
  function planCode(encoded, baseUrl, presetName) {
    var preset = PRESETS[presetName] || PRESETS.card;
    var candidates = [
      { marker: 'A', payload: encoded.base43, mode: 'alphanumeric (base43)' },
      { marker: 'B', payload: encoded.base64, mode: 'byte (base64url)' }
    ];

    var best = null;
    candidates.forEach(function (c) {
      var prefix = baseUrl + '#' + c.marker;
      var segments;
      try {
        segments = [global.QR.byteSegment(prefix), global.QR.alnumSegment(c.payload)];
      } catch (e) {
        segments = [global.QR.byteSegment(prefix + c.payload)];
      }
      var version = global.QR.chooseVersion(segments, preset.ecc, 1, 40);
      var result = {
        marker: c.marker, payload: c.payload, mode: c.mode, segments: segments,
        version: version, url: prefix + c.payload, urlLength: prefix.length + c.payload.length
      };
      if (version && (!best || !best.version || version < best.version)) best = result;
      else if (!best) best = result;
    });

    var fitsPreset = best.version != null && best.version <= preset.maxVersion;
    return {
      preset: preset, presetName: presetName,
      chosen: best,
      fitsPreset: fitsPreset,
      fitsAtAll: best.version != null,
      size: best.version ? describeSize(best.version) : null,
      budgetVersion: preset.maxVersion,
      budgetSize: describeSize(preset.maxVersion)
    };
  }

  /* How many payload characters the chosen preset can carry, given the URL.
     Used to turn "you are over" into "trim 34 characters". */
  function payloadBudget(baseUrl, presetName, marker) {
    var preset = PRESETS[presetName] || PRESETS.card;
    var prefix = baseUrl + '#' + (marker || 'A');
    var capacityBits = global.QR.dataCapacityBytes(preset.maxVersion, preset.ecc) * 8;
    var prefixBits = global.QR.totalBits([global.QR.byteSegment(prefix)], preset.maxVersion);
    var free = capacityBits - prefixBits - (4 + 11);   /* alnum segment header */
    if (free < 0) return 0;
    return Math.floor(free / 11) * 2;                   /* 11 bits per 2 characters */
  }

  global.Card = {
    FIELDS: FIELDS,
    QR_FIELDS: QR_FIELDS,
    PRESETS: PRESETS,
    encodeCard: encodeCard,
    decodeFragment: decodeFragment,
    planCode: planCode,
    payloadBudget: payloadBudget,
    versionForWidth: versionForWidth,
    describeSize: describeSize,
    daysToDate: daysToDate,
    base43Encode: base43Encode,
    base43Decode: base43Decode
  };
})(typeof window !== 'undefined' ? window : globalThis);
