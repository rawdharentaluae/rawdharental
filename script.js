 /**
 * ============================================
 * RAWDHA RENTAL - PREMIUM JAVASCRIPT
 * Building Equipment & Rental Services Dubai
 * Designed & Developed by Dilawar Pro
 * ============================================
 */

'use strict';

// ==========================================
// GLOBAL VARIABLES & SELECTORS
// ==========================================
const DOM = {
    preloader: document.getElementById('preloader'),
    header: document.getElementById('header'),
    topBar: document.getElementById('topBar'),
    scrollToTop: document.getElementById('scrollToTop'),
    chatbotContainer: document.getElementById('chatbotContainer'),
    chatbotWindow: document.getElementById('chatbotWindow'),
    chatbotMessages: document.getElementById('chatbotMessages'),
    chatbotSuggestions: document.getElementById('chatbotSuggestions'),
    chatbotInput: document.getElementById('chatbotInput'),
    chatbotInputArea: document.getElementById('chatbotInputArea'),
    chatbotEnded: document.getElementById('chatbotEnded'),
    openChatbot: document.getElementById('openChatbot'),
    closeChatbot: document.getElementById('closeChatbot'),
    sendMessage: document.getElementById('sendMessage'),
    contactForm: document.getElementById('contactForm'),
    confettiCanvas: document.getElementById('confetti-canvas'),
    cursor: document.querySelector('.cursor'),
    cursorFollower: document.querySelector('.cursor-follower'),
    navLinks: document.querySelectorAll('.nav-link'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    equipmentItems: document.querySelectorAll('.equipment-item'),
    countdownDays: document.getElementById('countdown-days'),
    countdownHours: document.getElementById('countdown-hours'),
    countdownMinutes: document.getElementById('countdown-minutes'),
    countdownSeconds: document.getElementById('countdown-seconds')
};

// Business Configuration
const CONFIG = {
    businessName: 'Rawdha Rental',
    businessPhone: '+971569438027',
    businessEmail: 'rawdharentaluae@gmail.com',
    businessLocation: 'Sharjah, Dubai, UAE',
    whatsappNumber: '971569438027'
};

// ==========================================
// PRELOADER
// ==========================================
function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            DOM.preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            
            // Trigger confetti after preloader
            setTimeout(triggerConfetti, 500);
            
            // Initialize AOS after preloader
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                disable: 'mobile'
            });
            
            // Start toast notifications
            startToastNotifications();
        }, 2000);
    });
}

// ==========================================
// CONFETTI EFFECT
// ==========================================
function triggerConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9997 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Confetti from left
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#00c6fb', '#005bea', '#ffd700', '#00d68f']
        }));
        
        // Confetti from right
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#00c6fb', '#005bea', '#ffd700', '#00d68f']
        }));
    }, 250);
}

// ==========================================
// CUSTOM CURSOR
// ==========================================
function initCursor() {
    if (window.innerWidth < 992 || !DOM.cursor || !DOM.cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        DOM.cursor.style.left = cursorX + 'px';
        DOM.cursor.style.top = cursorY + 'px';

        // Smooth follower movement
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        DOM.cursorFollower.style.left = followerX + 'px';
        DOM.cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .service-card, .equipment-card, .gallery-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            DOM.cursorFollower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            DOM.cursorFollower.classList.remove('active');
        });
    });
}

// ==========================================
// HEADER & NAVIGATION
// ==========================================
function initHeader() {
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class
        if (scrollTop > scrollThreshold) {
            DOM.header.classList.add('scrolled');
            if (DOM.topBar) DOM.topBar.classList.add('hidden');
        } else {
            DOM.header.classList.remove('scrolled');
            if (DOM.topBar) DOM.topBar.classList.remove('hidden');
        }

        // Show/hide scroll to top button
        if (scrollTop > 500) {
            DOM.scrollToTop.classList.add('visible');
        } else {
            DOM.scrollToTop.classList.remove('visible');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();

        lastScrollTop = scrollTop;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top functionality
    if (DOM.scrollToTop) {
        DOM.scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            DOM.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + (target >= 100 ? '+' : '');
        }
    };

    updateCounter();
}

