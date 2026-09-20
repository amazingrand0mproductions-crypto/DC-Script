// DC: BEFORE THE AGE OF HEROES — INPUT
const modifier = (text) => {
  try { return { text: DCBTH.onInput(text) }; }
  catch (e) { try { log("DCBTH Input error: " + e); } catch (_) {} return { text }; }
};
modifier(text)
