# ReadyCard — The Pitch
### Why this is a strong Congressional App Challenge entry

**Version 2 — updated after the September 13 strategy session.**

---

## The one-line pitch

**Every week, kids are handed to adults who know nothing about them — often somewhere with no signal. ReadyCard gives those adults what they need in four seconds, with no app, no account, and no internet.**

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

**The places kids get hurt are the places with no signal.** Gym basements. School interiors. Campgrounds. Trailheads. Any answer that requires looking something up online fails precisely when it's needed.

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
| Paper forms | Filled out once, go stale, live in a coach's car for a season | Fresh every time, expires on its own |
| Apple / Google Medical ID | Only works if the kid owns the phone | Works with no phone at all — a printed sticker |
| Group texts to parents | Nobody can find them in an emergency | One scan, four seconds |
| Cloud-based family apps | A company holds your child's health data, and the app is useless with no signal | Nothing ever leaves your phone, and it works in airplane mode |

**The design choice nobody else makes:** the app decides what a QR code is *allowed* to contain.

Most products that share sensitive data build a permission system and hand the decision to the user. We looked at that and concluded a parent standing in a parking lot with a kid in the car will not make a good privacy decision in four seconds — and shouldn't have to.

So there are no sharing levels, no checkboxes, and no tiers. There's a rule, and the app enforces it identically every time:

- **Inside the code:** name, allergies, medications and where they're kept, conditions, two contacts, and the kid's own words.
- **Never inside a code, ever:** date of birth, insurance member number, doctor, hospital, medical history, home address.

When an ER desk genuinely needs the insurance number, the parent unlocks their phone and shows them. A thirty-second conversation with someone standing right there — not an image that lives in a stranger's camera roll forever.

---

## How we score against the official rubric

Judges score three things, 1 to 5 each: **quality of the idea** (creativity and originality), **implementation** (user experience and design), and **demonstrated excellence of coding and programming skills**.

### Criterion 1 — Quality of the idea

The problem is specific and immediately recognizable. Every judge either has kids, had kids, or was one.

The creative part isn't "an app for medical info." It's the answer to a question nobody else asked: **a QR code is a piece of paper — anyone can read it and anyone can forward it — so what are you willing to print on it?**

Everyone else treats that as a problem to be locked. We treated it as a constraint to design around, and it produced the whole product: no accounts, no permissions, no server, and a hard rule about what can leave a phone.

The second creative choice is **designing for a kid without a phone.** That reframed the entire product away from an app and toward a printed QR sticker on a helmet.

### Criterion 2 — Implementation, user experience, and design

Our whole product is built around one rule: **an adult in an emergency should need zero training.**

- The adult in charge installs nothing, signs up for nothing, and logs into nothing. They point their camera at a code.
- Allergies appear at the top, in red, in large text.
- The parent's job takes three taps: pick a kid, pick a date, share.
- Before anything is sent, **Preview** shows the parent the exact page the coach will see. Nobody has to trust us about what's in the code.
- Everything works with no internet.

We also removed things, which is a design decision and we'll say so. The first version of this product had a PIN, three sharing tiers, and an emergency supply kit. Fifteen screens. We cut it to ten, because a phone already has a lock screen, because parents don't tier-pick under pressure, and because four people in six weeks build ten screens well or fifteen screens badly.

### Criterion 3 — Coding and programming skills

Real engineering, and we can demonstrate it visually:

- **Zero-server architecture using URL fragments** — the data rides in the part of a web address browsers are forbidden from transmitting, so our own site never receives a single word of it. We prove it on camera with the network tab open.
- **Offline-first Progressive Web App** — one hand-written codebase running on iPhone and Android with no app store, no framework, and no build step.
- **QR encoding and decoding entirely on-device**, including compressing a full medical card into the ~2,000 characters a QR code can hold.
- **Self-expiring records** in local browser storage.
- **No frameworks, no third-party tracking, no dependencies we didn't need.** We can explain every line.

---

## The demo that proves it

Judges watch a video, not our source code. So we prove the engineering with something they can see:

