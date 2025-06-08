// Dark mode toggle functionality with perfect half-circle alignment

document.addEventListener('DOMContentLoaded', () => {
  const themeSlider = document.getElementById('themeSlider');
  const sliderCircle = document.getElementById('sliderCircle');
  const sliderIcon = document.getElementById('sliderIcon');
  const lightModeText = document.getElementById('lightModeText');
  const darkModeText = document.getElementById('darkModeText');

  // Check for saved theme preference, default to light
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  function updateSliderUI(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      // Move circle to far right (perfect half-circle alignment)
      sliderCircle.style.left = 'calc(70%)';
      sliderIcon.textContent = '🌙';
      
      // Position text on left side with good spacing
      lightModeText.style.opacity = '0';
      darkModeText.style.opacity = '1';
      darkModeText.style.left = '24px';
      darkModeText.style.right = 'auto';
    } else {
      document.documentElement.classList.remove('dark');
      // Move circle to far left (perfect half-circle alignment)
      sliderCircle.style.left = '0px';
      sliderIcon.textContent = '☀️';
      
      // Position text on right side with good spacing
      darkModeText.style.opacity = '0';
      lightModeText.style.opacity = '1';
      lightModeText.style.right = '24px';
      lightModeText.style.left = 'auto';
    }
  }

  // Initial UI update
  updateSliderUI(isDarkMode);

  // Toggle dark mode on slider click
  themeSlider.addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark');
    updateSliderUI(isDark);
    localStorage.setItem('darkMode', isDark);
  });
}); 