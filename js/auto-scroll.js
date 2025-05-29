document.addEventListener("DOMContentLoaded", function () {
  /**
   * Initialise un slider auto-scrollable et draggable
   * @param {string} trackSelector - Sélecteur du track (ex: '#sliderTrack')
   * @param {string} containerSelector - Sélecteur du container (ex: '#sliderContainer')
   * @param {object} options - { speed: number, direction: 'left'|'right' }
   */
  function initAutoScrollSlider(trackSelector, containerSelector, options = {}) {
    const track = document.querySelector(trackSelector);
    const container = document.querySelector(containerSelector);
    if (!track || !container) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let animationId;
    const speed = options.speed || 2;
    const direction = options.direction || 'left';

    // Duplique les logos pour effet infini
    function duplicateLogos() {
      const logos = Array.from(track.children);
      logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
      });
    }
    duplicateLogos();

    // Scroll automatique
    function autoScroll() {
      let current = getTranslateX();
      current += (direction === 'right' ? speed : -speed);
      const limit = -track.scrollWidth / 2;
      if (direction === 'left' && Math.abs(current) >= track.scrollWidth / 2) {
        current = 0;
      }
      if (direction === 'right' && current >= 0) {
        current = limit;
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
    track.style.transform = direction === 'right'
      ? `translateX(${-track.scrollWidth / 2}px)`
      : 'translateX(0px)';
    autoScroll();

    // Drag to scroll
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
      const limit = -track.scrollWidth / 2;
      if (direction === 'left' && Math.abs(newX) >= track.scrollWidth / 2) {
        newX = 0;
      }
      if (direction === 'right' && newX >= 0) {
        newX = limit;
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
      const limit = -track.scrollWidth / 2;
      if (direction === 'left' && Math.abs(newX) >= track.scrollWidth / 2) {
        newX = 0;
      }
      if (direction === 'right' && newX >= 0) {
        newX = limit;
      }
      track.style.transform = `translateX(${newX}px)`;
    });
  }

  // Utilisation pour chaque slider :
  initAutoScrollSlider('#sliderTrack', '#sliderContainer', { speed: 4, direction: 'left' });
  initAutoScrollSlider('#slider-track1', '#sliderContainer1', { speed: 4, direction: 'right' });
  initAutoScrollSlider('#slider-track2', '#sliderContainer2', { speed: 4, direction: 'left' });
  initAutoScrollSlider('#slider-track3', '#sliderContainer3', { speed: 4, direction: 'right' });
  // Pour un nouveau slider, ajoute simplement :
  // initAutoScrollSlider('#nouveauTrack', '#nouveauContainer', { speed: 3, direction: 'left' });
});