// Practice guide copy for the tuner and metronome pages.
//
// The pages render these blocks under their tools, and /llms-full.txt prints
// the same blocks, so the text an answer engine reads is the text a visitor
// reads. The closing paragraph of each guide is links, so it stays in the page.

export type GuideBlock = { kind: "h3" | "p"; text: string };

export type ToolGuide = {
  id: string;
  heading: string;
  blocks: readonly GuideBlock[];
};

export const TUNER_GUIDE: ToolGuide = {
  id: "tuning-guide",
  heading: "How to tune a guitar in your browser",
  blocks: [
    {
      kind: "p",
      text: "Start tuning and allow microphone access. Bring the guitar close enough for the microphone to hear a clear note, mute the other strings, and pluck one open string. Let the pitch settle before adjusting the tuning peg.",
    },
    {
      kind: "p",
      text: "Standard guitar tuning, from the thickest string to the thinnest, is E2, A2, D3, G3, B3, E4. First check that the displayed note is the string’s intended note. Then use the cents reading: a negative value is flat and a positive value is sharp. Make small adjustments and pluck again.",
    },
    { kind: "h3", text: "When the reading jumps" },
    {
      kind: "p",
      text: "Reduce background sound and play only one string. A hard attack can make the first instant of a note sharper than its sustained pitch. If the tuner catches an overtone, mute the string and try a gentler pluck. Confirm which peg belongs to the string before turning it; do not keep tightening an unfamiliar string just to chase a changing reading.",
    },
    { kind: "h3", text: "Finish with a playing check" },
    {
      kind: "p",
      text: "Recheck all six strings, then play a familiar chord. This chromatic tuner names the pitch it hears, so you can use another tuning when you know the target notes. The microphone analysis runs in the browser. If access is blocked, check the site’s microphone permission and start again.",
    },
  ],
};

export const METRONOME_GUIDE: ToolGuide = {
  id: "rhythm-guide",
  heading: "Practice guitar rhythm with the online metronome",
  blocks: [
    {
      kind: "p",
      text: "Set the tempo with the slider or plus and minus controls, then press Start. The range is 30–280 beats per minute. Choose 2, 3, 4 or 6 beats per bar; the higher click marks the first beat. Use Tap several times with a song to estimate its pulse, then adjust the result by ear.",
    },
    { kind: "h3", text: "A short chord-change exercise" },
    {
      kind: "p",
      text: "Choose two chords you already know and begin at a comfortable tempo, such as 60 BPM. Count four beats aloud and play one downstroke per beat. Change chords at the start of each bar. Keep the click running while you notice whether your hand arrives before, on or after the first beat.",
    },
    {
      kind: "p",
      text: "When several changes feel controlled, raise the tempo a little. If the rhythm becomes uneven, return to a slower setting and isolate the transition. Record the chord pair and tempo so your next session starts from a clear reference. The exercise is about consistent movement and sound, not reaching the largest BPM number.",
    },
    { kind: "h3", text: "Hear the spaces between clicks" },
    {
      kind: "p",
      text: "For eighth notes, count “one and two and three and four and” while keeping one click per numbered beat. Play the offbeats evenly between clicks. If you lose the pulse, return to quarter notes and rebuild the pattern. Check that your device volume is audible before increasing it, and press Stop when finished.",
    },
  ],
};
