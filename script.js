// TÜBİTAK RAG Asistan - Etkileşimli Animasyonlar

// ========== DOM Elements ==========
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const statNumbers = document.querySelectorAll('.stat-number');
const demoInput = document.getElementById('demoInput');
const demoSend = document.getElementById('demoSend');
const demoMessages = document.getElementById('demoMessages');

// ========== Navbar Scroll Effect ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== Smooth Navigation ==========
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Mobile Menu Toggle ==========
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const navLinksContainer = document.querySelector('.nav-links');
        navLinksContainer.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ========== Animated Counter ==========
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// ========== Floating Particles Animation ==========
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Styling
        particle.style.position = 'absolute';
        particle.style.background = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        
        particlesContainer.appendChild(particle);
        
        // Animate
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    
    let x = startX;
    let y = startY;
    let vx = (Math.random() - 0.5) * 0.1;
    let vy = (Math.random() - 0.5) * 0.1;
    
    function move() {
        x += vx;
        y += vy;
        
        // Bounce off edges
        if (x <= 0 || x >= 100) vx *= -1;
        if (y <= 0 || y >= 100) vy *= -1;
        
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        
        requestAnimationFrame(move);
    }
    
    move();
}

createParticles();

// ========== Demo Chat Functionality ==========
// Anahtar kelime bazlı akıllı yanıt sistemi
const smartResponses = {
    'merhaba': 'Merhaba! Ben BEYZA, TÜBİTAK 2204 yarışmaları için yapay zeka asistanınızım. Size nasıl yardımcı olabilirim? 👋',
    'selam': 'Selam! Ben BEYZA. Projenizdeki hangi konuda yardıma ihtiyacınız var? 😊',
    'günaydın': 'Günaydın! Bugün projeniz için neler yapabiliriz? ☀️',
    'iyi günler': 'İyi günler! Size nasıl yardımcı olabilirim? 🌟',
    'nasılsın': 'Ben iyiyim, teşekkür ederim! Sizin projeniz nasıl gidiyor? Yardımcı olabileceğim bir konu var mı? 🤖',
    'teşekkür': 'Rica ederim! Size yardımcı olmaktan mutluluk duyarım. Başka bir konuda da yardıma ihtiyacınız olursa buradayım! 🙏',
    'sağol': 'Ne demek, her zaman! Başka sorunuz olursa çekinmeden sorun. 😊',
    'help': 'Size yardımcı olabileceğim konular: Fikir geliştirme, literatür tarama, rapor yazımı, proje değerlendirmesi. Hangi konuda yardım istersiniz? 📚',
    'yardım': 'Tabii ki! Proje fikri mi, literatür taraması mı, rapor yazımı mı? Size hangi konuda yardımcı olabilirim? 💡',
    'neler yapabilirsin': 'Ben size şu konularda yardımcı olabilirim:\n\n💡 Proje fikri geliştirme\n📚 Literatür taraması (130M+ makale)\n📝 Rapor yazımı (11 bölüm)\n🎯 Proje değerlendirmesi\n🔬 Metodoloji önerileri\n\nHangi konuyla başlamak istersiniz?',
    'tanış': 'Merhaba! Ben BEYZA - Bilimsel Etkinlikler Yapay Zeka Asistanı. TÜBİTAK 2204 yarışmalarında size rehberlik etmek için buradayım. Multimodal yapay zeka teknolojisi, literatür tarama ve akıllı rapor yazma özellikleriyle donatılmışım! 🤖✨',
    'kim': 'Ben BEYZA, TÜBİTAK 2204 yarışmaları için özel olarak geliştirilmiş bir yapay zeka asistanıyım. Google Gemini, LangChain ve ChromaDB teknolojileriyle çalışıyorum. 🚀',
};

function findSmartResponse(text) {
    const lowerText = text.toLowerCase();
    
    // Anahtar kelimeleri kontrol et
    for (const [keyword, response] of Object.entries(smartResponses)) {
        if (lowerText.includes(keyword)) {
            return response;
        }
    }
    
    return null; // Eşleşme yoksa null döndür
}

