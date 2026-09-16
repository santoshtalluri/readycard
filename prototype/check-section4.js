global.window = global;
global.btoa = s => Buffer.from(s, 'binary').toString('base64');
require('/Users/santoshtalluri/readycard/prototype/qr.js');
require('/Users/santoshtalluri/readycard/prototype/card.js');

(async () => {
  // Fill every field with a value unique enough to spot in the decoded payload.
  const values = {};
  Card.FIELDS.forEach((f, i) => { values[f.id] = 'ZZMARKER' + i + 'ZZ'; });

  const enc = await Card.encodeCard(values, '2026-11-30');
  const url = 'https://readycard.app/v#A' + enc.base43;

  // What actually comes back out of a scan.
  const decoded = await Card.decodeFragment('A' + enc.base43);

  const leaked = [], missing = [];
  Card.FIELDS.forEach((f, i) => {
    const marker = 'ZZMARKER' + i + 'ZZ';
    const inJson = enc.json.includes(marker);
    const inDecoded = Object.values(decoded).some(v => String(v).includes(marker));
    if (!f.inQr && (inJson || inDecoded)) leaked.push(f.id);
    if (f.inQr && !(inJson && inDecoded)) missing.push(f.id);
  });

  console.log('fields that must travel: ' + Card.QR_FIELDS.length +
              ', phone-only fields: ' + (Card.FIELDS.length - Card.QR_FIELDS.length));
  console.log(leaked.length ? 'LEAKED: ' + leaked.join(', ')
    : 'no phone-only field appears in the payload or in the decoded card');
  console.log(missing.length ? 'MISSING: ' + missing.join(', ')
    : 'every QR field survives the round trip');
  console.log('payload as it would sit in the URL:', enc.json.length, 'bytes json ->',
              enc.packedBytes, 'packed ->', enc.base43.length, 'characters');
  console.log('sanity — does the raw URL contain any marker for a locked field?',
    Card.FIELDS.filter(f => !f.inQr).some((f, i) =>
      url.includes('ZZMARKER' + Card.FIELDS.indexOf(f) + 'ZZ')) ? 'YES (bad)' : 'no');
})();