// ==========================================
// COUNTDOWN TIMER
// ==========================================
function initCountdown() {
    // Set the offer end date (7 days from now)
    const offerEndDate = new Date();
    offerEndDate.setDate(offerEndDate.getDate() + 7);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = offerEndDate.getTime() - now;

        if (distance < 0) {
            // Offer expired, reset to 7 days
            offerEndDate.setDate(offerEndDate.getDate() + 7);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (DOM.countdownDays) DOM.countdownDays.textContent = String(days).padStart(2, '0');
        if (DOM.countdownHours) DOM.countdownHours.textContent = String(hours).padStart(2, '0');
        if (DOM.countdownMinutes) DOM.countdownMinutes.textContent = String(minutes).padStart(2, '0');
        if (DOM.countdownSeconds) DOM.countdownSeconds.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Copy Promo Code
function copyPromoCode() {
    const promoCode = document.getElementById('promoCode').textContent;
    navigator.clipboard.writeText(promoCode).then(() => {
        Toastify({
            text: "✅ Promo code copied to clipboard!",
            duration: 3000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00d68f, #00b377)",
                borderRadius: "10px",
                fontWeight: "600"
            }
        }).showToast();
    });
}

// Make it globally available
window.copyPromoCode = copyPromoCode;

// ==========================================
// EQUIPMENT FILTER
// ==========================================
function initEquipmentFilter() {
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            DOM.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter items with animation
            DOM.equipmentItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    gsap.fromTo(item, 
                        { opacity: 0, scale: 0.8, y: 30 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                    );
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// ==========================================
// SWIPER SLIDERS
// ==========================================
function initSwipers() {
    // Testimonials Swiper
    new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Clients Swiper
    new Swiper('.clients-swiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
        },
    });
}

// ==========================================
// FANCYBOX
// ==========================================
function initFancybox() {
    Fancybox.bind('[data-fancybox]', {
        Thumbs: {
            autoStart: true,
        },
        Toolbar: {
            display: [
                { id: "prev", position: "center" },
                { id: "counter", position: "center" },
                { id: "next", position: "center" },
                "zoom",
                "slideshow",
                "fullscreen",
                "download",
                "thumbs",
                "close",
            ],
        },
        Images: {
            zoom: true,
        },
    });
}

// ==========================================
// GSAP ANIMATIONS
// ==========================================
function initGSAPAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTimeline
        .from('.hero-badge', { opacity: 0, y: 30, duration: 0.8 })
        .from('.hero-title .title-line', { opacity: 0, y: 50, stagger: 0.2, duration: 0.8 }, '-=0.4')
        .from('.title-gradient', { opacity: 0, scale: 0.9, duration: 0.8 }, '-=0.4')
        .from('.hero-description', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
        .from('.hero-features .feature-item', { opacity: 0, x: -30, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 30, duration: 0.6 }, '-=0.3')
        .from('.hero-stats', { opacity: 0, y: 30, duration: 0.6 }, '-=0.3');

    // Parallax effect on scroll
    gsap.to('.hero-particles', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Service cards hover effect
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.service-icon i'), {
                scale: 1.2,
                rotation: 10,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.service-icon i'), {
                scale: 1,
                rotation: 0,
                duration: 0.3
            });
        });
    });

    // Section reveal animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// ==========================================
