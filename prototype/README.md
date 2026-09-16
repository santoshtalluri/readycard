# ReadyCard — working prototype

A real, working QR generator and card viewer. Four files, no build step, no
dependencies, no server code. Drop the folder on any static host and it runs.

**This is not the submission codebase.** It is a reference tool: something to
argue about, to measure against, and to steal ideas from. The app the team
submits gets written by the team. See the note at the bottom.

| File | What it is |
|---|---|
| `index.html` | The parent's side. A list of children, add a child, fill in a card, watch the capacity meter, generate a real QR code. |
| `view.html` | What a scanned code opens. Reads the card out of the URL fragment. Save button, expiry. |
| `qr.js` | A QR encoder written from the ISO/IEC 18004 spec. Versions 1–40, all four error-correction levels, byte and alphanumeric modes. |
| `card.js` | The field list, the Section 4 rule, the payload codec, and the capacity maths. |
| `selftest.html` | Open it to re-run the encoder tests in any browser. |
| `style.css` | Shared styling. Light and dark. |

## Putting it on the web

There is no server code here. Nothing is installed, nothing is compiled, and
nothing runs on a machine we control. A host hands the browser four static files
and the browser does the rest.

**GitHub Pages.** Push the repo, then Settings → Pages → deploy from `main`, and
the site appears at `https://<user>.github.io/readycard/prototype/`.

**Vercel.** Import the repo, set the root directory to `prototype`, and deploy.
No framework, no build command, no environment variables.

Either way it has to be on the real internet before the phone-to-phone scan test
means anything — one phone shows a code, another phone's camera reads it.

**Opening the files directly** by double-clicking `index.html` works in Chrome
for a quick look, though Safari restricts local storage on `file://` so children
may not save. Not verified by us; use a host.

*(While building this we ran `python3 -m http.server` as a local preview. That
was our test setup, not part of the app — nothing in `prototype/` is Python.)*

## What it answers

The brief said to measure a worst-case card against the character limit in Week 2.
That is done. Every number below came out of this tool.

### A card is nowhere near the 2,000-character limit — but a sticker is a different problem

Measured with the code pointing at `readycard.app/v`:

| Card | Characters typed | As JSON | Compressed | In the code | Sticker 1.25" | Wallet card 2" |
|---|---|---|---|---|---|---|
| Minimal — name, one allergy, one phone | 35 | 75 | 70 | 105 | **fits, v8** | fits, v6 |
| Typical — the Maya example | 267 | 351 | 245 | 368 | **does not fit** | fits, v12 |
| Worst case — every field at its limit | 692 | 769 | 372 | 558 | **does not fit** | fits, v15 |

**The headline: a full card fits a wallet card easily and does not fit a helmet
sticker at all.** A code at 1.25 inches carries about 312 characters of payload,
which is roughly a name, one allergy and one phone number.

That is exactly what the pitch already promises a sticker contains — "a name, an
allergy, and a phone number, less than a school ID badge." But the brief also
says there is **one card per child** and it goes in every code. Those two
statements cannot both be true. Somebody has to decide, and it is a product
decision, not a coding one:

- **Print stickers bigger.** A 2-inch sticker carries the whole card. Fine on a
  backpack, large for a helmet.
- **Let a sticker carry a shorter code.** Costs a second kind of card and breaks
  the "one card, no decisions" promise.
- **Say so out loud.** Stickers hold the short version; texted codes hold everything.

We'd pick the third. It is honest, it costs nothing to build, and it is a good
answer to a judge's question.

### The web address eats into the card

A long host name is charged against the child's information, character for character.

| Address | Length | Typical card lands at |
|---|---|---|
| `https://readycard.app/v` | 23 | version 12 |
| `https://hrithvik-m.github.io/readycard/view.html` | 48 | version 13 |

Not fatal, but a real reason to prefer a short domain and a one-letter path.

### Compression helps less than you would hope

A typical card is 351 bytes of JSON and compresses to 245 — about 30%. Short
text does not compress well; there is not enough repetition. The far bigger
saving is leaving empty fields out of the payload entirely, which is why the
minimal card is 75 bytes and not 300.

### base43, and why the obvious answer was wrong

A QR code stores its own "alphanumeric mode" at 5.5 bits per character instead
of byte mode's 8, but only for 45 specific characters:

