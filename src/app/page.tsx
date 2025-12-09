'use client'

import { useEffect, useRef, useState } from 'react'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animated counter
  const animateCounter = (element: HTMLElement, target: number) => {
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += step
      if (current < target) {
        element.textContent = Math.floor(current).toString()
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target.toString()
      }
    }
    updateCounter()
  }

  // Counter observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target') || '0')
            animateCounter(entry.target as HTMLElement, target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('.stat-number').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement

    submitButton.textContent = 'Wysyłanie...'
    submitButton.disabled = true

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert('Dziękujemy! Twoja wiadomość została wysłana.')
    form.reset()

    submitButton.textContent = 'Wyślij zapytanie'
    submitButton.disabled = false
  }

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container">
          <a href="#" className="logo">
            <span className="logo-icon">⌂</span>
            PergoMet
          </a>
          <button
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Start</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>O nas</a></li>
            <li><a href="#products" onClick={() => setIsMenuOpen(false)}>Oferta</a></li>
            <li><a href="#gallery" onClick={() => setIsMenuOpen(false)}>Realizacje</a></li>
            <li><a href="#benefits" onClick={() => setIsMenuOpen(false)}>Korzyści</a></li>
            <li><a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Opinie</a></li>
            <li><a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a></li>
            <li><a href="#contact" className="btn btn-nav" onClick={() => setIsMenuOpen(false)}>Kontakt</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="highlight">Nowoczesne pergole</span>
              dla Twojego domu
            </h1>
            <p className="hero-subtitle">
              Stwórz elegancką przestrzeń wypoczynkową na swoim tarasie.
              Profesjonalna sprzedaż i montaż pergol metalowych najwyższej jakości.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Bezpłatna wycena</a>
              <a href="#products" className="btn btn-secondary">Zobacz ofertę</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number" data-target="500">0</span>+
                <span className="stat-label">Realizacji</span>
              </div>
              <div className="stat">
                <span className="stat-number" data-target="12">0</span>
                <span className="stat-label">Lat doświadczenia</span>
              </div>
              <div className="stat">
                <span className="stat-number" data-target="98">0</span>%
                <span className="stat-label">Zadowolonych klientów</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero.jpg" alt="Nowoczesna pergola metalowa na tarasie domu jednorodzinnego" className="hero-img" />
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Przewiń w dół</span>
          <div className="mouse"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">O nas</span>
            <h2 className="section-title">Dlaczego PergoMet?</h2>
            <p className="section-subtitle">Jesteśmy liderem w branży pergol metalowych z 12-letnim doświadczeniem</p>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Premium Materiały</h3>
              <p>Używamy wyłącznie najwyższej jakości aluminium i stali nierdzewnej z certyfikatami jakości.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3>Indywidualny Projekt</h3>
              <p>Każda pergola jest projektowana indywidualnie, dostosowana do architektury Twojego domu.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Szybka Realizacja</h3>
              <p>Od projektu do montażu w zaledwie 2-3 tygodnie. Terminowość to nasz priorytet.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>10 Lat Gwarancji</h3>
              <p>Dajemy 10-letnią gwarancję na konstrukcję i 5-letnią na powłokę lakierniczą.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="products">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Oferta</span>
            <h2 className="section-title">Nasze pergole</h2>
            <p className="section-subtitle">Wybierz idealną pergolę dla swojego tarasu</p>
          </div>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="200" fill="#f8f9fa"/>
                  <rect x="30" y="80" width="240" height="90" fill="#dee2e6" opacity="0.5"/>
                  <line x1="30" y1="80" x2="270" y2="80" stroke="#495057" strokeWidth="4"/>
                  <line x1="30" y1="80" x2="30" y2="170" stroke="#495057" strokeWidth="4"/>
                  <line x1="270" y1="80" x2="270" y2="170" stroke="#495057" strokeWidth="4"/>
                  <line x1="70" y1="80" x2="70" y2="60" stroke="#adb5bd" strokeWidth="2"/>
                  <line x1="110" y1="80" x2="110" y2="60" stroke="#adb5bd" strokeWidth="2"/>
                  <line x1="150" y1="80" x2="150" y2="60" stroke="#adb5bd" strokeWidth="2"/>
                  <line x1="190" y1="80" x2="190" y2="60" stroke="#adb5bd" strokeWidth="2"/>
                  <line x1="230" y1="80" x2="230" y2="60" stroke="#adb5bd" strokeWidth="2"/>
                  <line x1="50" y1="60" x2="250" y2="60" stroke="#adb5bd" strokeWidth="2"/>
                </svg>
                <span className="product-badge">Bestseller</span>
              </div>
              <div className="product-content">
                <h3>Pergola Klasyczna</h3>
                <p>Elegancka konstrukcja z regulowanymi lamelami. Idealna na średniej wielkości tarasy.</p>
                <ul className="product-features">
                  <li>Regulowane lamele aluminiowe</li>
                  <li>Odprowadzanie wody deszczowej</li>
                  <li>Możliwość montażu oświetlenia LED</li>
                </ul>
                <div className="product-footer">
                  <span className="product-price">od <strong>12 900 zł</strong></span>
                  <a href="#contact" className="btn btn-outline">Zapytaj o cenę</a>
                </div>
              </div>
            </div>
            <div className="product-card featured">
              <div className="product-image">
                <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="200" fill="#f1f3f4"/>
                  <rect x="20" y="70" width="260" height="100" fill="#ced4da" opacity="0.5"/>
                  <line x1="20" y1="70" x2="280" y2="70" stroke="#343a40" strokeWidth="5"/>
                  <line x1="20" y1="70" x2="20" y2="170" stroke="#343a40" strokeWidth="5"/>
                  <line x1="280" y1="70" x2="280" y2="170" stroke="#343a40" strokeWidth="5"/>
                  <rect x="40" y="75" width="30" height="8" fill="#6c757d"/>
                  <rect x="80" y="75" width="30" height="8" fill="#6c757d"/>
                  <rect x="120" y="75" width="30" height="8" fill="#6c757d"/>
                  <rect x="160" y="75" width="30" height="8" fill="#6c757d"/>
                  <rect x="200" y="75" width="30" height="8" fill="#6c757d"/>
                  <rect x="240" y="75" width="30" height="8" fill="#6c757d"/>
                  <circle cx="50" cy="50" r="5" fill="#b87333"/>
                  <circle cx="150" cy="50" r="5" fill="#b87333"/>
                  <circle cx="250" cy="50" r="5" fill="#b87333"/>
                </svg>
                <span className="product-badge premium">Premium</span>
              </div>
              <div className="product-content">
                <h3>Pergola Bioklimatyczna</h3>
                <p>Zaawansowana technologicznie pergola z automatycznym sterowaniem lamelami.</p>
                <ul className="product-features">
                  <li>Automatyczne sterowanie pilotem</li>
                  <li>Czujnik deszczu i wiatru</li>
                  <li>Zintegrowane oświetlenie LED RGB</li>
                  <li>System grzewczy (opcja)</li>
                </ul>
                <div className="product-footer">
                  <span className="product-price">od <strong>24 900 zł</strong></span>
                  <a href="#contact" className="btn btn-primary">Zapytaj o cenę</a>
                </div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="200" fill="#f8f9fa"/>
                  <path d="M30 120 L150 60 L270 120" stroke="#495057" strokeWidth="4" fill="none"/>
                  <line x1="30" y1="120" x2="30" y2="170" stroke="#495057" strokeWidth="4"/>
                  <line x1="270" y1="120" x2="270" y2="170" stroke="#495057" strokeWidth="4"/>
                  <line x1="150" y1="60" x2="150" y2="170" stroke="#495057" strokeWidth="3"/>
                  <rect x="30" y="120" width="240" height="50" fill="#dee2e6" opacity="0.3"/>
                </svg>
              </div>
              <div className="product-content">
                <h3>Pergola Wolnostojąca</h3>
                <p>Samodzielna konstrukcja idealna do ogrodu, przy basenie lub jako altana.</p>
                <ul className="product-features">
                  <li>Niezależna od budynku</li>
                  <li>Wzmocniona konstrukcja</li>
                  <li>Opcja zabudowy bokami</li>
                </ul>
                <div className="product-footer">
                  <span className="product-price">od <strong>18 500 zł</strong></span>
                  <a href="#contact" className="btn btn-outline">Zapytaj o cenę</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Realizacje</span>
            <h2 className="section-title">Nasze projekty</h2>
            <p className="section-subtitle">Zobacz jak zmieniamy przestrzenie naszych klientów</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <div className="gallery-placeholder">
                <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="600" height="400" fill="#f1f3f4"/>
                  <rect x="50" y="150" width="500" height="200" fill="#dee2e6" opacity="0.5"/>
                  <line x1="50" y1="150" x2="550" y2="150" stroke="#495057" strokeWidth="6"/>
                  <line x1="50" y1="150" x2="50" y2="350" stroke="#495057" strokeWidth="6"/>
                  <line x1="550" y1="150" x2="550" y2="350" stroke="#495057" strokeWidth="6"/>
                  <rect x="100" y="280" width="80" height="70" fill="#6c757d"/>
                  <rect x="420" y="280" width="80" height="70" fill="#6c757d"/>
                  <circle cx="500" cy="80" r="40" fill="#b87333"/>
                  <text x="300" y="250" textAnchor="middle" fill="#343a40" fontSize="20">Realizacja Premium</text>
                </svg>
              </div>
              <div className="gallery-overlay">
                <h4>Villa Nowoczesna</h4>
                <p>Pergola bioklimatyczna 6x4m</p>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-placeholder">
                <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="300" fill="#f8f9fa"/>
                  <rect x="30" y="120" width="240" height="150" fill="#dee2e6" opacity="0.5"/>
                  <line x1="30" y1="120" x2="270" y2="120" stroke="#adb5bd" strokeWidth="4"/>
                  <text x="150" y="200" textAnchor="middle" fill="#495057" fontSize="16">Taras klasyczny</text>
                </svg>
              </div>
              <div className="gallery-overlay">
                <h4>Dom Jednorodzinny</h4>
                <p>Pergola klasyczna 4x3m</p>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-placeholder">
                <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="300" fill="#f1f3f4"/>
                  <rect x="30" y="100" width="240" height="170" fill="#ced4da" opacity="0.5"/>
                  <line x1="30" y1="100" x2="270" y2="100" stroke="#495057" strokeWidth="4"/>
                  <text x="150" y="190" textAnchor="middle" fill="#343a40" fontSize="16">Ogród z basenem</text>
                </svg>
              </div>
              <div className="gallery-overlay">
                <h4>Strefa Relaksu</h4>
                <p>Pergola wolnostojąca 5x5m</p>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-placeholder">
                <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="300" fill="#f8f9fa"/>
                  <rect x="20" y="110" width="260" height="160" fill="#dee2e6" opacity="0.5"/>
                  <line x1="20" y1="110" x2="280" y2="110" stroke="#6c757d" strokeWidth="4"/>
                  <text x="150" y="195" textAnchor="middle" fill="#495057" fontSize="16">Restauracja</text>
                </svg>
              </div>
              <div className="gallery-overlay">
                <h4>Restauracja Green</h4>
                <p>Pergola bioklimatyczna 8x6m</p>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-placeholder">
                <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="300" fill="#f1f3f4"/>
                  <rect x="40" y="130" width="220" height="140" fill="#ced4da" opacity="0.5"/>
                  <line x1="40" y1="130" x2="260" y2="130" stroke="#adb5bd" strokeWidth="4"/>
                  <text x="150" y="205" textAnchor="middle" fill="#343a40" fontSize="16">Penthouse</text>
                </svg>
              </div>
              <div className="gallery-overlay">
                <h4>Apartament Premium</h4>
                <p>Pergola na tarasie 3x4m</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits" id="benefits">
        <div className="container">
          <div className="section-header light">
            <span className="section-tag">Korzyści</span>
            <h2 className="section-title">Dlaczego warto wybrać pergolę?</h2>
            <p className="section-subtitle">Odkryj zalety posiadania pergoli metalowej</p>
          </div>
          <div className="benefits-grid">
            {[
              { num: '01', title: 'Ochrona przed słońcem', desc: 'Regulowane lamele pozwalają kontrolować ilość światła słonecznego, chroniąc przed przegrzewaniem.' },
              { num: '02', title: 'Ochrona przed deszczem', desc: 'Szczelnie zamknięte lamele chronią przed opadami, umożliwiając korzystanie z tarasu w każdą pogodę.' },
              { num: '03', title: 'Wzrost wartości nieruchomości', desc: 'Profesjonalnie wykonana pergola zwiększa wartość domu nawet o 10-15%.' },
              { num: '04', title: 'Dodatkowa przestrzeń', desc: 'Zyskujesz funkcjonalną przestrzeń do wypoczynku, spotkań z rodziną i przyjaciółmi.' },
              { num: '05', title: 'Niskie koszty utrzymania', desc: 'Konstrukcje aluminiowe nie wymagają malowania ani konserwacji przez wiele lat.' },
              { num: '06', title: 'Estetyka i elegancja', desc: 'Nowoczesny design podkreśla architekturę domu i nadaje przestrzeni wyjątkowy charakter.' },
            ].map((benefit, index) => (
              <div className="benefit-item" key={index}>
                <div className="benefit-number">{benefit.num}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Opinie</span>
            <h2 className="section-title">Co mówią nasi klienci</h2>
            <p className="section-subtitle">Dołącz do grona zadowolonych właścicieli pergol</p>
          </div>
          <div className="testimonials-slider">
            {[
              { text: 'Pergola bioklimatyczna to najlepsza inwestycja jaką zrobiliśmy w nasz dom. Teraz spędzamy na tarasie czas niezależnie od pogody. Montaż przebiegł sprawnie i profesjonalnie.', initials: 'MK', name: 'Marek Kowalski', location: 'Właściciel domu, Warszawa' },
              { text: 'Profesjonalne podejście od pierwszego kontaktu. Projekt został dopasowany idealnie do naszego domu. Polecam każdemu, kto szuka solidnej firmy.', initials: 'AN', name: 'Anna Nowak', location: 'Właścicielka domu, Kraków' },
              { text: 'Nasza pergola wolnostojąca przy basenie to teraz ulubione miejsce całej rodziny. Jakość wykonania na najwyższym poziomie. Zdecydowanie warto!', initials: 'PW', name: 'Piotr Wiśniewski', location: 'Właściciel domu, Poznań' },
            ].map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">&quot;{testimonial.text}&quot;</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.initials}</div>
                  <div className="author-info">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Najczęściej zadawane pytania</h2>
            <p className="section-subtitle">Znajdź odpowiedzi na swoje pytania</p>
          </div>
          <div className="faq-list">
            {[
              { q: 'Ile trwa realizacja zamówienia?', a: 'Standardowy czas realizacji to 2-3 tygodnie od podpisania umowy. Na czas realizacji składa się: projekt indywidualny (2-3 dni), produkcja (7-10 dni) oraz montaż (1-2 dni). W przypadku większych lub bardziej skomplikowanych projektów czas może się wydłużyć.' },
              { q: 'Czy pergola wymaga pozwolenia na budowę?', a: 'W większości przypadków pergola o powierzchni do 35m² nie wymaga pozwolenia na budowę ani zgłoszenia. Jednak przepisy mogą się różnić w zależności od gminy. Pomagamy naszym klientom w weryfikacji wymagań formalnych.' },
              { q: 'Jakie kolory są dostępne?', a: 'Oferujemy szeroką paletę kolorów RAL. Najpopularniejsze to: biały (RAL 9016), antracyt (RAL 7016), szary (RAL 9006) oraz brąz. Możliwe jest również lakierowanie w niestandardowych kolorach oraz wykończenie imitujące drewno.' },
              { q: 'Czy montaż jest wliczony w cenę?', a: 'Tak, w cenie zawsze uwzględniamy profesjonalny montaż przez nasz wykwalifikowany zespół. Montaż obejmuje: przygotowanie podłoża, instalację konstrukcji, podłączenie elektryki (w przypadku pergol z napędem) oraz szkolenie z obsługi.' },
              { q: 'Jak wygląda serwis i gwarancja?', a: 'Oferujemy 10 lat gwarancji na konstrukcję oraz 5 lat na powłokę lakierniczą i komponenty elektryczne. Zapewniamy również serwis pogwarancyjny. W ramach gwarancji reagujemy na zgłoszenia w ciągu 48 godzin.' },
            ].map((faq, index) => (
              <div className={`faq-item ${openFaqIndex === index ? 'active' : ''}`} key={index}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Gotowy na nową jakość wypoczynku?</h2>
            <p>Zamów bezpłatną wycenę i przekonaj się, jak pergola może zmienić Twój taras</p>
            <a href="#contact" className="btn btn-white">Bezpłatna wycena</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Kontakt</span>
            <h2 className="section-title">Skontaktuj się z nami</h2>
            <p className="section-subtitle">Odpowiemy na wszystkie Twoje pytania</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h4>Telefon</h4>
                  <p><a href="tel:+48123456789">+48 123 456 789</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:kontakt@pergomet.pl">kontakt@pergomet.pl</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h4>Adres</h4>
                  <p>ul. Słoneczna 15<br/>00-001 Warszawa</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <h4>Godziny pracy</h4>
                  <p>Pon-Pt: 8:00 - 18:00<br/>Sob: 9:00 - 14:00</p>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Imię i nazwisko *</label>
                <input type="text" id="name" name="name" required placeholder="Jan Kowalski" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required placeholder="jan@email.pl" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefon *</label>
                  <input type="tel" id="phone" name="phone" required placeholder="123 456 789" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="product">Interesuje mnie</label>
                <select id="product" name="product">
                  <option value="">Wybierz produkt...</option>
                  <option value="klasyczna">Pergola Klasyczna</option>
                  <option value="bioklimatyczna">Pergola Bioklimatyczna</option>
                  <option value="wolnostojaca">Pergola Wolnostojąca</option>
                  <option value="inne">Inne / Nie wiem jeszcze</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Wiadomość</label>
                <textarea id="message" name="message" rows={4} placeholder="Opisz swoje potrzeby, wymiary tarasu, oczekiwania..."></textarea>
              </div>
              <div className="form-group checkbox">
                <input type="checkbox" id="consent" name="consent" required />
                <label htmlFor="consent">Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie *</label>
              </div>
              <button type="submit" className="btn btn-primary btn-full">Wyślij zapytanie</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">
                <span className="logo-icon">⌂</span>
                PergoMet
              </a>
              <p>Nowoczesne pergole metalowe dla wymagających. Jakość, profesjonalizm i elegancja od 2012 roku.</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Nawigacja</h4>
              <ul>
                <li><a href="#home">Start</a></li>
                <li><a href="#about">O nas</a></li>
                <li><a href="#products">Oferta</a></li>
                <li><a href="#gallery">Realizacje</a></li>
                <li><a href="#contact">Kontakt</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Oferta</h4>
              <ul>
                <li><a href="#products">Pergole klasyczne</a></li>
                <li><a href="#products">Pergole bioklimatyczne</a></li>
                <li><a href="#products">Pergole wolnostojące</a></li>
                <li><a href="#products">Zadaszenia tarasów</a></li>
                <li><a href="#products">Akcesoria</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Informacje</h4>
              <ul>
                <li><a href="#">Polityka prywatności</a></li>
                <li><a href="#">Regulamin</a></li>
                <li><a href="#">Gwarancja</a></li>
                <li><a href="#">Finansowanie</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 PergoMet. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
