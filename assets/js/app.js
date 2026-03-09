// INTERACTIVE FEATURES
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PRELOADER
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 1500);
    });

    // 2. CUSTOM CURSOR
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // 3. TYPED.JS INTERACTIVE
    if (document.querySelector('.text-info1')) {
        new Typed('.text-info1', {
            strings: ['CREATIVE DESIGNER', 'WEB DEVELOPER', 'UI/UX ENTHUSIAST', 'VISUAL STORYTELLER'],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            backDelay: 2000
        });
    }

    // 4. HEADER SCROLL EFFECT
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = "10px 0";
            header.style.background = "var(--glass-bg)";
            header.style.boxShadow = "var(--shadow-lg)";
        } else {
            header.style.padding = "20px 0";
            header.style.background = "transparent";
            header.style.boxShadow = "none";
        }
    });

    // 5. PROGRESS BAR ANIMATION
    const progressBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const value = bar.getAttribute('data-progress');
                bar.style.width = value + '%';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));

    // 6. AOS INITIALIZATION
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 120
    });

    // 7. DARK THEME LOGIC
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'bi-sun-fill';

    const selectedTheme = localStorage.getItem('selected-theme');

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';

    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        const icon = themeButton.querySelector('i');
        if (selectedTheme === 'dark') {
            icon.classList.remove('bi-moon-stars-fill');
            icon.classList.add('bi-sun-fill');
        }
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        const icon = themeButton.querySelector('i');
        icon.classList.toggle('bi-moon-stars-fill');
        icon.classList.toggle('bi-sun-fill');
        
        localStorage.setItem('selected-theme', getCurrentTheme());
    });
});