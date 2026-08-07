/* ==========================================================================
   OMKAR ANGADI PORTFOLIO - JAVASCRIPT CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Circuit Background Canvas
    initCircuitCanvas();

    // 2. Typing Effect in Hero Section
    initTypingEffect();

    // 3. Mobile Navigation Drawer Toggle
    initMobileNav();

    // 4. Scroll Spy & Active Nav Highlighting
    initScrollSpy();

    // 5. Project Category Filter System
    initProjectFilters();
});

/* --------------------------------------------------------------------------
   1. CIRCUIT CANVAS PARTICLE ANIMATION
   -------------------------------------------------------------------------- */
function initCircuitCanvas() {
    const canvas = document.getElementById('circuitCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 65);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: Math.random() * 2 + 1,
            color: '#06b6d4'
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.18 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw node points
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#06b6d4';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });

        requestAnimationFrame(draw);
    }

    draw();
}

/* --------------------------------------------------------------------------
   2. HERO TYPING ANIMATION
   -------------------------------------------------------------------------- */
function initTypingEffect() {
    const element = document.getElementById('typingElement');
    if (!element) return;

    const titles = [
        "Electronics & Communication Engineer",
        "Embedded Systems & FPGA Specialist",
        "Verilog HDL & RISC-V RTL Developer",
        "Custom PCB & IoT System Designer"
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
   3. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileToggle.querySelector('i')) {
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });
}

/* --------------------------------------------------------------------------
   4. SCROLL SPY & ACTIVE NAV HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Add navbar shadow on scroll
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }

        // Section Highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   5. PROJECT CATEGORY FILTER SYSTEM
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || (category && category.includes(filterValue))) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   6. CLICK TO COPY UTILITY & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function copyToClipboard(text, customMessage) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(customMessage || 'Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM SUBMISSION HANDLER
   -------------------------------------------------------------------------- */
function handleFormSubmit(e) {
    e.preventDefault();
    const successAlert = document.getElementById('formSuccess');
    
    if (successAlert) {
        successAlert.style.display = 'flex';
        document.getElementById('contactForm').reset();
        
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 5000);
    }
}
