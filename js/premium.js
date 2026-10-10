/* ============================================
   Premium UI/UX â€” JavaScript Enhancements
   Ù…Ø¤Ø³Ø³Ø© Ø¢Ù„ Ø²Ù‡Ø±Ø§Ù† â€” Tier 1 Features
   ============================================ */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {

        // ============================================
        // ============================================
        // 2. PAGE TRANSITIONS
        // ============================================
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            // Only for internal .html links (not anchors, not external)
            if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('mailto') && !href.includes('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    overlay.classList.add('entering');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 400);
                });
            }
        });

        // ============================================
        // 3. PARALLAX HERO
        // ============================================
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('parallax');
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroBefore = hero.querySelector('.hero-content');
                if (heroBefore && scrolled < window.innerHeight) {
                    hero.style.setProperty('--parallax-y', (scrolled * 0.3) + 'px');
                    // Parallax for the background
                    hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
                }
            }, { passive: true });
        }

        // ============================================
        // 4. SPEED DIAL (replaces old whatsapp float)
        // ============================================
        const oldWhatsapp = document.querySelector('.whatsapp-float');
        if (oldWhatsapp) oldWhatsapp.remove(); // Remove old float

        const speedDial = document.createElement('div');
        speedDial.className = 'speed-dial';
        speedDial.id = 'speedDial';
        speedDial.innerHTML = `
            <div class="speed-dial-actions">
                <a href="https://wa.me/201229333957" target="_blank" class="speed-dial-action">
                    <span class="label">ÙˆØ§ØªØ³Ø§Ø¨</span>
                    <div class="speed-dial-action-btn sd-whatsapp"><i class="fab fa-whatsapp"></i></div>
                </a>
                <a href="tel:+201229333957" class="speed-dial-action">
                    <span class="label">Ø§ØªØµØ§Ù„ Ù…Ø¨Ø§Ø´Ø±</span>
                    <div class="speed-dial-action-btn sd-phone"><i class="fas fa-phone-alt"></i></div>
                </a>
                <a href="mailto:alzahranlaw1@gmail.com" class="speed-dial-action">
                    <span class="label">Ø¨Ø±ÙŠØ¯ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ</span>
                    <div class="speed-dial-action-btn sd-email"><i class="fas fa-envelope"></i></div>
                </a>
                <a href="contact.html" class="speed-dial-action">
                    <span class="label">Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆØ§Ù„Ø®Ø±ÙŠØ·Ø©</span>
                    <div class="speed-dial-action-btn sd-map"><i class="fas fa-map-marker-alt"></i></div>
                </a>
            </div>
            <button class="speed-dial-trigger" aria-label="Ø·Ø±Ù‚ Ø§Ù„ØªÙˆØ§ØµÙ„">
                <i class="fab fa-whatsapp"></i>
            </button>
        `;
        document.body.appendChild(speedDial);

        const sdTrigger = speedDial.querySelector('.speed-dial-trigger');
        sdTrigger.addEventListener('click', () => {
            speedDial.classList.toggle('open');
            sdTrigger.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!speedDial.contains(e.target)) {
                speedDial.classList.remove('open');
                sdTrigger.classList.remove('open');
            }
        });

        // ============================================
        // 5. NEWS TICKER
        // ============================================
        const headerEl = document.getElementById('header');
        if (headerEl && !document.querySelector('.news-ticker')) {
            const ticker = document.createElement('div');
            ticker.className = 'news-ticker';
            ticker.innerHTML = `
                <div class="news-ticker-badge">
                    <i class="fas fa-bolt"></i> Ø¹Ø§Ø¬Ù„
                </div>
                <div class="news-ticker-content">
                    <div class="news-ticker-item"><span class="dot"></span> Ø§Ù„Ù…Ø¤Ø³Ø³Ø© ØªÙ‚Ø¨Ù„ Ø§Ù„ØªÙˆÙƒÙŠÙ„Ø§Øª ÙÙŠ Ø¬Ù…ÙŠØ¹ Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ù‚Ø¶Ø§ÙŠØ§ Ø£Ù…Ø§Ù… ÙƒØ§ÙØ© Ø§Ù„Ù…Ø­Ø§ÙƒÙ… Ø§Ù„Ù…ØµØ±ÙŠØ©</div>
                    <div class="news-ticker-item"><span class="dot"></span> Ø®Ø¯Ù…Ø© Ø§Ù„Ø§Ø³ØªØ´Ø§Ø±Ø© Ø§Ù„Ø£ÙˆÙ„ÙŠØ© Ù…ØªØ§Ø­Ø© Ù„Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…ÙˆÙƒÙ„ÙŠÙ† â€” Ø§Ø­Ø¬Ø² Ù…ÙˆØ¹Ø¯Ùƒ Ø§Ù„Ø¢Ù†</div>
                    <div class="news-ticker-item"><span class="dot"></span> ØªÙ†ÙˆÙŠÙ‡: Ù„Ø§ ØªØ¯ÙØ¹ Ø£ÙŠ Ù…Ø¨Ø§Ù„Øº Ù…Ø§Ù„ÙŠØ© Ø¥Ù„Ø§ Ø¨Ø¹Ø¯ ØªÙˆÙ‚ÙŠØ¹ Ø¹Ù‚Ø¯ Ø£ØªØ¹Ø§Ø¨ Ø±Ø³Ù…ÙŠ Ù…Ø¹ Ø§Ù„Ù…Ø¤Ø³Ø³Ø©</div>
                    <div class="news-ticker-item"><span class="dot"></span> Ù†ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ Ø§Ù„Ù‚Ø¶Ø§ÙŠØ§ Ø§Ù„Ø¬Ù†Ø§Ø¦ÙŠØ© Ø§Ù„Ø¹Ø§Ø¬Ù„Ø© Ø¹Ù„Ù‰ Ù…Ø¯Ø§Ø± Ø§Ù„Ø³Ø§Ø¹Ø© â€” Ø§ØªØµÙ„ ÙÙˆØ±Ø§Ù‹</div>
                    <div class="news-ticker-item"><span class="dot"></span> Ù…Ø¤Ø³Ø³Ø© Ø¢Ù„ Ø²Ù‡Ø±Ø§Ù†: Ø³Ø±ÙŠØ© Ù…Ø·Ù„Ù‚Ø© â€” Ø§Ù„ØªØ²Ø§Ù… ÙƒØ§Ù…Ù„ Ø¨Ø£Ø¯Ø¨ÙŠØ§Øª Ù…Ù‡Ù†Ø© Ø§Ù„Ù…Ø­Ø§Ù…Ø§Ø© Ø§Ù„Ù…ØµØ±ÙŠØ©</div>
                </div>
            `;
            headerEl.insertAdjacentElement('afterend', ticker);
        }

        // ============================================
        // 6. READING TIME ESTIMATOR
        // ============================================
        document.querySelectorAll('.blog-card-body, .law-card, .modal-content, .legal-content').forEach(card => {
            const text = card.textContent || '';
            const wordCount = text.trim().split(/\s+/).length;
            const readingTime = Math.max(1, Math.ceil(wordCount / 200));
            
            const meta = card.querySelector('.meta');
            if (meta && !meta.querySelector('.reading-time')) {
                const badge = document.createElement('span');
                badge.className = 'reading-time';
                badge.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} Ø¯Ù‚ÙŠÙ‚Ø© Ù‚Ø±Ø§Ø¡Ø©`;
                meta.appendChild(badge);
            }
        });

        // ============================================
        // 7. MEGA MENU â€” Transform services link
        // ============================================
        const servicesLink = document.querySelector('a[href="index.html#services"]');
        if (servicesLink) {
            const li = servicesLink.parentElement;
            li.classList.add('has-mega-menu');

            const megaMenu = document.createElement('div');
            megaMenu.className = 'mega-menu';
            megaMenu.innerHTML = `
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-gavel"></i></div>
                    <div class="mega-menu-text"><h4>Ø§Ù„Ù‚Ø¶Ø§ÙŠØ§ Ø§Ù„Ù…Ø¯Ù†ÙŠØ©</h4><p>Ø¹Ù‚ÙˆØ¯ØŒ ØªØ¹ÙˆÙŠØ¶Ø§ØªØŒ Ø¥ÙŠØ¬Ø§Ø±Ø§Øª</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-user-shield"></i></div>
                    <div class="mega-menu-text"><h4>Ø§Ù„Ù‚Ø§Ù†ÙˆÙ† Ø§Ù„Ø¬Ù†Ø§Ø¦ÙŠ</h4><p>Ø¯ÙØ§Ø¹ØŒ Ø·Ø¹Ù†ØŒ ØªØ­Ù‚ÙŠÙ‚Ø§Øª</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-heart"></i></div>
                    <div class="mega-menu-text"><h4>Ø§Ù„Ø£Ø­ÙˆØ§Ù„ Ø§Ù„Ø´Ø®ØµÙŠØ©</h4><p>Ø·Ù„Ø§Ù‚ØŒ Ù†ÙÙ‚Ø©ØŒ Ø­Ø¶Ø§Ù†Ø©</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-briefcase"></i></div>
                    <div class="mega-menu-text"><h4>Ù‚Ø§Ù†ÙˆÙ† Ø§Ù„Ø¹Ù…Ù„</h4><p>ÙØµÙ„ ØªØ¹Ø³ÙÙŠØŒ ØªØ£Ù…ÙŠÙ†Ø§Øª</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-building"></i></div>
                    <div class="mega-menu-text"><h4>Ø§Ù„Ø´Ø±ÙƒØ§Øª ÙˆØ§Ù„ØªØ¬Ø§Ø±Ø©</h4><p>ØªØ£Ø³ÙŠØ³ØŒ Ø¹Ù‚ÙˆØ¯ØŒ Ø¹Ù„Ø§Ù…Ø§Øª</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-landmark"></i></div>
                    <div class="mega-menu-text"><h4>Ø§Ù„Ù‚Ø¶Ø§Ø¡ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ</h4><p>Ù…Ø¬Ù„Ø³ Ø§Ù„Ø¯ÙˆÙ„Ø©ØŒ Ø·Ø¹ÙˆÙ†</p></div>
                </a>
            `;
            li.appendChild(megaMenu);
        }

        // ============================================
        // 8. DOCUMENT VERIFICATION (in Footer)
        // ============================================
        const footerBottom = document.querySelector('.footer-bottom');
        if (footerBottom && !document.querySelector('.verify-section')) {
            const verifySection = document.createElement('div');
            verifySection.className = 'verify-section';
            verifySection.innerHTML = `
                <i class="fas fa-shield-alt"></i>
                <div>
                    <h4>Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† ØµØ­Ø© Ø§Ù„ÙˆØ«Ø§Ø¦Ù‚</h4>
                    <p>Ø£Ø¯Ø®Ù„ Ø§Ù„ÙƒÙˆØ¯ Ø§Ù„Ù…Ø±Ø¬Ø¹ÙŠ Ù„Ù„ÙˆØ«ÙŠÙ‚Ø© Ø§Ù„ØµØ§Ø¯Ø±Ø© Ù…Ù† Ø§Ù„Ù…Ø¤Ø³Ø³Ø©</p>
                </div>
                <div class="verify-input-group">
                    <input type="text" placeholder="Ø£Ø¯Ø®Ù„ Ø§Ù„ÙƒÙˆØ¯ Ø§Ù„Ù…Ø±Ø¬Ø¹ÙŠ..." id="verifyCode">
                    <button onclick="verifyDoc()">ØªØ­Ù‚Ù‚</button>
                </div>
            `;
            footerBottom.insertAdjacentElement('beforebegin', verifySection);
        }

    }); // end DOMContentLoaded

    // Document Verification
    window.verifyDoc = function() {
        const code = document.getElementById('verifyCode')?.value.trim();
        if (!code) {
            showToast('ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ù„ÙƒÙˆØ¯ Ø§Ù„Ù…Ø±Ø¬Ø¹ÙŠ Ø£ÙˆÙ„Ø§Ù‹', 'exclamation-triangle');
            return;
        }
        // Redirect to WhatsApp for verification
        const msg = encodeURIComponent('Ù…Ø±Ø­Ø¨Ø§Ù‹ØŒ Ø£Ø±ÙŠØ¯ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† ØµØ­Ø© ÙˆØ«ÙŠÙ‚Ø© ØµØ§Ø¯Ø±Ø© Ù…Ù† Ø§Ù„Ù…Ø¤Ø³Ø³Ø©.\nØ§Ù„ÙƒÙˆØ¯ Ø§Ù„Ù…Ø±Ø¬Ø¹ÙŠ: ' + code);
        window.open('https://wa.me/201229333957?text=' + msg, '_blank');
        showToast('ÙŠØªÙ… ØªØ­ÙˆÙŠÙ„Ùƒ Ù„Ù„ØªØ­Ù‚Ù‚ Ø¹Ø¨Ø± Ø³ÙƒØ±ØªØ§Ø±ÙŠØ© Ø§Ù„Ù…Ø¤Ø³Ø³Ø©...');
    };

    // Toast (in case main.js hasn't defined it yet)
    if (typeof window.showToast !== 'function') {
        window.showToast = function(message, icon) {
            icon = icon || 'check-circle';
            let container = document.querySelector('.toast-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'toast-container';
                document.body.appendChild(container);
            }
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 4500);
        };
    }
})();

// ============================================
// Psychological & Conversion UX (Growth Hacking)
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. Exit-Intent Popup ===
    // Create popup HTML
    const exitPopup = document.createElement("div");
    exitPopup.className = "exit-popup-overlay";
    exitPopup.innerHTML = `
        <div class="exit-popup-content">
            <button class="exit-popup-close"><i class="fas fa-times"></i></button>
            <i class="fas fa-balance-scale-right exit-popup-icon"></i>
            <h3 class="exit-popup-title">Ù„Ø­Ø¸Ø© Ù…Ù† ÙØ¶Ù„Ùƒ!</h3>
            <p class="exit-popup-text">Ù†Ø¹Ù„Ù… Ø£Ù† Ø§Ù„Ù‚Ø¶Ø§ÙŠØ§ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© Ù‚Ø¯ ØªÙƒÙˆÙ† Ù…Ø±Ù‡Ù‚Ø©. Ù‚Ø¨Ù„ Ø£Ù† ØªØºØ§Ø¯Ø±ØŒ Ù‡Ù„ ØªØ±ØºØ¨ ÙÙŠ Ø§Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ <strong>ØªÙ‚ÙŠÙŠÙ… Ù…Ø¨Ø¯Ø¦ÙŠ Ù…Ø¬Ø§Ù†ÙŠ ÙˆØ³Ø±ÙŠØ¹</strong> Ù„Ù…ÙˆÙ‚ÙÙƒ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨ØŸ</p>
            <div class="exit-popup-actions">
                <a href="https://wa.me/201229333957" class="btn btn--primary"><i class="fab fa-whatsapp"></i> ØªÙˆØ§ØµÙ„ Ø§Ù„Ø¢Ù†</a>
                <a href="booking.html" class="btn btn--outline">Ø­Ø¬Ø² Ù…ÙˆØ¹Ø¯</a>
            </div>
        </div>
    `;
    document.body.appendChild(exitPopup);

    const closeExitPopup = () => {
        exitPopup.classList.remove("show");
        sessionStorage.setItem("exitPopupShown", "true"); // Prevent annoying the user
    };
    exitPopup.querySelector(".exit-popup-close").addEventListener("click", closeExitPopup);
    exitPopup.addEventListener("click", (e) => {
        if (e.target === exitPopup) closeExitPopup();
    });

    // Trigger on mouse leave (Desktop)
    document.addEventListener("mouseleave", (e) => {
        if (e.clientY < 0 && !sessionStorage.getItem("exitPopupShown")) {
            exitPopup.classList.add("show");
        }
    });
    // Trigger on fast scroll up (Mobile fallback after 10s)
    let lastScroll = window.scrollY;
    setTimeout(() => {
        window.addEventListener("scroll", () => {
            const currentScroll = window.scrollY;
            if (lastScroll - currentScroll > 150 && !sessionStorage.getItem("exitPopupShown")) {
                exitPopup.classList.add("show");
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }, 10000);


    // === 2. Social Proof Toasts ===
    const proofMessages = [
        "Ø£Ø­Ø¯ Ù…Ø­Ø§Ù…ÙŠ Ø§Ù„Ù‚Ø³Ù… Ø§Ù„Ø¬Ù†Ø§Ø¦ÙŠ Ù…ØªØ§Ø­ Ø§Ù„Ø¢Ù† Ù„Ù„Ø±Ø¯ Ø§Ù„ÙÙˆØ±ÙŠ",
        "Ù…ÙˆÙƒÙ‘Ù„ Ù…Ù† (Ø§Ù„Ù‚Ø§Ù‡Ø±Ø©) Ù‚Ø§Ù… Ø¨Ø­Ø¬Ø² Ø§Ø³ØªØ´Ø§Ø±Ø© Ù„Ù„ØªÙˆ",
        "Ù¢ Ù…Ø­Ø§Ù…ÙŠÙ† Ù…Ù† Ø§Ù„Ù…Ø¤Ø³Ø³Ø© Ù…ØªØµÙ„ÙˆÙ† Ø§Ù„Ø¢Ù† Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨",
        "ØªÙ… ØªØ­Ø¯ÙŠØ« Ù…ÙƒØªØ¨Ø© Ø£Ø­ÙƒØ§Ù… Ø§Ù„Ù†Ù‚Ø¶ Ù…Ù†Ø° Ø³Ø§Ø¹Ø©",
        "ØªÙ… Ø§Ù„Ø±Ø¯ Ø¹Ù„Ù‰ Ù¤ Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© Ø§Ù„ÙŠÙˆÙ…"
    ];
    
    const proofContainer = document.createElement("div");
    proofContainer.className = "social-proof-container";
    document.body.appendChild(proofContainer);

    function showRandomProof() {
        if (document.hidden) return; // Don"t show if tab is inactive
        const msg = proofMessages[Math.floor(Math.random() * proofMessages.length)];
        
        const toast = document.createElement("div");
        toast.className = "social-proof";
        toast.innerHTML = `<div class="sp-dot"></div><div class="sp-text">${msg}</div>`;
        
        proofContainer.appendChild(toast);
        
        // Remove after animation (6s total)
        setTimeout(() => toast.remove(), 6000);
    }

    // Show first proof after 15s, then randomly every 35-50s
    setTimeout(() => {
        showRandomProof();
        setInterval(showRandomProof, Math.random() * (50000 - 35000) + 35000);
    }, 15000);


    // === 3. Contextual CTA (Slide up bar) ===
    // Only show if page might have articles (blog, law, or just long pages)
    if (document.querySelector(".blog-card") || document.querySelector(".law-card") || document.body.scrollHeight > 1500) {
        const contextualCta = document.createElement("div");
        contextualCta.className = "contextual-cta";
        contextualCta.innerHTML = `
            <div class="contextual-cta-text">Ù‡Ù„ ØªÙ…Ø± Ø¨Ù…ÙˆÙ‚Ù Ù‚Ø§Ù†ÙˆÙ†ÙŠ Ù…Ø´Ø§Ø¨Ù‡ØŸ</div>
            <a href="booking.html" class="contextual-cta-btn">Ø§Ø·Ù„Ø¨ Ø§Ø³ØªØ´Ø§Ø±Ø© Ø§Ù„Ù…ØªØ®ØµØµÙŠÙ†</a>
        `;
        document.body.appendChild(contextualCta);

        window.addEventListener("scroll", () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height);
            
            // Show if scrolled more than 40% but not at the absolute bottom
            if (scrolled > 0.40 && scrolled < 0.95) {
                contextualCta.classList.add("show");
            } else {
                contextualCta.classList.remove("show");
            }
        }, { passive: true });
    }

});