// TOAST NOTIFICATIONS (Random Purchases)
// ==========================================
function startToastNotifications() {
    const purchases = [
        { name: 'Ahmed Al Rashid', flag: '🇦🇪', product: '100KVA Generator', location: 'Dubai' },
        { name: 'Muhammad Hassan', flag: '🇵🇰', product: 'Scaffolding System', location: 'Abu Dhabi' },
        { name: 'Rajesh Sharma', flag: '🇮🇳', product: 'Power Tools Kit', location: 'Sharjah' },
        { name: 'Khalid bin Omar', flag: '🇸🇦', product: 'Excavator Rental', location: 'Dubai' },
        { name: 'Ali Khan', flag: '🇵🇰', product: 'Concrete Mixer', location: 'Ajman' },
        { name: 'Fatima Al Zahra', flag: '🇦🇪', product: '500KVA Generator', location: 'Dubai' },
        { name: 'Vikram Patel', flag: '🇮🇳', product: 'Forklift Rental', location: 'RAK' },
        { name: 'Omar Al Farsi', flag: '🇴🇲', product: 'Welding Machine', location: 'Dubai' },
        { name: 'Hassan Abdullah', flag: '🇦🇪', product: 'Building Materials', location: 'Fujairah' },
        { name: 'Imran Malik', flag: '🇵🇰', product: 'Crane Rental', location: 'Dubai' },
        { name: 'Sanjay Kumar', flag: '🇮🇳', product: 'Compressor', location: 'Sharjah' },
        { name: 'Yousef Al Ahmad', flag: '🇰🇼', product: 'Ladder Set', location: 'Dubai' },
        { name: 'Tariq Mahmoud', flag: '🇪🇬', product: 'Power Generator', location: 'Abu Dhabi' },
        { name: 'Naveed Akhtar', flag: '🇵🇰', product: 'Scaffolding', location: 'Dubai' },
        { name: 'Suresh Reddy', flag: '🇮🇳', product: 'Boom Lift', location: 'Dubai' }
    ];

    function showRandomPurchase() {
        const purchase = purchases[Math.floor(Math.random() * purchases.length)];
        const timeAgo = Math.floor(Math.random() * 30) + 1;

        Toastify({
            text: `${purchase.flag} ${purchase.name} from ${purchase.location} just rented ${purchase.product} - ${timeAgo} min ago`,
            duration: 5000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #1a1a2e, #16213e)",
                borderRadius: "12px",
                padding: "15px 25px",
                fontWeight: "500",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
            },
            onClick: function() {
                window.location.href = `tel:${CONFIG.businessPhone}`;
            }
        }).showToast();
    }

    // Show first notification after 10 seconds
    setTimeout(showRandomPurchase, 10000);
    
    // Then show every 30-60 seconds
    setInterval(showRandomPurchase, Math.random() * 30000 + 30000);
}

