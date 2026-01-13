export const translations = {
  en: {
    // Onboarding
    welcome: "Welcome!",
    whatIsYourName: "What is your name?",
    chooseTheme: "Choose a Theme",
    chooseLanguage: "Choose Language",
    girl: "Girl",
    boy: "Boy",
    start: "Start My Day",

    // Dashboard
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    
    // Phases
    phase1: "The Arrival",
    phase2: "Organize",
    phase3: "Study Time",
    phaseLocked: "Finish previous step first!",

    // Tasks
    unpack: "Unpack your bag",
    clothes: "Change your clothes",
    lunch: "Eat lunch",
    rest: "Rest for 30 minutes",
    trash: "Trash Patrol",
    homework: "Sort Homework",
    tomorrow: "Homework for Tomorrow?",
    dayafter: "Homework for Day After?",
    study: "Study Session",
    
    // Subjects
    subjects: {
      science: "Natural Sciences",
      social: "Social Sciences"
    },

    // Study Flow
    read: "Read Textbook",
    mindmap: "Make a Mind Map",
    summary: "Make a Summary",
    file: "File it",
    // FunBoard Rewards
    reward_default_title: "Start Your Day!",
    reward_default_desc: "Complete tasks to collect stars.",
    reward_unpack_title: "Bag Empty!",
    reward_unpack_desc: "Great job! No heavy lifting anymore.",
    reward_clothes_title: "Super Suit On!",
    reward_clothes_desc: "You look ready for anything.",
    reward_lunch_title: "Yummy!",
    reward_lunch_desc: "Fuel for the brain!",
    reward_trash_title: "Clean Space!",
    reward_trash_desc: "Happy planet, happy room.",
    reward_rest_title: "Power Nap!",
    reward_rest_desc: "Recharging batteries...",
    reward_org_title: "Organized!",
    reward_org_desc: "Now we know exactly what to do.",
    reward_study_title: "Brain Power!",
    reward_study_desc: "Your brain just got bigger!",
    reward_awesome_title: "Awesome!",
    startNewDay: "Start a New Day",
    allDone: "All Done for Today!",
    yes: "Yes",
    no: "No",
  },
  af: {
    // Onboarding
    welcome: "Welkom!",
    whatIsYourName: "Wat is jou naam?",
    chooseTheme: "Kies 'n Tema",
    chooseLanguage: "Kies Taal",
    girl: "Meisie",
    boy: "Seun",
    start: "Begin My Dag",

    // Dashboard
    goodMorning: "Goeie Môre",
    goodAfternoon: "Goeie Middag",

    // Phases
    phase1: "Die Aankoms",
    phase2: "Organiseer",
    phase3: "Die Studie",
    phaseLocked: "Maak eers klaar!",

    // Tasks
    unpack: "Pak tasse uit",
    clothes: "Trek ander klere aan",
    lunch: "Eet lunch",
    rest: "Rus vir ‘n half uur",
    trash: "Gooi rommel weg",
    homework: "Pak huiswerk in hopies",
    tomorrow: "Huiswerk vir Môre?",
    dayafter: "Huiswerk vir Oormôre?",
    study: "Die Studie",

    // Subjects
    subjects: {
      science: "Natuurwetenskappe",
      social: "Sosiale Wetenskappe"
    },

    // Study Flow
    read: "Lees handboek",
    mindmap: "Maak 'n Mind Map",
    summary: "Maak 'n opsomming",
    file: "Sit dit in die opsommingsler",
    // FunBoard Rewards
    reward_default_title: "Begin Jou Dag!",
    reward_default_desc: "Voltooi take om sterre te versamel.",
    reward_unpack_title: "Tas Leeg!",
    reward_unpack_desc: "Mooi so! Geen swaar dinge meer nie.",
    reward_clothes_title: "Super-Pak Aan!",
    reward_clothes_desc: "Jy lyk gereed vir enigiets.",
    reward_lunch_title: "Daaaam!",
    reward_lunch_desc: "Brandstof vir die brein!",
    reward_trash_title: "Skoon Spasie!",
    reward_trash_desc: "Gelukkige planeet, gelukkige kamer.",
    reward_rest_title: "Krag-Slapie!",
    reward_rest_desc: "Herlaai batterye...",
    reward_org_title: "Georganiseerd!",
    reward_org_desc: "Nou weet ons presies wat om te doen.",
    reward_study_title: "Breinkrag!",
    reward_study_desc: "Jou brein het sopas groter geword!",
    reward_awesome_title: "Ongelooflik!",
    startNewDay: "Begin 'n Nuwe Dag",
    allDone: "Klaar vir Vandag!",
    yes: "Ja",
    no: "Nee",
  }
};

export type TranslationKey = keyof typeof translations.en;