```
0-9  A-Z  space  $  %  *  +  -  .  /  :
```

The textbook trick is base45, which is built on exactly that set. It is about
23% denser than base64 inside a QR code.

**It does not survive a URL.** Two of those characters break in a web address:
a space is rewritten as `%20`, and a literal `%` starts a percent-escape, so the
browser hands back something different from what the camera scanned. The first
version of this prototype did exactly that and the viewer failed with an
unhelpful error.

Dropping both leaves 43 characters that are legal in both places, and it costs
nothing: alphanumeric mode packs any two characters into 11 bits whatever the
alphabet size, and 43³ = 79,507 still covers the 65,536 values of a byte pair.
So base43 is still three characters per two bytes — identical to base45, and it
actually works.

**This is the best answer to submission question 4** — "what technical difficulty
did you face and how did you address it." It is specific, it is real, and the
fix is explainable in thirty seconds.

### The encoder is tested, not assumed

`selftest.html` checks two things a wrong QR encoder would fail:

1. The error-correction block table is cross-checked against the module count for
   all 40 versions × 4 levels. A transcription error anywhere shows up here. One
   did — alignment patterns sitting on the timing row were being skipped.
2. Every version from 1 to 40, filled to capacity, is rendered to a canvas and
   read back with the browser's own barcode detector — the same decoder a phone
   camera uses.

## How the capacity meter works

The form stops a parent long before anything breaks, in three layers:

1. **Every field has a hard character limit** in the markup. Nobody can paste ten
   thousand characters into the notes box, because the box will not hold them.
2. **A live meter** shows how full the code is, recalculated on every keystroke:
   pack the card, compress it, encode it, and ask the encoder what version comes out.
3. **If it is over, Generate is disabled** and the app says how many characters to
   cut and which field is the longest — using the compression ratio measured on
   *this* card, since how well text compresses depends on what was typed.

The budget comes from a physical size, not from the format's maximum. A
version-40 code holds 2,953 bytes and is about three inches across at a module
size a phone can reliably read. That is not a helmet sticker. So the presets are
stated as printed widths and the version is derived:

| Preset | Target width | Works out to | Payload budget |
|---|---|---|---|
| Sticker on a helmet or bottle | 1.25 in | version 13, level Q | 312 characters |
| Wallet card, screen or paper | 2 in | version 25, level M | 1,410 characters |
| Absolute maximum | 3.5 in | version 40, level L | 4,256 characters |

Sizing assumes 0.4 mm per module, which is conservative for a phone camera in
bad light. `MODULE_MM` in `card.js` is the one number to change if real testing
shows we can print smaller.

## What the parent's side does

- **A list of children**, one row each, with the child's name and their allergy line.
- **Add a child**, and each child keeps their own card.
- **Everything saves as you type**, into this browser's own storage. Nothing is sent anywhere.
- **Tap a child** to edit them, generate their code, or delete them.
- **The card is split in two** on screen — the fields that travel in the code, and
  the fields that never leave the phone.
- **Generate**, then download the QR as an SVG or print it.

What it does not do yet: the kid's own notes screen, the active-codes list, roster
mode, and the printable sticker sheet. Those are on the team's list, not ours.

## The Section 4 rule lives in one place

`card.js` has a single list of fields, each marked `inQr: true` or `inQr: false`.
Nothing else in the app decides what may be encoded, and the form is generated
from that list. Type into the phone-only fields and the meter does not move,
which is the rule demonstrating itself rather than being explained.

Checking that the rule holds is one line: encode a card with every field filled,
then confirm none of the phone-only values appear in the payload.

## About using this

Congressional App Challenge rules allow AI assistance when it is fully disclosed
and is not the whole of the technical development. This prototype was built with
Claude, and that gets disclosed.

The reason not to copy it into the submission repo is not the rules — it is the
judging. The rubric scores an explanation of the code, and the top mark reads
"explanation of code indicates immense understanding." Nobody can earn that on
code they pasted. Read this, argue with it, take the numbers, then write your own.

## Checking the Section 4 rule

```bash
node prototype/check-section4.js
```

Fills all nineteen fields with markers, encodes a card, decodes it back, and
confirms that all ten permitted fields survive and none of the nine phone-only
fields appear anywhere in the payload. This is the test Section 14 of the brief
asks for — "nothing in the phone-only list ever appears inside a generated code,
test this deliberately."