const demoQuestions = [
    "Yapay zeka ile ilgili bir proje fikri önerir misin?",
    "Literatür taraması nasıl yapabilirim?",
    "Rapor yazarken nelere dikkat etmeliyim?",
    "Proje değerlendirmesi nasıl çalışır?"
];

const demoResponses = [
    "Yapay zeka projeleri için harika bir alan seçtiniz! Size birkaç fikir önerebilirim:\n\n1. 🤖 Tıbbi Görüntü Analizi: Röntgen veya MRI görüntülerinden hastalık tespiti\n2. 🌾 Akıllı Tarım: Bitki hastalıklarını yapay görü ile tespit etme\n3. 🚗 Trafik Optimizasyonu: Akıllı kavşak yönetim sistemi\n4. 📚 Eğitim Asistanı: Öğrenci performans analizi ve kişiselleştirilmiş öğrenme\n\nHangi alan ilginizi çekiyor?",
    
    "Literatür taraması için BEYZA size yardımcı olabilir! 📚\n\nCrossref API ile 130+ milyon akademik makaleye erişim sağlıyoruz:\n\n✓ Anahtar kelime bazlı akıllı arama\n✓ DOI/URL'den otomatik kaynak ekleme\n✓ APA7 formatında otomatik atıf\n✓ Kaynak yöneticisi ile organize etme\n\nHangi konuda literatür araştırması yapmak istersiniz?",
    
    "Rapor yazımı için 11 bölümlü profesyonel şablonumuz var! 📝\n\nDikkat edilmesi gereken noktalar:\n\n1. 📌 Özet: Net ve öz (200-250 kelime)\n2. 🎯 Amaç: Spesifik ve ölçülebilir hedefler\n3. 🔬 Yöntem: Detaylı ve tekrarlanabilir\n4. 📊 Bulgular: Görsellerle desteklenmiş veriler\n5. 💡 Sonuç: Bulguların yorumlanması\n6. 📚 Kaynakça: Doğru APA7 formatı\n\nHangi bölümde yardıma ihtiyacınız var?",
    
    "Multimodal değerlendirme sistemimiz ile projeler kapsamlı şekilde incelenir! 🎯\n\nDeğerlendirme Özellikleri:\n\n✓ Gemini Vision API ile görsel analiz\n✓ Metin, resim ve tablo analizi\n✓ Few-shot learning ile tutarlı puanlama\n✓ Detaylı geri bildirim ve öneriler\n✓ TÜBİTAK kriterlerine uygun değerlendirme\n\nÖn rapor veya bölge finali değerlendirmesi yapabilirsiniz!"
];

let currentDemoIndex = 0;

function addDemoMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.className = isUser ? 'message user-message' : 'message bot-message';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? '👤' : '🤖';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Typing effect for bot messages
    if (!isUser) {
        content.innerHTML = '<p style="opacity: 0.5;">⌨️ Yazıyor...</p>';
        message.appendChild(avatar);
        message.appendChild(content);
        demoMessages.appendChild(message);
        demoMessages.scrollTop = demoMessages.scrollHeight;
        
        setTimeout(() => {
            content.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
        }, 1000);
    } else {
        content.innerHTML = `<p>${text}</p>`;
        message.appendChild(avatar);
        message.appendChild(content);
        demoMessages.appendChild(message);
        demoMessages.scrollTop = demoMessages.scrollHeight;
    }
}

function handleDemoSend() {
    const userInput = demoInput.value.trim();
    
    if (userInput) {
        // Add user message
        addDemoMessage(userInput, true);
        demoInput.value = '';
        
        // Add bot response after delay
        setTimeout(() => {
            // Önce akıllı yanıt kontrolü yap
            const smartResponse = findSmartResponse(userInput);
            
            let response;
            if (smartResponse) {
                // Akıllı yanıt varsa onu kullan
                response = smartResponse;
            } else {
                // Yoksa demo yanıtlarından birini kullan
                response = demoResponses[currentDemoIndex % demoResponses.length];
                currentDemoIndex++;
            }
            
            addDemoMessage(response, false);
        }, 1500);
    } else {
        // If empty, show next demo question
        const demoQuestion = demoQuestions[currentDemoIndex % demoQuestions.length];
        addDemoMessage(demoQuestion, true);
        
        setTimeout(() => {
            const response = demoResponses[currentDemoIndex % demoResponses.length];
            addDemoMessage(response, false);
            currentDemoIndex++;
        }, 1500);
    }
}

