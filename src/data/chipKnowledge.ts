/* ------------------------------------------------------------------ *
 * CHIP knowledge base
 * ------------------------------------------------------------------
 * CHIP began life as Kaspian's Python ELIZA-style technical-interview bot.
 * Here it's re-tuned as a Rogerian-flavored "ask me about Kaspian" guide:
 * ranked keyword rules, each with a decomposition (regex) and a set of
 * reassemblies (responses) chosen at random / cycled — exactly the data
 * model Weizenbaum described, ported to the site.
 *
 * CHIP narrates *about* Kaspian to whoever is visiting (usually a recruiter).
 * Higher `rank` wins when multiple rules match; ties fall to definition order.
 * ------------------------------------------------------------------ */

export type ChipRule = {
  id: string
  rank: number
  patterns: RegExp[]
  responses: string[]
}

/** Opening lines — kaspiBOT's `getInitial()`. */
export const chipInitials = [
  "Hi — I'm kaspiBOT, Kaspian's pattern-matching sidekick. Ask me anything about him: school, projects, soccer, what he's chasing next.",
  "Hey there. kaspiBOT here, built on Kaspian's ELIZA-style CHIP project. Ask me about him — where should we start?",
  "Welcome. I'm kaspiBOT — Kaspian's hand-coded guide. Go ahead and ask about his background, work, or projects.",
]

/** Sign-offs — CHIP's `getFinal()`. */
export const chipFinals = [
  'Thanks for stopping by. If you want the human version, hit the “Get in touch” button up top.',
  "Catch you later. Kaspian's contact links are in the footer whenever you're ready.",
  'Take care! Come back anytime you have more questions about Kaspian.',
]

/** Inputs that end the conversation. */
export const chipQuits = ['bye', 'goodbye', 'see ya', 'see you', 'later', 'quit', 'exit']

/** Quick-reply chips shown in the UI to make CHIP discoverable. */
export const chipSuggestions = [
  'Who is Kaspian?',
  'Tell me about his projects',
  'What does he study?',
  'What are his career goals?',
  'Does he play sports?',
  'How can I contact him?',
]

/**
 * Reflections for the echo-style fallback — swaps a visitor's phrasing
 * back at them, the same trick the original ELIZA used.
 */
export const chipReflections: Record<string, string> = {
  'i am': 'you are',
  'i was': 'you were',
  "i'm": 'you are',
  'i': 'you',
  'my': 'your',
  'me': 'you',
  'mine': 'yours',
  'you are': 'I am',
  "you're": 'I am',
  'your': 'my',
  'yours': 'mine',
  'you': 'I',
}

