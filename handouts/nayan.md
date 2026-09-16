# Nayan — the parent's side

**Your job in one sentence:** build the screen where a parent adds their child
and types in the information.

**Your files:** `index.html` and `fields.js` in the `readycard-app` repository.

**Why yours matters most:** `fields.js` is the file that decides what our app is
*allowed* to put in a QR code. That is not a small technical detail — it is the
idea the whole project is built on, and it lives in your file.

---

## WEEK 1 — Sep 15 to 20 — forms that build themselves

### Where things go

```
Desktop/readycard-practice/nayan/
```

### Task 1 — a form, typed out by hand

Make a file called `form1.html` and type this in:

```html
<!doctype html>
<html>
<body>
  <h1>Add a child</h1>

  <label>First name</label>
  <input id="first">

  <label>Last name</label>
  <input id="last">

  <label>Allergies</label>
  <input id="allergy">

  <button onclick="show()">Show me</button>

  <script>
    function show() {
      let card = {
        first:   document.getElementById("first").value,
        last:    document.getElementById("last").value,
        allergy: document.getElementById("allergy").value
      };
      console.log(card);
    }
  </script>
</body>
</html>
```

Double-click it. Type something in the boxes, press the button, then press **F12**
and click **Console**. Your card is sitting there.

What the pieces do:

- `<input id="first">` — a box you can type in. The `id` is its name so we can
  find it again.
- `document.getElementById("first")` — go and find that box.
- `.value` — whatever is typed in it right now.

**Stop here until this works.** Everything else you build is this, repeated.

### Task 2 — the same form, built by a loop

This is the important one, and it is the bit that makes your week 3 easy.

Typing out three boxes by hand is fine. Typing out nineteen is horrible, and if
we add one later you have to remember to change it in two places. So instead we
write down a *list* of what the boxes are, and let a loop make them.

Make `form2.html`:

```html
<!doctype html>
<html>
<body>
  <h1>Add a child</h1>
  <div id="formGoesHere"></div>
  <button onclick="show()">Show me</button>

  <script>
    let FIELDS = [
      { id: "first",   label: "First name" },
      { id: "last",    label: "Last name" },
      { id: "allergy", label: "Allergies" }
    ];

    function buildForm() {
      let box = document.getElementById("formGoesHere");
      for (let field of FIELDS) {
        let label = document.createElement("label");
        label.textContent = field.label;

        let input = document.createElement("input");
        input.id = field.id;

        box.appendChild(label);
        box.appendChild(input);
      }
    }

    function show() {
      let card = {};
      for (let field of FIELDS) {
        card[field.id] = document.getElementById(field.id).value;
      }
      console.log(card);
    }

    buildForm();
  </script>
</body>
</html>
```

It looks the same on screen. But now **adding a box is one line in the list.**
Try it — add `{ id: "meds", label: "Medications" }` to `FIELDS` and reload. A new
box appears and it works, and you did not touch anything else.

`document.createElement("input")` means "make me a new box". `appendChild` means
"stick it on the page".

### Task 3 — remember it after a refresh

Add a save button that puts the card in the browser's own little storage cupboard:

```javascript
function save() {
  let card = {};
  for (let field of FIELDS) {
    card[field.id] = document.getElementById(field.id).value;
  }
  localStorage.setItem("mycard", JSON.stringify(card));
}

function load() {
  let saved = localStorage.getItem("mycard");
  if (saved) {
    let card = JSON.parse(saved);
    for (let field of FIELDS) {
      document.getElementById(field.id).value = card[field.id];
    }
  }
}
```

Call `load()` at the bottom, next to `buildForm()`. Add a save button. Type
something, save, **close the tab completely**, open the file again. It is still
there.

`localStorage` only holds text, which is why we `JSON.stringify` on the way in and
`JSON.parse` on the way out.

### What "done" looks like for week 1

`form2.html` builds its boxes from a list, saves, and still has your typing after
you close and reopen the tab.

### Your two minutes on Sunday

Show them `form2.html`. Then add a field to the list live, in front of them, and
reload. That moment is your whole job explained in ten seconds.

---

## WEEK 2 — Sep 21 to 27 — more than one child

Families have more than one kid. So we keep a **list** of cards, not one card.

Build `children.html` in your practice folder, with:

```javascript
function loadChildren()          // get the list out of localStorage, or [] if none
function saveChildren(list)      // put the list into localStorage
function showChildList()         // draw a button per child on the page
function addChild()              // add an empty child and open it
function openChild(id)           // fill the form in with that child
```

Give each child an `id` so you can tell them apart even if two are called Sam:

```javascript
let child = { id: "c" + Date.now(), first: "", last: "" };
```

`Date.now()` is the number of milliseconds since 1970, so it is different every
time. That is all an id needs to be.

**The screen has two states.** A list of children, or one child's form. Not both
at once. The simplest way is two `<div>`s and hiding one:

```javascript
document.getElementById("listScreen").hidden = true;
document.getElementById("formScreen").hidden = false;
```

### What "done" looks like for week 2

You can add three children, close the tab, reopen it, and all three are there.
Clicking one opens their form with their own information in it.

---

## WEEK 3 — Sep 28 to Oct 4 — the real files, and the big rule

