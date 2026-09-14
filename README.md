# ReadyCard

**Congressional App Challenge 2026 — CA-09**

Every week, kids are handed to adults who know nothing about them — often somewhere with no signal. ReadyCard gives those adults what they need in four seconds, with no app, no account, and no internet.

A parent enters their child's important information, turns it into a QR code, and hands that code to a coach, tutor, Scout leader, or host parent. The adult scans it with their normal phone camera and sees a clean emergency card. Nothing to install. Nothing to sign up for.

**There is no server.** Everything lives on the phones of the people using it.

---

## Documents

| File | What it's for |
|---|---|
| [docs/ReadyCard-Pitch.md](docs/ReadyCard-Pitch.md) | Why this is a strong entry — mapped to the official judging rubric, with prepared answers to judge questions |
| [docs/ReadyCard-Product-Brief.md](docs/ReadyCard-Product-Brief.md) | The full build spec — personas, user journeys, 36 scenarios, constraints, security, FAQ |

**Start with the Product Brief.** Read Section 4 and Section 9 before you write any code.

---

## The idea in one table

There is one card per child. The **app** decides what may leave the phone, not the parent.

| | Fields |
|---|---|
| **Travels in the QR code** | Name, allergies and severity, medications and where they're kept, conditions, two emergency contacts, the kid's own notes |
| **Never encoded — phone only** | Date of birth, insurance, doctor, dentist, hospital, medical history, pickup adults, home address, photo |

A QR code is a piece of paper: anyone can read it, anyone can forward it. So we don't try to lock it — we control what's in it. When an ER desk needs the insurance number, the parent shows their screen.

Every code carries an expiry date.

---

## How it works

- **Progressive Web App** — installs to the home screen, works offline, one codebase for iPhone and Android
- **No backend** — hand-written HTML, CSS, and JavaScript. No framework, no build step, no database, no design-tool exports.
- **The QR *is* the data** — encoded in the URL fragment after `#`, which browsers never send to a server
- **No accounts and no PIN** — the phone's own lock screen is the lock
- **No third-party code** — no analytics, no ads, no trackers

**Not claimed:** the QR payload is encoded, not encrypted. ReadyCard is not HIPAA compliant and never says it is.

---

## Team

| Person | Area |
|---|---|
| **Hrithvik** | QR generation — encoding, the 2,000-character limit, PDFs, sticker sheets |
| **Manvik** | The reader — scanned-card page, Save, offline storage, roster mode, expiry |
| **Nayan** | Cards and data — add/edit child, kid's notes, preview, active codes |
| **Kushu** | Design and the story — visual design, sticker design, demo video, submission |
| **Santosh** | Lead — scope, decisions, testing, deadline |

---

## Timeline

Submission deadline: **October 26, 2026**

Six weeks. **Week 3 is make-or-break** — if a QR isn't generated on one phone and scanned on another by Oct 4, cut scope immediately.

**Before submission:** flip this repo to public. The pitch relies on "read the code yourself."

---

## Status

Planning. Documents complete (v2, post Sept 13 session). Code not yet started.
