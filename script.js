// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.getElementById('contactForm');
const statNumbers = document.querySelectorAll('.stat-number');

// ===== Navbar Scroll Effect =====
let lastScrollY = window.scrollY;

function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleNavbarScroll);

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FAQ Accordion =====
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Animated Counter =====
function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

// Observer for stat counters
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Observer for fade-in animations
const fadeElements = document.querySelectorAll('.about-card, .product-card, .gallery-item, .benefit-item, .testimonial-card, .faq-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.classList.add('fade-in');
    fadeObserver.observe(element);
});

// ===== Contact Form Handling =====
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Show loading state
    submitButton.textContent = 'Wysyłanie...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showNotification('Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się z Tobą wkrótce.', 'success');

        // Reset form
        contactForm.reset();

    } catch (error) {
        showNotification('Wystąpił błąd. Spróbuj ponownie później.', 'error');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// ===== Form Validation =====
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const consent = document.getElementById('consent');

    let isValid = true;

    // Clear previous errors
    clearErrors();

    // Validate name
    if (name.value.trim().length < 3) {
        showError(name, 'Imię i nazwisko musi mieć co najmniej 3 znaki');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'Podaj poprawny adres email');
        isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[\d\s\-+()]{9,}$/;
    if (!phoneRegex.test(phone.value)) {
        showError(phone, 'Podaj poprawny numer telefonu');
        isValid = false;
    }

    // Validate consent
    if (!consent.checked) {
        showError(consent, 'Musisz wyrazić zgodę na przetwarzanie danych');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    error.style.cssText = 'color: #e53935; font-size: 0.75rem; margin-top: 0.25rem; display: block;';
    formGroup.appendChild(error);
    input.style.borderColor = '#e53935';
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        input.style.borderColor = '';
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#b87333' : type === 'error' ? '#e53935' : '#495057'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Close button handler
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== Gallery Lightbox (Basic) =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const overlay = item.querySelector('.gallery-overlay');
        if (overlay) {
            const title = overlay.querySelector('h4')?.textContent || '';
            const description = overlay.querySelector('p')?.textContent || '';

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;

            lightbox.innerHTML = `
                <button class="lightbox-close" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                ">&times;</button>
                <div style="
                    max-width: 80%;
                    max-height: 70%;
                    background: #f1f3f4;
                    border-radius: 12px;
                    overflow: hidden;
                ">
                    ${item.querySelector('.gallery-placeholder').innerHTML}
                </div>
                <div style="
                    text-align: center;
                    color: white;
                    margin-top: 1.5rem;
                ">
                    <h3 style="margin-bottom: 0.5rem;">${title}</h3>
                    <p style="color: #aaa;">${description}</p>
                </div>
            `;

            // Add keyframes for fade animation
            if (!document.getElementById('lightbox-styles')) {
                const styles = document.createElement('style');
                styles.id = 'lightbox-styles';
                styles.textContent = `
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                document.head.appendChild(styles);
            }

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close handlers
            const closeButton = lightbox.querySelector('.lightbox-close');
            closeButton.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            function closeLightbox() {
                document.body.style.overflow = '';
                lightbox.remove();
            }

            // Close on escape key
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        }
    });
});

// ===== Active Navigation Link Highlight =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Initial navbar check
    handleNavbarScroll();

    // Initial nav highlight
    highlightNavLink();

    // Preload animations
    document.body.classList.add('loaded');
});

// ===== Parallax Effect for Hero =====
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

if (heroSection && heroBg) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    });
}

// ===== Typing Effect for Hero Title (Optional) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Product Card Hover Effect =====
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        productCards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        productCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ===== Testimonials Auto-Scroll (Optional) =====
let testimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function highlightTestimonial() {
    if (window.innerWidth > 768) return; // Only on mobile

    testimonialCards.forEach((card, index) => {
        if (index === testimonialIndex) {
            card.style.transform = 'scale(1.02)';
            card.style.boxShadow = '0 10px 30px rgba(184, 115, 51, 0.2)';
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
        }
    });

    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
}

// Uncomment to enable auto-highlight
// setInterval(highlightTestimonial, 3000);

console.log('PergoMet landing page loaded successfully!');