if (demoSend) {
    demoSend.addEventListener('click', handleDemoSend);
}

if (demoInput) {
    demoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleDemoSend();
        }
    });
}

// ========== Scroll Reveal Animation ==========
function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .tech-category, .demo-feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        observer.observe(el);
    });
}

revealOnScroll();

// ========== Active Section Highlighting ==========
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

updateActiveNavOnScroll();

// ========== Parallax Effect ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// ========== Cursor Trail Effect ==========
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ========== Performance Optimization ==========
// Debounce function for scroll events
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

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========== Console Easter Egg ==========
console.log('%c🤖 BEYZA - TÜBİTAK 2204 Yapay Zeka Asistanı', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBilimsel Etkinlikler Yapay Zeka Asistanı', 'font-size: 14px; color: #8b5cf6;');
console.log('%cTÜBİTAK 2204 Araştırma Projeleri Yarışmaları için geliştirilmiştir', 'font-size: 12px; color: #94a3b8;');

// ========== Loading Animation ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ========== Auto-play Demo Chat ==========
let autoDemoInterval;

function startAutoDemo() {
    autoDemoInterval = setInterval(() => {
        if (currentDemoIndex < demoQuestions.length) {
            handleDemoSend();
        } else {
            clearInterval(autoDemoInterval);
        }
    }, 8000); // Every 8 seconds
}

// Start auto demo when demo section is visible
const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && currentDemoIndex === 0) {
            setTimeout(() => {
                handleDemoSend(); // Start with first demo message
            }, 1000);
        }
    });
}, { threshold: 0.5 });

const demoSection = document.getElementById('demo');
if (demoSection) {
    demoObserver.observe(demoSection);
}

// ========== Smooth Page Transitions ==========
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

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ BEYZA website initialized');
});

// ========== RAG Visualization System ==========
const ragModal = document.getElementById('ragModal');
const ragModalOverlay = document.getElementById('ragModalOverlay');
const ragModalClose = document.getElementById('ragModalClose');
const ragClose = document.getElementById('ragClose');
const ragRestart = document.getElementById('ragRestart');
const visualizeBtn = document.getElementById('visualizeBtn');
const ragQuestion = document.getElementById('ragQuestion');
const ragResult = document.getElementById('ragResult');
const ragResultContent = document.getElementById('ragResultContent');

// Örnek sorular ve sınıflandırmaları
const ragSampleQuestions = [
    "Bu yarışmada hangi alanlarda başvuru yapabilirim?",
    "Yapay zeka ve biyoloji kesişiminde yenilikçi bir proje fikri önerir misiniz?",
    "Değerlendirme kriterleri nelerdir ve puanlama nasıl yapılır?",
    "Literatür taraması için hangi kaynakları kullanmalıyım?"
];

// Soru tipleri (classifier çıktısı)
const questionTypes = [
    { type: "Bilgi Sorusu", color: "#10b981", needsLiterature: false, needsProjects: false },
    { type: "Fikir/Öneri Sorusu", color: "#f59e0b", needsLiterature: true, needsProjects: true },
    { type: "Bilgi Sorusu", color: "#10b981", needsLiterature: false, needsProjects: false },
    { type: "Bilgi Sorusu", color: "#10b981", needsLiterature: false, needsProjects: false }
];

