document.getElementById("crop").addEventListener("click", async () => {
  const spinner = document.getElementById("spinner");
  const result = document.getElementById("result");

  spinner.classList.remove("hidden");
  result.innerHTML = "";

  try {
    const cropped = getCroppedImageData();
    const newImage = await generateWithGemini(cropped);

    const img = document.createElement("img");
    img.id = "outputImage";
    img.src = newImage;
    result.appendChild(img);
  } catch (e) {
    result.textContent = "❌ Lỗi khi gọi Gemini: " + e.message;
  } finally {
    spinner.classList.add("hidden");
  }
});

document.getElementById("reset").onclick = () => {
  location.reload();
};
