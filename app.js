const video = document.getElementById("videoElement");
const canvas = document.getElementById("canvasElement");
const snapBtn = document.getElementById("snapBtn");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const ctx = canvas.getContext("2d");

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    alert("Камера активна. Ви можете зробити фото.");
  })
  .catch((error) => {
    statusMsg.textContent = "Помилка доступу до камери.";
    console.error("Помилка доступу до камери:", error);
  });

snapBtn.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.classList.remove("hidden");
  saveBtn.disabled = false;
  resetBtn.disabled = false;
  alert("Фото зроблено!");
});

saveBtn.addEventListener("click", () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const link = document.createElement("a");
  link.download = `selfie-${timestamp}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  alert("Фото збережено!");
});

resetBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.classList.add("hidden");
  saveBtn.disabled = true;
  resetBtn.disabled = true;
  alert("Фото скинуто!");
});
