# ReadyCard — The Pitch
### Why this is a strong Congressional App Challenge entry

---

## The one-line pitch

**Every week, kids are handed to adults who know nothing about them. ReadyCard gives kids a voice in that moment — and gives their parents control over exactly how much is shared.**

---

## The moment we built this for

A kid goes down at soccer practice. He's dizzy and can't answer questions clearly.

The coach kneels down and asks the other kids: *"Does anybody know if he's allergic to anything?"*

Nobody answers.

His mom is 20 minutes away. The paper form the coach filled out in August is somewhere in his car, and the phone number on it is the old one.

That silence is the problem. ReadyCard fills it in four seconds.

---

## Why this problem is worth solving

**It happens constantly.** Coaches, tutors, Scout leaders, carpool drivers, host parents, babysitters, grandparents. Most kids are in the care of a non-parent adult several times a week.

**The information never travels with the kid.** It sits on paper forms, in old text messages, or in a parent's memory. None of those show up when something goes wrong.

**Kids usually don't have phones.** Apple and Google both built emergency medical features — but they only work if you own the device. That leaves out exactly the people who need them most: children.

**Parents are stuck with all-or-nothing.** A soccer coach needs to know about asthma. He does not need a kid's address, birthday, or insurance number. Today there's no in-between.

---

## Why we built it only for kids, not everyone

This is a deliberate scoping decision, and it's part of why the product is sharp instead of vague.

**Adults can speak for themselves.** An adult in trouble can say "I'm allergic to penicillin." They carry a wallet, an ID, and a phone with medical info. A nine-year-old often can't recall their own medication when they're frightened.

**Kids are handed off constantly. Adults aren't.** That handoff is the exact moment information gets lost.

**Kids don't own the devices.** Any solution built around "the person's phone" structurally excludes children.

So ReadyCard is for anyone 18 and under, and a parent or guardian is always in control.

---

## What makes it different from everything else

| What exists today | Why it falls short | What ReadyCard does |
|---|---|---|
| Paper forms | Fill out once, go stale, live in a coach's car for a season | Fresh every time, expires on its own |
| Apple / Google Medical ID | Only works if the kid owns the phone | Works with no phone at all — a printed sticker |
| Group texts to parents | Nobody can find them in an emergency | One scan, four seconds |
| Cloud-based family apps | A company holds your child's health data | Nothing ever leaves your phone |

**The design choice nobody else makes:** three fixed sharing levels. A helmet sticker shows four things. A coach sees what he needs for the season. Only the emergency room sees everything.

---

## How we score against the official rubric

Judges score three things, 1 to 5 each: **quality of the idea** (creativity and originality), **implementation** (user experience and design), and **demonstrated excellence of coding and programming skills**.

### Criterion 1 — Quality of the idea

The problem is specific and immediately recognizable. Every judge either has kids, had kids, or was one.

The creative part isn't "an app for medical info." It's **the three-level sharing model**. We asked a question nobody else asked: *how do you share enough to help, without sharing everything?* That's the original idea, and it's the thing to emphasize.

The second creative choice is **designing for a kid without a phone.** That reframed the entire product away from an app and toward a printed QR sticker on a helmet.

### Criterion 2 — Implementation, user experience, and design

Our whole product is built around one rule: **an adult in an emergency should need zero training.**

- The adult in charge installs nothing, signs up for nothing, and logs into nothing. They point their camera at a code.
- Allergies appear at the top, in red, in large text.
- The parent's job takes three taps: pick a kid, pick a level, pick a date.
- Everything works with no internet.

### Criterion 3 — Coding and programming skills

Real engineering, and we can demonstrate it visually:

- **Offline-first Progressive Web App** — one codebase runs on iPhone and Android with no app store
- **AES-256 encryption** using the browser's Web Crypto API, with the key derived from a parent's PIN
- **QR encoding and decoding** done entirely on-device
- **Zero-server architecture** using URL fragments — data never reaches any web server
- **Self-expiring records** in local browser storage
- **No frameworks, no libraries we didn't need, no third-party tracking.** We can explain every line.

---

## The demo that proves it

Judges watch a video, not our source code. So we prove the engineering with something they can see:

1. Hold up a **printed QR sticker.**
2. Hand a phone to someone who has never seen the app.
3. Put that phone in **airplane mode.**
4. They scan the sticker.
5. A clean, readable emergency card appears on screen.

No internet. No account. No install. That's twenty seconds of video that makes the engineering visible to someone who doesn't code.

---

## Why a Member of Congress can point at this

- It works in every district in the country, not just ours
- It costs nothing to run — no servers, no subscriptions, no fees
- It helps families who can't afford a paid service
- It helps families who don't speak English well, who can fill in the card carefully at home instead of struggling with a paper form at check-in
- It's open source, so any community can use it or improve it
- It protects children's privacy by design, not by promise

---

## What we're honest about

We think saying this out loud makes us stronger, not weaker.

**We can't take a code back.** Once we hand someone a QR code, we can't reach into their phone and delete it. Expiry stops the everyday case — a coach whose phone still has last season's roster. It does not stop someone deliberately trying to keep the data. We chose to prevent accidents, not attacks.

**The parent has to resend when information changes.** There's no server, so there's no automatic sync. We think that trade is worth it: no server means no data breach is even possible.

**We are not HIPAA compliant, and we don't claim to be.** HIPAA covers doctors, hospitals, and insurers. We're none of those. What we did instead was follow NIST encryption standards and the principle of data minimization.

---

## Questions judges will ask, and our answers

**"Doesn't Apple already do this?"**
Apple's Medical ID only works on the phone you own. Most kids under 13 don't have one, and the ones who do leave it in a backpack. Our answer is a QR sticker on a helmet. No phone required.

**"What if someone scans a kid's sticker who shouldn't?"**
The sticker level holds four things: a first name, a photo, an allergy, and one phone number. That's less than what's printed on a school ID badge. Everything sensitive requires a code the parent sent directly.

**"Where is the data stored?"**
Nowhere but the phones of the people who need it. There's no server, no database, and no account. We can prove it during the demo by showing the browser's network activity — nothing containing a child's name ever leaves the device.

**"How does a QR made in California get read in New York?"**
The QR code *is* the data, not a link to a database. The coach's browser downloads a blank page from us, then fills it in using what the QR gave it. Distance doesn't matter because nothing is being looked up.

**"What happens when the information changes?"**
The parent updates the card and sends a new code. The app keeps a private list on the parent's phone of who has an active code, so it can remind them who to resend to.

**"Would people actually use this?"**
We tested it at a real event with real families before we submitted. *(Team: this answer only works if we actually do it. Week 6.)*

---

## What we want the judges to remember

Most teams that handle sensitive data reach for a cloud database because it's the easy path.

We had health information about children. We decided the safest database is **no database at all** — and then we did the harder engineering work to make that actually function.

That's the project.