export const chipRules: ChipRule[] = [
  /* ---------- conversational glue ---------- */
  {
    id: 'greeting',
    rank: 50,
    patterns: [/\b(hi|hii+|hey+|hello+|yo|howdy|sup|hiya|good (morning|afternoon|evening))\b/i],
    responses: [
      'Hey! Ask me about Kaspian — his studies, his projects, his soccer, whatever you’re curious about.',
      'Hi there. What would you like to know about Kaspian?',
      'Hello! I can tell you about Kaspian’s background, projects, and goals. Pick a thread.',
    ],
  },
  {
    id: 'how-are-you',
    rank: 48,
    patterns: [/\bhow (are|r) (you|u)\b/i, /\bhow's it going\b/i, /\bhow are things\b/i],
    responses: [
      'Running smoothly — I’m just regex and good intentions. More importantly, what do you want to know about Kaspian?',
      'Can’t complain, I’m a chatbot. But I’d love to talk about Kaspian — fire away.',
    ],
  },
  {
    id: 'thanks',
    rank: 48,
    patterns: [/\b(thank|thanks|thx|ty|appreciate|cheers)\b/i],
    responses: [
      'Anytime! Anything else you’d like to know about Kaspian?',
      'Happy to help. Ask me more whenever you like.',
    ],
  },
  {
    id: 'help',
    rank: 47,
    patterns: [/\b(help|what can (i|you)|what do you (do|know)|topics|options|menu)\b/i],
    responses: [
      'Try me on: his school & major, his GPA & honors, where he’s from, his projects (F1, UNO, BioBERT, CHIP), his soccer, his hobbies, his career goals, or how to contact him.',
      'I know Kaspian’s background, education, work, soccer, hobbies, all four of his projects, and his goals. What sounds interesting?',
    ],
  },
  {
    id: 'who-are-you-bot',
    rank: 46,
    patterns: [/\b(who are you|what are you|are you (a )?(bot|ai|human|real)|your name)\b/i],
    responses: [
      'I’m kaspiBOT — a chatbot Kaspian built. I started life as CHIP, his ELIZA-inspired technical-interview bot in Python, and got re-purposed to tell visitors about him. Ask away.',
      'kaspiBOT, at your service. Under the hood I’m Kaspian’s CHIP project (ask about “CHIP” for that story), now working as his portfolio guide.',
    ],
  },

  /* ---------- identity ---------- */
  {
    id: 'name',
    rank: 40,
    patterns: [/\b(his|the) name\b/i, /\bwho is (he|kaspian|this)\b/i, /\bintroduce\b/i, /\babout (him|kaspian|yourself)\b/i, /\bwho('?s| is) kaspian\b/i],
    responses: [
      'His name is Kaspian Thomas — a 20-year-old Computer Science student at the University of New Orleans, concentrating in AI & Machine Learning. Soccer player, builder, and aspiring AI engineer.',
      'Kaspian Thomas: 20, a CS major (AI/ML concentration) at the University of New Orleans, semi-pro soccer player, and someone who builds AI projects for fun. Want the deep dive on any of that?',
    ],
  },
  {
    id: 'age',
    rank: 42,
    patterns: [/\b(how old|his age|age|years old|born)\b/i],
    responses: [
      'Kaspian is 20 years old.',
      'He’s 20 — and graduating in 2027, if you’re doing the timeline math.',
    ],
  },

  /* ---------- education ---------- */
  {
    id: 'school',
    rank: 42,
    patterns: [/\b(school|college|university|study|studies|studying|major|degree|education|academ|enrolled|concentration)\b/i],
    responses: [
      'Kaspian is pursuing a B.S. in Computer Science at the University of New Orleans, with a concentration in Artificial Intelligence and Machine Learning.',
      'He studies Computer Science (AI/ML concentration) at the University of New Orleans — on track to graduate May 2027.',
    ],
  },
  {
    id: 'graduation',
    rank: 44,
    patterns: [/\b(graduat|grad date|finish|class of|when.*(done|out)|2027)\b/i],
    responses: [
      'He’s part of the Spring (May) 2027 graduating class.',
      'Kaspian expects to graduate in May 2027.',
    ],
  },
  {
    id: 'gpa',
    rank: 44,
    patterns: [/\b(gpa|grades|grade point|academic record|how.*(doing|grades))\b/i],
    responses: [
      'His current GPA is 3.8/4.0 — and he made the President’s List in both Fall 2026 and Spring 2027.',
      'Kaspian holds a 3.8/4.0 GPA, with back-to-back President’s List honors (Fall 2026 and Spring 2027).',
    ],
  },
  {
    id: 'awards',
    rank: 44,
    patterns: [/\b(award|honor|achievement|accolad|president'?s list|dean'?s list|recognition|accomplish)\b/i],
    responses: [
      'Kaspian earned President’s List honors at the University of New Orleans in both Fall 2026 and Spring 2027, holds a 3.8 GPA, and earned his associate degree in CS on a soccer scholarship.',
      'Highlights: President’s List (Fall 2026 & Spring 2027), a 3.8/4.0 GPA, and a soccer scholarship that funded his associate degree in Computer Science.',
    ],
  },

  /* ---------- origin ---------- */
  {
    id: 'hometown',
    rank: 42,
    patterns: [/\b(where.*(from|live|based|located)|hometown|grew up|origin|mississippi|new orleans|nola|location|live)\b/i],
    responses: [
      'Kaspian is originally from about an hour southeast of New Orleans. He spent time in Mississippi — earning his associate degree in CS there on a soccer scholarship — before settling in New Orleans, where he’s based now.',
      'He grew up about an hour southeast of New Orleans, did a stint in Mississippi (associate degree in CS on a soccer scholarship), and now calls New Orleans home. Go Lions!',
    ],
  },

  /* ---------- work / experience ---------- */
  {
    id: 'coaching',
    rank: 46,
    patterns: [/\b(coach|coaching|leadership|lead a team|manage|mentor)\b/i],
    responses: [
      'Kaspian worked as a head soccer coach for a youth competitive team in New Orleans, leading a group of 15–18-year-old young men. It’s where a lot of his leadership and communication chops come from.',
      'He led a competitive youth soccer team (ages 15–18) in NOLA as head coach — real leadership reps, on and off the field.',
    ],
  },
  {
    id: 'experience',
    rank: 41,
    patterns: [/\b(experience|work|works|worked|job|jobs|employ|intern|internship|career history|professional|resume|cv)\b/i],
    responses: [
      'Right now Kaspian builds his experience through research and hackathons in his free time, plus collaborative projects with peers whenever the chance comes up. He’s currently unemployed and open to opportunities. Previously he was head coach of a youth competitive soccer team in New Orleans.',
      'He’s currently between roles and actively looking. He sharpens his skills through research, hackathons, and team projects, and he previously coached a competitive youth soccer team (ages 15–18). Loves collaborating — ask about his projects to see the output.',
    ],
  },
  {
    id: 'hackathon',
    rank: 45,
    patterns: [/\b(hackathon|hack|competition|compete)\b/i],
    responses: [
      'Kaspian has competed in one hackathon so far and is always hunting for the next one — they’re a big part of how he learns by building under pressure.',
      'He’s done one hackathon to date and treats them (along with research) as his main way of gaining hands-on experience right now.',
    ],
  },
  {
    id: 'research',
    rank: 45,
    patterns: [/\b(research|study area|investigat|paper|academic work)\b/i],
    responses: [
      'Kaspian does research on the side in his free time — it’s one of his main avenues for growth right now, alongside hackathons and personal projects.',
      'Research is one of the ways he keeps leveling up outside of class, especially around AI behavior and model performance.',
    ],
  },

  /* ---------- soccer ---------- */
  {
    id: 'soccer',
    rank: 45,
    patterns: [/\b(soccer|football|semi[- ]?pro|lions|scholarship|fourth division|4th division|athlet)\b/i],
    responses: [
      'Soccer is a huge part of who Kaspian is. He currently plays at the semi-pro (fourth-division) level of US soccer in his hometown, earned his associate degree on a soccer scholarship, and coached a competitive youth team. Go Lions!',
      'He plays semi-pro (fourth division) US soccer back home, and soccer also funded his associate degree via a scholarship. On and off the pitch, he’s all about taking every chance to improve.',
    ],
  },

  /* ---------- hobbies ---------- */
  {
    id: 'hobbies',
    rank: 43,
    patterns: [/\b(hobby|hobbies|free time|fun|interests|outside.*(work|school)|pickleball|tennis|dog|walk|spare time|enjoy)\b/i],
    responses: [
      'Outside of code, Kaspian likes to stay active — soccer, pickleball, and tennis are favorites. He also loves walks with his dog and exploring new spots around New Orleans.',
      'He’s happiest moving: pickleball, tennis, and soccer, plus dog walks and discovering new corners of the city he lives in.',
    ],
  },

  /* ---------- goals / interests ---------- */
  {
    id: 'career-goals',
    rank: 44,
    patterns: [/\b(goal|goals|career|future|aspir|dream|want to (be|do|become)|ambition|where.*see|next step|looking for)\b/i],
    responses: [
      'Kaspian’s ultimate goal is to work as an AI engineer and make as big an impact as he can — through his work and in the world. He’d feel blessed to see what he builds benefit future generations of learners.',
      'He wants to be an AI engineer who builds things that matter. Long-term, he hopes his work helps future generations of learners — impact is the north star.',
    ],
  },
  {
    id: 'why-ai',
    rank: 43,
    patterns: [/\b(why ai|passion|interested in|interest in|love|like.*(ai|ml|machine)|agent|automation|why.*(machine|ml))\b/i],
    responses: [
      'Kaspian is fascinated by AI as a whole — especially the automation of agents and the analysis of *why* a model performs deceptively or poorly to the human eye. Understanding failure modes is what hooks him.',
      'His draw to AI is twofold: building autonomous agents, and digging into why models misbehave or underperform in ways that aren’t obvious. That curiosity drives most of his projects.',
    ],
  },

  /* ---------- skills ---------- */
  {
    id: 'skills',
    rank: 41,
    patterns: [/\b(skill|skills|tech stack|technolog|languages?|programming|stack|tools|framework|python|java\b)\b/i],
    responses: [
      'Across his projects Kaspian works in Python and Java, with hands-on experience in PyTorch & Hugging Face (BioBERT), FastAPI + WebSockets and RAG pipelines (F1), socket programming & multithreading (UNO & Chatty), and LLM tooling like Langflow and Ollama/Granite. Ask about any project for specifics.',
      'His toolkit spans Python and Java: ML with PyTorch/Transformers, real-time systems with FastAPI and sockets, multithreaded networking, and LLM orchestration (Langflow, Ollama). Each project shows a different slice — want one?',
    ],
  },

  /* ---------- projects: overview ---------- */
  {
    id: 'projects-overview',
    rank: 40,
    patterns: [/\b(project|projects|portfolio|built|build|made|created|what.*(work|made)|showcase)\b/i],
    responses: [
      'Kaspian has four projects worth knowing: ① F1 — real-time AI race commentary; ② UNO — a multiplayer LAN card game; ③ BioBERT — soccer-injury severity classification; ④ CHIP — the ELIZA-style bot you’re talking to right now. Which one should I unpack?',
      'Four headliners: F1 (live AI commentary), UNO (multithreaded networked card game), BioBERT (NLP injury classifier), and CHIP (this chatbot). Say the name and I’ll dig in.',
    ],
  },

  /* ---------- projects: individual ---------- */
  {
    id: 'project-f1',
    rank: 47,
    patterns: [/\b(f1|formula ?1|formula one|telemetry|racing|race|commentary|langflow|granite|ollama)\b/i],
    responses: [
      'F1 is real-time commentary powered by AI. It turns data from real sources into both fun tidbits for fans and the kind of intuitive metrics a race team could use for pit-stop calls and strategy. The hardest part was Langflow (his first time with it) — lots of setup around Ollama/Granite 3.3, and it took many iterations to prompt the AI into accurate, reliable output.',
      'The F1 project translates live telemetry into AI commentary that’s fun for viewers yet versatile enough for professionals tracking pit stops and performance. Toughest challenge: learning Langflow from scratch and tuning the Ollama/Granite 3.3 prompting until the output was actually accurate.',
    ],
  },
  {
    id: 'project-uno',
    rank: 47,
    patterns: [/\b(uno|card game|cards)\b/i],
    responses: [
      'UNO was Kaspian’s first multithreaded server-client program: players play the card game while chatting with friends over a LAN, all in real time. The hardest part was writing accurate rule algorithms so the flow stays seamless — e.g. a Draw 4 has to add to player 2’s deck, update the deck, then skip to the next player, all before that player can draw.',
      'His UNO project is a real-time, multithreaded LAN game with built-in chat. The real challenge was the rule constraints — sequencing things like Draw 4 (add cards → update deck → skip turn) so the game state never breaks.',
    ],
  },
  {
    id: 'project-biobert',
    rank: 47,
    patterns: [/\b(biobert|bio ?bert|bert|injury|injuries|severity|medical|clinical|classif)\b/i],
    responses: [
      'BioBERT is a model that reads text bidirectionally and is trained specifically for medical terminology. Kaspian trained it on official soccer-injury data to test how accurately it can sort a new, possibly-unseen injury into one of five severity classes. The hardest part was fine-tuning — finding the model’s limits and where it could improve as he changed each metric, since every run told a slightly different story about its “bad behavior.”',
      'In BioBERT, Kaspian fine-tuned a biomedical bidirectional model on real soccer-injury data to classify injuries into five severity tiers. The tough part was the fine-tuning loop: each metric change surfaced a new theory for why the model mis-guessed unfamiliar injuries.',
    ],
  },
  {
    id: 'project-chip',
    rank: 47,
    patterns: [/\b(chip|eliza|chatbot|this bot|how.*(you )?work|pattern match|weizenbaum)\b/i],
    responses: [
      'That’s my origin story! CHIP is one of Kaspian’s first AI projects, based on ELIZA — one of the earliest “AIs.” ELIZA spots trigger words in your input and responds; classically it played a counselor. Kaspian re-styled it into a technical-interview bot with reactions and follow-up questions. The hardest part was structuring the dictionary for efficient lookup (so it doesn’t miss a trigger or confuse context) while learning ELIZA’s core algorithm — he was fairly new to Python then. CHIP has since been adapted into me, kaspiBOT, the chatbot teaching you all about him.',
      'CHIP is Kaspian’s ELIZA-inspired bot — and my ancestor. ELIZA matches keywords to canned responses; the original acted as a Rogerian therapist. Kaspian turned CHIP into a technical-interview coach with reactions and follow-ups, wrestling with efficient dictionary lookup and ELIZA’s trigger algorithm while still learning Python. That same engine now powers me, kaspiBOT, your guide to Kaspian.',
    ],
  },

  /* ---------- contact ---------- */
  {
    id: 'contact',
    rank: 45,
    patterns: [/\b(contact|hire|hiring|email|reach|get in touch|connect|linkedin|github|resume|cv|recruit|available|opportunit)\b/i],
    responses: [
      'Kaspian is open to opportunities! Use the “Get in touch” button at the top of the page, or the GitHub, LinkedIn, and résumé links in the footer and on the home page.',
      'Great — he’d love to hear from you. Hit “Get in touch” in the header, or grab his LinkedIn, GitHub, and résumé from the home page and footer.',
    ],
  },

  /* ---------- fallback ---------- */
  {
    id: 'xnone',
    rank: 0,
    patterns: [/.*/],
    responses: [
      'I’m not sure I caught that — I’m a keyword-matcher at heart. Try asking about Kaspian’s school, projects, soccer, hobbies, or goals.',
      'Hmm, that one slipped past my triggers. Ask me about his education, his four projects (F1, UNO, BioBERT, CHIP), or how to reach him.',
      'I work by spotting keywords, ELIZA-style, so let’s find one — want to hear about Kaspian’s background, a specific project, or his career goals?',
    ],
  },
]
