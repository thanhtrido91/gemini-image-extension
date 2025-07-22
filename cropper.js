const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let img = new Image();
let startX, startY, endX, endY;

document.getElementById("upload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
});

canvas.addEventListener("mouseup", (e) => {
  const rect = canvas.getBoundingClientRect();
  endX = e.clientX - rect.left;
  endY = e.clientY - rect.top;
  drawSelectionBox();
});

function drawSelectionBox() {
  ctx.drawImage(img, 0, 0);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  const x = Math.min(startX, endX);
  const y = Math.min(startY, endY);
  const w = Math.abs(endX - startX);
  const h = Math.abs(endY - startY);
  ctx.strokeRect(x, y, w, h);
}

function getCroppedImageData() {
  const x = Math.min(startX, endX);
  const y = Math.min(startY, endY);
  const w = Math.abs(endX - startX);
  const h = Math.abs(endY - startY);

  const temp = document.createElement("canvas");
  temp.width = w;
  temp.height = h;
  temp.getContext("2d").drawImage(canvas, x, y, w, h, 0, 0, w, h);
  return temp.toDataURL("image/png");
}