Pull in GitHub Desktop first. You are making two files in `readycard-app`.

### File 1 — `fields.js`

This is the one all four of you agree on together before anyone types it. It is
a list, and every single entry says which of two buckets the field is in:

```javascript
let FIELDS = [
  // These travel inside the QR code.
  { id: "first",   label: "First name",              max: 20,  inQr: true },
  { id: "last",    label: "Last name",               max: 20,  inQr: true },
  { id: "allergy", label: "Allergies and severity",  max: 120, inQr: true },
  { id: "meds",    label: "Medications and where they are kept", max: 160, inQr: true },
  { id: "cond",    label: "Conditions",              max: 120, inQr: true },
  { id: "c1name",  label: "Contact 1 name",          max: 28,  inQr: true },
  { id: "c1phone", label: "Contact 1 phone",         max: 18,  inQr: true },
  { id: "c2name",  label: "Contact 2 name",          max: 28,  inQr: true },
  { id: "c2phone", label: "Contact 2 phone",         max: 18,  inQr: true },
  { id: "kidnote", label: "The kid's own note",      max: 160, inQr: true },

  // These NEVER go in a QR code. They stay on the parent's phone.
  { id: "dob",      label: "Date of birth",          max: 12,  inQr: false },
  { id: "insurer",  label: "Insurance company",      max: 40,  inQr: false },
  { id: "member",   label: "Member number",          max: 30,  inQr: false },
  { id: "doctor",   label: "Doctor",                 max: 60,  inQr: false },
  { id: "dentist",  label: "Dentist",                max: 60,  inQr: false },
  { id: "hospital", label: "Hospital",               max: 60,  inQr: false },
  { id: "history",  label: "Medical history",        max: 300, inQr: false },
  { id: "pickup",   label: "Who can collect them",   max: 160, inQr: false },
  { id: "address",  label: "Home address",           max: 120, inQr: false }
];
```

**`max` is a character limit, and it is not decoration.** Put it on every box:

```javascript
input.maxLength = field.max;
```

That one line means a parent physically cannot paste a thousand words into the
notes box. It is the first of three defences and it costs nothing.

**`inQr` is the rule.** When you build the form, make two sections:

- one headed **"Travels in the QR code"** — the `inQr: true` ones
- one headed **"Stays on this phone"** — the `inQr: false` ones, with a small
  padlock next to the heading

Then when you hand a card to Hrithvik's `packCard`, **only send the `inQr: true`
fields.** One small function:

```javascript
function onlyTheAllowedFields(card) {
  let out = {};
  for (let field of FIELDS) {
    if (field.inQr) {
      out[field.id] = card[field.id];
    }
  }
  return out;
}
```

**That function is the most important eight lines in the project.** It is the
reason nobody's insurance number can ever end up in a photo in a stranger's
phone. Not because we promised, but because the code cannot do it.

### File 2 — `index.html`

Everything from week 2, plus the form from `fields.js`, plus a Generate button
that calls `packCard` and `makeQrCode` from Hrithvik's file.

Put his file in before yours so it has loaded by the time you use it:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.5.2/qrcode.min.js"></script>
<script src="fields.js"></script>
<script src="pack.js"></script>
```

### What "done" looks like for week 3

Add a child, fill in some boxes, press Generate, a real QR code appears.

---

## WEEK 4 — Oct 5 to 11 — the warning, and the preview

### Task 1 — warn while they type

Hrithvik will give you `willItFit(text)` and a number. Every time a parent types a
letter, pack the card, ask if it fits, and show a message underneath.

```javascript
input.addEventListener("input", function () {
  checkSize();
});
```

Grey message when it fits, red when it does not. Switch the Generate button off
while it does not fit, and say which box is the longest one.

### Task 2 — the preview

A button that shows the parent exactly what a coach will see, before they send
anything. The trick: you already have that page. It is Manvik's `v.html`. Just
pack the card and open his page with it. Ask Manvik how.

The point is that a parent does not have to take our word for what is in the
code — they can look.

### Task 3 — prove the rule holds

Write a test. Fill in every single one of the nineteen fields with the word
`TEST_` plus the field name. Pack the card. Then:

```javascript
console.log(packed.includes("TEST_member"));   // must print false
```

Check all nine of the phone-only ones. **All nine must print `false`.** If even
one prints `true`, something is leaking and that is the most serious bug this
project can have. Fix it that day.

Show this test on Sunday. It is thirty seconds of video and it proves the thing
we claim.

---

## WEEK 5 and 6

Week 5: no new features after Wednesday. Test on a real phone with real fingers.
Fix what is annoying.

Week 6: help with the video, answer your bit of the written questions.

---

## Your two minutes in the video

> "A parent should not have to decide what is safe to share while standing in a
> car park. So the app decides, the same way every time. This file lists every
> field, and each one is marked as either allowed in the code or not. Insurance
> number: not allowed. Date of birth: not allowed. And here is the test that
> proves it — I fill in every box, generate a code, and check. None of the private
> ones are in there."

---

## When you are stuck

1. F12, Console tab, read the red writing.
2. `console.log` the thing just before the line that breaks. It is usually
   `undefined`, which means you spelled an id wrong somewhere.
3. Then ask Santosh — say what you expected, what happened, and which line.
