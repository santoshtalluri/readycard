# ReadyCard — working prototype

A real QR generator and card viewer. Four files, no dependencies, no build step,
no server code. Any static host will run it.

**This is not the submission codebase.** It is a reference: something to try, to
measure against, and to argue with. The app the team submits gets written by the
team.

| File | What it is |
|---|---|
| `index.html` | The parent's side. A list of children, add a child, the form, the capacity meter, the QR code. |
| `view.html` | What a scanned code opens. Reads the card out of the web address. Save button, expiry. |
| `readycard.js` | The QR encoder, and the card — fields, the field rule, packing, capacity maths. |
| `style.css` | How it looks. Light and dark. |

## Putting it on the web

There is no server code here. Nothing is installed and nothing is compiled. A
host hands the browser four files and the browser does the rest.

**GitHub Pages** — Settings → Pages → deploy from `main`.
**Vercel** — import the repo, set the root directory to `prototype`, deploy. No
framework, no build command.

## What it does

- A list of children. Add one, and each keeps their own card.
- Everything saves as you type, into this browser's own storage. Nothing is sent
  anywhere.
- The form is split in two on screen: fields that travel in the QR code, and
  fields that never leave the phone. Type into the locked ones and the meter does
  not move.
- **The child's name is printed under every code it makes**, so a sheet of
  printed codes tells you whose is whose. It sits outside the quiet zone, so it
  cannot interfere with scanning, and it is part of the image — it survives being
  downloaded, printed, or stuck on a helmet.
- Generate, then download the code as an SVG or print it.

## What it answered

The brief said to measure a worst-case card against the character limit. Done.
All of these came out of this tool, with the code pointing at `readycard.app/v`.

| Card | Characters typed | Compressed | Sticker 1.25" | Wallet card 2" |
|---|---|---|---|---|
| Minimal — name, one allergy, one phone | 35 | 70 | **fits** | fits |
| Typical | 267 | 245 | **does not fit** | fits, v12 |
| Worst case — every field at its limit | 692 | 372 | **does not fit** | fits, v15 |

**A full card fits a wallet card easily and does not fit a helmet sticker.** A
1.25-inch code carries about 312 characters — roughly a name, one allergy and one
phone number. That is exactly what the pitch promises a sticker holds, but the
brief also says one card per child goes in every code. Both cannot be true, and
that is a product decision.

**The web address is charged against the child's information.** `readycard.app/v`
is 23 characters; a github.io address is 48, and costs a whole QR version.

**Compression helps less than you would hope.** A typical card is 351 bytes and
compresses to 245 — short text has too little repetition. The bigger saving is
leaving empty fields out entirely.

## base43, and why the obvious answer was wrong

A QR code stores its own alphanumeric mode at 5.5 bits per character instead of
byte mode's 8, but only for 45 characters: `0-9 A-Z space $ % * + - . / :`

The textbook trick is base45, built on exactly that set, and about 23% denser
than base64 inside a QR code. **It does not survive a URL.** A space is rewritten
as `%20` and a literal `%` starts a percent-escape, so the browser hands back
something different from what the camera scanned. The first version of this did
exactly that and failed.

Dropping both leaves 43 characters legal in both places, and it costs nothing:
alphanumeric mode packs any two characters into 11 bits whatever the alphabet
size, and 43³ = 79,507 still covers the 65,536 values of a byte pair. So base43
is still three characters per two bytes — identical to base45, and it works.

**This is the best answer to submission question 4**, "what technical difficulty
did you face and how did you address it."

## The capacity limit

The form cannot produce a card that will not fit:

1. **Every field has a hard character limit** in the markup. Nobody can paste ten
   thousand characters into the notes box.
2. **A live meter** recalculates on every keystroke — pack, compress, encode, and
   ask the encoder what version comes out.
3. **If it is over, Generate is disabled**, and it says how many characters to cut
   and which field is longest, using the compression ratio measured on *this* card.

The budget comes from a printed size, not the format's maximum. A version-40 code
holds 2,953 bytes and is about three inches across at a module size a phone can
read. That is not a helmet sticker.

| Preset | Target width | Version | Payload budget |
|---|---|---|---|
| Sticker on a helmet or bottle | 1.25 in | 13, level Q | 312 characters |
| Wallet card, screen or paper | 2 in | 25, level M | 1,410 characters |
| Absolute maximum | 3.5 in | 40, level L | 4,256 characters |

`MODULE_MM` in `readycard.js` assumes 0.4 mm per module, which is conservative
for a phone camera in bad light. It is the one number to change if real printing
says we can go smaller.

## The field rule lives in one place

`readycard.js` has a single list of fields, each marked `inQr: true` or
`inQr: false`. Nothing else decides what may be encoded, and the form is built
from that list — so a field cannot be added without someone deciding which bucket
it goes in.

## About using this

Congressional App Challenge rules allow AI assistance when it is fully disclosed
and is not the whole of the technical development. This prototype was built with
Claude, and that gets disclosed.

The reason not to copy it into the submission repo is not the rules — it is the
judging. The rubric scores an explanation of the code, and the top mark reads
"explanation of code indicates immense understanding." Nobody earns that on code
they pasted. Read it, take the numbers, write your own.
