export const TRANSITIONS = [
  "Great, moving on;",
  "Based on what you've said,",
  "I see. Let's dig a bit deeper, ",
  "Interesting response;",
  "Got it. Next question,",
];

export const REFLECTIONS: Record<string, string> = {
  "i am": "you are",
  "i": "you",
  "you're": "I am",
  "me": "you",
  "mine": "your",
  "am": "are",
  "yours": "mine",
  "a person is": "they are",
  "are": "am",
  "fixing": "refactoring",
  "my group": "your role in the group",
  "my code": "Your implementation",
  "problem": "technical hurdle",
  "challenge": "technical hurdle",
  "doing": "implementing"
};

export const TECHNICAL_SCRIPTS: Record<string, Record<string, string[]>> = {
  java: {
    ".*\\b([Ss]trings?)\\b.*": [
      "Are strings mutable in Java?",
      "How does the JVM handle memory when you repeatedly modify a String in a loop?"
    ],
    ".*\\b([Dd]oubles?|[Ff]loats?)\\b.*": [
      "Explain in any given case why would you generally choose a Double as opposed to a Float as a data type"
    ],
    ".*\\b([Ii]nt(eger|egers)?|[Dd]ivide|[Dd]ivision)\\b.*": [
      "Lets just say I wanted to solve for the full numerical value of 9 divided by 4, explain the result of representing that value as an Int, and what other methods might work better?"
    ],
    ".*\\b([Qq]ueues?|[Ss]tacks?)\\b.*": [
      "What Data Structure would you implement for a fast food drive through line where we want to minimize the time a customer waits?"
    ],
    ".*\\b([Ll]ifo|[Ff]ilo|[Ss]tacks?)\\b.*": [
      "What does the acronym LIFO or FILO mean to you based on your knowledge of DS and Java?"
    ],
    ".*\\b([Cc]ollect(s|ing|ed|ions?)|[Ss]ets?)\\b.*": [
      "What is the key difference between a collection and a set?"
    ],
    ".*\\b([Ll]oop(s|ing|ed)|[Ii]teration(s|ing|ed))\\b.*": [
      "How many iterations does this loop go through for (int i = 1; i < 10; i++)?"
    ],
    ".*\\b([Cc]ast(s|ing|ed)?|[Ii]nt(eger|egers)?)\\b.*": [
      "Can you cast String '123' into int 123 in Java?"
    ],
    ".*\\b([Ii]nherit(ance|ed|s|ing)?|[Ee]ncapsulat(e|es|ing|ion|ed)?)\\b.*": [
      "Explain what 'extends' keyword is used for."
    ],
    ".*\\b([Cc]lass(es)?|[Oo]bjects?)\\b.*": [
      "Explain what the 'extends' keyword is used for.",
      "Explain the hierarchy of Java Exception classes."
    ],
    ".*\\b([Mm]ethods?|[Ff]unctions?)\\b.*": [
      "Explain what the 'extends' keyword is used for."
    ],
    ".*\\b([Pp]rocess(es|ing|ed)?|[Tt]asks?|[Ii]nstances?)\\b.*": [
      "How does Java handle multithreading?"
    ],
    ".*\\b([Ee]xceptions?|[Cc]ompile(s|ing|d)?|[Dd]ebug(s|ging)?)\\b.*": [
      "What is the difference between Checked Exception and Unchecked Exception?",
      "How does Java execute code compared to Python?"
    ],
    ".*\\b([Jj]oin(s|ing|ed)?|[Cc]oncatenates?)\\b.*": [
      "In Java, what is the difference between using the + operator to concatenate strings in a loop versus using a StringBuilder?",
      "When it is acceptable to use + versus using StringBuilder?"
    ],
    ".*\\b([Rr]ecurs(ions?|ive|e|ively)?|[Ii]ter(ations?|ative))\\b.*": [
      "How does recursion differ from iteration?",
      "What is the base case in recursion and why is it important?",
      "Can you provide an example of a problem that can be solved using recursion?"
    ],
    ".*\\b([Ss]ort(ed|ings?)?|[Aa]lgorithm(s|ic|ically))\\b.*": [
      "Which sort algorithm works best on mostly sorted data?",
      "What is a searching algorithm?",
      "Why Sorting algorithms are important?"
    ],
    ".*\\b(([Ee]n|[Dd]e)?[Cc]rypt(ed|s|ing)?|[Ss]ecur(e|ity|ed)?)\\b.*": [
      "What is a VPN?",
      "Define encryption and decryption?",
      "What is the difference between hashing and encryption?"
    ],
    ".*\\b([Mm]emor(ize|y)?|[Ss]pac(ed|es|ing|[Ss]tor(age|e|ing)?))\\b.*": [
      "What is the difference between storage and memory in a computer?, Differentiate between Physical memory and Virtual Memory."
    ]
  },
  python: {
    ".*\\b([Ss]trings?)\\b.*": [
      "Are strings mutable in Python?",
      "What happens in Python memory-wise when you repeatedly modify a string inside a loop?",
      "Show the two notations in Python that strings can be created using."
    ],
    ".*\\b([Dd]oubles?|[Ff]loats?)\\b.*": [
      "Explain why Python uses float by default for decimal numbers and how it differs from higher-precision numeric types like Decimal.",
      "Python doesn't have a 'Double' type like Java. How does Python handle high-precision floating-point arithmetic differently than an Integer?"
    ],
    ".*\\b([Ii]nt(eger|egers)?|[Dd]ivide|[Dd]ivision)\\b.*": [
      "If you compute 9 divided by 4 in Python, what result do you get, and how does this differ from integer division?"
    ],
    ".*\\b([Qq]ueues?|[Ss]tacks?)\\b.*": [
      "Which Python data structure would you use to model a fast food drive-through line where customers are served in order?"
    ],
    ".*\\b([Ll]ifo|[Ff]ilo|[Ss]tacks?)\\b.*": [
      "What does the acronym LIFO or FILO mean, and how is this behavior represented in Python data structures?"
    ],
    ".*\\b([Cc]ollect(s|ing|ed|ions?)|[Ss]ets?)\\b.*": [
      "What is the key difference between a list and a set in Python?"
    ],
    ".*\\b([Ll]oop(s|ing|ed)|[Ii]teration(s|ing|ed))\\b.*": [
      "How many iterations does this loop execute in Python: for i in range(1, 10)?"
    ],
    ".*\\b([Cc]ast(s|ing|ed)?|[Ii]nt(eger|egers)?)\\b.*": [
      "Can you convert the string '123' into the integer 123 in Python, and how would you do it?"
    ],
    ".*\\b([Ii]nherit(ance|ed|s|ing)?|[Ee]ncapsulat(e|es|ing|ion|ed)?)\\b.*": [
      "Explain how inheritance works in Python and how a subclass extends a parent class."
    ],
    ".*\\b([Cc]lass(es)?|[Oo]bjects?)\\b.*": [
      "Explain how classes and objects work in Python.",
      "How does Python handle exceptions using class hierarchy?"
    ],
    ".*\\b([Mm]ethods?|[Ff]unctions?)\\b.*": [
      "What is the difference between a function and a method in Python?"
    ],
    ".*\\b([Pp]rocess(es|ing|ed)?|[Tt]asks?|[Ii]nstances?)\\b.*": [
      "How does Python handle concurrency using threading and multiprocessing?"
    ],
    ".*\\b([Ee]xceptions?|[Cc]ompile(s|ing|d)?|[Dd]ebug(s|ging)?)\\b.*": [
      "What is the difference between runtime errors and syntax errors in Python?",
      "How does Python execute code compared to a compiled language?"
    ],
    ".*\\b([Jj]oin(s|ing|ed)?|[Cc]oncatenates?)\\b.*": [
      "In Python, what is the difference between concatenating strings with + in a loop versus using str.join()?",
      "When is it appropriate to use + versus join() for strings in Python?",
      "If you need to concatenate 10,000 strings, why is using .join() significantly more efficient than using the + operator?"
    ],
    ".*\\b([Ss]pace(d|s|ing)?|[Ii]ndent(ation)?)\\b.*": [
      "How is spacing and indentation applied differently in Python compared to Java?"
    ],
    ".*\\b([Rr]ecurs(ions?|ive|e|ively)?|[Ii]ter(ations?|ative))\\b.*": [
      "How does recursion differ from iteration in Python?",
      "What is a base case in Python recursion and why is it important?",
      "Can you give an example of a problem well-suited for recursion in Python?"
    ],
    ".*\\b([Ss]ort(ed|ings?)?|[Aa]lgorithm(s|ic|ically))\\b.*": [
      "Which sorting algorithm performs best on mostly sorted data?",
      "What is a searching algorithm in Python?",
      "Why are sorting algorithms important in programming?"
    ],
    ".*\\b(([Ee]n|[Dd]e)?[Cc]rypt(ed|s|ing)?|[Ss]ecur(e|ity|ed)?)\\b.*": [
      "What is a VPN?",
      "Define encryption and decryption.",
      "What is the difference between hashing and encryption?"
    ],
    ".*\\b([Mm]emor(ize|y)?|[Ss]pac(ed|es|ing|[Ss]tor(age|e|ing)?))\\b.*": [
      "What is the difference between storage and memory in a computer?",
      "Differentiate between physical memory and virtual memory."
    ]
  },
  general: {
    ".*\\b([Pp]rojects?)\\b.*": [
      "Could you tell me about a challenge you faced during that or another project and how you resolved it?"
    ]
  }
};

