// Inject spinner animation style once
const spinnerStyle = document.createElement("style");
spinnerStyle.textContent = `
@keyframes toucan-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.toucan-loader {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: toucan-spin 1s linear infinite;
  z-index: 99999;
  background-color: white;
}
`;
document.head.appendChild(spinnerStyle);

// 🧠 Main translation logic on selection
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (!selectedText) return;

  const wordCount = selectedText.split(/\s+/).length;

  // ⚠️ Alert if text is too long
  if (wordCount > 40) {
    alert(
      "⚠️ The selected text exceeds my comprehension capacity.\nPlease select a shorter phrase or sentence (≤ 40 words)."
    );
    return;
  }

  const isSingleWord = wordCount === 1;
  const word = isSingleWord ? selectedText : "";
  const sentence = selectedText;

  // 📍 Position spinner near selected text
  try {
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const loader = document.createElement("div");
    loader.className = "toucan-loader";
    loader.id = "toucan-loader";
    loader.style.top = `${rect.top + window.scrollY - 10}px`;
    loader.style.left = `${rect.left + window.scrollX - 10}px`;

    document.body.appendChild(loader);
  } catch (e) {
    console.warn("Selection range error:", e);
  }

  // 🛰️ Send request to Flask API
  fetch("http://localhost:5000/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word, sentence, target_lang: "English" }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      // ✅ Remove loader
      const loader = document.getElementById("toucan-loader");
      if (loader) loader.remove();

      console.log("🔁 Translation data received:", data);
      alert(
        `📘 ${isSingleWord ? "Word Explanation" : "Translation"}:\n\n${
          data.translation
        }`
      );

      // Optional: Save translation locally
      chrome.storage?.local?.get(["words"], (result) => {
        const saved = result?.words || [];
        saved.push({ word: selectedText, translation: data.translation });
        chrome.storage.local.set({ words: saved });
      });
    })
    .catch((err) => {
      console.error("❌ Translation fetch error:", err);
      const loader = document.getElementById("toucan-loader");
      if (loader) loader.remove();
      alert("❌ Could not translate the selected text.");
    });
});