// Örnek yanıtlar
const ragSampleAnswers = {
    0: "TÜBİTAK 2204-A yarışmasında <strong>12 ana alan</strong> bulunmaktadır:\n\n🔬 <strong>Biyoloji</strong> • ⚗️ <strong>Kimya</strong> • ⚛️ <strong>Fizik</strong>\n🌍 <strong>Coğrafya</strong> • 📐 <strong>Matematik</strong> • 💻 <strong>Yazılım</strong>\n📚 <strong>Türk Dili ve Edebiyatı</strong> • 📜 <strong>Tarih</strong>\n👥 <strong>Sosyoloji</strong> • 🧠 <strong>Psikoloji</strong>\n💎 <strong>Değerler Eğitimi</strong> • 🔧 <strong>Teknolojik Tasarım</strong>\n\nİstediğiniz alana uygun bir proje konusu geliştirebilirsiniz!",
    
    1: "Yapay zeka ve biyoloji kesişiminde ilginç proje önerileri:\n\n🧬 <strong>DNA Dizileme Analizi ile Hastalık Tahmini</strong>\n   → Machine learning ile genetik varyasyonları analiz ederek hastalık riski belirleme\n   → Benzer projeler: <em>'Kanser Türü Sınıflandırma', 'Kalıtsal Hastalık Tahmini'</em>\n\n🔬 <strong>Mikroskop Görüntülerinde Hücre Sayımı</strong>\n   → Computer vision ile otomatik hücre tespiti ve sayımı\n   → Literatür: 'Deep Learning in Medical Image Analysis' (Nature, 2023)\n\n🌱 <strong>Bitki Hastalıkları Erken Teşhis Sistemi</strong>\n   → Yaprak görüntülerinden hastalık tespiti ve öneri sistemi\n   → Crossref'ten bulunan 127 ilgili akademik makale\n\n💡 Bu projeler için BEYZA sistemi size örnek çalışmalar ve güncel literatür sağlayabilir!",
    
    2: "Ön rapor değerlendirmesi <strong>4 ana kriter</strong> üzerinden yapılır:\n\n📋 <strong>Problemin/İhtiyacın Tanımı, Araştırma Sorusu</strong>\n   → Ön Alan Puanı (ÖAP): <strong>20 puan</strong>\n\n🔬 <strong>Yöntem</strong>\n   → Ön Alan Puanı (ÖAP): <strong>20 puan</strong>\n\n💡 <strong>Yaratıcılık ve Etki</strong>\n   → Ön Alan Puanı (ÖAP): <strong>30 puan</strong>\n\n📊 <strong>Sonuçlar ve Tartışma</strong>\n   → Ön Alan Puanı (ÖAP): <strong>30 puan</strong>\n\n⚠️ <strong>Etik İlkelere Uyum:</strong> İhlal durumunda proje elenir!\n\nToplam <strong>100 puan</strong> üzerinden değerlendirme yapılır.",
    
    3: "Literatür taraması için önerilen kaynaklar:\n\n📚 <strong>Akademik Veritabanları:</strong>\n- Google Scholar\n- Web of Science\n- PubMed (sağlık bilimleri için)\n- IEEE Xplore (mühendislik için)\n\n🌐 <strong>BEYZA Sistemi</strong> ile Crossref API'den <strong>130+ milyon</strong> akademik makaleye erişebilir, otomatik APA7 formatında kaynak oluşturabilirsiniz!"
};

let currentQuestionIndex = 0;
let ragAnimationTimeout;

// Modal açma
function openRagModal() {
    // Rastgele soru seç
    currentQuestionIndex = Math.floor(Math.random() * ragSampleQuestions.length);
    const question = ragSampleQuestions[currentQuestionIndex];
    
    // Modal'ı göster
    ragModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Soruyu göster
    ragQuestion.querySelector('.question-text').textContent = question;
    
    // Tüm adımları sıfırla
    const steps = document.querySelectorAll('.rag-step');
    steps.forEach(step => {
        step.classList.remove('active', 'completed');
        step.querySelector('.step-status').textContent = '⏳';
    });
    
    // Sonuç bölümünü gizle
    ragResult.classList.remove('show');
    
    // Animasyonu başlat
    setTimeout(() => {
        startRagAnimation();
    }, 500);
}

