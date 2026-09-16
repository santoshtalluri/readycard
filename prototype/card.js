/* ReadyCard prototype — the card itself: which fields exist, which are allowed
   to leave the phone, how a card is packed into a URL fragment, and how much
   room is left.

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