1. Hold up a **printed QR sticker.**
2. Hand a phone to someone who has never seen the app.
3. Put that phone in **airplane mode.**
4. They scan the sticker.
5. A clean, readable emergency card appears on screen.

No internet. No account. No install. That's twenty seconds of video that makes the engineering visible to someone who doesn't code.

**This is the centerpiece. Everything else in the video is setup for it.**

---

## Why a Member of Congress can point at this

- It works in every district in the country, not just ours
- It costs nothing to run — no servers, no subscriptions, no fees, no ads
- It helps families who can't afford a paid service
- It helps families who don't speak English well, who can fill in the card carefully at home instead of struggling with a paper form at check-in
- It works in rural districts and dead zones, where connected apps don't
- It's open source, so any community can use it or improve it
- It protects children's privacy by design, not by promise

---

## What we're honest about

We think saying this out loud makes us stronger, not weaker. A judge who finds a weakness we hid marks us down. A judge who hears us name it first marks us up.

**A QR code is readable by anyone.** Ours is encoded, not encrypted, and anyone can decode it in about ten seconds. That's true of every QR code and it has to be — the whole promise is that a coach reads it with nothing but a camera, and a password would defeat that. We don't lock the code. We control what's in it.

**We can't take a code back.** Once we hand someone a QR code, we can't reach into their phone and delete it. Expiry stops the everyday case — a coach whose phone still has last season's roster. It does not stop someone deliberately keeping the data. **We prevent accidents, not attacks**, and we say it that way.

**The parent has to resend when information changes.** There's no server, so there's no automatic sync. We think that trade is worth it: no server means no data breach is even possible.

**The first scan needs a connection.** The blank page has to download once. After the coach taps Save, that phone works forever without a signal.

**We are not HIPAA compliant, and we don't claim to be.** HIPAA covers doctors, hospitals, and insurers, not a tool a family runs on its own phone. Anyone who says ReadyCard is HIPAA compliant is wrong and is handing a judge a reason to doubt everything else we said. What we did instead was data minimization — decide what may never leave the device, and enforce it in code.

---

## Questions judges will ask, and our answers

**"Doesn't Apple already do this?"**
Apple's Medical ID only works on the phone you own. Most kids under 13 don't have one, and the ones who do leave it in a backpack. Our answer is a QR sticker on a helmet. No phone required.

**"Isn't the QR code just readable by anyone?"**
Yes. Every QR code is. That's why we spent our design time deciding what goes in one. A name, an allergy, and a phone number — less than a school ID badge. A date of birth and an insurance number are never in a code at all, so forwarding one gets you nothing worth having.

**"Where is the data stored?"**
Nowhere but the phones of the people who need it. There's no server, no database, and no account. We prove it in the demo by showing the browser's network activity — nothing containing a child's name ever leaves the device.

**"How does a QR made in California get read in New York?"**
The QR code *is* the data, not a link to a database. The coach's browser downloads a blank page from us, then fills it in using what the QR gave it. Distance doesn't matter because nothing is being looked up.

**"Why is there no password on the parent's app?"**
The phone already has one. A second lock behind the first one doesn't add security — it adds a screen to build, a lockout to manage, and a way for a parent to permanently lose their own data with no way to recover it. We'd rather spend those hours on the part that matters.

**"What happens when the information changes?"**
The parent updates the card and resends. The app keeps a private list on the parent's phone of who holds an active code, and can regenerate all of them at once.

**"What if the adult forgets to save the card?"**
Then it's gone when the signal is. It's the most likely way our app fails a real family, so the Save button is the largest thing on the page after the allergies, and the page asks again if you try to leave without it.

**"Would people actually use this?"**
We tested it at a real event with real families before we submitted. *(Team: this answer only works if we actually do it. Week 6, and it has to happen by Oct 22.)*

---

## What we want the judges to remember

Most teams handling sensitive data reach for a cloud database, because it's the easy path and it's what every tutorial shows.

We had health information about children and a requirement that it work in a gym basement with no signal. We decided the safest database is **no database at all** — then did the harder engineering to make that actually function, and drew a line in code around what our own app is not permitted to share.

That's the project.