// ==========================================
// CHATBOT
// ==========================================
function initChatbot() {
    let chatEnded = false;
    let messageCount = 0;
    const maxMessages = 10;

    // Chatbot Knowledge Base
    const chatbotResponses = {
        greeting: [
            "Hello! 👋 Welcome to Rawdha Rental! I'm here to help you find the perfect equipment for your project.",
            "Hi there! 🏗️ Thanks for reaching out to Rawdha Rental. How can I assist you today?",
            "Welcome! 😊 Looking for building equipment or rental services? I'm here to help!"
        ],
        services: [
            "We offer a wide range of services including:\n\n🔌 Generator Rental (5KVA - 2000KVA)\n🏗️ Scaffolding Systems\n🔧 Power Tools\n🚜 Heavy Machinery\n🧱 Building Materials\n⚡ Welding Equipment\n\nWould you like more details about any of these?",
        ],
        generators: [
            "Our generator rental includes:\n\n⚡ 5KVA to 2000KVA capacity\n🔇 Silent & standard options\n⛽ 24/7 fuel support\n🛠️ Free maintenance\n🚚 Same-day delivery\n\nStarting from AED 150/day. Want a custom quote?"
        ],
        pricing: [
            "Our pricing is very competitive! Here's an overview:\n\n🔌 Generators: From AED 150/day\n🏗️ Scaffolding: From AED 15/sqm/month\n🔧 Power Tools: From AED 50/day\n🚜 Excavators: From AED 800/day\n\n📞 Call us at +971 56 943 8027 for exact quotes!"
        ],
        delivery: [
            "Yes! We offer delivery across all UAE emirates:\n\n🚚 Dubai: FREE (orders above AED 500)\n📍 Abu Dhabi, Sharjah, Ajman\n📍 RAK, Fujairah, UAQ\n\n⏰ Same-day delivery available!\n🕐 24/7 service"
        ],
        contact: [
            `You can reach us through:\n\n📞 Phone: ${CONFIG.businessPhone}\n📧 Email: ${CONFIG.businessEmail}\n📍 Location: ${CONFIG.businessLocation}\n💬 WhatsApp: Click the green button!\n\nWe're available 24/7! 🌟`
        ],
        discount: [
            "🎉 Great news! We have a special offer for you:\n\n✨ 30% OFF on your first rental!\n🎫 Use code: RAWDHA30\n\n📞 Call now to claim: +971 56 943 8027"
        ],
        default: [
            "I'd be happy to help! For detailed information, please:\n\n📞 Call: +971 56 943 8027\n💬 WhatsApp: Click the green button\n\nOur team will assist you immediately! 🙂"
        ]
    };

    // Initial suggestions based on common queries
    let currentSuggestions = [
        'What services do you offer?',
        'Generator rental prices',
        'Do you deliver to my area?',
        'Get a free quote',
        'Current discounts'
    ];

    // Open chatbot
    DOM.openChatbot?.addEventListener('click', () => {
        DOM.chatbotContainer.classList.add('active');
        DOM.openChatbot.querySelector('.notification-badge').style.display = 'none';
        
        // Show welcome message if empty
        if (DOM.chatbotMessages.children.length === 0) {
            setTimeout(() => {
                addBotMessage(getRandomResponse('greeting'));
                showSuggestions(currentSuggestions);
            }, 500);
        }
    });

    // Close chatbot
    DOM.closeChatbot?.addEventListener('click', () => {
        DOM.chatbotContainer.classList.remove('active');
    });

    // Send message
    DOM.sendMessage?.addEventListener('click', sendUserMessage);
    DOM.chatbotInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendUserMessage();
    });

    function sendUserMessage() {
        const message = DOM.chatbotInput.value.trim();
        if (!message || chatEnded) return;

        addUserMessage(message);
        DOM.chatbotInput.value = '';
        messageCount++;

        // Check if chat should end
        if (messageCount >= maxMessages) {
            endChat();
            return;
        }

        // Show typing indicator
        showTypingIndicator();

        // Process and respond
        setTimeout(() => {
            removeTypingIndicator();
            const response = getResponseForQuery(message);
            addBotMessage(response);
            updateSuggestions(message);
        }, 1000 + Math.random() * 1000);
    }

    function addUserMessage(message) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageHTML = `
            <div class="chat-message user">
                <div class="message-avatar"><i class="fas fa-user"></i></div>
                <div class="message-content">
                    ${message}
                    <div class="message-time">${time}</div>
                </div>
            </div>
        `;
        DOM.chatbotMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    function addBotMessage(message) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageHTML = `
            <div class="chat-message bot">
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-content">
                    ${message.replace(/\n/g, '<br>')}
                    <div class="message-time">${time}</div>
                </div>
            </div>
        `;
        DOM.chatbotMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingHTML = `
            <div class="chat-message bot typing-message">
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        DOM.chatbotMessages.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingMessage = DOM.chatbotMessages.querySelector('.typing-message');
        if (typingMessage) typingMessage.remove();
    }

    function showSuggestions(suggestions) {
        DOM.chatbotSuggestions.innerHTML = suggestions.map(s => 
            `<button class="suggestion-btn">${s}</button>`
        ).join('');

        // Add click handlers
        DOM.chatbotSuggestions.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                DOM.chatbotInput.value = btn.textContent;
                sendUserMessage();
            });
        });
    }

    function updateSuggestions(lastQuery) {
        const query = lastQuery.toLowerCase();
        
        if (query.includes('generator') || query.includes('power')) {
            currentSuggestions = ['Generator sizes available', 'Delivery time', 'Get a quote', 'Talk to expert'];
        } else if (query.includes('price') || query.includes('cost') || query.includes('rate')) {
            currentSuggestions = ['Get exact quote', 'Bulk discounts', 'Payment options', 'Call now'];
        } else if (query.includes('deliver') || query.includes('location')) {
            currentSuggestions = ['Delivery charges', 'Same-day delivery', 'Contact us', 'Place order'];
        } else if (query.includes('scaffold')) {
            currentSuggestions = ['Installation included?', 'Safety standards', 'Pricing', 'Book now'];
        } else {
            currentSuggestions = ['View all services', 'Get discount code', 'Request callback', 'Talk to human'];
        }

        showSuggestions(currentSuggestions);
    }

    function getResponseForQuery(query) {
        const q = query.toLowerCase();
        
        if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
            return getRandomResponse('greeting');
        } else if (q.includes('service') || q.includes('offer') || q.includes('what do you')) {
            return getRandomResponse('services');
        } else if (q.includes('generator') || q.includes('power')) {
            return getRandomResponse('generators');
        } else if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('quote')) {
            return getRandomResponse('pricing');
        } else if (q.includes('deliver') || q.includes('location') || q.includes('area')) {
            return getRandomResponse('delivery');
        } else if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('talk')) {
            return getRandomResponse('contact');
        } else if (q.includes('discount') || q.includes('offer') || q.includes('deal')) {
            return getRandomResponse('discount');
        } else {
            return getRandomResponse('default');
        }
    }

    function getRandomResponse(category) {
        const responses = chatbotResponses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function endChat() {
        chatEnded = true;
        DOM.chatbotSuggestions.style.display = 'none';
        DOM.chatbotInputArea.style.display = 'none';
        DOM.chatbotEnded.style.display = 'block';
    }

    function scrollToBottom() {
        DOM.chatbotMessages.scrollTop = DOM.chatbotMessages.scrollHeight;
    }
}

// ==========================================
// CONTACT FORM
// ==========================================
function initContactForm() {
    DOM.contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = DOM.contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        submitBtn.classList.remove('loading');

        // Show success message
        Toastify({
            text: "✅ Thank you! We'll contact you within 1 hour.",
            duration: 5000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00d68f, #00b377)",
                borderRadius: "12px",
                fontWeight: "600"
            }
        }).showToast();

        // Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00c6fb', '#005bea', '#ffd700']
        });

        // Reset form
        DOM.contactForm.reset();
    });
}

// ==========================================
// FORM VALIDATION
// ==========================================
function initFormValidation() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateInput(input);
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;

    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }

    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }

    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        isValid = phoneRegex.test(value.replace(/\s/g, ''));
    }

    if (isValid) {
        input.classList.remove('error');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
    }

    return isValid;
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const offcanvas = document.getElementById('mobileMenu');
    
    if (offcanvas) {
        offcanvas.addEventListener('hide.bs.offcanvas', () => {
            document.body.style.overflow = '';
        });
        offcanvas.addEventListener('show.bs.offcanvas', () => {
            document.body.style.overflow = 'hidden';
        });

        // Close menu when clicking on nav links
        const mobileNavLinks = offcanvas.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            });
        });
    }
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==========================================
// PARALLAX EFFECTS
// ==========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ==========================================
// SMOOTH REVEAL ANIMATIONS
// ==========================================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ==========================================
// MAGNETIC BUTTONS EFFECT
// ==========================================
function initMagneticButtons() {
    if (window.innerWidth < 992) return;

    const magneticButtons = document.querySelectorAll('.btn-gradient, .btn-hero-primary, .floating-btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ==========================================
// TEXT SCRAMBLE EFFECT
// ==========================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ==========================================
// TILT EFFECT FOR CARDS
// ==========================================
function initTiltEffect() {
    if (window.innerWidth < 992) return;

    const tiltCards = document.querySelectorAll('.service-card, .equipment-card, .testimonial-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ==========================================
// RIPPLE EFFECT
// ==========================================
function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.btn-gradient, .btn-outline-gradient');

    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS for ripple
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 9999;
        }
        .scroll-progress-bar {
            height: 100%;
            background: linear-gradient(to right, #00c6fb, #005bea);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);

    // Update on scroll
    const progressBarInner = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBarInner.style.width = scrollPercent + '%';
    });
}

// ==========================================
// DYNAMIC YEAR UPDATE
// ==========================================
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key to close chatbot
        if (e.key === 'Escape') {
            if (DOM.chatbotContainer.classList.contains('active')) {
                DOM.chatbotContainer.classList.remove('active');
            }
        }

        // Ctrl/Cmd + K to open chatbot
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            DOM.chatbotContainer.classList.toggle('active');
            if (DOM.chatbotContainer.classList.contains('active')) {
                setTimeout(() => DOM.chatbotInput?.focus(), 300);
            }
        }
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
function optimizePerformance() {
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimize scroll events
    const debouncedScroll = debounce(() => {
        // Heavy scroll operations here
    }, 100);

    window.addEventListener('scroll', debouncedScroll, { passive: true });

    // Optimize resize events
    const debouncedResize = debounce(() => {
        // Recalculate layouts if needed
        if (window.innerWidth < 992) {
            // Disable certain effects on mobile
        }
    }, 250);

    window.addEventListener('resize', debouncedResize);
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
function initIntersectionAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation || 'fadeInUp';
                const delay = element.dataset.delay || 0;

                setTimeout(() => {
                    element.classList.add('animated', animation);
                }, delay);

                animationObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// ==========================================
// SMOOTH HOVER STATES
// ==========================================
function initSmoothHoverStates() {
    // Add smooth transitions to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .equipment-card');

    interactiveElements.forEach(element => {
        element.style.transition = element.style.transition 
            ? element.style.transition + ', transform 0.3s ease'
            : 'transform 0.3s ease';
    });
}

// ==========================================
// PRELOAD CRITICAL RESOURCES
// ==========================================
function preloadResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=700&fit=crop',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=600&fit=crop'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// ==========================================
// ERROR HANDLING
// ==========================================
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.message);
        // You could send this to an analytics service
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
    });
}

// ==========================================
// ANALYTICS TRACKING (Placeholder)
// ==========================================
function initAnalytics() {
    // Track button clicks
    document.querySelectorAll('.btn, .floating-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonClass = this.className;
            
            // Send to analytics
            console.log('Button clicked:', buttonText, buttonClass);
            
            // Example: gtag('event', 'click', { event_category: 'button', event_label: buttonText });
        });
    });

    // Track phone calls
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Phone call initiated');
            // Example: gtag('event', 'click', { event_category: 'contact', event_label: 'phone_call' });
        });
    });

    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('WhatsApp initiated');
            // Example: gtag('event', 'click', { event_category: 'contact', event_label: 'whatsapp' });
        });
    });

    // Track form submissions
    DOM.contactForm?.addEventListener('submit', () => {
        console.log('Contact form submitted');
        // Example: gtag('event', 'submit', { event_category: 'form', event_label: 'contact_form' });
    });
}

// ==========================================
// SERVICE WORKER REGISTRATION
// ==========================================
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
}

// ==========================================
// STICKY HEADER SHADOW
// ==========================================
function initStickyHeaderShadow() {
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            DOM.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            DOM.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        if (currentScrollY <= 10) {
            DOM.header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}

// ==========================================
// MARQUEE PAUSE ON HOVER
// ==========================================
function initMarqueePause() {
    const marquee = document.querySelector('.marquee-content');
    const marqueeWrapper = document.querySelector('.marquee-wrapper');

    if (marqueeWrapper && marquee) {
        marqueeWrapper.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });

        marqueeWrapper.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });
    }
}

// ==========================================
// ACCORDION SMOOTH ANIMATION
// ==========================================
function initAccordionAnimations() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const collapse = item.querySelector('.accordion-collapse');

        if (button && collapse) {
            button.addEventListener('click', () => {
                // Add smooth transition
                collapse.style.transition = 'height 0.4s ease, opacity 0.4s ease';
            });
        }
    });
}

// ==========================================
// TESTIMONIALS AUTO SCROLL
// ==========================================
function initTestimonialsAutoScroll() {
    const testimonialsSwiper = document.querySelector('.testimonials-swiper');
    
    if (testimonialsSwiper) {
        // Pause autoplay on hover
        testimonialsSwiper.addEventListener('mouseenter', () => {
            const swiperInstance = testimonialsSwiper.swiper;
            if (swiperInstance && swiperInstance.autoplay) {
                swiperInstance.autoplay.stop();
            }
        });

        testimonialsSwiper.addEventListener('mouseleave', () => {
            const swiperInstance = testimonialsSwiper.swiper;
            if (swiperInstance && swiperInstance.autoplay) {
                swiperInstance.autoplay.start();
            }
        });
    }
}

// ==========================================
// DYNAMIC META TAGS UPDATE
// ==========================================
function updateMetaTags() {
    // Update canonical URL if needed
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
        canonicalLink.href = window.location.href;
    }
}

// ==========================================
// COPY TO CLIPBOARD UTILITY
// ==========================================
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return Promise.resolve();
        } catch (err) {
            document.body.removeChild(textarea);
            return Promise.reject(err);
        }
    }
}

// ==========================================
// PHONE NUMBER CLICK TRACKING
// ==========================================
function initPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Show confirmation toast
            Toastify({
                text: "📞 Calling Rawdha Rental...",
                duration: 2000,
                gravity: "bottom",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #00c6fb, #005bea)",
                    borderRadius: "10px",
                    fontWeight: "600"
                }
            }).showToast();
        });
    });
}

// ==========================================
// EMAIL LINK PROTECTION
// ==========================================
function initEmailProtection() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            Toastify({
                text: "📧 Opening email client...",
                duration: 2000,
                gravity: "bottom",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #00c6fb, #005bea)",
                    borderRadius: "10px",
                    fontWeight: "600"
                }
            }).showToast();
        });
    });
}

// ==========================================
// GALLERY LIGHTBOX ENHANCEMENTS
// ==========================================
function initGalleryEnhancements() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add zoom effect
            const img = item.querySelector('img');
            if (img) {
                gsap.to(img, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            if (img) {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// ==========================================
// FLOATING BUTTONS VISIBILITY
// ==========================================
function initFloatingButtonsVisibility() {
    const floatingLeft = document.querySelector('.floating-buttons-left');
    const floatingRight = document.querySelector('.floating-buttons-right');
    
    // Hide buttons when footer is visible
    const footer = document.querySelector('.footer');
    
    if (footer && floatingLeft && floatingRight) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    floatingLeft.style.opacity = '0.5';
                    floatingRight.style.opacity = '0.5';
                } else {
                    floatingLeft.style.opacity = '1';
                    floatingRight.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.3
        });

        footerObserver.observe(footer);
    }
}

// ==========================================
// HERO PARTICLES ANIMATION
// ==========================================
function initHeroParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// EQUIPMENT CARD QUICK VIEW
// ==========================================
function initEquipmentQuickView() {
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    equipmentCards.forEach(card => {
        const viewBtn = card.querySelector('.overlay-btn[data-fancybox]');
        const rentBtn = card.querySelector('.btn-equipment');

        if (rentBtn) {
            rentBtn.addEventListener('click', (e) => {
                // Add clicked animation
                gsap.to(rentBtn, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });

                // Show toast
                Toastify({
                    text: "📞 Connecting you to our team...",
                    duration: 2000,
                    gravity: "bottom",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, #00c6fb, #005bea)",
                        borderRadius: "10px",
                        fontWeight: "600"
                    }
                }).showToast();
            });
        }
    });
}

// ==========================================
// SMOOTH DROPDOWN ANIMATION
// ==========================================
function initDropdownAnimations() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('.dropdown-toggle');

        if (toggle && menu) {
            toggle.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 992) {
                    menu.classList.add('show');
                    gsap.fromTo(menu, 
                        { opacity: 0, y: 10 },
                        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
                    );
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 992) {
                    gsap.to(menu, {
                        opacity: 0,
                        y: 10,
                        duration: 0.2,
                        ease: 'power2.in',
                        onComplete: () => {
                            menu.classList.remove('show');
                        }
                    });
                }
            });
        }
    });
}

// ==========================================
// BACK TO TOP ANIMATION
// ==========================================
function initBackToTopAnimation() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        let lastRotation = 0;

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            const newRotation = scrollPercent * 3.6; // 360 degrees for 100%
            
            if (Math.abs(newRotation - lastRotation) > 5) {
                gsap.to(scrollToTopBtn.querySelector('i'), {
                    rotation: newRotation,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                lastRotation = newRotation;
            }
        }, { passive: true });
    }
}

// ==========================================
// SERVICE CARD ICON ANIMATION
// ==========================================
function initServiceIconAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon i');
        
        if (icon) {
            card.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.6,
                    ease: 'back.out(1.7)'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        }
    });
}

// ==========================================
// STATS ANIMATION ON SCROLL
// ==========================================
function initStatsAnimation() {
    const statCards = document.querySelectorAll('.stat-card');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    gsap.from(entry.target, {
                        y: 50,
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.6,
                        ease: 'back.out(1.7)'
                    });
                }, index * 100);
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    statCards.forEach(card => {
        statsObserver.observe(card);
    });
}

// ==========================================
// NAVBAR LINK HOVER EFFECT
// ==========================================
function initNavbarLinkHoverEffect() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -2,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

// ==========================================
// TOOLTIP INITIALIZATION
// ==========================================
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            animation: true,
            delay: { show: 100, hide: 100 }
        });
    });
}

// ==========================================
// LOCAL STORAGE UTILITIES
// ==========================================
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    },

    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('LocalStorage not available:', e);
            return null;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    }
};

// ==========================================
// VISITOR COUNTER (Demo)
// ==========================================
function initVisitorCounter() {
    let visits = Storage.get('rawdha_visits') || 0;
    visits++;
    Storage.set('rawdha_visits', visits);

    // Could show a welcome back message for returning visitors
    if (visits > 1) {
        setTimeout(() => {
            Toastify({
                text: `👋 Welcome back! This is your visit #${visits}`,
                duration: 4000,
                gravity: "bottom",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #00c6fb, #005bea)",
                    borderRadius: "10px",
                    fontWeight: "600"
                }
            }).showToast();
        }, 5000);
    }
}

