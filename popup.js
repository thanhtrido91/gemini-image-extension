const spinner = document.getElementById("spinner");
const resetBtn = document.getElementById("resetBtn");
const generateBtn = document.getElementById("generateBtn");

resetBtn.onclick = () => window.location.reload();

generateBtn.onclick = async () => {
  spinner.classList.remove("hidden");
  try {
    const dataUrl = getCroppedImageData();
    const resultUrl = await generateGeminiImage(dataUrl);
    window.open(resultUrl, "_blank");
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    spinner.classList.add("hidden");
  }
};
