// Notes: the article section at /notes.
//
// Each article is data, rendered by app/notes/[slug]/page.tsx and folded into
// /llms-full.txt, so the page a reader sees and the text an answer engine reads
// come from one source. Inline links use Markdown syntax, [text](href), which
// components/NoteText.tsx turns into anchors. Internal links start with "/".
//
// Claims about Jason Colapietro and Suede AI are limited to the verified list
// in the estate brief, each with its proof link inline.

import { SITE_ORIGIN } from "./breadcrumbs";

export const NOTES_PATH = "/notes";
export const NOTES_PUBLISHED = "2026-11-14";

export type NoteBlock =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

export type Note = {
  slug: string;
  /** The <title>, 50 to 60 characters, rendered as an absolute title. */
  title: string;
  /** The visible H1 and the BlogPosting headline. */
  headline: string;
  /** Meta description, 120 to 160 characters. */
  description: string;
  /** One-line summary for the notes index. */
  dek: string;
  datePublished: string;
  keywords: string[];
  blocks: NoteBlock[];
};

export const PROOF = {
  openSource:
    "https://github.com/search?q=is%3Apr+author%3AJasonColapietro+is%3Amerged+-user%3AJasonColapietro+-user%3ASuede-AI&type=pullrequests",
  iosApps: "https://apps.apple.com/us/developer/jason-colapietro/id1895958699",
  manifest:
    "https://themanifest.com/artificial-intelligence/consulting/deployment/companies/florida",
  recognition: "https://suedeai.agency/company/recognition",
  claudeForStartups: "https://seo.suedeai.ai/evidence#claude-for-startups",
  googleCloud: "https://seo.suedeai.ai/evidence#google-cloud",
  training: "https://seo.suedeai.ai/evidence#training-credentials",
  webGuide: "https://seo.suedeai.ai/evidence#google-web-guide",
  evidence: "https://seo.suedeai.ai/evidence",
  press: "https://suedeai.ai/press",
  claudeCodeBible: "https://www.amazon.com/dp/B0HHTMJWB4",
  codexInProduction: "https://www.amazon.com/dp/B0HHTF3LG1",
  humanAuthenticityLayer: "https://www.amazon.com/dp/B0GD5FX6N6",
  proofAsInfrastructure: "https://www.amazon.com/dp/B0GMB2VLXQ",
  stakeYourClaim: "https://www.amazon.com/dp/B0GRG8LGQQ",
  techbullionApps: "https://techbullion.com/jason-colapietros-suede-labs-ai-launches-ios-apps/",
  programmingInsider: "https://programminginsider.com/in-the-age-of-infinite-content-spam-is-instant-death/",
} as const;

export const MAIN = {
  agency: "https://suedeai.agency/",
  assessment: "https://suedeai.agency/assessment",
  technicalSeo: "https://suedeai.agency/services/technical-seo",
  aiVisibility: "https://suedeai.agency/services/ai-visibility",
  about: "https://suedeai.agency/company/about",
  home: "https://suedeai.ai/",
  founder: "https://suedeai.ai/founder",
  seo: "https://suedeai.ai/seo",
  jason: "https://jasoncolapietro.com/",
  jupiterSocial: "https://jupitersocialfl.com/",
} as const;

