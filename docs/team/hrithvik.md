# Hrithvik — the packing

**Your job in one sentence:** take a child's card and turn it into the shortest
possible piece of text, then have that text drawn as a QR code.

**Your file:** `pack.js` in the `readycard-app` repository. Nobody else edits it.

**Why yours is interesting:** a QR code can only hold so much. A card has a lot
of words in it. Everything you do is about making the words smaller without
losing any of them. That is a real engineering problem and it is the best story
in our video.

---

## WEEK 1 — Sep 15 to 20 — in Python, which you already know

Do not touch JavaScript this week. You are going to work the whole problem out in
Python first, because you can already write Python and you cannot yet write
JavaScript. Solve the problem in a language you know, then translate it later.

### Where things go

```
Desktop/readycard-practice/hrithvik/shrink.py
```

### Task 1 — make a card and measure it

Open VS Code. **File → Open Folder** → pick your `hrithvik` folder.
**File → New File**, save it as `shrink.py`. Type this in:

```python
import json

child = {
    "first":   "Maya",
    "last":    "Ellison",
    "allergy": "Peanuts - severe, carries an EpiPen",
    "meds":    "Inhaler - front pocket of the green bag",
    "cond":    "Asthma",
    "c1name":  "Dana Ellison",
    "c1phone": "555-0142",
    "c2name":  "",
    "c2phone": "",
    "kidnote": "If I go quiet I am about to have an attack.",
    "expiry":  "2026-11-30"
}

text = json.dumps(child)
print("1. plain:", len(text), "characters")
```

Run it. In VS Code that is the little triangle at the top right, or in a terminal
`python3 shrink.py`.

You should see `1. plain: 315 characters`. **Write that number down on paper.**
You are going to collect four numbers this week, and for the record the other
three come out at 286, 245 and 179 — but work them out yourself, and if you get
something different, find out why before you move on.

### Task 2 — throw away the empty ones

Maya has no second contact. We are storing `"c2name": ""` for no reason. Add this
under what you already have:

```python
def drop_empty(card):
    """Return a new card with the blank fields removed."""
    smaller = {}
    for key in card:
        if card[key] != "":
            smaller[key] = card[key]
    return smaller

text2 = json.dumps(drop_empty(child))
print("2. no blanks:", len(text2), "characters")
```

Run it. **Write the second number down.**

### Task 3 — make the names shorter

The computer is storing the word `"allergy"` every single time. It does not need
to — it only needs to know which box the text goes in. So we use one letter.

```python
SHORT = {
    "first": "f", "last": "l", "allergy": "a", "meds": "m", "cond": "c",
    "c1name": "n", "c1phone": "p", "c2name": "o", "c2phone": "q",
    "kidnote": "k", "expiry": "x"
}

def short_keys(card):
    """Return a new card whose keys are single letters."""
    smaller = {}
    for key in card:
        smaller[SHORT[key]] = card[key]
    return smaller

text3 = json.dumps(short_keys(drop_empty(child)))
print("3. short names:", len(text3), "characters")
```

Run it. **Third number.**

### Task 4 — squash it

Python has a squashing tool built in. It finds bits that repeat and stores them
once.

```python
import zlib

squashed = zlib.compress(text3.encode("utf-8"))
print("4. squashed:", len(squashed), "bytes")
```

Run it. **Fourth number.**

### What "done" looks like for week 1

A piece of paper with four numbers on it, and you able to say out loud:

- which step saved the most,
- and why squashing a short card does not help as much as you would expect.
  (Hint: squashing works by spotting repeated bits. A short card has almost
  nothing repeated in it. Try squashing a card where every box is full and see
  what happens.)

**Bring the paper to Sunday.** That is your two-minute talk. It is also, word for
word, the answer to one of the questions on the submission form.

### If you finish early

Make the card bigger — fill in every single box with a long sentence — and run all
four numbers again. Does squashing help more or less now? Write down what you
think before you run it, then check.

---

## WEEK 2 — Sep 21 to 27 — your first web page

Now you translate. Same ideas, new clothes.

### Task 1 — get a QR code on a screen

In `Desktop/readycard-practice/hrithvik/`, make a file called `qrtest.html` and
type this in exactly:

```html
<!doctype html>
<html>
<body>
  <h1>QR test</h1>
  <div id="here"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.5.2/qrcode.min.js"></script>
  <script>
    let qr = qrcode(0, "M");
    qr.addData("hello Hrithvik");
    qr.make();
    document.getElementById("here").innerHTML = qr.createSvgTag(4, 4);
  </script>
</body>
</html>
```

Double-click the file. Chrome opens and there is a QR code. **Point your phone
camera at your own screen.** It says "hello Hrithvik".

That library is the one piece of other people's code we use. It draws the black
and white squares. Everything else in this project we wrote.

What the lines mean:

- `qrcode(0, "M")` — `0` means *work out how big it needs to be on your own*.
  `"M"` is how much damage the code can survive and still be readable.
- `addData` — the text to put in.
- `make()` — do the work.
- `createSvgTag(4, 4)` — draw it. First number is how many screen dots per square,
  second is the white border.

### Task 2 — translate week 1 into JavaScript

Make `pack-test.html`. Put the same card in, as a JavaScript object, and write
these two functions:

```javascript
function dropEmpty(card) { ... }
function shortKeys(card) { ... }
```

