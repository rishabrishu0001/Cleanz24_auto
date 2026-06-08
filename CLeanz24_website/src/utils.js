export const handleSmoothScroll = (e, targetId) => {
  e.preventDefault();
  const targetSection = document.querySelector(targetId);
  if (!targetSection && targetId !== '#home') return;

  const targetPosition = targetId === '#home' 
    ? 0 
    : targetSection.getBoundingClientRect().top + window.pageYOffset - 100;
  
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800; // ms
  let start = null;

  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    
    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition);
    }
  });
};
