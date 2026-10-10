/* ============================================
   Premium UI/UX — JavaScript Enhancements
   مؤسسة آل زهران — Tier 1 Features
   ============================================ */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {

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
                    <span class="label">واتساب</span>
                    <div class="speed-dial-action-btn sd-whatsapp"><i class="fab fa-whatsapp"></i></div>
                </a>
                <a href="tel:+201229333957" class="speed-dial-action">
                    <span class="label">اتصال مباشر</span>
                    <div class="speed-dial-action-btn sd-phone"><i class="fas fa-phone-alt"></i></div>
                </a>
                <a href="mailto:alzahranlaw1@gmail.com" class="speed-dial-action">
                    <span class="label">بريد إلكتروني</span>
                    <div class="speed-dial-action-btn sd-email"><i class="fas fa-envelope"></i></div>
                </a>
                <a href="contact.html" class="speed-dial-action">
                    <span class="label">الموقع والخريطة</span>
                    <div class="speed-dial-action-btn sd-map"><i class="fas fa-map-marker-alt"></i></div>
                </a>
            </div>
            <button class="speed-dial-trigger" aria-label="طرق التواصل">
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
                    <i class="fas fa-bolt"></i> عاجل
                </div>
                <div class="news-ticker-content">
                    <div class="news-ticker-item"><span class="dot"></span> المؤسسة تقبل التوكيلات في جميع أنواع القضايا أمام كافة المحاكم المصرية</div>
                    <div class="news-ticker-item"><span class="dot"></span> خدمة الاستشارة الأولية متاحة لجميع الموكلين — احجز موعدك الآن</div>
                    <div class="news-ticker-item"><span class="dot"></span> تنويه: لا تدفع أي مبالغ مالية إلا بعد توقيع عقد أتعاب رسمي مع المؤسسة</div>
                    <div class="news-ticker-item"><span class="dot"></span> نتعامل مع القضايا الجنائية العاجلة على مدار الساعة — اتصل فوراً</div>
                    <div class="news-ticker-item"><span class="dot"></span> مؤسسة آل زهران: سرية مطلقة — التزام كامل بأدبيات مهنة المحاماة المصرية</div>
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
                badge.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} دقيقة قراءة`;
                meta.appendChild(badge);
            }
        });

        // ============================================
        // 7. MEGA MENU — Transform services link
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
                    <div class="mega-menu-text"><h4>القضايا المدنية</h4><p>عقود، تعويضات، إيجارات</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-user-shield"></i></div>
                    <div class="mega-menu-text"><h4>القانون الجنائي</h4><p>دفاع، طعن، تحقيقات</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-heart"></i></div>
                    <div class="mega-menu-text"><h4>الأحوال الشخصية</h4><p>طلاق، نفقة، حضانة</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-briefcase"></i></div>
                    <div class="mega-menu-text"><h4>قانون العمل</h4><p>فصل تعسفي، تأمينات</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-building"></i></div>
                    <div class="mega-menu-text"><h4>الشركات والتجارة</h4><p>تأسيس، عقود، علامات</p></div>
                </a>
                <a href="index.html#services" class="mega-menu-item">
                    <div class="mega-menu-icon"><i class="fas fa-landmark"></i></div>
                    <div class="mega-menu-text"><h4>القضاء الإداري</h4><p>مجلس الدولة، طعون</p></div>
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
                    <h4>التحقق من صحة الوثائق</h4>
                    <p>أدخل الكود المرجعي للوثيقة الصادرة من المؤسسة</p>
                </div>
                <div class="verify-input-group">
                    <input type="text" placeholder="أدخل الكود المرجعي..." id="verifyCode">
                    <button onclick="verifyDoc()">تحقق</button>
                </div>
            `;
            footerBottom.insertAdjacentElement('beforebegin', verifySection);
        }

    }); // end DOMContentLoaded

    // Document Verification
    window.verifyDoc = function() {
        const code = document.getElementById('verifyCode')?.value.trim();
        if (!code) {
            showToast('يرجى إدخال الكود المرجعي أولاً', 'exclamation-triangle');
            return;
        }
        // Redirect to WhatsApp for verification
        const msg = encodeURIComponent('مرحباً، أريد التحقق من صحة وثيقة صادرة من المؤسسة.\nالكود المرجعي: ' + code);
        window.open('https://wa.me/201229333957?text=' + msg, '_blank');
        showToast('يتم تحويلك للتحقق عبر سكرتارية المؤسسة...');
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
            <h3 class="exit-popup-title">لحظة من فضلك!</h3>
            <p class="exit-popup-text">نعلم أن القضايا القانونية قد تكون مرهقة. قبل أن تغادر، هل ترغب في الحصول على <strong>تقييم مبدئي مجاني وسريع</strong> لموقفك القانوني عبر واتساب؟</p>
            <div class="exit-popup-actions">
                <a href="https://wa.me/201229333957" class="btn btn--primary"><i class="fab fa-whatsapp"></i> تواصل الآن</a>
                <a href="booking.html" class="btn btn--outline">حجز موعد</a>
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
        "أحد محامي القسم الجنائي متاح الآن للرد الفوري",
        "موكّل من (القاهرة) قام بحجز استشارة للتو",
        "٢ محامين من المؤسسة متصلون الآن عبر واتساب",
        "تم تحديث مكتبة أحكام النقض منذ ساعة",
        "تم الرد على ٤ استشارات قانونية اليوم"
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
            <div class="contextual-cta-text">هل تمر بموقف قانوني مشابه؟</div>
            <a href="booking.html" class="contextual-cta-btn">اطلب استشارة المتخصصين</a>
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

