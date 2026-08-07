/* ==========================================================================
   OMKAR ANGADI PORTFOLIO — JAVASCRIPT ES6 CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove Preloader Screen
    initPreloader();

    // 2. Scroll Progress Indicator & Back to Top Button
    initScrollProgress();

    // 3. Mouse Glow Spotlight Follower
    initMouseGlow();

    // 4. Hero Section Typing Effect
    initTypingEffect();

    // 5. Mobile Drawer Navigation Toggle
    initMobileNav();
});

/* --------------------------------------------------------------------------
   1. PRELOADER SCREEN
   -------------------------------------------------------------------------- */
function initPreloader() {
    const loader = document.getElementById('loadingScreen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 700);
        }, 400);
    }
}

/* --------------------------------------------------------------------------
   2. SCROLL PROGRESS INDICATOR & BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        // Navbar shadow effect
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('shadow-2xl', 'shadow-black/80');
            } else {
                navbar.classList.remove('shadow-2xl', 'shadow-black/80');
            }
        }

        // Back to Top Button Visibility
        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.remove('opacity-100');
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* --------------------------------------------------------------------------
   3. MOUSE GLOW SPOTLIGHT FOLLOWER
   -------------------------------------------------------------------------- */
function initMouseGlow() {
    const mouseGlow = document.getElementById('mouseGlow');
    if (!mouseGlow) return;

    window.addEventListener('mousemove', (e) => {
        mouseGlow.style.left = `${e.clientX}px`;
        mouseGlow.style.top = `${e.clientY}px`;
    });
}

/* --------------------------------------------------------------------------
   4. HERO TYPING ANIMATION
   -------------------------------------------------------------------------- */
function initTypingEffect() {
    const element = document.getElementById('typingElement');
    if (!element) return;

    const titles = [
        "VLSI & Digital System Design Engineer",
        "Verilog HDL & SystemVerilog Specialist",
        "RISC-V Processor Core Architect",
        "FPGA Hardware Accelerator Developer",
        "Embedded Systems & Custom PCB Prototyper"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            element.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            element.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 85;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2200; // Pause at full title
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 400; // Pause before next title
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   5. MOBILE DRAWER MENU
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');

    if (!mobileMenuBtn || !mobileDrawer) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.add('hidden');
        });
    });
}

/* --------------------------------------------------------------------------
   6. PROJECT CATEGORY FILTER SYSTEM
   -------------------------------------------------------------------------- */
function filterProjects(category) {
    const buttons = document.querySelectorAll('.project-filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Highlight active button
    event.target.classList.add('active');

    cards.forEach(card => {
        const catAttr = card.getAttribute('data-category');
        if (category === 'all' || (catAttr && catAttr.includes(category))) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

/* --------------------------------------------------------------------------
   7. CLICK TO COPY TOAST UTILITY
   -------------------------------------------------------------------------- */
function copyToClipboard(text, customMsg) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(customMsg || 'Copied to clipboard!');
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.remove('translate-y-10', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-10', 'opacity-0', 'pointer-events-none');
    }, 3000);
}

/* --------------------------------------------------------------------------
   8. FORM SUBMIT HANDLER
   -------------------------------------------------------------------------- */
function handleFormSubmit(e) {
    e.preventDefault();
    showToast('Thank you! Your message has been sent successfully.');
    document.getElementById('contactForm').reset();
}