// ==========================================
// PRINT STYLES HANDLER
// ==========================================
function initPrintHandler() {
    window.addEventListener('beforeprint', () => {
        // Hide interactive elements
        document.querySelectorAll('.floating-buttons-left, .floating-buttons-right, .chatbot-container, .scroll-to-top').forEach(el => {
            el.style.display = 'none';
        });
    });

    window.addEventListener('afterprint', () => {
        // Restore elements
        document.querySelectorAll('.floating-buttons-left, .floating-buttons-right, .chatbot-container, .scroll-to-top').forEach(el => {
            el.style.display = '';
        });
    });
}

// ==========================================
// NETWORK STATUS HANDLER
// ==========================================
function initNetworkStatusHandler() {
    window.addEventListener('online', () => {
        Toastify({
            text: "✅ You're back online!",
            duration: 3000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00d68f, #00b377)",
                borderRadius: "10px",
                fontWeight: "600"
            }
        }).showToast();
    });

    window.addEventListener('offline', () => {
        Toastify({
            text: "⚠️ You're offline. Some features may not work.",
            duration: 5000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #ff4757, #ff6b81)",
                borderRadius: "10px",
                fontWeight: "600"
            }
        }).showToast();
    });
}

// ==========================================
// INITIALIZE ALL FUNCTIONS
// ==========================================
function initializeApp() {
    // Core functionality
    initPreloader();
    initCursor();
    initHeader();
    initMobileMenu();
    initCounters();
    initCountdown();
    initEquipmentFilter();
    initSwipers();
    initFancybox();
    initChatbot();
    initContactForm();
    initFormValidation();
    
    // Animations
    initGSAPAnimations();
    initRevealAnimations();
    initIntersectionAnimations();
    initParallax();
    initTiltEffect();
    initMagneticButtons();
    initRippleEffect();
    initServiceIconAnimations();
    initStatsAnimation();
    initNavbarLinkHoverEffect();
    initAccordionAnimations();
    initDropdownAnimations();
    initBackToTopAnimation();
    initGalleryEnhancements();
    initHeroParticles();
    
    // UI Enhancements
    initScrollProgress();
    initStickyHeaderShadow();
    initMarqueePause();
    initTestimonialsAutoScroll();
    initFloatingButtonsVisibility();
    initEquipmentQuickView();
    initTooltips();
    initLazyLoading();
    initSmoothHoverStates();
    
    // Tracking & Analytics
    initPhoneTracking();
    initEmailProtection();
    initAnalytics();
    initVisitorCounter();
    
    // Utilities
    updateCurrentYear();
    updateMetaTags();
    initKeyboardNavigation();
    initErrorHandling();
    initNetworkStatusHandler();
    initPrintHandler();
    optimizePerformance();
    preloadResources();
    
    // Optional: Service Worker (uncomment for PWA support)
    // registerServiceWorker();
    
    console.log('%c🏗️ Rawdha Rental Website Loaded Successfully!', 'color: #005bea; font-size: 16px; font-weight: bold;');
    console.log('%cDesigned & Developed by Dilawar Pro | https://dilawarpro.com', 'color: #00c6fb; font-size: 12px;');
}

// ==========================================
// DOCUMENT READY
// ==========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ==========================================
// WINDOW LOAD EVENT
// ==========================================
window.addEventListener('load', () => {
    // Additional initialization after all resources are loaded
    document.body.classList.add('loaded');
    
    // Remove any loading states
    setTimeout(() => {
        document.querySelectorAll('.skeleton-loading').forEach(el => {
            el.classList.remove('skeleton-loading');
        });
    }, 500);
});

// ==========================================
// EXPOSE GLOBAL FUNCTIONS
// ==========================================
window.RawdhaRental = {
    config: CONFIG,
    copyPromoCode: copyPromoCode,
    copyToClipboard: copyToClipboard,
    triggerConfetti: triggerConfetti,
    storage: Storage
};