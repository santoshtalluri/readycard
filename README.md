# ReadyCard

**Congressional App Challenge 2026 — CA-09**

Every week, kids are handed to adults who know nothing about them. ReadyCard gives kids a voice in that moment, and gives parents control over exactly how much is shared.

A parent enters their child's important information, turns it into a QR code, and hands that code to a coach, tutor, Scout leader, or host parent. The adult scans it with their normal phone camera and sees a clean emergency card. Nothing to install. Nothing to sign up for.

**There is no server.** Everything lives on the phones of the people using it.

---

## Documents

| File | What it's for |
|---|---|
| [docs/ReadyCard-Pitch.md](docs/ReadyCard-Pitch.md) | Why this is a strong entry — mapped to the official judging rubric, with prepared answers to judge questions |
| [docs/ReadyCard-Product-Brief.md](docs/ReadyCard-Product-Brief.md) | The full build spec — personas, sharing levels, user journeys, 40 scenarios, constraints, security, FAQ |

**Start with the Product Brief.** Section 9, "What we are NOT building," matters more than the feature list.

---

## The idea in one table

| Level | What it shows | Who it's for |
|---|---|---|
| **Sticker** | First name, photo, allergies, one phone number | Helmet, backpack tag, wristband |
| **Event** | Full name, allergies, medications, conditions, two contacts, the kid's own notes | Coach, tutor, host parent, Scout leader |
| **Full** | Everything — doctor, dentist, insurance, pickup adults | Grandparents, emergency room, shelter check-in |

Every code carries an expiry date. The parent picks the level and the date.

---

## How it works

- **Progressive Web App** — installs to the home screen, works offline, one codebase for iPhone and Android
- **No backend** — plain HTML, CSS, and JavaScript. No framework, no build step, no database.
- **The QR *is* the data** — encoded in the URL fragment after `#`, which browsers never send to a server
- **AES-256 encryption** via the Web Crypto API, key derived from the parent's PIN
- **No third-party code** — no analytics, no ads, no trackers

---

## Team

Four students. Four areas.

| Area | Owns |
|---|---|
| Cards and security | Add/edit child, PIN, encryption, local storage |
| QR generation | Levels, expiry, code generation, printable stickers |
| The reader | Scanned-card page, roster mode, offline support |
| Kit and design | Emergency kit checklist, GO screen, visual design |

---

## Timeline

Submission deadline: **October 26, 2026**

Week 3 is the make-or-break week — if a QR isn't generated and scanned end to end by then, cut scope immediately.

---

## Status

Planning. Documents complete, code not yet started.
