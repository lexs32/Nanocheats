/**
 * Theme Engine for Optic Cheats
 * Default electric purple branding
 */
(function() {
  function hexToRgb(hex) {
    var c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(function(x) { return x + x; }).join('');
    var num = parseInt(c, 16);
    return ((num >> 16) & 255) + ', ' + ((num >> 8) & 255) + ', ' + (num & 255);
  }

  var OPTIC_THEME = {
    accent: "#7983ff",
    accentSecondary: "#a855f7",
    bg: "#0c0f16",
    card: "#131722",
    border: "rgba(121, 131, 255, 0.18)",
    glow: "rgba(121, 131, 255, 0.28)"
  };

  function applyTheme() {
    document.documentElement.style.setProperty('--accent', OPTIC_THEME.accent);
    document.documentElement.style.setProperty('--accent-secondary', OPTIC_THEME.accentSecondary);
    document.documentElement.style.setProperty('--bg-base', OPTIC_THEME.bg);
    document.documentElement.style.setProperty('--card-bg', OPTIC_THEME.card);
    document.documentElement.style.setProperty('--border-color', OPTIC_THEME.border);
    document.documentElement.style.setProperty('--glow-color', OPTIC_THEME.glow);

    var primaryRgb = hexToRgb(OPTIC_THEME.accent);
    var secondaryRgb = hexToRgb(OPTIC_THEME.accentSecondary);
    var bgRgb = hexToRgb(OPTIC_THEME.bg);
    var cardRgb = hexToRgb(OPTIC_THEME.card);

    document.documentElement.style.setProperty('--theme-brand_primary', primaryRgb);
    document.documentElement.style.setProperty('--theme-brand_secondary', secondaryRgb);
    document.documentElement.style.setProperty('--theme-brand_gradient', 'linear-gradient(to top right, rgb(' + primaryRgb + '), rgb(' + secondaryRgb + '))');
    document.documentElement.style.setProperty('--theme-page_background', bgRgb);
    document.documentElement.style.setProperty('--theme-area_background', cardRgb);
    document.documentElement.style.setProperty('--theme-area_background_light', cardRgb);
  }

  applyTheme();
  window.addEventListener('DOMContentLoaded', applyTheme);
})();