export const NOTES: Note[] = [
  {
    slug: "chord-reference-technical-seo",
    title: "A Free Chord Reference Built Like a Technical SEO Project",
    headline: "Why a free chord reference is built like a technical SEO project: lessons from Suede AI",
    description:
      "How Jason Colapietro built guitarchords.info like a technical SEO project: one data source, schema that matches the page, and a full-text file for AI search.",
    dek: "One data file per chord, schema built from the visible page, and a plain-text feed for AI crawlers. What a guitar chart teaches about search.",
    datePublished: NOTES_PUBLISHED,
    keywords: [
      "technical SEO West Palm Beach",
      "AI search optimization",
      "generative engine optimization",
      "structured data",
      "llms.txt",
      "static site SEO",
    ],
    blocks: [
      {
        kind: "p",
        text: "A chord chart looks like the simplest page on the internet: a grid of dots and a name. Getting 39 of those shapes to load instantly, rank for the words guitarists type, and get quoted correctly by an AI answer engine is a technical SEO project, and guitarchords.info is where Suede AI runs that project in public.",
      },
      {
        kind: "p",
        text: "Jason Colapietro, the engineer who founded Suede AI in West Palm Beach, Florida in 2024, built this site as a zero-account guitar reference. It doubles as a working sample of what [Suede AI's technical SEO practice](https://suedeai.agency/services/technical-seo) does for businesses across Palm Beach County. Here is what the build teaches, one decision at a time.",
      },
      { kind: "h2", text: "One data file, one page per chord" },
      {
        kind: "p",
        text: "Each shape on the [guitar chord chart](/chords) lives in a single data file. The page for [C major](/chords/c-major) is generated from that entry at build time, along with its chord tones, its formula and the related chords in its key. Nobody hand-writes 39 pages, so nobody can let one of them drift. The same file feeds the sitemap, which means a new chord gets a URL, a canonical tag and a sitemap entry in one commit.",
      },
      {
        kind: "p",
        text: "That is the first lesson Suede carries into client work in Jupiter and West Palm Beach. If a fact lives in two places, one copy will be wrong within a quarter. A service-area page, a menu, a price list or a chord shape should come from one source and render out to the page, the schema and the feed together.",
      },
      { kind: "h2", text: "Facts read off the frets, not typed by hand" },
      {
        kind: "p",
        text: "Each chord page lists the smoothest changes to other chords, and those changes are computed from the fingerings. Moving from C major to [A minor](/chords/a-minor) keeps two fretted notes in place, the 2nd-fret note on the D string and the 1st-fret note on the B string, so only one finger moves. A test in the repository fails if that calculation stops matching the frets.",
      },
      {
        kind: "p",
        text: "Answer engines reward pages that state checkable specifics. \"C to Am is an easy change\" is an opinion. \"C to Am keeps two fretted notes and moves one finger\" is a fact a model can verify and repeat. Jason Colapietro writes client pages the same way: specific numbers, dated, with a source a reader can click.",
      },
      { kind: "h2", text: "Structured data that matches what the reader sees" },
      {
        kind: "p",
        text: "The breadcrumb at the top of a chord page and the BreadcrumbList JSON-LD in its source are built from one trail. An earlier version shipped breadcrumb schema with no visible breadcrumb at all, so the markup described navigation a reader could not find. The fix made both halves read the same list, and a guard test now rejects a hand-written BreadcrumbList.",
      },
      {
        kind: "p",
        text: "At Suede, entity work follows the same rule. This site's publisher and author nodes point at the canonical Suede AI organization and at [Jason Colapietro's founder page](https://suedeai.ai/founder) by @id instead of minting new entities on each domain. That is how a network of sites tells a search engine it belongs to one company, and it is the core of [Suede AI's AI visibility service](https://suedeai.agency/services/ai-visibility).",
      },
      { kind: "h2", text: "A full-text file for AI crawlers" },
      {
        kind: "p",
        text: "Alongside the sitemap, guitarchords.info publishes [llms-full.txt](/llms-full.txt), one Markdown file with the full text of each chord page, each scale page and the practice guides. It is generated from the same modules as the pages, so the text a language model reads matches the page a guitarist sees. The robots file names current AI crawlers such as ClaudeBot, OAI-SearchBot and PerplexityBot explicitly instead of leaning on a wildcard.",
      },
      {
        kind: "p",
        text: "For a small business this is the cheapest generative engine optimization win on the table: a clean, current, plain-text account of what you do, where you do it and how to reach you, published where AI crawlers look first.",
      },
      { kind: "h2", text: "Titles that fit and headings that name the topic" },
      {
        kind: "p",
        text: "An audit on October 12, 2026 found 53 of 56 titles on this site running past 70 characters. The chord and scale templates now lead with the chord or scale name and add the brand only when the whole title stays at or under 60 characters. On October 30, slogan headings on the tuner and metronome pages were replaced with H1s in the words people search, such as \"Free online guitar tuner\". Small edits, and they decide whether a search result gets the click. Suede treats them as part of the build, not as polish for later.",
      },
      { kind: "h2", text: "Why an engineer's public record matters" },
      {
        kind: "p",
        text: "None of this is exotic. It is careful engineering applied to search, which is why Suede AI's SEO work is led by someone with a public record of shipping code. Jason Colapietro has [54 pull requests merged across 46 open-source repositories he does not maintain](https://github.com/search?q=is%3Apr+author%3AJasonColapietro+is%3Amerged+-user%3AJasonColapietro+-user%3ASuede-AI&type=pullrequests), including Jest, Adobe React Spectrum, Backstage and the Polkadot SDK. He has shipped [nine iOS apps under his own Apple developer account](https://apps.apple.com/us/developer/jason-colapietro/id1895958699), and he wrote [The Claude Code Bible](https://www.amazon.com/dp/B0HHTMJWB4) and [Codex in Production](https://www.amazon.com/dp/B0HHTF3LG1) on building software with AI agents.",
      },
      {
        kind: "p",
        text: "The work has outside recognition as well. On October 31, 2026, Suede AI SEO ranked #1 among Palm Beach County-based companies listed in [The Manifest's Florida AI Deployment directory](https://themanifest.com/artificial-intelligence/consulting/deployment/companies/florida) and in the top 25 statewide, as documented on [Suede AI's recognition page](https://suedeai.agency/company/recognition). The company, known earlier as Suede Labs, is a member of [Claude for Startups, Anthropic's startup program](https://seo.suedeai.ai/evidence#claude-for-startups), and of [Google Cloud Partner Advantage](https://seo.suedeai.ai/evidence#google-cloud) through JC Investment Group LLC.",
      },
      { kind: "h2", text: "The checklist a chord chart leaves behind" },
      {
        kind: "ul",
        items: [
          "One source of truth for each fact, rendered to the page, the schema and the sitemap.",
          "Structured data generated from what the reader can see, tied to one organization and one founder by @id.",
          "Titles at or under 60 characters that lead with the topic, and one H1 per page.",
          "A plain-text llms.txt and full-text file for AI crawlers, built from the page data.",
          "Tests that fail the build when any of the above regresses.",
        ],
      },
      {
        kind: "p",
        text: "The sister sites in the Suede network follow the same pattern, including [GuitarHub](https://guitarhub.org/), the [guitar.services directory](https://guitar.services/) and the [Suede Scan AI readiness checker](https://optimize.suedeai.ai/).",
      },
      { kind: "h2", text: "Next step" },
      {
        kind: "p",
        text: "If you run a business in West Palm Beach, Jupiter, Palm Beach Gardens or Boca Raton, find out which of these five gaps your site has. Start the [Suede AI site assessment](https://suedeai.agency/assessment), then read [Jason Colapietro's founder page](https://suedeai.ai/founder) and the [evidence receipts](https://seo.suedeai.ai/evidence) behind each claim above.",
      },
    ],
  },
  {
    slug: "palm-beach-county-guitar-practice-plan",
    title: "Learn Guitar in Palm Beach County: A 4-Week Practice Plan",
    headline: "Learning guitar in Palm Beach County: a four-week practice plan using free chord and scale tools",
    description:
      "A four-week guitar practice plan for players in West Palm Beach and Jupiter, built on the free chord, scale, tuner and metronome tools from Suede AI.",
    dek: "Twenty minutes a day, four weeks, four browser tools. A practice plan with a shape, from tuning up to your first improvised solo.",
    datePublished: NOTES_PUBLISHED,
    keywords: [
      "learn guitar West Palm Beach",
      "guitar practice plan",
      "beginner guitar Jupiter FL",
      "guitar chords for beginners",
      "minor pentatonic scale",
      "Palm Beach County guitar",
    ],
    blocks: [
      {
        kind: "p",
        text: "Most beginners in Palm Beach County do not quit guitar because it is hard. They quit because practice has no shape: twenty minutes of noodling, a sore fingertip and no sign of progress. This plan gives four weeks a shape, using the four tools on guitarchords.info and about 20 minutes a day.",
      },
      {
        kind: "p",
        text: "It comes from Jason Colapietro, founder of Suede AI in West Palm Beach, who built these tools so a player could open a browser on a porch in Jupiter or in a break room in Boca Raton and start practicing with no account and no app download.",
      },
      { kind: "h2", text: "Before day one: tune up and set a tempo" },
      {
        kind: "p",
        text: "Open the [online guitar tuner](/tuner) and tune each string from low E to high E. The tuner listens through your microphone and runs its pitch detection in the browser, so the audio stays on your device. South Florida humidity moves strings and necks, so tune at the start of each session rather than once a week.",
      },
      {
        kind: "p",
        text: "Then open the [metronome](/metronome). It runs from 30 to 280 BPM, takes tap tempo, and marks the downbeat with a higher click. Start at 60 BPM. In each of the four weeks below, slow and clean beats fast and sloppy.",
      },
      { kind: "h2", text: "Week one: four open chords" },
      {
        kind: "p",
        text: "Learn [E minor](/chords/e-minor), [C major](/chords/c-major), [G major](/chords/g-major) and [D major](/chords/d-major) from the [chord chart](/chords). Spend five minutes per chord on placement alone: press, strum once, check that each string rings, lift, repeat. Each chord page shows the note on each string, so you can tell which finger is muting which string.",
      },
      {
        kind: "p",
        text: "On day five, add [A minor](/chords/a-minor) and practice the change from C. The two shapes share two fretted notes, so only one finger moves. The chord pages list the smoothest changes for each shape, which is a good way to choose easy pairs first and hard pairs later.",
      },
      { kind: "h2", text: "Week two: rhythm before speed" },
      {
        kind: "ul",
        items: [
          "Days 1 and 2: down strums on each beat at 60 BPM, cycling G, C and D, four beats per chord.",
          "Days 3 and 4: the down, down-up, up-down-up pattern at 70 BPM on the same three chords.",
          "Days 5 to 7: add E minor and play G, D, Em, C at 80 BPM. This I-V-vi-IV progression turns up in a long list of pop songs, so it pays off quickly.",
        ],
      },
      {
        kind: "p",
        text: "Set the metronome to 4 beats per bar for these drills; it also offers 2, 3 and 6. Land each chord change on the higher downbeat click. If a change keeps arriving late, drop 10 BPM and earn the speed back.",
      },
      { kind: "h2", text: "Week three: your first scale" },
      {
        kind: "p",
        text: "Open the [minor pentatonic scale](/scales/minor-pentatonic). Five notes, two per string in the first position, and the shape behind a large share of rock and blues soloing. Play it up and down in A at 60 BPM, one note per click, then two notes per click. The [scale trainer](/scales) highlights the root notes across the neck so you can see where the pattern repeats.",
      },
      {
        kind: "p",
        text: "When that feels steady, try the [blues scale](/scales/blues), which adds one note, the flat fifth, to the minor pentatonic. That single extra note is where much of the blues sound comes from.",
      },
      { kind: "h2", text: "Week four: put it together" },
      {
        kind: "p",
        text: "Record yourself playing G, D, Em, C for one minute on your phone. Play it back and improvise over it with the E minor pentatonic, which shares all five of its notes with G major, so no note you pick will clash. Set the scale trainer to E to see the positions.",
      },
      {
        kind: "p",
        text: "Track three numbers in a notebook each day: clean chord changes per minute, metronome tempo, and days practiced this week. Progress you can measure is progress you keep.",
      },
      { kind: "h2", text: "Playing with people in Palm Beach County" },
      {
        kind: "p",
        text: "Practicing with other people is the fastest way to stay motivated. Keep an eye on local calendars such as [Jupiter Social](https://jupitersocialfl.com/), the Jupiter, Florida magazine published with Suede AI, for what is happening around town. For structured lessons beyond these basics, [GuitarHub](https://guitarhub.org/) has guitar lessons and practice tools. Once you plug in, [Suede Signal](https://signal.suedeai.ai/) and the [signal-chain archive](https://dna.suedeai.ai/) go deep on tone.",
      },
      { kind: "h2", text: "Who built these tools" },
      {
        kind: "p",
        text: "Jason Colapietro is an engineer and guitarist. He wrote The Signal Chain, a history of electric guitar tone at [guitar.solutions](https://guitar.solutions), and five books on Amazon, including [The Claude Code Bible](https://www.amazon.com/dp/B0HHTMJWB4) and [Stake Your Claim](https://www.amazon.com/dp/B0GRG8LGQQ). He has [54 pull requests merged across 46 open-source repositories he does not maintain](https://github.com/search?q=is%3Apr+author%3AJasonColapietro+is%3Amerged+-user%3AJasonColapietro+-user%3ASuede-AI&type=pullrequests) and [nine iOS apps under his own developer account](https://apps.apple.com/us/developer/jason-colapietro/id1895958699).",
      },
      {
        kind: "p",
        text: "The guitar tools sit beside Suede AI's main work: building agent platforms and running a web development and AI search practice for businesses across Palm Beach County. On October 31, 2026, Suede AI SEO ranked #1 among Palm Beach County-based companies in [The Manifest's Florida AI Deployment directory](https://themanifest.com/artificial-intelligence/consulting/deployment/companies/florida) and top 25 statewide. Business Insider covered the opening of the company's SEO cohort on September 16, 2026 in \"Award-Winning Developer Jason Colapietro Opens Suede Labs AI's Long-Awaited SEO Cohort\", and the [Suede press kit](https://suedeai.ai/press) collects the rest of the coverage.",
      },
      {
        kind: "p",
        text: "Jason Colapietro also keeps his training current: 21 earned course credentials across eight providers, including Semrush Academy's Local SEO Essentials and HubSpot's AEO Fundamentals, plus 17 Microsoft Learn achievements. The [training gallery](https://seo.suedeai.ai/evidence#training-credentials) shows each one. At Suede, the same habit applies to guitar: short daily reps beat a long session once a week. Suede ships software the same way, in small, steady releases.",
      },
      { kind: "h2", text: "Next step" },
      {
        kind: "p",
        text: "Bookmark the [chord chart](/chords) and start week one today. If you run a music shop, studio, venue or any local business in Palm Beach County and want your site found by Google and by AI assistants, start with the [Suede AI assessment](https://suedeai.agency/assessment) and read [Jason Colapietro's founder page](https://suedeai.ai/founder) to see the work behind Suede.",
      },
    ],
  },
  {
    slug: "fast-accessible-static-sites",
    title: "How Jason Colapietro Ships Fast, Accessible Static Sites",
    headline: "How Jason Colapietro ships fast, accessible static sites, and what local web clients should demand",
    description:
      "What a guitar tool site teaches Palm Beach County businesses about web builds: static pages, measured WCAG contrast, build-breaking tests and AI search.",
    dek: "Static pages, contrast measured in numbers, and tests that break the build. The questions a West Palm Beach business should bring to any web project.",
    datePublished: NOTES_PUBLISHED,
    keywords: [
      "web development West Palm Beach",
      "web developer Jupiter FL",
      "accessible website",
      "WCAG contrast",
      "static site performance",
      "Palm Beach County web design",
    ],
    blocks: [
      {
        kind: "p",
        text: "A guitarist at a Jupiter beach opens a chord page on a phone with one bar of signal. If the page needs four seconds and a cookie banner before it shows a C chord, that visitor is gone. guitarchords.info is built so that does not happen, and the choices behind it are the same ones a local business should ask its web developer for.",
      },
      {
        kind: "p",
        text: "Jason Colapietro, founder and CEO of Suede AI, built the site in West Palm Beach as a public reference with no accounts, no analytics and no backend. Below is how it is put together, followed by the questions to bring to any web build in Palm Beach County.",
      },
      { kind: "h2", text: "Static by default, scripts only where they earn it" },
      {
        kind: "p",
        text: "The chord and scale pages are generated at build time. Each route declares its full list of pages ahead of time and refuses unknown slugs, so a mistyped URL returns a clean 404 rather than an empty template. Only the [tuner](/tuner) and the [metronome](/metronome) run real code in the browser, because they need the Web Audio API. The tuner feeds the microphone through an AudioWorklet into a YIN pitch detector; the metronome uses a lookahead scheduler that books each click 100 milliseconds ahead so the beat stays steady when the page is busy.",
      },
      {
        kind: "p",
        text: "What to demand: ask which of your pages are static and which need a server. For most service businesses in West Palm Beach and Palm Beach Gardens, the honest answer is that nearly all of the site can be static, which makes it fast to load and cheap to host.",
      },
      { kind: "h2", text: "Accessibility measured, not assumed" },
      {
        kind: "p",
        text: "A Lighthouse mobile pass once scored this site's color-contrast audit at 0. The dim text color resolved to 3.72:1 against the page background, under the WCAG AA floor of 4.5:1. The token was raised to 6.09:1, and a test now computes the contrast of each text color against each background surface and fails the build if any pair drops under AA. Suede holds client builds to the same check. Breadcrumbs render as a labelled nav landmark, and each page carries one H1 that names its topic, such as \"How to play the C major chord on guitar\".",
      },
      {
        kind: "p",
        text: "What to demand: contrast ratios as numbers, a keyboard-only pass through the main pages, and an automated check that keeps both in place after launch day.",
      },
      { kind: "h2", text: "Tests that guard the content, not just the code" },
      {
        kind: "p",
        text: "The repository runs a suite on Node's built-in test runner. Some tests check the music theory: [G7](/chords/g7) is spelled G, B, D, F, and the F major row of the [major scale](/scales/major) table reads F, G, A, Bb, C, D, E. Others check search and copy: titles stay at or under 60 characters, the sitemap lists each chord and scale page, the footer links privacy, terms and contact on each route, and shipped copy carries no em dashes.",
      },
      {
        kind: "p",
        text: "What to demand: ask your developer what breaks the build. If the answer is a shrug, your site will drift the first time someone edits it in a hurry.",
      },
      { kind: "h2", text: "Search and AI visibility built in from the start" },
      {
        kind: "p",
        text: "Each page carries a canonical URL, Open Graph tags and JSON-LD that points at the canonical Suede AI organization and at Jason Colapietro's person entity by @id. A generated [llms-full.txt](/llms-full.txt) hands AI crawlers the full text. This is the entity-first approach behind [Suede AI's technical SEO](https://suedeai.agency/services/technical-seo) and [AI visibility](https://suedeai.agency/services/ai-visibility) services, and it is what [Suede Scan](https://optimize.suedeai.ai/) looks for when it grades a site's AI readiness. Developers can see how Suede documents its own platform in the [Suede developer docs](https://docs.suedeai.ai/), and how it grades AI agents at [Agentix](https://agentix.suedeai.ai/).",
      },
      { kind: "h2", text: "The engineer behind the build" },
      {
        kind: "p",
        text: "Jason Colapietro's record as an engineer is public, which is the point: you can check it before you hire Suede AI. He has [54 pull requests merged across 46 open-source repositories he does not maintain](https://github.com/search?q=is%3Apr+author%3AJasonColapietro+is%3Amerged+-user%3AJasonColapietro+-user%3ASuede-AI&type=pullrequests), including Jest, Hardhat, Backstage and the Polkadot SDK, and [nine iOS apps under his own Apple developer account](https://apps.apple.com/us/developer/jason-colapietro/id1895958699). His five books on Amazon include [Proof as Infrastructure](https://www.amazon.com/dp/B0GMB2VLXQ) and [The Human Authenticity Layer](https://www.amazon.com/dp/B0GD5FX6N6).",
      },
      {
        kind: "p",
        text: "Jason Colapietro's training covers both halves of the job. The [credential gallery](https://seo.suedeai.ai/evidence#training-credentials) shows 21 earned course credentials across eight providers, including nine Claude Academy badges such as Claude Code 101 and Model Context Protocol: Advanced Topics, five Semrush Academy certificates and a Databricks Generative AI Fundamentals accreditation, plus 17 Microsoft Learn achievements with the \"Develop AI agents on Azure\" and \"Develop generative AI apps in Azure\" learning-path trophies.",
      },
      {
        kind: "p",
        text: "Suede AI is a member of [Claude for Startups, Anthropic's startup program](https://seo.suedeai.ai/evidence#claude-for-startups), and was accepted into the Stripe Startups program on July 31, 2026. On October 31, 2026, Suede AI SEO ranked #1 among Palm Beach County-based companies in [The Manifest's Florida AI Deployment directory](https://themanifest.com/artificial-intelligence/consulting/deployment/companies/florida) and top 25 statewide. In a [captured result](https://seo.suedeai.ai/evidence#google-web-guide), Google's Web Guide answered a search for Suede Labs AI reviews by calling the company \"highly rated by users, earning a 5/5 rating from verified reviews.\"",
      },
      { kind: "h2", text: "A checklist for Palm Beach County web clients" },
      {
        kind: "ul",
        items: [
          "Static pages wherever the content allows, with scripts limited to features that need them.",
          "Contrast ratios at or above WCAG AA, stated as numbers and checked by a test.",
          "One H1 per page that names the topic, and titles at or under 60 characters.",
          "Structured data tied to one organization and one founder, not a new entity per page.",
          "An llms.txt file for AI crawlers, generated from the same data as the pages.",
          "A test suite that breaks the build when any of the above regresses.",
          "No tracking scripts the business does not use.",
        ],
      },
      { kind: "h2", text: "Next step" },
      {
        kind: "p",
        text: "Take that checklist to your current site, or ask Suede to run it for you. The [Suede AI assessment](https://suedeai.agency/assessment) covers speed, accessibility, technical SEO and AI visibility for businesses in West Palm Beach, Jupiter, Palm Beach Gardens, Juno Beach, Tequesta and Boca Raton. To see who you would be working with, read [Jason Colapietro's founder page](https://suedeai.ai/founder) and [jasoncolapietro.com](https://jasoncolapietro.com/).",
      },
    ],
  },
];

