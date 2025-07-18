// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 12, 41, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update navbar text colors based on scroll
    const navLinks = navbar.querySelectorAll('.nav-menu a:not(.btn-nav)');
    const navBrand = navbar.querySelector('.nav-brand');
    
    if (currentScroll > 100) {
        navLinks.forEach(link => link.style.color = '#cbd5e1');
        navBrand.style.filter = 'brightness(1.2)';
    } else {
        navLinks.forEach(link => link.style.color = 'white');
        navBrand.style.filter = 'brightness(1)';
    }
    
    lastScroll = currentScroll;
});

// Particle animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw connections
    particles.forEach((particle, index) => {
        for (let j = index + 1; j < particles.length; j++) {
            const dx = particle.x - particles[j].x;
            const dy = particle.y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Typing animation for code editor
const codeLines = [
    { delay: 0, text: 'const vibeCoding = {' },
    { delay: 500, text: '  mission: "全ての人にコーディングの楽しさを",' },
    { delay: 1000, text: '  features: [' },
    { delay: 1500, text: '    "実践的カリキュラム",' },
    { delay: 2000, text: '    "充実したメンターサポート",' },
    { delay: 2500, text: '    "活発なコミュニティ"' },
    { delay: 3000, text: '  ],' },
    { delay: 3500, text: '  start: () => {' },
    { delay: 4000, text: '    return "あなたの新しいキャリアが始まる";' },
    { delay: 4500, text: '  }' },
    { delay: 5000, text: '};' }
];

// Initial navbar style
navbar.style.background = 'rgba(255, 255, 255, 0)';
navbar.style.boxShadow = 'none';
navbar.querySelectorAll('.nav-menu a:not(.btn-nav)').forEach(link => {
    link.style.color = 'white';
});

// Countdown timer
function updateCountdown() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(endDate.getHours() + 12);
    endDate.setMinutes(endDate.getMinutes() + 45);
    endDate.setSeconds(endDate.getSeconds() + 30);
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }, 1000);
}

// Initialize countdown
updateCountdown();

// Form submission
const ctaForm = document.querySelector('.cta-form');
ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.phone) {
        alert('すべての項目を入力してください。');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('有効なメールアドレスを入力してください。');
        return;
    }
    
    // Phone validation (Japanese format)
    const phoneRegex = /^[0-9-+() ]+$/;
    if (!phoneRegex.test(data.phone)) {
        alert('有効な電話番号を入力してください。');
        return;
    }
    
    // Success message
    alert('無料相談のお申し込みありがとうございます！\n担当者より24時間以内にご連絡させていただきます。');
    
    // Reset form
    e.target.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animations
document.querySelectorAll('.problem-card, .solution-card, .benefit-item, .testimonial-card, .content-card, .now-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle (if needed in future)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';
    
    // Show on mobile
    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
        menuButton.style.background = 'none';
        menuButton.style.border = 'none';
        menuButton.style.fontSize = '1.5rem';
        menuButton.style.cursor = 'pointer';
        navbar.appendChild(menuButton);
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        } else {
            menuButton.style.display = 'none';
        }
    });
}

// Initialize mobile menu
createMobileMenu();

// Add hover effects to cards
document.querySelectorAll('.problem-card, .solution-card, .testimonial-card, .content-card, .now-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section and floating codes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const floatingCodes = document.querySelectorAll('.floating-code');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    floatingCodes.forEach((code, index) => {
        const speed = 0.5 + (index * 0.1);
        code.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Number counting animation for stats
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        const suffix = stat.textContent.replace(/[0-9.]/g, '');
        let current = 0;
        const increment = target / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            
            if (suffix === '%') {
                stat.textContent = Math.floor(current) + suffix;
            } else if (suffix === '倍') {
                stat.textContent = current.toFixed(1) + suffix;
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// Trigger number animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}