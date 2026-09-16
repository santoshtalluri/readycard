# Everyone reads this first

About one hour. Do it before you start your own sheet.

---

## Part 1 — Put three things on your computer

### 1. A code editor, called VS Code

This is where you type code. It is free.

1. Go to `https://code.visualstudio.com`
2. Click the big download button. It knows if you have a Mac or a Windows PC.
3. Open the file it downloads and install it like any other app.

### 2. Google Chrome

You probably have it. If not, `https://google.com/chrome`. We all use the same
browser so that when something breaks, it breaks the same way for everybody.

### 3. GitHub Desktop

This is how we share code with each other without emailing files around.

1. Go to `https://desktop.github.com` and install it.
2. Open it. It will ask you to sign in to GitHub. Use the account Santosh set up
   for you.

---

## Part 2 — Make two folders

You need to keep two kinds of work apart, and mixing them up is the most common
way this goes wrong.

### Folder 1 — practice. On your own computer only.

Make a folder on your Desktop called:

```
readycard-practice
```

Inside it, make a folder with your own name. So Nayan makes
`Desktop/readycard-practice/nayan`.

**Everything in week 1 goes here.** This folder never goes to GitHub. It is
yours. It is allowed to be messy, broken, and full of things that do not work.
That is what practice is.

### Folder 2 — the real app. Shared with everyone.

Santosh will make a repository called `readycard-app` and invite you to it.

In GitHub Desktop: **File → Clone repository**, pick `readycard-app`, and click
Clone. It will put a folder on your computer. That folder is the real app.

**Nothing goes in here until week 2.**

---

## Part 3 — Learn just enough web

Two hours, once. You already know some Python, which is most of the hard part.

Go to `https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web`
and work through it. Or search for "freeCodeCamp responsive web design" and do
the first few lessons. Either is fine.

You are trying to come out of it knowing four things:

1. **HTML** is the stuff on the page — a heading, a box you type in, a button.
2. **CSS** is what it looks like — colours, sizes, spacing.
3. **JavaScript** is what happens — what a button does when you click it.
4. How to open an HTML file in Chrome and see it.

### The bit that will confuse you, so here it is early

You know Python. JavaScript is the same ideas in different clothes.

| Python | JavaScript |
|---|---|
| `name = "Maya"` | `let name = "Maya";` |
| `if x > 5:` | `if (x > 5) {` … `}` |
| `for item in things:` | `for (let item of things) {` … `}` |
| `def add(a, b):` | `function add(a, b) {` … `}` |
| `{"first": "Maya"}` | `{first: "Maya"}` |
| `print(x)` | `console.log(x)` |
| `len(s)` | `s.length` |

The three real differences: lines end with a semicolon `;`, blocks use curly
brackets `{ }` instead of indenting, and `console.log` prints into the browser
instead of the terminal.

### How to see what your code printed

In Chrome, press **F12** (Windows) or **Cmd + Option + I** (Mac). A panel opens.
Click the **Console** tab. Anything you `console.log` shows up there, and so do
your mistakes, in red. **Red text in the console is not a disaster — it is the
computer telling you exactly which line is wrong and what it did not understand.**
Read it. It usually says the answer.

---

## Part 4 — The card

Everything in this project is about one thing: a **card**. A card is the
information about one child. In code it looks like this, and these exact names
are used by all three of you who write JavaScript:

```javascript
{
  first:    "Maya",
  last:     "Ellison",
  allergy:  "Peanuts - severe, carries an EpiPen",
  meds:     "Inhaler - front pocket of the green bag",
  cond:     "Asthma",
  c1name:   "Dana Ellison",
  c1phone:  "555-0142",
  c2name:   "Ray Ellison",
  c2phone:  "555-0188",
  kidnote:  "If I go quiet I am about to have an attack.",
  expiry:   "2026-11-30"
}
```

**Do not rename any of these.** Nayan makes one of these. Hrithvik squashes it
down. Manvik opens it back up. If one person spells it `firstName` and another
spells it `first`, nothing works and it takes an hour to find out why.

There is a second group of fields that a parent can also fill in — date of birth,
insurance, doctor, dentist, hospital, medical history, pickup adults, home
address. **Those never go in a QR code.** They stay on the parent's phone. This
is the single most important rule in the whole project and there is a whole file
about it (`fields.js`, which Nayan owns).

---

## Part 5 — Three git rules

Git is how four people work on the same thing at once. In GitHub Desktop:

1. **Pull before you start.** The button says "Fetch origin", then "Pull". This
   gets everyone else's work onto your computer. Do it every single time you sit
   down, before you touch anything.
2. **Commit when you stop.** Type a short sentence in the box saying what you did
   ("added the allergy box"), click **Commit to main**, then click **Push origin**.
3. **Never edit a file you do not own.** Ask the owner instead.

If GitHub Desktop turns red and says "conflict", **stop and ask Santosh.** Do not
click things to make it go away. It is fixable in two minutes and unfixable in
twenty if you keep clicking.

---

## Part 6 — Every Sunday

Each of you gets **two minutes** to show the others what you built and explain how
it works. Screen shared. Recorded on a phone.

This feels pointless in week 2. It is the most valuable half hour of the week,
for one reason: **the judges score how well you explain your own code, and they
score it from the video.** The top mark is for an explanation that shows you
really understand it. Someone who has explained their part out loud six times is
good at it by the seventh. Someone who has never said it out loud is not.

By week 6 we have six recordings of each of you and the video half writes itself.
