# Kushu — design, and the story

**Your job in one sentence:** make all of it look good on a phone, and make the
video that the judges actually watch.

**Your file:** `style.css` in the `readycard-app` repository. It is the only file
that controls how anything looks, and nobody else touches it.

**Read this first, because people get it wrong.** Your area is not the leftover
job. Judges score three things and one of them is design. On top of that, they
only ever see our app through your video — they do not sit down with the code. A
brilliant app with a confusing video loses to an ordinary app with a clear one.
**You own the only thing the judge experiences.**

---

## WEEK 1 — Sep 15 to 20 — paper, then one page

### Task 1 — paper first. No computer.

Get actual paper and a pencil. Draw a phone-shaped rectangle, about the size of a
real phone, six times. Then sketch these six screens:

1. **The list of children** — a parent opens the app and sees their kids
2. **Adding a child** — the form
3. **The code** — the QR on screen, ready to show someone
4. **The card** — what a coach sees after scanning. *Spend the most time here.*
5. **Expired** — what a coach sees when the code is too old
6. **The sticker** — a QR on a helmet, with whatever tiny text fits around it

Screen 4 is the one that matters. A coach is worried, in a hurry, and has never
seen our app. Ask yourself: what does he need in the first four seconds? Draw
that biggest.

### Task 2 — decide the look, and write it down

Pick and write on paper:

- **Two fonts.** One for headings, one for everything else. One is fine too.
- **Four colours, with their hex codes** (the `#1f5fd0` kind of number):
  - a background colour
  - a text colour
  - one strong colour for buttons
  - **one red for allergies** — this one matters most

To get hex codes, search "colour picker" and use any of them. Write the codes
down. Guessing later wastes an hour.

One rule you must not break: **make sure dark text on your background is easy to
read.** Search for "contrast checker", paste your two colours in, and it gives
you a number. You want **4.5 or higher.** Below that, some people genuinely
cannot read it, and a judge may test exactly this.

### Task 3 — build one screen. Just one.

Pick screen 4, the card. Make two files in
`Desktop/readycard-practice/kushu/`:

`card.html`:

```html
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Maya Ellison</h1>

  <div class="alert">
    <h2>ALLERGIES</h2>
    <p>Peanuts - severe, carries an EpiPen</p>
  </div>

  <div class="block">
    <h2>MEDICATIONS</h2>
    <p>Inhaler - front pocket of the green bag</p>
  </div>
</body>
</html>
```

`style.css`:

```css
body {
  background: #f6f7f9;
  color: #16181d;
  font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
  padding: 20px;
}

h1 {
  font-size: 30px;
  margin-bottom: 4px;
}

.alert {
  border: 2px solid #b3261e;
  background: #fdecea;
  color: #b3261e;
  border-radius: 10px;
  padding: 14px;
}

.alert p {
  font-size: 21px;
  font-weight: bold;
}
```

Double-click `card.html`. Change the numbers and colours until it looks like your
sketch. **Every time you change something, save and reload.** That loop is how
all design on a computer works.

The idea to hold on to: `class="alert"` in the HTML, `.alert` in the CSS. The
class is a label. The CSS says what everything with that label looks like. Label
five things `alert` and all five change together.

### Task 4 — look at it on a real phone

In Chrome press **F12**, then find the little phone-and-tablet icon near the top
left of the panel and click it. The page is now phone-shaped.

**Everything we build is looked at on a phone, standing up, outdoors, by someone
in a hurry.** Design for that, not for your laptop.

### What "done" looks like for week 1

Six sketches on paper, four hex codes written down, and one real screen you built
that looks like your sketch.

### Your two minutes on Sunday

Hold up the paper. Show the screen you built. Say what you want the app to feel
like in three words.

---

## WEEK 2 — Sep 21 to 27 — the card, properly

Manvik is building the real version of screen 4 this week. Work with him: you
decide how it looks, he makes it work. Sit together.

Finish the design of the card in your practice folder and hand him the CSS.

Things to get right:

- The allergy box has to be **impossible to miss**. Bigger than you think.
- Phone numbers should look tappable — big, and in your button colour.
- The kid's own note should look different from everything else. It is the child
  speaking, not a form. Try a line down the left side and slanted text.

---

## WEEK 3 — Sep 28 to Oct 4 — the sticker, and booking the test

### Task 1 — design the sticker

