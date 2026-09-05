/**
 * Visual Theme & Palette Switcher for Optic Cheats
 * 100% Invision Community (IPS / Nexus) Theme Engine
 */
(function() {
  function hexToRgb(hex) {
    var c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(function(x) { return x + x; }).join('');
    var num = parseInt(c, 16);
    return ((num >> 16) & 255) + ', ' + ((num >> 8) & 255) + ', ' + (num & 255);
  }

  var PRESETS = {
    optic: {
      name: "Optic Cheats (Official)",
      accent: "#7983ff",
      accentSecondary: "#a855f7",
      bg: "#0c0f16",
      card: "#131722",
      border: "rgba(121, 131, 255, 0.18)",
      glow: "rgba(121, 131, 255, 0.28)"
    },
    chester: {
      name: "Chester Indigo",
      accent: "#8b60ff",
      accentSecondary: "#2dc6ff",
      bg: "#0c0d12",
      card: "#14161f",
      border: "rgba(255, 255, 255, 0.08)",
      glow: "rgba(139, 96, 255, 0.25)"
    },
    cyan: {
      name: "Electric Cyan",
      accent: "#00e5ff",
      accentSecondary: "#0070f3",
      bg: "#090a0f",
      card: "#11141d",
      border: "rgba(0, 229, 255, 0.15)",
      glow: "rgba(0, 229, 255, 0.25)"
    },
    emerald: {
      name: "Matrix Emerald",
      accent: "#10b981",
      accentSecondary: "#059669",
      bg: "#060d09",
      card: "#0d1f15",
      border: "rgba(16, 185, 129, 0.2)",
      glow: "rgba(16, 185, 129, 0.25)"
    },
    crimson: {
      name: "Crimson Red",
      accent: "#ef4444",
      accentSecondary: "#f43f5e",
      bg: "#0d0707",
      card: "#1a0f0f",
      border: "rgba(239, 68, 68, 0.2)",
      glow: "rgba(239, 68, 68, 0.25)"
    },
    gold: {
      name: "Solar Gold",
      accent: "#f59e0b",
      accentSecondary: "#d97706",
      bg: "#0c0a06",
      card: "#1c170d",
      border: "rgba(245, 158, 11, 0.2)",
      glow: "rgba(245, 158, 11, 0.25)"
    }
  };

  function applyTheme(presetKey) {
    var theme = PRESETS[presetKey] || PRESETS.optic;
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--accent-secondary', theme.accentSecondary);
    document.documentElement.style.setProperty('--bg-base', theme.bg);
    document.documentElement.style.setProperty('--card-bg', theme.card);
    document.documentElement.style.setProperty('--border-color', theme.border);
    document.documentElement.style.setProperty('--glow-color', theme.glow);

    // Dynamic Invision Community Framework variable bridge
    var primaryRgb = hexToRgb(theme.accent);
    var secondaryRgb = hexToRgb(theme.accentSecondary || theme.accent);
    var bgRgb = hexToRgb(theme.bg);
    var cardRgb = hexToRgb(theme.card);

    document.documentElement.style.setProperty('--theme-brand_primary', primaryRgb);
    document.documentElement.style.setProperty('--theme-brand_secondary', secondaryRgb);
    document.documentElement.style.setProperty('--theme-brand_gradient', 'linear-gradient(to top right, rgb(' + primaryRgb + '), rgb(' + secondaryRgb + '))');
    document.documentElement.style.setProperty('--theme-page_background', bgRgb);
    document.documentElement.style.setProperty('--theme-area_background', cardRgb);
    document.documentElement.style.setProperty('--theme-area_background_light', cardRgb);

    localStorage.setItem('store_theme_preset', presetKey);
  }

  window.addEventListener('DOMContentLoaded', function() {
    var saved = localStorage.getItem('store_theme_preset') || (window.STORE_CONFIG ? window.STORE_CONFIG.theme.preset : 'optic');
    applyTheme(saved);

    // Create Theme Drawer
    var drawer = document.createElement('div');
    drawer.id = 'themeEngineDrawer';
    
    var buttonsHtml = '';
    for (var k in PRESETS) {
      var v = PRESETS[k];
      buttonsHtml += '<button class="preset-btn" data-key="' + k + '" style="display:flex;align-items:center;gap:8px;background:#181b26;border:1px solid rgba(255,255,255,0.08);color:#fff;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;text-align:left;transition:all 0.2s;"><span style="width:14px;height:14px;border-radius:50%;background:' + v.accent + ';flex-shrink:0;"></span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + v.name.split(' ')[0] + '</span></button>';
    }

    drawer.innerHTML = '<div id="themeToggleBtn" style="position:fixed;bottom:20px;right:20px;z-index:99999;background:var(--accent,#7983ff);color:#fff;padding:10px 18px;border-radius:9999px;cursor:pointer;font-weight:700;font-size:13px;display:flex;align-items:center;gap:8px;box-shadow:0 8px 30px rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.2);"><i class="fa-solid fa-palette"></i> PALETTE</div>' +
      '<div id="themePanel" style="display:none;position:fixed;bottom:75px;right:20px;z-index:99999;width:320px;background:#12141c;border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,0.8);color:#fff;font-family:Inter,sans-serif;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;"><h4 style="margin:0;font-size:15px;font-weight:800;display:flex;align-items:center;gap:8px;"><i class="fa-solid fa-wand-magic-sparkles" style="color:var(--accent);"></i> Theme Engine</h4><span id="closeThemePanel" style="cursor:pointer;opacity:0.6;font-size:18px;">&times;</span></div>' +
        '<p style="font-size:12px;color:#8f9bb3;margin:0 0 14px;line-height:1.5;">Select a color palette preset to preview your storefront:</p>' +
        '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:16px;">' + buttonsHtml + '</div>' +
        '<div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:12px;display:flex;flex-direction:column;gap:8px;"><label style="font-size:11px;font-weight:700;color:#8f9bb3;text-transform:uppercase;">Custom Accent Color</label><div style="display:flex;gap:8px;"><input type="color" id="customColorPicker" value="#7983ff" style="width:40px;height:36px;border:none;border-radius:6px;cursor:pointer;background:transparent;"><input type="text" id="customColorHex" value="#7983ff" style="flex:1;background:#181b26;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#fff;padding:0 10px;font-size:13px;"></div></div>' +
      '</div>';
    document.body.appendChild(drawer);

    var toggleBtn = document.getElementById('themeToggleBtn');
    var panel = document.getElementById('themePanel');
    var closeBtn = document.getElementById('closeThemePanel');

    toggleBtn.addEventListener('click', function() {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
    closeBtn.addEventListener('click', function() {
      panel.style.display = 'none';
    });

    var presetBtns = document.querySelectorAll('.preset-btn');
    for (var i = 0; i < presetBtns.length; i++) {
      presetBtns[i].addEventListener('click', function() {
        var key = this.getAttribute('data-key');
        applyTheme(key);
      });
    }

    var picker = document.getElementById('customColorPicker');
    var hexInput = document.getElementById('customColorHex');

    picker.addEventListener('input', function(e) {
      var color = e.target.value;
      hexInput.value = color;
      document.documentElement.style.setProperty('--accent', color);
      var prgb = hexToRgb(color);
      document.documentElement.style.setProperty('--theme-brand_primary', prgb);
      document.documentElement.style.setProperty('--theme-brand_gradient', 'linear-gradient(to top right, rgb(' + prgb + '), #a855f7)');
    });
    hexInput.addEventListener('input', function(e) {
      var color = e.target.value;
      picker.value = color;
      document.documentElement.style.setProperty('--accent', color);
      var prgb = hexToRgb(color);
      document.documentElement.style.setProperty('--theme-brand_primary', prgb);
      document.documentElement.style.setProperty('--theme-brand_gradient', 'linear-gradient(to top right, rgb(' + prgb + '), #a855f7)');
    });
  });
})();
