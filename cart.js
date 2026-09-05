/**
 * Optic Cheats - Master Shopping Cart & Instant Checkout Engine
 * Provides persistent cart, slide-over drawer, multi-payment checkout,
 * and automated license key delivery without emojis.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'optic_cart';
  const PROMO_KEY = 'optic_promo';

  let cart = [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }

  let currentPromo = null;
  try {
    const savedPromo = localStorage.getItem(PROMO_KEY);
    if (savedPromo) currentPromo = JSON.parse(savedPromo);
  } catch (e) {
    currentPromo = null;
  }

  let activePaymentMethod = 'card';
  let lastGeneratedKey = '';

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
    updateBadges();
  }

  function savePromo() {
    try {
      if (currentPromo) {
        localStorage.setItem(PROMO_KEY, JSON.stringify(currentPromo));
      } else {
        localStorage.removeItem(PROMO_KEY);
      }
    } catch (e) {}
  }

  function getCartSubtotal() {
    return cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.qty || 1)), 0);
  }

  function getCartTotal() {
    let subtotal = getCartSubtotal();
    if (currentPromo && currentPromo.discountPercent) {
      subtotal = subtotal * (1 - (currentPromo.discountPercent / 100));
    }
    return Math.max(0, subtotal);
  }

  function updateBadges() {
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
      b.textContent = totalQty;
      b.style.display = totalQty > 0 ? 'inline-flex' : 'none';
    });
  }

  // Public Cart API
  window.OpticCart = {
    getCart: () => cart,
    
    addToCart: function (item, autoOpen = true, directCheckout = false) {
      if (!item || !item.name) return;
      
      const duration = item.duration || '1 Day';
      const existingIdx = cart.findIndex(i => i.id === item.id && (i.duration || '1 Day') === duration);
      
      if (existingIdx > -1) {
        cart[existingIdx].qty = (cart[existingIdx].qty || 1) + (item.qty || 1);
      } else {
        cart.push({
          id: item.id || 'product',
          name: item.name,
          game: item.game || 'Optic Cheats',
          duration: duration,
          price: parseFloat(item.price) || 3.99,
          qty: parseInt(item.qty, 10) || 1,
          image: item.image || 'assets/cards/r6_primary.webp'
        });
      }
      
      saveCart();
      renderCartItems();

      if (autoOpen) {
        window.openCart(directCheckout ? 'checkout' : 'cart');
      }
    },

    removeFromCart: function (index) {
      if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        saveCart();
        renderCartItems();
      }
    },

    updateQty: function (index, delta) {
      if (index >= 0 && index < cart.length) {
        const newQty = (cart[index].qty || 1) + delta;
        if (newQty <= 0) {
          window.OpticCart.removeFromCart(index);
        } else {
          cart[index].qty = newQty;
          saveCart();
          renderCartItems();
        }
      }
    },

    clearCart: function () {
      cart = [];
      currentPromo = null;
      saveCart();
      savePromo();
      renderCartItems();
    }
  };

  // Global shorthand helpers
  window.openCart = function (view = 'cart') {
    const drawer = document.getElementById('opticCartDrawer');
    const overlay = document.getElementById('opticCartOverlay');
    if (!drawer || !overlay) return;

    overlay.style.display = 'block';
    setTimeout(() => {
      overlay.style.opacity = '1';
      drawer.style.transform = 'translateX(0)';
    }, 10);

    renderCartItems();
    window.switchCartView(view);
  };

  window.closeCart = function () {
    const drawer = document.getElementById('opticCartDrawer');
    const overlay = document.getElementById('opticCartOverlay');
    if (!drawer || !overlay) return;

    drawer.style.transform = 'translateX(100%)';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300);
  };

  window.switchCartView = function (view) {
    const cartView = document.getElementById('cartViewSection');
    const checkoutView = document.getElementById('checkoutViewSection');
    const successView = document.getElementById('successViewSection');
    if (!cartView || !checkoutView || !successView) return;

    cartView.style.display = 'none';
    checkoutView.style.display = 'none';
    successView.style.display = 'none';

    if (view === 'checkout') {
      if (cart.length === 0) {
        cartView.style.display = 'block';
        return;
      }
      renderCheckoutSummary();
      checkoutView.style.display = 'block';
    } else if (view === 'success') {
      renderSuccessView();
      successView.style.display = 'block';
    } else {
      renderCartItems();
      cartView.style.display = 'block';
    }
  };

  window.applyPromoCode = function () {
    const input = document.getElementById('cartPromoInput');
    const msg = document.getElementById('cartPromoMsg');
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    if (!code) return;

    if (code === 'OPTIC10' || code === 'OPTIC') {
      currentPromo = { code: code, discountPercent: 10 };
      savePromo();
      msg.innerHTML = '<span style="color:#10b981;font-size:12px;font-weight:600;"><i class="fa-solid fa-check"></i> Coupon OPTIC10 applied: 10% OFF</span>';
      renderCartItems();
    } else if (code === 'DISCORD') {
      currentPromo = { code: code, discountPercent: 5 };
      savePromo();
      msg.innerHTML = '<span style="color:#10b981;font-size:12px;font-weight:600;"><i class="fa-solid fa-check"></i> Discord Member Coupon applied: 5% OFF</span>';
      renderCartItems();
    } else {
      msg.innerHTML = '<span style="color:#ef4444;font-size:12px;font-weight:600;"><i class="fa-solid fa-circle-xmark"></i> Invalid coupon code</span>';
    }
  };

  window.selectPaymentMethod = function (method) {
    activePaymentMethod = method;
    const methods = ['card', 'crypto', 'cashapp', 'paypal'];
    methods.forEach(m => {
      const btn = document.getElementById('payMethodBtn_' + m);
      const pane = document.getElementById('payMethodPane_' + m);
      if (btn) {
        if (m === method) {
          btn.style.borderColor = '#7983ff';
          btn.style.background = 'rgba(121, 131, 255, 0.12)';
          btn.style.color = '#ffffff';
        } else {
          btn.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          btn.style.background = '#12161f';
          btn.style.color = '#8896a6';
        }
      }
      if (pane) {
        pane.style.display = m === method ? 'block' : 'none';
      }
    });
  };

  window.processCheckout = function (e) {
    if (e && e.preventDefault) e.preventDefault();

    const emailInput = document.getElementById('checkoutEmail');
    if (!emailInput || !emailInput.value.trim() || !emailInput.value.includes('@')) {
      alert('Please enter a valid email address for instant license key delivery.');
      if (emailInput) emailInput.focus();
      return;
    }

    const payBtn = document.getElementById('submitOrderBtn');
    if (payBtn) {
      payBtn.disabled = true;
      payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Instant Order...';
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const firstItem = cart[0] || { name: 'OPTIC' };
    const prefix = firstItem.name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase() || 'OPT';
    lastGeneratedKey = `OPTIC-${prefix}-${segment()}-${segment()}-ACT`;

    setTimeout(() => {
      window.OpticCart.clearCart();
      window.switchCartView('success');
      if (payBtn) {
        payBtn.disabled = false;
        payBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay and Complete Order';
      }
    }, 1200);
  };

  window.copyLicenseKey = function () {
    const keyBox = document.getElementById('deliveredKeyText');
    const toast = document.getElementById('copyKeyToast');
    if (!keyBox) return;

    navigator.clipboard.writeText(keyBox.innerText).then(() => {
      if (toast) {
        toast.style.display = 'inline-block';
        setTimeout(() => { toast.style.display = 'none'; }, 2500);
      }
    }).catch(() => {});
  };

  function renderCartItems() {
    const listEl = document.getElementById('cartItemsList');
    const emptyEl = document.getElementById('cartEmptyState');
    const footerEl = document.getElementById('cartFooterSection');
    const subtotalEl = document.getElementById('cartSubtotalAmount');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountEl = document.getElementById('cartDiscountAmount');
    const totalEl = document.getElementById('cartTotalAmount');
    const countHeader = document.getElementById('cartItemCountHeader');

    if (!listEl) return;

    if (countHeader) {
      const totalCount = cart.reduce((s, i) => s + (i.qty || 1), 0);
      countHeader.textContent = `(${totalCount})`;
    }

    if (cart.length === 0) {
      listEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'flex';
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (footerEl) footerEl.style.display = 'block';

    listEl.innerHTML = cart.map((item, idx) => {
      const itemTotal = (parseFloat(item.price) * (item.qty || 1)).toFixed(2);
      return `
        <div style="background: #10141e; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; position: relative;">
          <img src="${item.image || 'assets/cards/r6_primary.webp'}" alt="${item.name}" style="width: 56px; height: 56px; border-radius: 6px; object-fit: cover; border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 700; font-size: 14px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</div>
            <div style="display: flex; gap: 6px; align-items: center; margin-top: 3px;">
              <span style="font-size: 11px; background: rgba(121, 131, 255, 0.15); color: #7983ff; border: 1px solid rgba(121, 131, 255, 0.3); border-radius: 4px; padding: 1px 6px; font-weight: 700;">${item.duration}</span>
              <span style="font-size: 12px; color: #8896a6;">$${parseFloat(item.price).toFixed(2)} each</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
              <div style="display: inline-flex; align-items: center; background: #080c14; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;">
                <button onclick="window.OpticCart.updateQty(${idx}, -1)" style="background: none; border: none; color: #fff; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px;">-</button>
                <span style="font-size: 12px; font-weight: 700; color: #fff; min-width: 20px; text-align: center;">${item.qty || 1}</span>
                <button onclick="window.OpticCart.updateQty(${idx}, 1)" style="background: none; border: none; color: #fff; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px;">+</button>
              </div>
              <div style="font-size: 14px; font-weight: 800; color: #7983ff;">$${itemTotal}</div>
            </div>
          </div>
          <button onclick="window.OpticCart.removeFromCart(${idx})" title="Remove item" style="background: none; border: none; color: #64748b; cursor: pointer; padding: 6px; transition: color 0.2s;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#64748b'">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    }).join('');

    const subtotal = getCartSubtotal();
    const total = getCartTotal();

    if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2);

    if (discountRow && discountEl) {
      if (currentPromo && currentPromo.discountPercent) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-$${(subtotal - total).toFixed(2)} (${currentPromo.discountPercent}%)`;
      } else {
        discountRow.style.display = 'none';
      }
    }
  }

  function renderCheckoutSummary() {
    const listEl = document.getElementById('checkoutSummaryItems');
    const totalEl = document.getElementById('checkoutTotalDisplay');
    if (!listEl) return;

    listEl.innerHTML = cart.map(i => `
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <span style="color: #cbd5e1;"><b style="color: #fff;">${i.qty}x</b> ${i.name} (${i.duration})</span>
        <span style="color: #7983ff; font-weight: 700;">$${(parseFloat(i.price) * (i.qty || 1)).toFixed(2)}</span>
      </div>
    `).join('');

    if (totalEl) totalEl.textContent = '$' + getCartTotal().toFixed(2);
  }

  function renderSuccessView() {
    const keyEl = document.getElementById('deliveredKeyText');
    if (keyEl) keyEl.textContent = lastGeneratedKey;
  }

  function injectCartDrawerDOM() {
    if (document.getElementById('opticCartDrawer')) return;

    const overlay = document.createElement('div');
    overlay.id = 'opticCartOverlay';
    overlay.style.cssText = 'position: fixed; inset: 0; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 99998; display: none; opacity: 0; transition: opacity 0.3s ease;';
    overlay.onclick = window.closeCart;
    document.body.appendChild(overlay);

    const drawer = document.createElement('div');
    drawer.id = 'opticCartDrawer';
    drawer.style.cssText = 'position: fixed; top: 0; right: 0; bottom: 0; width: 100%; max-width: 440px; background: #090c13; border-left: 1px solid rgba(255, 255, 255, 0.08); z-index: 99999; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5); font-family: inherit;';

    drawer.innerHTML = `
      <div style="padding: 18px 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; align-items: center; justify-content: space-between; background: #0c1018; flex-shrink: 0;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(121, 131, 255, 0.15); border: 1px solid rgba(121, 131, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #7983ff;">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #ffffff;">Shopping Cart <span id="cartItemCountHeader" style="color: #7983ff; font-weight: 700; font-size: 14px;">(0)</span></h3>
            <p style="margin: 0; font-size: 11px; color: #8896a6;">Instant automated key delivery 24/7</p>
          </div>
        </div>
        <button onclick="window.closeCart()" style="background: none; border: none; color: #8896a6; font-size: 18px; cursor: pointer; padding: 6px; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#8896a6'">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div id="cartViewSection" style="display: flex; flex-direction: column; height: calc(100% - 69px); overflow-y: auto;">
        <div id="cartItemsList" style="padding: 16px; display: flex; flex-direction: column; gap: 10px; flex: 1;"></div>

        <div id="cartEmptyState" style="display: none; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; text-align: center; flex: 1;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: #121620; border: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; font-size: 24px; color: #64748b; margin-bottom: 16px;">
            <i class="fa-solid fa-basket-shopping"></i>
          </div>
          <h4 style="color: #fff; font-size: 16px; font-weight: 700; margin: 0 0 6px 0;">Your Cart Is Empty</h4>
          <p style="color: #8896a6; font-size: 13px; margin: 0 0 20px 0; max-width: 240px; line-height: 1.5;">Choose from our selection of premium undetected cheats with instant activation.</p>
          <a href="index.html" onclick="window.closeCart()" style="background: linear-gradient(135deg, #7983ff 0%, #a855f7 100%); color: #fff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-weight: 700; font-size: 13px;">
            Explore Products
          </a>
        </div>

        <div id="cartFooterSection" style="padding: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); background: #0c1018; flex-shrink: 0;">
          <div style="margin-bottom: 14px;">
            <div style="display: flex; gap: 8px;">
              <input type="text" id="cartPromoInput" placeholder="Discount Code (OPTIC10)" style="flex: 1; background: #121620; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 13px; text-transform: uppercase;">
              <button onclick="window.applyPromoCode()" style="background: #222736; border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 6px; padding: 8px 14px; font-size: 12px; font-weight: 700; cursor: pointer;">Apply</button>
            </div>
            <div id="cartPromoMsg" style="margin-top: 4px;"></div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between; color: #8896a6;">
              <span>Subtotal</span>
              <span id="cartSubtotalAmount" style="color: #fff; font-weight: 600;">$0.00</span>
            </div>
            <div id="cartDiscountRow" style="display: none; justify-content: space-between; color: #10b981;">
              <span>Promo Discount</span>
              <span id="cartDiscountAmount">-$0.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; color: #8896a6;">
              <span>Instant Digital Delivery</span>
              <span style="color: #10b981; font-weight: 700;">FREE</span>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; color: #ffffff;">
              <span>Total</span>
              <span id="cartTotalAmount" style="color: #7983ff;">$0.00</span>
            </div>
          </div>

          <button onclick="window.switchCartView('checkout')" style="width: 100%; background: linear-gradient(135deg, #7983ff 0%, #a855f7 100%); color: #fff; border: none; border-radius: 6px; padding: 13px; font-weight: 800; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(121, 131, 255, 0.35); transition: transform 0.15s ease;">
            <i class="fa-solid fa-lock"></i> Proceed to Checkout
          </button>

          <div style="display: flex; justify-content: center; gap: 14px; margin-top: 12px; color: #64748b; font-size: 11px;">
            <span><i class="fa-solid fa-shield-halved" style="color: #7983ff; margin-right: 4px;"></i> 256-Bit SSL Encrypted</span>
            <span><i class="fa-solid fa-bolt" style="color: #eab308; margin-right: 4px;"></i> Instant Activation</span>
          </div>
        </div>
      </div>

      <div id="checkoutViewSection" style="display: none; flex-direction: column; height: calc(100% - 69px); overflow-y: auto; padding: 18px 20px;">
        <button onclick="window.switchCartView('cart')" style="background: none; border: none; color: #7983ff; font-size: 13px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0; margin-bottom: 16px;">
          <i class="fa-solid fa-arrow-left"></i> Back to Cart
        </button>

        <h4 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 800; color: #fff;">1. Customer Delivery Email</h4>
        <input type="email" id="checkoutEmail" placeholder="your-email@example.com" value="customer@example.com" required style="width: 100%; box-sizing: border-box; background: #121620; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; padding: 10px 14px; color: #fff; font-size: 13px; margin-bottom: 18px;">

        <h4 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 800; color: #fff;">2. Select Payment Method</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 16px;">
          <button type="button" id="payMethodBtn_card" onclick="window.selectPaymentMethod('card')" style="background: rgba(121, 131, 255, 0.12); border: 1px solid #7983ff; border-radius: 6px; padding: 10px; color: #fff; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i class="fa-solid fa-credit-card"></i> Card / Apple Pay
          </button>
          <button type="button" id="payMethodBtn_crypto" onclick="window.selectPaymentMethod('crypto')" style="background: #12161f; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 6px; padding: 10px; color: #8896a6; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i class="fa-brands fa-bitcoin"></i> Crypto (BTC/USDT)
          </button>
          <button type="button" id="payMethodBtn_cashapp" onclick="window.selectPaymentMethod('cashapp')" style="background: #12161f; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 6px; padding: 10px; color: #8896a6; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i class="fa-solid fa-dollar-sign"></i> Cash App Pay
          </button>
          <button type="button" id="payMethodBtn_paypal" onclick="window.selectPaymentMethod('paypal')" style="background: #12161f; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 6px; padding: 10px; color: #8896a6; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i class="fa-brands fa-paypal"></i> PayPal
          </button>
        </div>

        <div id="payMethodPane_card" style="background: #10141e; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 14px; margin-bottom: 18px;">
          <label style="display: block; font-size: 11px; color: #8896a6; margin-bottom: 6px; font-weight: 600;">CARD NUMBER</label>
          <div style="position: relative; margin-bottom: 10px;">
            <input type="text" placeholder="4242 •••• •••• 4242" value="4242 •••• •••• 4242" style="width: 100%; box-sizing: border-box; background: #080c14; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 9px 12px; color: #fff; font-size: 13px;">
            <i class="fa-brands fa-cc-visa" style="position: absolute; right: 12px; top: 11px; color: #7983ff; font-size: 18px;"></i>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div>
              <label style="display: block; font-size: 11px; color: #8896a6; margin-bottom: 4px; font-weight: 600;">EXPIRY</label>
              <input type="text" placeholder="MM / YY" value="12/28" style="width: 100%; box-sizing: border-box; background: #080c14; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 9px 12px; color: #fff; font-size: 13px;">
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #8896a6; margin-bottom: 4px; font-weight: 600;">CVC</label>
              <input type="text" placeholder="CVC" value="888" style="width: 100%; box-sizing: border-box; background: #080c14; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 9px 12px; color: #fff; font-size: 13px;">
            </div>
          </div>
        </div>

        <div id="payMethodPane_crypto" style="display: none; background: #10141e; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 14px; margin-bottom: 18px; text-align: center;">
          <div style="font-size: 12px; color: #cbd5e1; margin-bottom: 8px; font-weight: 600;">Automated Crypto Gateway (BTC, LTC, USDT, ETH)</div>
          <p style="font-size: 11px; color: #8896a6; margin: 0 0 10px 0;">Your invoice and wallet address will be locked for 60 minutes with zero confirmation delay.</p>
          <div style="background: #080c14; border: 1px dashed rgba(121, 131, 255, 0.4); border-radius: 6px; padding: 10px; font-size: 11px; color: #7983ff; font-family: monospace;">
            Instant On-Chain / SegWit Verification
          </div>
        </div>

        <div id="payMethodPane_cashapp" style="display: none; background: #10141e; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 14px; margin-bottom: 18px;">
          <div style="font-size: 12px; color: #00D632; font-weight: 700; margin-bottom: 4px;"><i class="fa-solid fa-dollar-sign"></i> Cash App Automated Pay</div>
          <p style="font-size: 11px; color: #8896a6; margin: 0;">Clicking Complete Order will open Cash App Pay on mobile or show your QR code to scan and authorize instantly.</p>
        </div>

        <div id="payMethodPane_paypal" style="display: none; background: #10141e; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 14px; margin-bottom: 18px;">
          <div style="font-size: 12px; color: #0079C1; font-weight: 700; margin-bottom: 4px;"><i class="fa-brands fa-paypal"></i> PayPal Express</div>
          <p style="font-size: 11px; color: #8896a6; margin: 0;">Instant key delivery via PayPal Friends &amp; Family or Goods &amp; Services balance.</p>
        </div>

        <div style="background: #0c1018; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; margin-bottom: 18px;">
          <div style="font-size: 11px; font-weight: 800; color: #8896a6; margin-bottom: 8px; text-transform: uppercase;">Order Items</div>
          <div id="checkoutSummaryItems"></div>
          <div style="display: flex; justify-content: space-between; margin-top: 10px; font-weight: 800; font-size: 15px; color: #fff;">
            <span>Due Now:</span>
            <span id="checkoutTotalDisplay" style="color: #7983ff;">$0.00</span>
          </div>
        </div>

        <button id="submitOrderBtn" onclick="window.processCheckout(event)" style="width: 100%; background: linear-gradient(135deg, #7983ff 0%, #a855f7 100%); color: #fff; border: none; border-radius: 6px; padding: 14px; font-weight: 800; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(121, 131, 255, 0.35);">
          <i class="fa-solid fa-lock"></i> Pay and Complete Order
        </button>
      </div>

      <div id="successViewSection" style="display: none; flex-direction: column; height: calc(100% - 69px); overflow-y: auto; padding: 30px 20px; text-align: center;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; color: #10b981; font-size: 28px; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px auto;">
          <i class="fa-solid fa-check"></i>
        </div>

        <h3 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #fff;">Order Completed!</h3>
        <p style="margin: 0 0 20px 0; font-size: 13px; color: #8896a6; line-height: 1.5;">Your payment has been verified. Your license key and setup guide are ready below.</p>

        <div style="background: #10141e; border: 1px solid rgba(121, 131, 255, 0.4); border-radius: 8px; padding: 16px; margin-bottom: 16px; position: relative;">
          <div style="font-size: 11px; font-weight: 700; color: #8896a6; margin-bottom: 8px; text-transform: uppercase;">YOUR ACTIVATION KEY</div>
          <div id="deliveredKeyText" style="font-family: monospace; font-size: 16px; font-weight: 800; color: #7983ff; letter-spacing: 1px; word-break: break-all; margin-bottom: 10px;">OPTIC-KEY-XXXX-XXXX</div>
          <button onclick="window.copyLicenseKey()" style="background: #222736; border: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 12px; font-weight: 700; border-radius: 4px; padding: 6px 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-regular fa-copy"></i> Copy Key
          </button>
          <div id="copyKeyToast" style="display: none; font-size: 11px; color: #10b981; font-weight: 700; margin-top: 6px;">Copied to clipboard!</div>
        </div>

        <div style="background: #080c14; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 14px; text-align: left; margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: 800; color: #fff; margin-bottom: 6px;"><i class="fa-solid fa-circle-info" style="color: #7983ff; margin-right: 6px;"></i> How to activate:</div>
          <ol style="margin: 0; padding-left: 18px; color: #cbd5e1; font-size: 12px; line-height: 1.6;">
            <li>Download the loader from our verified secure link.</li>
            <li>Run loader as Administrator and paste your key.</li>
            <li>Launch the game and press INS / F5 in-game.</li>
          </ol>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <a href="https://discord.gg/opticcheats" target="_blank" style="background: #5865F2; color: #fff; text-decoration: none; padding: 12px; border-radius: 6px; font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <i class="fa-brands fa-discord"></i> Join Discord Support
          </a>
          <button onclick="window.closeCart(); window.switchCartView('cart');" style="background: #1a202c; border: 1px solid rgba(255,255,255,0.08); color: #cbd5e1; border-radius: 6px; padding: 11px; font-weight: 700; font-size: 13px; cursor: pointer;">
            Continue Shopping
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectCartDrawerDOM();
      updateBadges();
    });
  } else {
    injectCartDrawerDOM();
    updateBadges();
  }

})();