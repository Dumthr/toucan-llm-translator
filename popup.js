document.getElementById("translateBtn").addEventListener("click", () => {
  const text = document.getElementById("inputText").value.trim();
  const wordCount = text.split(/\s+/).length;

  if (!text) return alert("Please enter some text.");

  if (wordCount > 40) {
    alert("⚠️ Input too long. Limit to 40 words.");
    return;
  }

  const word = wordCount === 1 ? text : "";
  const sentence = text;

  document.getElementById("loading").style.display = "block";
  document.getElementById("output").textContent = "";

  fetch("http://localhost:5000/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word, sentence, target_lang: "English" }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("output").textContent = data.translation;
    })
    .catch((err) => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("output").textContent =
        "❌ Error during translation.";
      console.error(err);
    });
});