// Modal kapatma
function closeRagModal() {
    ragModal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (ragAnimationTimeout) {
        clearTimeout(ragAnimationTimeout);
    }
}

// RAG animasyonu
function startRagAnimation() {
    const steps = document.querySelectorAll('.rag-step');
    let currentStep = 0;
    const questionType = questionTypes[currentQuestionIndex];
    
    // Tüm adımları reset et
    steps.forEach((step, index) => {
        step.style.opacity = '1';
        step.style.display = 'flex';
        
        // Bilgi sorusu ise adım 6 ve 7'yi gizle
        if (!questionType.needsLiterature && !questionType.needsProjects) {
            if (index === 5 || index === 6) { // Adım 6 ve 7 (0-indexed: 5, 6)
                step.style.opacity = '0.3';
                step.style.pointerEvents = 'none';
            }
        }
    });
    
    function animateStep() {
        if (currentStep > 0) {
            // Önceki adımı tamamlandı olarak işaretle
            steps[currentStep - 1].classList.remove('active');
            steps[currentStep - 1].classList.add('completed');
        }
        
        if (currentStep < steps.length) {
            // Bilgi sorusu için adım 6 ve 7'yi atla
            if (!questionType.needsLiterature && !questionType.needsProjects) {
                if (currentStep === 5 || currentStep === 6) { // Adım 6 ve 7'yi atla
                    steps[currentStep].classList.add('completed');
                    steps[currentStep].querySelector('.step-status').textContent = '⊝'; // Atlandı işareti
                    currentStep++;
                    animateStep();
                    return;
                }
            }
            
            // Mevcut adımı aktif yap
            steps[currentStep].classList.add('active');
            
            // Adımı görünür alana kaydır (smooth scroll)
            steps[currentStep].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
            
            // Adım 2 ise (sınıflandırma), sonucu göster
            if (currentStep === 1) {
                setTimeout(() => {
                    const badge = document.getElementById('classificationBadge');
                    const info = document.getElementById('classificationInfo');
                    
                    badge.style.backgroundColor = questionType.color + '20';
                    badge.style.borderColor = questionType.color;
                    badge.style.color = questionType.color;
                    badge.textContent = questionType.type;
                    badge.style.display = 'inline-block';
                    
                    if (questionType.needsLiterature) {
                        info.textContent = '→ Literatür ve örnek projeler aranacak';
                    } else {
                        info.textContent = '→ Sadece bilgi tabanı kullanılacak';
                    }
                    info.style.display = 'block';
                }, 800);
            }
            
            // Her adım için farklı süre (9 adım)
            const delays = [1200, 1800, 2000, 2500, 2000, 2200, 2200, 3000, 1500];
            
            ragAnimationTimeout = setTimeout(() => {
                currentStep++;
                animateStep();
            }, delays[currentStep] || 1500);
        } else {
            // Tüm adımlar tamamlandı, sonucu göster
            setTimeout(() => {
                showRagResult();
            }, 500);
        }
    }
    
    animateStep();
}

// Sonucu göster
function showRagResult() {
    const answer = ragSampleAnswers[currentQuestionIndex];
    ragResultContent.innerHTML = answer.replace(/\n/g, '<br>');
    ragResult.classList.add('show');
}

// Event listeners
if (visualizeBtn) {
    visualizeBtn.addEventListener('click', openRagModal);
}

if (ragModalClose) {
    ragModalClose.addEventListener('click', closeRagModal);
}

if (ragClose) {
    ragClose.addEventListener('click', closeRagModal);
}

if (ragModalOverlay) {
    ragModalOverlay.addEventListener('click', closeRagModal);
}

if (ragRestart) {
    ragRestart.addEventListener('click', () => {
        closeRagModal();
        setTimeout(() => {
            openRagModal();
        }, 300);
    });
}

// ESC tuşu ile kapatma
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ragModal.classList.contains('active')) {
        closeRagModal();
    }
});
