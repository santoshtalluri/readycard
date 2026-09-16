# ReadyCard — who does what, and what to actually do

Written September 15, 2026. Six weeks left. Four builders who know some Python
and no web.

This does not replace Section 12 of the Product Brief — it makes it usable.
The areas are almost the same. What changes is what one of them means, and what
each person does on a given Tuesday.

---

## 1. The one change to make

The Brief gives Hrithvik "QR generation — encoding, the 2,000-character limit."
Half of that job no longer exists and the other half is too hard.

**The measuring is done.** The prototype answered it: a typical card is 267
characters and lands at QR version 12, a worst case is 692 and lands at version
15, and both fit a two-inch card. Nobody needs to rediscover that.

**Writing a QR encoder is not a beginner project.** The one in `prototype/qr.js`
is Reed–Solomon error correction over a Galois field, eight mask patterns, and a
160-row block table. It is roughly 600 lines and it had two real bugs that only
a test suite caught. A twelve-year-old who has never written JavaScript is not
writing that in six weeks, and pretending otherwise burns the schedule.

**So use a QR library and own the part around it.** The rules allow open-source
libraries as long as they are documented. The interesting work — and the good
video — is not drawing the squares. It is deciding what goes in and squeezing it
down.

Hrithvik's job becomes **the packing**: turning a child's card into the shortest
string that will fit, and handing that to a library to draw. That is a real
engineering job with a real number attached, and he can explain it on camera.

---

## 2. Who owns which file

Four beginners sharing files in git is how a project dies in Week 4. So the rule
is one owner per file, and nobody edits a file they do not own.

| Person | Owns | In one sentence |
|---|---|---|
| **Nayan** | `index.html` | The parent's side: the list of children, adding one, the form. |
| **Hrithvik** | `pack.js` | Turn a card into the shortest string that fits, and draw the code. |
| **Manvik** | `view.html` | What a scanned code opens: the card, Save, expiry. |
| **Kushu** | `style.css` | How all of it looks, on a phone, and on paper. |

Shared, and changed only when all four agree in the same room: `fields.js`, the
list of what a card contains and which fields may be encoded. See section 3.

**Git rules, and there are only three.** Pull before you start. Commit when you
stop. Never edit someone else's file — ask them to.

---

## 3. The one thing to agree on before anyone writes code

Everything connects through a single object. Agree its shape on Sunday and write
it on paper, because three people build against it.

```
{
  first, last,
  allergy, meds, cond,
  c1name, c1phone, c2name, c2phone,
  kidnote,
  expiry
}
```

Nayan produces it. Hrithvik packs it. Manvik unpacks and displays it.

`fields.js` holds that list, and each field is marked as either travelling in the
QR code or staying on the phone. **That file is Section 4 of the Brief, written
as code.** Nothing else in the app gets to decide what may be encoded, and the
form builds itself from the list — so a field cannot be added to the app without
somebody deciding which bucket it is in.

---

## 4. Week 1 — nobody touches the app

Sep 15–20. The temptation is to start building. Do not. Four people who have not
written HTML cannot build an app; they can each learn the one thing their own job
needs, which is a much smaller ask.

**Everyone, about two hours:** any beginner HTML and CSS walkthrough — MDN's
"Getting started with the web" or freeCodeCamp's responsive design track. Enough
to know what a tag is, what a stylesheet does, and how to open a file in a browser.

Then one exercise each, chosen so it is a miniature of the real job. Note that
three of these start in Python, which they already know — the point is to think
the problem through in a familiar language before fighting an unfamiliar one.

**Hrithvik — make something small.**
In Python, write a function that takes a dictionary of a child's information and
returns the shortest string you can manage. Try it three ways: full key names,
one-letter keys, and one-letter keys with empty fields dropped. Then run the
result through `zlib.compress` and print the length each time. Bring four numbers
to Sunday. *You have just done the core of your job, in a language you know.*

**Manvik — make something read the address bar.**
One HTML file with a bit of JavaScript that puts `location.hash` on the page.
Open it, type `#hello` on the end of the address, reload. Then add a button that
saves what you type into `localStorage` and still shows it after a refresh.
*That is the whole mechanism of your area, in about fifteen lines.*

**Nayan — make a form build itself.**
One HTML file with three text boxes and a button that prints an object to the
console. Then the harder version: start from a list of three field names in
JavaScript and write a loop that creates the boxes. *When that loop works, the
Section 4 rule becomes easy — you add one flag to each item in the list.*

