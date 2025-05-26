// filepath: c:\Users\soufiane.elidrissi\Desktop\Web\MOGADOR-IPTV\index.html
// ...existing code...
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById('sliderTrack');
  const container = document.getElementById('sliderContainer');
  let isDown = false;
  let startX;
  let scrollLeft;
  let animationId;
  let speed = 4; // px per frame

  // 1. Dupliquer les logos pour effet infini
  function duplicateLogos() {
    const logos = Array.from(track.children);
    logos.forEach(logo => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });
  }
  duplicateLogos();

  // 2. Défilement automatique infini
  function autoScroll() {
    track.scrollLeft += speed;
    // Utilise transform pour un scroll fluide
    let current = getTranslateX();
    current -= speed;
    if (Math.abs(current) >= track.scrollWidth / 2) {
      current = 0;
    }
    track.style.transform = `translateX(${current}px)`;
    animationId = requestAnimationFrame(autoScroll);
  }
  function getTranslateX() {
    const style = window.getComputedStyle(track);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }
  // Init position
  track.style.transform = 'translateX(0px)';
  autoScroll();

  // 3. Drag to scroll
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    cancelAnimationFrame(animationId);
    startX = e.pageX - container.offsetLeft;
    scrollLeft = getTranslateX();
    container.classList.add('active');
  });
  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('active');
    cancelAnimationFrame(animationId);
    autoScroll();
  });
  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('active');
    cancelAnimationFrame(animationId);
    autoScroll();
  });
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    let newX = scrollLeft + walk;
    // Boucle infinie
    if (Math.abs(newX) >= track.scrollWidth / 2) {
      newX = 0;
    }
    track.style.transform = `translateX(${newX}px)`;
  });

  // Touch events (mobile)
  container.addEventListener('touchstart', (e) => {
    isDown = true;
    cancelAnimationFrame(animationId);
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = getTranslateX();
  });
  container.addEventListener('touchend', () => {
    isDown = false;
    cancelAnimationFrame(animationId);
    autoScroll();
  });
  container.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = x - startX;
    let newX = scrollLeft + walk;
    if (Math.abs(newX) >= track.scrollWidth / 2) {
      newX = 0;
    }
    track.style.transform = `translateX(${newX}px)`;
  });
});