Same logic as your Python. The bits you will need:

| Python | JavaScript |
|---|---|
| `for key in card:` | `for (let key in card) {` |
| `json.dumps(x)` | `JSON.stringify(x)` |
| `len(text)` | `text.length` |
| `print(...)` | `console.log(...)` |

Then `console.log` the length, open the Console with F12, and check you get the
same numbers you got in Python. **If the numbers match, your translation is
correct.** If they do not, one of them has a bug and now you know.

### Task 3 — join them up

Put your short text into `addData` instead of `"hello Hrithvik"`. Scan it with
your phone. Your phone shows you a wall of JSON. That is correct and it is
supposed to look ugly — Manvik's page is what turns it back into something a
human reads.

### What "done" looks like for week 2

You can scan a QR code off your own screen and see your own squashed card text.

---

## WEEK 3 — Sep 28 to Oct 4 — the real file

This is the big week for the whole team.

Make `pack.js` in the **`readycard-app`** folder. Pull first in GitHub Desktop.

It contains four functions and nothing else:

```javascript
function dropEmpty(card)          // takes a card, returns a card
function shortKeys(card)          // takes a card, returns a card
function packCard(card)           // takes a card, returns a string
function unpackCard(text)         // takes a string, returns a card
function makeQrCode(text, boxId)  // draws a QR code into a box on the page
```

### What `packCard` does, in order

1. `dropEmpty`
2. `shortKeys`
3. `JSON.stringify`
4. turn it into safe letters (below)
5. return the result

### Safe letters — the bit that catches everyone

Your text has spaces, commas and quote marks in it. Those cannot go in a web
address — the browser rewrites them and the other side gets something different
from what you put in. So we convert everything into a small set of safe
characters. JavaScript has this built in:

```javascript
let safe = btoa(text);
safe = safe.split("+").join("-").split("/").join("_").split("=").join("");
```

`btoa` does the conversion. The three `split/join` lines swap out the three
characters `btoa` produces that a web address still does not like.

And to go backwards in `unpackCard`:

```javascript
let normal = safe.split("-").join("+").split("_").join("/");
let text = atob(normal);
```

### What `unpackCard` does

Exactly the reverse: safe letters back to text, `JSON.parse`, then swap the
one-letter names back to the long ones. **You need a second lookup table for
that** — going from `"a"` back to `"allergy"`. Write it out by hand, it is eleven
lines.

### How to test it

Pack a card. Unpack the result. Check you got the same card back. Do this every
time you change anything:

```javascript
let card = { first: "Maya", allergy: "Peanuts" };
let packed = packCard(card);
let back = unpackCard(packed);
console.log(back);        // must look exactly like card
```

**Manvik uses `unpackCard` and he cannot test his page until yours works.** He is
waiting on you, so tell him the moment it does.

### What "done" looks like for week 3

Nayan's page makes a card, your code packs it, a QR code appears, someone else's
phone scans it, and Manvik's page shows a name. Ugly is completely fine.

---

## WEEK 4 — Oct 5 to 11 — stop parents typing too much

A QR code has a limit. If a parent writes a very long story in the notes box, the
code gets too big to scan. Your job is to stop that happening before it happens.

Add two functions:

```javascript
function codeSize(text)    // returns how many squares across the code is
function willItFit(text)   // returns true or false
```

`codeSize` is easy, because the library will tell you:

```javascript
let qr = qrcode(0, "M");
qr.addData(text);
qr.make();
return qr.getModuleCount();
```

`getModuleCount` gives you the number of squares across. Bigger number, bigger
code, harder to scan. Around 65 squares is a comfortable card. Over about 105 and
it is getting hard to scan off a small printed sticker.

`willItFit` returns `false` when `codeSize` goes over the number you pick.
**You pick that number, and you should be able to say why.** Print a code at a
few sizes, tape them to a wall, and see which ones your phone still reads from
across a room. Now you have a real reason, not a guessed one.

Then tell Nayan the number so his page can show a warning while the parent types.

### Also in week 4 — expiry

Add `expiry` into the packed card. It is already in the card object as text like
`"2026-11-30"`. It just needs to survive the round trip. Manvik does the part
where an expired card refuses to open.

---

## WEEK 5 — Oct 12 to 18 — squashing, if there is time

This is the one you did in Python with `zlib`. The browser has the same thing but
it is awkward, because it works in the background and you have to wait for it.
Try it. **If it fights you for more than two sessions, stop and leave it out** —
the app works fine without it, and a working app beats a clever one.

If you do get it working, measure again: card text before, card text after. Those
two numbers are the best thirty seconds of your part of the video.

---

## Your two minutes in the video

Say this, roughly:

> "A QR code can only hold so much text, and a medical card has a lot of words in
> it. So I measured. A normal card was [X] characters. I took out the empty boxes:
> [Y]. I made every label one letter instead of a whole word: [Z]. That is [N]
> characters saved, which is the difference between a code you can print small and
> one you cannot."

Real numbers, measured by you. That is what the judges are looking for.

---

## When you are stuck

1. Press F12 and read the red writing. It says which line and what it did not
   understand.
2. Add `console.log` above the broken line and check the value is what you think
   it is. It usually is not, and that is the bug.
3. Then ask Santosh. Tell him what you expected, what happened, and which line.
