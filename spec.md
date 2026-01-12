# PRODUCT REQUIREMENT DOCUMENT (PRD)
**Project Name:** My Slimkop Dag / My Smart Day
**Platform:** Web Application (PWA - Progressive Web App)
**Target Audience:** 5-year-old children (Afrikaans & English speakers)
**Version:** 1.0

---

## 1. EXECUTIVE SUMMARY
A gamified, interactive daily checklist application designed to guide 5-year-olds through their after-school routine and study habits. The app runs in a web browser but behaves like a native app (PWA), allowing parents to share the link and "install" it on tablets. It features high-contrast visuals, audio cues, and strict workflow logic to build discipline.

## 2. TECHNICAL STACK
* **Frontend:** React.js (Component-based UI).
* **Styling:** Tailwind CSS (For rapid theming).
* **State/Storage:** `localStorage` (Persists data on the device without a backend database).
* **Hosting:** Vercel / Netlify / GitHub Pages (Shareable URL).
* **Internationalization:** Internal JSON dictionary (Afrikaans/English).

---

## 3. USER EXPERIENCE (UX) & THEMING
The app must support two distinct themes and two languages, selectable upon the first launch.

### A. The Setup Screen (Onboarding)
1.  **Language Selection:** 🇿🇦 Afrikaans vs 🇬🇧 English.
2.  **Theme Selection:**
    * **Theme A (Meisie/Girl):**
        * *Visuals:* Pinks, purples, bamboo textures.
        * *Avatar:* Animated Panda.
    * **Theme B (Seun/Boy):**
        * *Visuals:* Blues, greens, space/jungle textures.
        * *Avatar:* Animated Dinosaur or Rocket.
3.  **User Name:** Input field for the child's name.

### B. The Interface
* **Navigation:** Vertical scrolling "path" or Card Grid.
* **Buttons:** Extra large touch targets (minimum 80px height).
* **Feedback:** * *Success:* Confetti animation + "Ding" sound.
    * *Incomplete:* Greyed out or bouncing animation.

---

## 4. FUNCTIONAL REQUIREMENTS

### Phase 1: Die Aankoms (The Arrival Routine)
*All items are checkboxes. Users must tap to complete.*

1.  **Unpack Bags** (Pak tasse uit).
2.  **Change Clothes** (Trek ander klere aan).
3.  **Eat Lunch** (Eet lunch).
4.  **Rest Time** (Rus vir ‘n half uur).
    * *Feature:* Clicking this triggers a **30-minute countdown timer**.
    * *Audio:* Plays soothing background music while timer is active.
5.  **Trash Patrol** (Gooi rommel weg).

### Phase 2: Organiseer (Organization)
*Unlocks only after Phase 1 is complete.*

1.  **Sort Homework** (Pak huiswerk in hopies).
2.  **Homework Triage:**
    * Input: "Huiswerk vir Môre?" (Tomorrow).
    * Input: "Huiswerk vir Oormôre?" (Day after).
    * *Logic:* System highlights "Tomorrow's" pile as the priority.

### Phase 3: Die Studie (Study Session)
*Two Subject Tracks. User selects one to begin.*

* **Subject A:** Natuurwetenskappe (Natural Sciences) - *Icon: Leaf/Beaker.*
* **Subject B:** Sosiale Wetenskappe (Social Sciences) - *Icon: Globe/Map.*

**Task Flow per Subject:**
1.  Read Textbook (Lees handboek).
2.  Make a Mind Map (Maak 'n Mind Map).
3.  Make a Summary (Maak 'n opsomming).
4.  File it (Sit dit in die opsommingsler).

---

## 5. LOCALIZATION (TRANSLATION MATRIX)
The app must dynamically render text based on the user's selection.

| Key ID | Afrikaans (Default) | English | Icon Ref |
| :--- | :--- | :--- | :--- |
| `unpack` | Pak tasse uit | Unpack your bag | Backpack |
| `clothes` | Trek ander klere aan | Change your clothes