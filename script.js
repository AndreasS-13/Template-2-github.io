document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const shareBtn = document.getElementById('share-btn');
  const modal = document.getElementById('qr-modal');
  const closeModal = document.getElementById('close-modal');
  const qrcodeDiv = document.getElementById('qrcode');

  // 1. Efeito 3D Tilt suave ao mover o mouse
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Desativa em telas pequenas
    
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  // Reset do efeito 3D quando o mouse sai
  document.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });

  // 2. Alternador de Tema Claro / Escuro
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  });

  // 3. Modal e Gerador de QR Code
  let qrGenerated = false;

  shareBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    
    if (!qrGenerated) {
      new QRCode(qrcodeDiv, {
        text: window.location.href,
        width: 160,
        height: 160,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      qrGenerated = true;
    }
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
