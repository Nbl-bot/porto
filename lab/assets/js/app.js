// NABIL LAB - INTERACTIVE ENGINE V.01

document.addEventListener('DOMContentLoaded', () => {

    // 0. LENIS SMOOTH SCROLL (MODERN SCROLL)
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 1. PRELOADER HANDLING & BG GLOW FOLLOW
    const preloader = document.getElementById('preloader');
    const bgGlow = document.querySelector('.bg-glow');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 2000);
    });

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        gsap.to(bgGlow, {
            left: `${x}%`,
            top: `${y}%`,
            duration: 2,
            ease: "power2.out"
        });
    });

    // 2. OPTIMIZED CUSTOM CURSOR
    const cursor = document.querySelector('.cursor-magic');
    const links = document.querySelectorAll('a, button, .lab-card, .medal-card, .orbit-item');

    // Use GSAP for smoother cursor movement (hardware accelerated)
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });

    // 3. OPTIMIZED PARTICLES.JS
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 1000 } },
            "color": { "value": "#3b82f6" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.2, "random": false },
            "size": { "value": 2, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#3b82f6", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "window",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }
        }
    });

    // 4. GSAP SCROLL STORY (ABOUT)
    gsap.registerPlugin(ScrollTrigger);

    const steps = gsap.utils.toArray('.story-content');
    steps.forEach((step, i) => {
        ScrollTrigger.create({
            trigger: step,
            start: "top center",
            end: "bottom center",
            fastScrollEnd: true,
            preventOverlaps: true,
            onToggle: self => {
                if (self.isActive) {
                    steps.forEach(s => s.classList.remove('active'));
                    step.classList.add('active');
                    // Sync image scale
                    gsap.to('.visual-box img', { scale: 1 + (i * 0.1), duration: 0.8, ease: "power2.out" });
                }
            }
        });
    });

    // 5. SKILLS ORBIT ENGINE
    const items = document.querySelectorAll('.orbit-item');
    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 120 : 200;
    const center = { x: 0, y: 0 };
    const desc = document.getElementById('skill-description');

    items.forEach((item, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        gsap.set(item, { x: x, y: y, xPercent: -50, yPercent: -50 });

        item.addEventListener('mouseenter', () => {
            desc.innerHTML = `<span class="text-white">${item.getAttribute('data-desc')}</span>`;
        });
        item.addEventListener('mouseleave', () => {
            desc.innerHTML = "Hover over nodes to explore skills.";
        });
    });

    // Rotate Orbit
    gsap.to('.orbit-container', {
        rotate: 360,
        duration: 40,
        ease: "none",
        repeat: -1
    });

    // Counter-rotate items and center to keep text upright
    gsap.to(['.orbit-item', '.orbit-center'], {
        rotate: -360,
        duration: 40,
        ease: "none",
        repeat: -1
    });

    // 6. TIMELINE HORIZONTAL SCROLL
    if (window.innerWidth > 768) {
        const timeline = document.querySelector('.timeline-track');
        gsap.to(timeline, {
            x: () => -(timeline.scrollWidth - window.innerWidth + 100),
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-section",
                pin: true,
                scrub: 1,
                anticipatePin: 1, // Smooth out the pinning start
                fastScrollEnd: true,
                preventOverlaps: true,
                end: () => "+=" + timeline.scrollWidth
            }
        });
    }

    // 7. MODAL LOGIC
    window.openModal = (type) => {
        const modal = document.getElementById('modal-portal');
        const content = document.getElementById('modal-content');
        
        let html = '';
        if (type === 'gyiif2026') {
            html = `<h2>Gold Medal - GYIIF 2026</h2><p class="mt-4 lead">Awarded at the Global Youth Invention and Innovation Fair (GYIIF) 2026 in Bogor, Indonesia. <br><br><strong>Category:</strong> Innovation Science<br><strong>Project:</strong> Physio Connect: Smart and Intelligent of Self Care and Clinical Treatment. <br><br>Recognized as the top innovation in its category for its potential to transform physiotherapy recovery tracking.</p>`;
        } else if (type === 'mte2025') {
            html = `<h2>Malaysia Technology Expo 2025</h2><p class="mt-4 lead">Received the <strong>Silver Medal</strong> and a <strong>Special Award</strong> for high-impact innovation in the AI-startup category. Recognized for exceptional technological feasibility and international market potential.</p>`;
        } else if (type === 'iid2025') {
            html = `<h2>Indonesia Inventors Day 2025</h2><p class="mt-4 lead">Achieved Silver Medal for the 'PhysioConnect' project. Evaluated on the basis of social impact and innovative recovery tracking algorithms.</p>`;
        } else if (type === 'ayia2025') {
            html = `<h2>Asian Youth Innovation Awards 2025</h2><p class="mt-4 lead">Received the Silver Award for breakthrough digital business strategy and technological implementation. Part of the 2025 Innovation Summit.</p>`;
        } else if (type === 'iot2025') {
            html = `<h2>Global IoT Competition</h2><p class="mt-4 lead">Secured 2nd Place in the International IoT Innovation Competition for developing smart-grid solutions for small business ecosystems.</p>`;
        } else {
            html = `<h2>Achievement Detail</h2><p class="mt-4 lead">Demonstrated excellence in digital innovation, business strategy, and technological feasibility on an international platform.</p>`;
        }

        content.innerHTML = html;
        modal.style.display = 'flex';
    }

    window.openProject = (id) => {
        const modal = document.getElementById('modal-portal');
        const content = document.getElementById('modal-content');
        
        let html = '';
        const projects = {
            'aichatbot': {
                title: 'Solo UMKM AI',
                desc: 'An AI-powered bot system launched in collaboration with <strong>NetZme</strong> to optimize digital marketing for SMEs in Solo. Featured in <strong>UMS News</strong> for its innovation in automating customer engagement and campaign management.',
                tag: 'AI & Marketing',
                link: 'https://news.ums.ac.id/id/12/2024/optimalkan-digital-marketing-mahasiswa-ums-luncurkan-sistem-bot-berbasis-ai/'
            },
            'lazismu': {
                title: 'Lazismu Turkey Charity',
                desc: 'A comprehensive full-stack platform featuring a custom-built admin dashboard for article management, donation tracking, and real-time visitor feedback for international charity operations.',
                tag: 'Web Platform',
                link: 'https://lazismuturkey.org/'
            },
            'campusride': {
                title: 'CampusRide Startup',
                desc: 'A WhatsApp-integrated marketplace bot that connects students for transport and errand services. Focuses on peer-to-peer efficiency within campus ecosystems.',
                tag: 'Startup',
                link: '#'
            },
            'physio': {
                title: 'PhysioConnect',
                desc: '<strong>Gold Medal Winner (GYIIF 2026)</strong>. A digital health platform that streamlines physiotherapy sessions and provides intelligent recovery tracking. Designed to bridge the gap between clinical treatment and self-care at home.',
                tag: 'HealthTech',
                link: 'https://physio.lazismuturkey.org/'
            },
            'sypaling': {
                title: 'SI PALING KULIAH',
                desc: 'A specialized platform designed to support student academic life and resources. Providing essential tools for navigating the collegiate landscape.',
                tag: 'Education',
                link: 'https://sipalingkuliah.web.id/'
            }
        };

        const project = projects[id] || { title: 'Innovation Project', desc: 'Developing cutting-edge digital solutions to solve real-world business challenges.', tag: 'R&D' };
        
        html = `
            <span class="badge bg-primary mb-3">${project.tag}</span>
            <h2>${project.title}</h2>
            <p class="mt-4 lead text-white-50">${project.desc}</p>
            <div class="mt-5 d-flex gap-3">
                ${project.link !== '#' ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-main">Visit Live Site</a>` : ''}
                <button class="btn btn-cyber" onclick="closeModal()">Close Prototype</button>
            </div>
        `;

        content.innerHTML = html;
        modal.style.display = 'flex';
    }

    window.closeModal = () => {
        document.getElementById('modal-portal').style.display = 'none';
    }

    // 8. NAVBAR SCROLL EFFECT & PROGRESS
    const nav = document.querySelector('.nav-lab');
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        // Progress Calc
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";

        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // 9. TILT EFFECT
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // 10. AOS INIT
    AOS.init({
        duration: 800,
        easing: 'ease-out-quad',
        once: true,
        disable: window.innerWidth < 768 // Disable AOS on mobile for better performance
    });

    // 11. TEXT REVEAL TRIGGER
    setTimeout(() => {
        document.querySelectorAll('.text-reveal').forEach(el => el.classList.add('active'));
    }, 500);

    // 11. MAGNETIC BUTTONS (PREMIUM FEEL)
    const magneticBtns = document.querySelectorAll('.btn-main, .btn-ghost, .btn-cyber');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // REFRESH SCROLLTRIGGER AFTER LOADING
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
});
