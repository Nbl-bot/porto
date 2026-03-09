const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

// Color Mapping
const colorMap = {
    'color-1': { h: 351, s: '83%', l: '51%' },
    'color-2': { h: 36,  s: '93%', l: '45%' },
    'color-3': { h: 126, s: '45%', l: '41%' },
    'color-4': { h: 217, s: '76%', l: '40%' },
    'color-5': { h: 318, s: '87%', l: '54%' },
    'color-6': { h: 282, s: '44%', l: '47%' }
};

function setActiveStyle(colorName) {
    const config = colorMap[colorName];
    if (config) {
        document.documentElement.style.setProperty('--primary-h', config.h);
        document.documentElement.style.setProperty('--primary-s', config.s);
        document.documentElement.style.setProperty('--primary-l', config.l);
        
        // Save to local storage
        localStorage.setItem('skin-color', colorName);
    }
    
    // Update active class in switcher
    const buttons = document.querySelectorAll(".colors span");
    buttons.forEach(btn => {
        btn.classList.remove("activE");
        if (btn.classList.contains(colorName)) {
            btn.classList.add("activE");
        }
    });
}

// Load saved color on startup
window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('skin-color');
    if (savedColor) {
        setActiveStyle(savedColor);
    }
});