A QR code on a helmet or a water bottle. Around it, only what fits: the child's
first name, and maybe two words.

Hrithvik will tell you how big the code has to be printed to still scan.
**Believe him and design around it.** A beautiful sticker that does not scan is
worth nothing.

Print some. Stick them on things. Try scanning from far away, at an angle, in
bad light, and with the sticker slightly bent. Write down what stops working.
**That testing is worth showing in the video.**

### Task 2 — book the real-world test. This week.

We have to test with a real family at a real event before we submit, and we have
to be able to say we did. A Scout meeting, a practice, a class — anything.

**Book it now for week 6.** Not "arrange it later". Ask Santosh which adult to
ask, and get an actual date in an actual diary. This is the one job on the whole
team that fails purely by being left too late.

---

## WEEK 4 — Oct 5 to 11 — everything looks like one app, and the script

### Task 1 — one stylesheet for all of it

Until now everyone has been making their own pages look however. Now `style.css`
takes over and all three pages look like the same app.

Learn one thing this week that will save you enormous time — colour variables:

```css
:root {
  --bg: #f6f7f9;
  --ink: #16181d;
  --accent: #1f5fd0;
  --danger: #b3261e;
}

body {
  background: var(--bg);
  color: var(--ink);
}

button {
  background: var(--accent);
}
```

Write the colour once at the top, use `var(--accent)` everywhere. Change your
mind about the blue later and you change **one line** instead of forty.

### Task 2 — write the video script

Not the video. The script. Every word, written down, with times next to it.

Three minutes maximum and you will be shocked how short that is. Here is a
starting budget — change it, but keep something like this shape:

| Time | What happens |
|---|---|
| 0:00–0:20 | The problem. A coach asks if a kid is allergic to anything. Nobody answers. |
| 0:20–0:35 | Our four names, the app's name, what it does in one sentence, who it is for |
| 0:35–1:05 | A parent makes a card and gets a QR code |
| 1:05–1:35 | **Aeroplane mode. Printed sticker. A stranger scans it. The card appears.** |
| 1:35–2:20 | **Each of you explains your own piece of the code** |
| 2:20–2:45 | The tools we used, and what we are honest about |
| 2:45–3:00 | Ending |

Two things the rules require that are easy to forget: **all four names**, and
**which tools and languages we used**. Leave them out and we lose points for
nothing.

The 1:35–2:20 section is not optional and it is not padding. Judges score how
well we explain our own code, and that is the only place we do it. **Forty-five
seconds, so roughly eleven seconds each.** That is two sentences. Make everyone
write their two sentences this week.

---

## WEEK 5 — Oct 12 to 18 — first takes

Film a rough version of the whole thing. It will be bad. That is the point —
filming it is the only way to find out that a bit does not make sense, or that
0:35–1:05 actually takes ninety seconds.

Then everyone films their eleven seconds three times and you pick the best.

### Filming, plainly

- Film **horizontally**. Never vertically.
- Record voices in a quiet room, not a kitchen. Bad sound looks worse than bad
  picture.
- For phone screens, use screen recording rather than pointing a camera at a
  screen, except for the scanning shot — that one **has to** show a real phone
  looking at a real sticker, because that is what makes it believable.
- Use fake children and fake phone numbers in every single shot. No real
  allergy, no real number, and nobody's face without their parent saying yes in
  writing.

---

## WEEK 6 — Oct 19 to 23 — finish it

Real event test early in the week. Film what you can there — even a few seconds of
a real coach scanning a real sticker is worth more than anything staged.

Then: final video, upload to YouTube **set to public** (if it is private the
judges cannot watch it and we are finished), and write the README for the app
repository.

---

## Your two minutes in the video

You are also the voice of the whole video, but your own bit is design:

> "A coach reading this is worried and in a hurry. So the child's name is the
> biggest thing, the allergy is second and it is red, and the phone numbers are
> buttons you tap to call. There is nothing else on the screen. We designed it
> for four seconds of attention, outdoors, on a phone."

---

## When you are stuck

CSS goes wrong quietly — nothing turns red, it just looks wrong. So:

1. Press F12 and click the little arrow icon, then click the thing that looks
   wrong. Chrome shows you every rule affecting it and crosses out the ones
   being overridden. That answers most CSS questions in ten seconds.
2. Then ask Santosh.
