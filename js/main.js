/* ============================================
   مؤسسة آل زهران — Main JavaScript
   ============================================ */

// === Utility: Sanitize HTML to prevent XSS ===
function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = String(str);
    return temp.innerHTML;
}

// === Mobile Menu Toggle ===
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // === Active Navigation Link ===
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navMenu?.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // === Dynamic Copyright Year ===
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // === Initialize Scroll Animations ===
    initScrollAnimations();

    // === Initialize FAQ Accordion ===
    initFaqAccordion();
});

// === Header Scroll Effect ===
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (header) {
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        if (currentScroll > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    lastScroll = currentScroll;
}, { passive: true });

// === Scroll to Top ===
document.getElementById('scrollTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Smooth Scrolling for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// === Scroll Animations (Intersection Observer) ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// === Counter Animation ===
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const suffix = counter.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easedProgress * target);

            counter.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + suffix;
            }
        }

        requestAnimationFrame(update);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-bar');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

// === FAQ Accordion ===
function initFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });

            // Toggle current
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// === Form Validation Helpers ===
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    // Egyptian phone format
    return /^(01)[0-2,5]{1}[0-9]{8}$/.test(phone.replace(/\s|-/g, ''));
}

function showFormMessage(form, message, type = 'success') {
    const existing = form.querySelector('.form-message');
    if (existing) existing.remove();

    const msgEl = document.createElement('div');
    msgEl.className = `form-message note-box ${type}`;
    msgEl.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i> ${message}`;
    msgEl.style.marginTop = '16px';
    form.appendChild(msgEl);

    setTimeout(() => msgEl.remove(), 5000);
}

// === PWA & Service Worker ===
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch(err => console.log("SW registration failed: ", err));
    });
}

// === Dark Mode & Font Size Logic ===
document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("themeToggle");
    const fontBtn = document.getElementById("fontToggle");
    
    // Theme
    if(localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    themeBtn?.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });
    
    // Font Size
    let fontLevel = parseInt(localStorage.getItem("fontLevel") || "0");
    const applyFont = () => {
        document.body.classList.remove("font-lg", "font-xl");
        if(fontLevel === 1) document.body.classList.add("font-lg");
        if(fontLevel === 2) document.body.classList.add("font-xl");
    };
    applyFont();
    fontBtn?.addEventListener("click", () => {
        fontLevel = (fontLevel + 1) % 3;
        localStorage.setItem("fontLevel", fontLevel);
        applyFont();
    });
});


// === Premium UI Features ===
document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader
    const preloader = document.createElement("div");
    preloader.id = "preloader";
    preloader.innerHTML = `<div class="loader-logo"><i class="fas fa-balance-scale"></i></div><div class="loader-bar"></div>`;
    document.body.appendChild(preloader);
    window.addEventListener("load", () => {
        preloader.classList.add("hide");
        setTimeout(() => preloader.remove(), 600);
    });

    // 2. Scroll Progress Bar
    const scrollBar = document.createElement("div");
    scrollBar.id = "scroll-progress";
    document.body.appendChild(scrollBar);
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + "%";
    });

    // 3. AJAX Form Submission & Toast Notifications
    function showToast(message, icon = "check-circle") {
        let container = document.querySelector(".toast-container");
        if (!container) {
            container = document.createElement("div");
            container.className = "toast-container";
            document.body.appendChild(container);
        }
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4500);
    }

    const forms = document.querySelectorAll("#contactForm, #bookingForm");
    forms.forEach(form => {
        // Ensure form posts to formspree endpoint
        if (!form.hasAttribute("action")) {
            form.setAttribute("action", "https://formspree.io/f/mldwlpzq");
        }
        
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btn = form.querySelector("button[type=\"submit\"]");
            const originalText = btn.innerHTML;
            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...`;
            btn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: { "Accept": "application/json" }
                });
                
                if (response.ok) {
                    showToast("تم إرسال طلبك بنجاح. سنتواصل معك في أقرب وقت!");
                    form.reset();
                } else {
                    showToast("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.", "exclamation-triangle");
                }
            } catch (error) {
                showToast("حدث خطأ في الاتصال، تحقق من الإنترنت.", "wifi");
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    });
});

