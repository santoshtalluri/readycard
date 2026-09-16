# Manvik — the reader

**Your job in one sentence:** build the page a coach sees after they scan the QR
code with their phone camera.

**Your file:** `v.html` in the `readycard-app` repository.

**Why yours is the video:** the moment that wins this competition is a stranger,
with no app installed and the phone in aeroplane mode, scanning a sticker and
seeing a child's allergy. That is your page. Everything else is setup for it.

**Why the file is called `v.html` and not `view.html`:** the whole web address
goes inside the QR code, so every character in it is a character we cannot use
for the child's information. Seven letters saved is seven letters of medical
information kept. Small thing, real reason — and worth saying in the video.

---

## WEEK 1 — Sep 15 to 20 — two tiny pages

### Where things go

```
Desktop/readycard-practice/manvik/
```

### Task 1 — read the end of the web address

This is the trick the entire project is built on, and it is about fifteen lines.

Make `hash.html`:

```html
<!doctype html>
<html>
<body>
  <h1>What is after the hash</h1>
  <p id="answer">nothing yet</p>

  <script>
    let stuff = location.hash;
    document.getElementById("answer").textContent = stuff;
  </script>
</body>
</html>
```

Double-click it. It says "nothing yet" or is blank.

Now look at the address bar in Chrome. Click at the very end of it and type:

```
#hello
```

Press Enter, then **reload the page**. It now says `#hello`.

`location.hash` is everything after the `#` in the address. Change it to
`#Maya` and reload. The page changes.

Now add this line so you do not need the `#`:

```javascript
let stuff = location.hash.slice(1);
```

`slice(1)` means "everything except the first character", which chops off the `#`.

**Here is the part that matters, and you should understand it before Sunday.**
When you type a web address, your browser asks a computer somewhere for the page.
But it **never sends the bit after the `#`**. That part stays in your browser and
never travels. It is a rule built into how the web works.

So when a coach scans our code: his phone asks our website for a blank page, our
website sends a blank page, and then his own phone fills in the child's
information from the address bar. **Our website never receives one word about any
child.** Not because we promise not to look. Because it never arrives.

### Task 2 — remember something

Make `save.html`:

```html
<!doctype html>
<html>
<body>
  <input id="box">
  <button onclick="keep()">Keep this</button>
  <p id="shown"></p>

  <script>
    function keep() {
      localStorage.setItem("mything", document.getElementById("box").value);
      show();
    }

    function show() {
      document.getElementById("shown").textContent =
        "Saved: " + localStorage.getItem("mything");
    }

    show();
  </script>
</body>
</html>
```

Type something, press the button. Now **close the tab completely** and open the
file again. It is still there. That is the browser's own storage cupboard, and it
is how a coach keeps a card once he has scanned it.

### What "done" looks like for week 1

Both files work, and you can explain out loud why the part after the `#` never
reaches a website.

### Your two minutes on Sunday

Show `hash.html`. Change the address bar in front of everyone and reload. Then say
the sentence about the `#` never being sent. If you can say that clearly in week
1, you can say it in the video in week 6.

---

## WEEK 2 — Sep 21 to 27 — a card that looks like a card

Do not worry about scanning yet. Just make a good-looking page out of information
you type in yourself.

Make `card.html`. Put a card straight into the code:

```javascript
let card = {
  first:   "Maya",
  last:    "Ellison",
  allergy: "Peanuts - severe, carries an EpiPen",
  meds:    "Inhaler - front pocket of the green bag",
  c1name:  "Dana Ellison",
  c1phone: "555-0142",
  kidnote: "If I go quiet I am about to have an attack."
};
```

Write one function:

```javascript
function showCard(card)    // puts the card on the page
```

Rules for how it looks, because a coach is reading it while worried:

1. **Name at the top, big.**
2. **Allergies next, big and red, in a box.** It is the first thing anyone needs.
3. Then medications, then conditions.
4. Phone numbers must be **tappable**. This is the trick:
   `<a href="tel:5550142">555-0142</a>` — on a phone, tapping it starts the call.
5. The kid's own note at the bottom, in their own words.

Talk to Kushu this week. He is designing this page and you are building it, so
you two should be looking at the same picture.

### What "done" looks like for week 2

A page that looks like something a coach could read in four seconds, and tapping
a number on your phone starts a call.

---

## WEEK 3 — Sep 28 to Oct 4 — the real page, and the big test

