# ReadyCard

**Congressional App Challenge 2026 — CA-09**

Every week, kids are handed to adults who know nothing about them — often
somewhere with no signal. ReadyCard gives those adults what they need in four
seconds, with no app, no account, and no internet.

A parent enters their child's important information, turns it into a QR code, and
hands that code to a coach, tutor, Scout leader, or host parent. The adult scans
it with their normal phone camera and sees a clean emergency card. Nothing to
install. Nothing to sign up for.

**There is no server.** Everything lives on the phones of the people using it.

---

## Try it

### → **[Open the working prototype](https://santoshtalluri.github.io/readycard/prototype/)**

It runs in a phone browser. Add a child, fill in a few boxes, and press Generate.
You get a real QR code with the child's name printed under it. Open it on a
second phone and point the camera at the first one — you will see the card a
coach sees.

Nothing you type is sent anywhere. It stays in that browser.

*Built by Claude as a reference for the team to measure against and argue with.
It is not the code being submitted — see [Who does what](#who-does-what).*

---

## The idea in one table

There is one card per child. The **app** decides what may leave the phone, not
the parent.

| | Fields |
|---|---|
| **Travels in the QR code** | Name, allergies and severity, medications and where they're kept, conditions, two emergency contacts, the kid's own notes |
| **Never encoded — phone only** | Date of birth, insurance, doctor, dentist, hospital, medical history, pickup adults, home address, photo |

A QR code is a piece of paper: anyone can read it, anyone can forward it. So we
don't try to lock it — we control what's in it. When an ER desk needs the
insurance number, the parent shows their screen.

Every code carries an expiry date.

---

## How it works

- **Progressive Web App** — installs to the home screen, works offline, one
  codebase for iPhone and Android
- **No backend** — hand-written HTML, CSS, and JavaScript. No framework, no build
  step, no database.
- **The QR *is* the data** — encoded in the URL fragment after `#`, which
  browsers never send to a server
- **No accounts and no PIN** — the phone's own lock screen is the lock
- **No analytics, no ads, no trackers** — the only outside code is a QR drawing
  library, and it is named in the submission

**Not claimed:** the QR payload is encoded, not encrypted. ReadyCard is not HIPAA
compliant and never says it is.

---

## Who does what

Four students build the app. Santosh is the mentor, not a fifth team member —
the Challenge caps teams at four.

Each person owns one file. **Nobody edits a file they do not own.** That one rule
is what stops four beginners breaking the project in week four.

### Nayan — the parent's side
**Owns `index.html` and `fields.js`**

Builds the screen where a parent adds a child and types their information. Owns
`fields.js`, the list of every field with each one marked as either allowed in a
QR code or not — which is the single idea the whole project rests on, written as
code. Also owns the character limits that stop a parent typing more than a code
can hold, and the test that proves no private field ever reaches a code.
→ [full brief](docs/team/nayan.md)

### Hrithvik — the packing
**Owns `pack.js`**

Takes a child's card and turns it into the shortest possible piece of text, then
has it drawn as a QR code. Empty fields dropped, field names shortened to single
letters, the result squashed. He works the whole problem out in Python first —
which he already knows — and then translates it. He owns the number that answers
"how much actually fits."
→ [full brief](docs/team/hrithvik.md)

### Manvik — the reader
**Owns `v.html`**

Builds the page a coach sees after scanning. Reads the card out of the web
address, shows it with the allergy large and red and the phone numbers tappable,
and owns the Save button that keeps it working with no signal. Also owns expiry.
His page is the one thing in the video that has to work.
→ [full brief](docs/team/manvik.md)

### Kushu — design and the story
**Owns `style.css`**

Makes all of it look right on a phone held by someone in a hurry, outdoors. Owns
the printed sticker, the demo video, and the written submission. Design is one of
three scoring criteria, and judges only ever meet this project through the video —
so this is the only part a judge actually experiences.
→ [full brief](docs/team/kushu.md)

---

## Documents

| File | What it's for |
|---|---|
| [docs/ReadyCard-Pitch.md](docs/ReadyCard-Pitch.md) | Why this is a strong entry — mapped to the judging rubric, with prepared answers to judge questions |
| [docs/ReadyCard-Product-Brief.md](docs/ReadyCard-Product-Brief.md) | The full spec — personas, user journeys, 36 scenarios, constraints, security, FAQ |
| [docs/ReadyCard-Rules-Compliance.md](docs/ReadyCard-Rules-Compliance.md) | What the official 2026 rules actually say, and the five things that change our plan |
| [docs/ReadyCard-Team-Plan.md](docs/ReadyCard-Team-Plan.md) | Who builds what, week by week |
| [docs/team/](docs/team/) | One step-by-step sheet per person, plus a guide for the adult |
| [prototype/](prototype/) | The working prototype, and what it measured |

**Start with the Product Brief.** Read Section 4 and Section 9 before writing any code.

---

## What the prototype already settled

- A **typical card is 267 characters** and lands at QR version 12. A worst case
  with every field filled is 692 and lands at version 15. Both fit a two-inch
  wallet card comfortably.
- **Neither fits a 1.25-inch helmet sticker**, which carries about 312 characters —
  a name, one allergy, one phone number. The brief says one card per child goes in
  every code; the pitch says a sticker holds a name, an allergy and a number.
  Both cannot be true, and that needs deciding.
- **A short web address matters.** `readycard.app/v` is 23 characters and a
  github.io address is 48 — a whole QR version's worth of a child's information.

---

## Timeline

Submission closes **October 26, 2026 at 12:00 pm Eastern** — which is 9 in the
morning in California. **We treat Friday October 23 as the deadline.**

Six weeks. **October 4 is make-or-break** — if a QR isn't generated on one phone
and scanned on another by then, cut scope immediately.

---

## On AI

The Challenge permits AI assistance when it is fully disclosed and is not the
whole of the technical development.

We used an AI assistant to plan the project, to check our understanding of how QR
codes work, and to build the prototype linked above, which we measured against.
**The four students write the app being submitted**, in a separate repository, so
the submitted code contains only their work.

The reason for that separation is not the rules — it is the judging. The rubric
scores how well students explain their own code, and the top mark is for an
explanation that shows real understanding. Nobody earns that on code they pasted.

---

## Status

Week 1 of six. Documents complete. Prototype working. The team's own app starts
week 2.
