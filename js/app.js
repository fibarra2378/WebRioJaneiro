/**
 * WebRioJaneiro - Lógica de la Aplicación del Itinerario 4 Amigos (Agosto 2026)
 * Gestiona navegación por días, alternativas, servicios de base, mapa Leaflet con marcadores del PDF, sintetizador de voz y calculadora.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Estado de la Aplicación
  const state = {
    activeDay: 1,
    theme: localStorage.getItem('rio_theme') || 'dark',
    map: null
  };

  // DOM Elements
  const servicesGrid = document.getElementById('services-grid');
  const dayTabs = document.getElementById('day-tabs');
  const dayContentContainer = document.getElementById('day-content-container');
  const guideTipsGrid = document.getElementById('guide-tips-grid');
  const rioClockTime = document.getElementById('rio-clock-time');

  // Calculator Elements
  const calcPeople = document.getElementById('calc-people');
  const calcCurrency = document.getElementById('calc-currency');
  const calcTotalAmount = document.getElementById('calc-total-amount');
  const calcBreakdown = document.getElementById('calc-breakdown');

  // Inicialización (Modo Oscuro Permanente)
  document.documentElement.setAttribute('data-theme', 'dark');
  initLiveClock();
  initMobileMenu();
  initCarousel();
  renderBaseServices();
  renderDayContent(state.activeDay);
  renderGuideTips();
  initCalculator();
  initLeafletMap();
  setupEventListeners();

  /* ==========================================================
     Reloj de Río en Vivo
     ========================================================== */
  function initLiveClock() {
    function updateClock() {
      const now = new Date();
      const options = { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const rioTimeString = new Intl.DateTimeFormat('es-MX', options).format(now);
      if (rioClockTime) {
        rioClockTime.textContent = `${rioTimeString} BRT`;
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ==========================================================
     Síntesis de Voz (SpeechSynthesis API)
     ========================================================== */
  function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  /* ==========================================================
     Servicios Cercanos al Depto (Copacabana Posto 2)
     ========================================================== */
  function renderBaseServices() {
    if (!servicesGrid) return;

    servicesGrid.innerHTML = TRIP_DATA.generalInfo.baseOfOperations.nearbyServices.map(service => `
      <div class="glass-card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <i class="${service.url ? 'fa-solid fa-bicycle' : 'fa-solid fa-store'}" style="color: var(--accent-gold); font-size: 1.25rem;"></i>
            <h4 style="font-size: 1.15rem; font-weight: 700;">${service.name}</h4>
          </div>
          <span class="tag-mini" style="background: rgba(6,182,212,0.15); color: var(--accent-teal); margin-bottom: 0.5rem; display: inline-block;">${service.type}</span>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.5rem;"><i class="fa-solid fa-map-pin"></i> ${service.address}</p>
          ${service.price ? `<p style="font-size: 0.88rem; color: var(--accent-gold); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-ticket"></i> Precios: <strong>${service.price}</strong></p>` : ''}
          <p style="font-size: 0.9rem; color: var(--text-main);">${service.desc}</p>
        </div>
        ${service.url ? `
          <div style="margin-top: 1rem;">
            <a href="${service.url}" target="_blank" rel="noopener noreferrer" class="chip-btn active" style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; padding: 0.4rem 0.85rem; text-decoration: none;">
              <i class="fa-solid fa-globe"></i> Web Oficial Bike Itaú <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem;"></i>
            </a>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  /* ==========================================================
     Contenido del Día Seleccionado (Cronograma + Alternativas)
     ========================================================== */
  function renderDayContent(dayNum) {
    if (!dayContentContainer) return;

    const dayData = TRIP_DATA.itineraryDays.find(d => d.dayId === dayNum);
    if (!dayData) return;

    let html = `
      <div class="glass-card" style="padding: 2.25rem; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.25rem; margin-bottom: 2rem;">
          <div>
            <span class="section-badge" style="background: rgba(245, 158, 11, 0.15); color: var(--accent-gold);">${dayData.badge}</span>
            <h2 style="font-family: var(--font-heading); font-size: 2.2rem; color: var(--text-main); margin-top: 0.5rem;">${dayData.title}</h2>
            <p style="color: var(--accent-teal); font-weight: 700; font-size: 1.1rem;"><i class="fa-regular fa-calendar"></i> ${dayData.date}</p>
          </div>
          <div style="width: 140px; height: 100px; border-radius: var(--radius-md); overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
            <img src="${dayData.heroImage}" alt="${dayData.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
    `;

    if (dayData.alternatives) {
      html += `
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--accent-purple); border-radius: var(--radius-md);">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--accent-purple); margin-bottom: 1rem;"><i class="fa-solid fa-code-fork"></i> Alternativas de Elección para el Grupo:</h3>
          ${dayData.alternatives.map(alt => `
            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">${alt.section}</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                ${alt.options.map(opt => `
                  <div style="padding: 1rem; background: rgba(255,255,255,0.04); border-radius: var(--radius-sm); border: 1px solid var(--glass-border);">
                    <strong style="color: var(--accent-gold); display: block; margin-bottom: 0.35rem;">${opt.name}</strong>
                    <p style="font-size: 0.88rem; color: var(--text-muted);">${opt.details}</p>
                    ${opt.advantage ? `<span style="font-size: 0.8rem; color: var(--accent-emerald); display: inline-block; margin-top: 0.5rem;"><strong>Ventaja:</strong> ${opt.advantage}</span>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    html += `
      <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 1.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;"><i class="fa-solid fa-clock-stopwatch"></i> Agenda Hora por Hora:</h3>
      <div class="day-timeline">
        ${dayData.schedule.map(slot => `
          <div class="timeline-item">
            <span style="display: inline-block; padding: 0.2rem 0.65rem; background: rgba(6,182,212,0.15); color: var(--accent-teal); border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 700; margin-bottom: 0.35rem;">${slot.time}</span>
            <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--text-main);">${slot.activity}</h4>
            <p style="font-size: 0.95rem; color: var(--text-main); margin: 0.4rem 0;"><strong>Logística:</strong> ${slot.logistics}</p>
            <p style="font-size: 0.92rem; color: var(--text-muted);">${slot.details}</p>
            ${slot.menuRecommendation ? `
              <div style="margin-top: 0.6rem; padding: 0.6rem 1rem; background: rgba(245, 158, 11, 0.1); border-left: 3px solid var(--accent-gold); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.88rem;">
                <strong style="color: var(--accent-gold);"><i class="fa-solid fa-utensils"></i> Recomendación del Menú:</strong> ${slot.menuRecommendation}
              </div>
            ` : ''}
            ${slot.url ? `
              <a href="${slot.url}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--accent-teal); font-weight: 700; margin-top: 0.5rem; text-decoration: underline;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Comprar Boletos Online
              </a>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
    `;

    dayContentContainer.innerHTML = html;
  }

  /* ==========================================================
     Tips Generales del Guía
     ========================================================== */
  function renderGuideTips() {
    if (!guideTipsGrid) return;

    guideTipsGrid.innerHTML = TRIP_DATA.guideTips.map(tip => `
      <div class="glass-card" style="padding: 1.75rem;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; color: var(--accent-gold); font-size: 1.35rem; margin-bottom: 1rem;">
          <i class="fa-solid ${tip.icon}"></i>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">${tip.title}</h3>
        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">${tip.text}</p>
      </div>
    `).join('');
  }

  /* ==========================================================
     Calculadora de Presupuesto
     ========================================================== */
  function initCalculator() {
    if (!calcPeople || !calcCurrency || !calcTotalAmount || !calcBreakdown) return;

    function updateCalc() {
      const people = parseInt(calcPeople.value, 10);
      const curr = calcCurrency.value;

      const basePerPersonBRL = 1200;
      const totalBRL = basePerPersonBRL * people;

      if (curr === 'BRL') {
        calcTotalAmount.textContent = `R$ ${totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        calcBreakdown.innerHTML = people === 1 
          ? `Presupuesto estimado individual de <strong>R$ 1,200.00</strong> para 5 días en Río.`
          : `Equivalente a <strong>R$ ${basePerPersonBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por amigo</strong> para los 5 días en Río.`;
      } else {
        const rateUSD = 5.2;
        const totalUSD = totalBRL / rateUSD;
        const perPersonUSD = basePerPersonBRL / rateUSD;

        calcTotalAmount.textContent = `USD $ ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        calcBreakdown.innerHTML = people === 1
          ? `Presupuesto estimado individual de <strong>USD $ ${perPersonUSD.toFixed(2)}</strong> para 5 días.`
          : `Equivalente a <strong>USD $ ${perPersonUSD.toFixed(2)} por amigo</strong> (~$230 USD por persona para los 5 días).`;
      }
    }

    calcPeople.addEventListener('change', updateCalc);
    calcCurrency.addEventListener('change', updateCalc);
    updateCalc();
  }

  /* ==========================================================
     Mapa Interactivo Leaflet con Puntos del Cronograma
     ========================================================== */
  function initLeafletMap() {
    const mapElement = document.getElementById('map-container');
    if (!mapElement || typeof L === 'undefined') return;

    const baseCoords = TRIP_DATA.generalInfo.baseOfOperations.coordinates;
    state.map = L.map('map-container').setView(baseCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© Colaboradores de OpenStreetMap'
    }).addTo(state.map);

    TRIP_DATA.placesCoordinates.forEach(place => {
      const marker = L.marker(place.coords).addTo(state.map);
      marker.bindPopup(`
        <div style="color: #0f172a; font-family: var(--font-main); max-width: 220px;">
          <strong style="display: block; font-size: 0.78rem; color: #0284c7; text-transform: uppercase;">${place.category}</strong>
          <h4 style="margin: 2px 0 4px 0; font-size: 1rem; color: #0f172a;">${place.name}</h4>
          <p style="margin: 0; font-size: 0.85rem; color: #475569;">${place.desc}</p>
        </div>
      `);
    });
  }

  /* ==========================================================
     Escuchadores de Eventos
     ========================================================== */
  function setupEventListeners() {
    if (dayTabs) {
      dayTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip-btn');
        if (!btn) return;

        document.querySelectorAll('#day-tabs .chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeDay = parseInt(btn.dataset.day, 10);
        renderDayContent(state.activeDay);
      });
    }
  }

  /* ==========================================================
     Controlador del Carrusel Interactivo con Gestos Táctiles Móviles
     ========================================================== */
  function initCarousel() {
    const wrapper = document.getElementById('base-carousel');
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const dots = document.querySelectorAll('.carousel-dot');

    if (!wrapper || !track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const totalSlides = track.children.length || 2;
    let touchStartX = 0;
    let touchEndX = 0;

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(i);
      });
    });

    // Soporte para gestos táctiles en pantallas móviles (Swipe)
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 40;
      if (touchStartX - touchEndX > swipeThreshold) {
        goToSlide(currentIndex + 1);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        goToSlide(currentIndex - 1);
      }
    }

    setInterval(() => goToSlide(currentIndex + 1), 6000);
  }

  /* ==========================================================
     Controlador del Menú Hamburguesa Móvil
     ========================================================== */
  function initMobileMenu() {
    const menuToggleBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (!menuToggleBtn || !navLinks) return;

    menuToggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-active');
      const icon = menuToggleBtn.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Cerrar el menú automáticamente al seleccionar una opción
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const icon = menuToggleBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
});
