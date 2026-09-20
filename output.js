// DC: BEFORE THE AGE OF HEROES — OUTPUT
const modifier = (text) => {
  try { return { text: DCBTH.onOutput(text) }; }
  catch (e) { try { log("DCBTH Output error: " + e); } catch (_) {} return { text }; }
};
modifier(text)