**Kushu — paper first, then one screen.**
Sketch all the screens on paper. Pick two fonts and four colours and write the
hex codes down. Then rebuild exactly one of your sketches as an HTML file with a
stylesheet and no JavaScript at all. *Design is 5 of the 30 points and forms-based
apps lose there by default.*

**Also in Week 1, and it is not optional:** confirm all four are middle or high
school students, that at least two live or attend school in CA-09, and that
nobody is on another team this year. Register one person so somebody can read the
official Submission Checklist, which is only visible inside the portal.
See `ReadyCard-Rules-Compliance.md`.

---

## 5. Weeks 2 to 6

Roughly four hours a week each. If a week slips, cut scope that week — do not
borrow from the next one.

### Week 2 — Sep 21–27: each person's piece, alone and ugly

- **Nayan** — a page that lists children and adds one, saved in `localStorage`.
  No styling. No QR.
- **Hrithvik** — get a QR library drawing a code from a hard-coded string, on a
  page, in a browser. Then feed it his packed string from Week 1.
- **Manvik** — a page that reads a hard-coded fragment and shows a card. Nayan
  can hand him a sample string to test with.
- **Kushu** — the card as a design: what a coach sees, with allergies large and
  red at the top. Still a static file.

**Sunday checkpoint:** four separate things that each half-work. Nothing is
connected. That is correct.

### Week 3 — Sep 28–Oct 4: connect it. This is the week that matters.

Hrithvik and Nayan join their two halves: fill in a child, get a real QR. Manvik
points his page at a real generated fragment.

**Hard checkpoint, Oct 4: a code generated on one phone and scanned on another.**
Ugly is fine. If this has not happened, stop adding anything and fix only this.

Kushu starts the sticker design and books the real-world test for Week 6 — a
troop meeting, a practice, a class. Booking it now is the only way it happens.

### Week 4 — Oct 5–11: the parts that make it real

- **Manvik** — the Save button and offline. This is the demo.
- **Hrithvik** — expiry into the payload, and the capacity meter so a parent
  cannot type more than fits.
- **Nayan** — the Section 4 rule enforced from `fields.js`, and the preview screen.
- **Kushu** — the full visual pass, and **the video script**.

**Write the video script in Week 4, not Week 6.** It decides what has to exist.

### Week 5 — Oct 12–18: freeze, then polish

No new features after Wednesday. Test on a real phone, in a real gym, with the
wifi off. Kushu records first takes. Everyone drafts their answer to "what was
the hardest technical problem you solved."

### Week 6 — Oct 19–23: test, record, submit

Real-world test early in the week. Fix only what breaks. Record. Write the
submission. Flip the repo to public. **Submit by Friday Oct 23** — the real
deadline is noon Eastern on the 26th, which is 9am here, and you do not want to
discover that on the morning.

---

## 6. The Sunday teach-back — the highest-value habit here

Every Sunday, each person gets **two minutes** to explain what they built to the
other three. Screen shared. Recorded on a phone.

This is not a status meeting. It is video rehearsal, and it is aimed at one
specific thing: the judging rubric scores an explanation of the code, and the top
mark reads *"explanation of code indicates immense understanding."* Judges score
that from the video. A person who has explained their own code out loud six times
does it well on the seventh; a person who has never said it out loud does not.

By Week 6 there are six recordings of each person and the video mostly writes
itself. It also surfaces the person who has quietly not started, in Week 2 rather
than Week 5.

---

## 7. Cut this, in this order

Ten screens is not achievable for four beginners in six weeks. Five is. When time
runs short — and it will — drop from the bottom:

1. Roster mode
2. The printable sticker sheet — use the browser's own print, it is one stylesheet
3. The active-codes list and resend-all
4. PDF wallet cards
5. Multiple children — one child still demonstrates everything

**Never cut:** the Save button, offline, the Section 4 rule, and the kid's own
note. The first three are the whole engineering argument. The last one costs a
single text box and is the most human thing in the app.

---

## 8. Using the prototype

`prototype/` is a working version of all of this. It exists to be read, measured
against, and argued with.

**Do not copy code out of it.** Not because of the rules — AI assistance is
allowed when disclosed — but because of the judging. Nobody can explain code they
pasted, and that explanation is worth 5 of 30 points. Read it, work out why it
does what it does, close it, write your own.

The numbers in it are yours to keep. So is `check-section4.js`, which proves no
phone-only field ever reaches a QR code, and which is the test Section 14 of the
Brief asks for.