export const EXIT_WORDS = new Set(["exit", "quit", "bye", "goodbye"]);

export function reflect(text: string): string {
  let s = text.toLowerCase();
  const keys = Object.keys(REFLECTIONS).sort((a, b) => b.length - a.length);

  for (const k of keys) {
    const v = REFLECTIONS[k];
    if (/[A-Za-z0-9']/.test(k)) {
      const escapedKey = k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const pattern = new RegExp(`\\b${escapedKey}\\b`, 'g');
      s = s.replace(pattern, v);
    } else {
      s = s.split(k).join(v);
    }
  }
  return s;
}

export interface InterviewState {
  phase: 'intro' | 'name' | 'rating' | 'language' | 'interview' | 'exit';
  name: string;
  comfortRating: number | null;
  language: 'java' | 'python' | null;
  detectedPattern: string | null;
  fallbackType: 'reflection' | 'technical' | null;
}

export const INITIAL_STATE: InterviewState = {
  phase: 'intro',
  name: '',
  comfortRating: null,
  language: null,
  detectedPattern: null,
  fallbackType: null,
};

export interface ProcessResult {
  reply: string;
  nextState: InterviewState;
}

export function getNextStateAndReply(input: string, state: InterviewState): ProcessResult {
  const trimmedInput = input.trim();
  const nextState: InterviewState = { ...state, detectedPattern: null, fallbackType: null };

  if (state.phase === 'intro') {
    nextState.phase = 'name';
    return {
      reply: "Let's start with your first name.",
      nextState,
    };
  }

  if (state.phase === 'name') {
    const name = trimmedInput || "there";
    nextState.name = name;
    nextState.phase = 'rating';
    return {
      reply: `On a scale of 1–10, how would you rate your Git or Socket Programming skills, ${name}?`,
      nextState,
    };
  }

  if (state.phase === 'rating') {
    const match = trimmedInput.match(/\b([1-9]|10)\b/);
    const comfort = match ? parseInt(match[0], 10) : 5;
    nextState.comfortRating = comfort;

    let opener = "No worries.";
    if (comfort >= 8) {
      opener = "Excellent.";
    } else if (comfort >= 5) {
      opener = "Great.";
    } else if (comfort >= 3) {
      opener = "Not bad.";
    }

    nextState.phase = 'language';
    return {
      reply: `${opener} Choose a language to focus on (Java / Python).`,
      nextState,
    };
  }

  if (state.phase === 'language') {
    const match = trimmedInput.toLowerCase().match(/\b(java|python)\b/);
    if (match) {
      const language = match[1] as 'java' | 'python';
      nextState.language = language;
      nextState.phase = 'interview';
      const capitalized = language === 'java' ? 'Java' : 'Python';
      return {
        reply: `Awesome. We'll do ${capitalized}.\n\nNow, ${nextState.name}—tell me briefly about your previous software development experience.`,
        nextState,
      };
    } else {
      // remains in language phase
      return {
        reply: "I only support Java or Python right now.",
        nextState,
      };
    }
  }

  if (state.phase === 'interview') {
    if (!trimmedInput) {
      return {
        reply: "Give me a sentence or two—anything to start with.",
        nextState,
      };
    }

    // Check exit words
    const lowerWords = trimmedInput.toLowerCase().split(/\s+/);
    const hasExitWord = lowerWords.some(w => EXIT_WORDS.has(w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")));
    if (hasExitWord) {
      nextState.phase = 'exit';
      return {
        reply: "Thank you for your time. My assistant will see you out now.",
        nextState,
      };
    }

    // Try pattern matching
    const currentOptions = {
      ...TECHNICAL_SCRIPTS[nextState.language || 'general'],
      ...TECHNICAL_SCRIPTS['general']
    };

    for (const [patternStr, responses] of Object.entries(currentOptions)) {
      const regex = new RegExp(patternStr, 'i');
      if (regex.test(trimmedInput)) {
        const reply = responses[Math.floor(Math.random() * responses.length)];
        nextState.detectedPattern = patternStr;
        return {
          reply,
          nextState,
        };
      }
    }

    // Fallback: 50% reflection, 50% random technical question
    const reflected = reflect(trimmedInput);
    if (Math.random() < 0.50) {
      nextState.fallbackType = 'reflection';
      return {
        reply: `When you say "${reflected}", what part mattered most to you?`,
        nextState,
      };
    } else {
      nextState.fallbackType = 'technical';
      const langScripts = TECHNICAL_SCRIPTS[nextState.language || 'python'];
      const qPool: string[] = [];
      for (const questions of Object.values(langScripts)) {
        qPool.push(...questions);
      }
      const transition = TRANSITIONS[Math.floor(Math.random() * TRANSITIONS.length)];
      const question = qPool[Math.floor(Math.random() * qPool.length)] || "Tell me more about your experience.";
      return {
        reply: `${transition} ${question}`,
        nextState,
      };
    }
  }

  // Fallback if somehow called in exit state
  return {
    reply: "The interview is over. Feel free to restart to try again!",
    nextState,
  };
}