Pull first. Make `v.html` in `readycard-app`.

Put Hrithvik's file in at the top so you can use his `unpackCard`:

```html
<script src="pack.js"></script>
```

Now join your two week-1 pieces together:

```javascript
let code = location.hash.slice(1);     // get the text out of the address
let card = unpackCard(code);           // Hrithvik's function turns it back into a card
showCard(card);                        // your function from week 2 puts it on screen
```

**Three lines. That is the whole thing.** Everything else is making it look right
and handling what goes wrong.

### Things that go wrong, which you handle

- **Nothing after the `#`.** Show a friendly page, not an error.
- **The text is damaged or nonsense.** Wrap it up so the page does not just break:

```javascript
try {
  let card = unpackCard(code);
  showCard(card);
} catch (e) {
  document.body.textContent = "Sorry, this code could not be read.";
}
```

`try` means "attempt this". `catch` means "and if it goes wrong, do this
instead". Without it, a bad code gives a coach a blank white screen.

### The October 4 test — this is the checkpoint for the whole team

Everything has to be on the real internet for this, not a file on your computer.
Santosh will turn on GitHub Pages so the app has a real address.

Then: **Nayan makes a code on one phone. You scan it with a different phone.** A
card appears.

If that works, we are fine. If it does not, everybody stops adding anything and
we fix only this until it works.

---

## WEEK 4 — Oct 5 to 11 — the Save button, and expiry

### Task 1 — the Save button

**This is the most important button in the app and most people will not notice
they need it.**

Here is the problem. A coach scans a code in the car park where there is signal.
He drives to a campsite where there is none. He opens his phone. There is nothing
there, because the card was only ever in the address bar and he closed the tab.

So: a big button that saves it properly.

```javascript
function saveCard(card) {
  localStorage.setItem("card_" + card.first + card.last, JSON.stringify(card));
}
```

How it must look, and these are not suggestions:

- It is the **biggest thing on the page after the allergies**.
- It says what it actually does: **"Keep on this phone until 30 Nov"** — not
  "Save".
- After tapping, it changes to "Saved on this phone" and goes green.
- Underneath, small: *"Until you tap that, this card is only in the web address.
  Close the tab and it is gone."*

### Task 2 — expiry

Every card has an `expiry` like `"2026-11-30"`. Write:

```javascript
function isExpired(card)     // returns true or false
```

Compare the date against today. In JavaScript:

```javascript
let end = new Date(card.expiry);
let now = new Date();
if (now > end) { ... }
```

If it has expired: **do not show the card at all.** Show "This code expired on 30
November. Ask the parent for a new one." And delete the saved copy with
`localStorage.removeItem`.

Be honest about what this does, because a judge may ask. It stops the everyday
problem — a coach whose phone still has last season's team. It does **not** stop
somebody who really wants to keep the information, because they already have it.
We prevent accidents, not attacks. Say it exactly like that.

---

## WEEK 5 — Oct 12 to 18 — make it work with no internet

Two different things go offline and they work differently. Keep them separate in
your head or this gets confusing.

- **The card** is saved by your Save button. You did that in week 4.
- **The page itself** — the HTML file — still has to be downloaded the first time.

For the page to work offline afterwards, we need one more small file called a
service worker. It tells the browser "keep a copy of this page". It is about
fifteen lines and Santosh will do it with you.

Then, **the test the whole video is built around:**

1. Scan a code on a phone that has signal.
2. Tap Save.
3. Put the phone in **aeroplane mode**.
4. Open the page again.
5. The card is still there.

**Film this.** Do it in week 5 so that if it does not work you have a week to fix
it. Film it again properly in week 6.

---

## WEEK 6 — Oct 19 to 23

Real test at a real event. Then record. Then submit.

---

## Your two minutes in the video

> "When you scan our code, your phone asks our website for a page — and our
> website sends back an empty one. The child's information was never in the
> request. It is in the part of the web address after the hash, and browsers never
> send that part to a website. So it stays on your phone. Here is the network tab
> with nothing in it. And here is the same card, with the phone in aeroplane mode."

That is the strongest thing anybody on this team gets to say. Practise it.

---

## When you are stuck

1. F12, Console tab, read the red writing.
2. `console.log(code)` right after you read the hash — is it actually there?
3. Then ask Santosh: what you expected, what happened, which line.