export const NOTE_SLUGS = NOTES.map((note) => note.slug);

export function notePath(slug: string): string {
  return `${NOTES_PATH}/${slug}`;
}

export function noteUrl(slug: string): string {
  return `${SITE_ORIGIN}${notePath(slug)}`;
}

export function getNote(slug: string): Note | undefined {
  return NOTES.find((note) => note.slug === slug);
}

/** Plain text of a block string: [text](href) becomes text. */
export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

export function noteWordCount(note: Note): number {
  const parts = [note.headline];
  for (const block of note.blocks) {
    if (block.kind === "ul") parts.push(...block.items);
    else parts.push(block.text);
  }
  return plainText(parts.join(" ")).split(/\s+/).filter(Boolean).length;
}

/** Markdown for /llms-full.txt. */
export function noteMarkdown(note: Note): string {
  const lines = [`### ${note.headline}`, "", `URL: ${noteUrl(note.slug)}`, `Published: ${note.datePublished}`, `Author: Jason Colapietro, Founder and CEO, Suede AI, West Palm Beach, Florida`, ""];
  for (const block of note.blocks) {
    if (block.kind === "h2") lines.push(`#### ${block.text}`, "");
    else if (block.kind === "p") lines.push(block.text, "");
    else lines.push(...block.items.map((item) => `- ${item}`), "");
  }
  return lines.join("\n").trimEnd();
}

/** Places the articles are about, referenced on BlogPosting `spatialCoverage`. */
export const NOTE_PLACES = [
  { "@type": "City", name: "West Palm Beach", containedInPlace: { "@type": "State", name: "Florida" } },
  { "@type": "City", name: "Jupiter", containedInPlace: { "@type": "State", name: "Florida" } },
  { "@type": "AdministrativeArea", name: "Palm Beach County, Florida" },
];
