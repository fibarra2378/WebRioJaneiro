/**
 * WebRioJaneiro - Lógica de la Aplicación del Itinerario 4 Amigos (Agosto 2026)
 * Gestiona navegación por días, alternativas, servicios de base, mapa Leaflet con marcadores del PDF, sintetizador de voz y calculadora.
 *
 * Arquitectura:
 * - escapeHtml(): Sanitiza valores dinámicos antes de inyectarlos vía innerHTML (P-05 OWASP XSS)
 * - TRIP_DATA.financials: Fuente de datos para la calculadora de presupuesto (P-04)
 * - clearInterval() en visibilitychange: Previene fuga de memoria del carrusel (P-11)
 */

/* ==========================================================
   Utilidad de Seguridad: Escape HTML (P-05 — Prevención XSS)
   Sanitiza cualquier string antes de inyectarlo en innerHTML.
   ========================================================== */
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

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
  initOpenMeteoWeather();
  initPackingChecklist();
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

    servicesGrid.innerHTML = TRIP_DATA.generalInfo.baseOfOperations.nearbyServices.map(service => {
      const isInternal = service.url && service.url.startsWith('#');
      const iconClass = isInternal ? 'fa-solid fa-suitcase' : (service.url ? 'fa-solid fa-bicycle' : 'fa-solid fa-store');
      const btnIcon = isInternal ? 'fa-solid fa-suitcase' : 'fa-solid fa-globe';
      const arrowIcon = isInternal ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-up-right-from-square';
      const btnLabel = service.btnText || (isInternal ? 'Ver Guarda de Equipaje' : 'Web Oficial');

      return `
        <div class="glass-card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
              <i class="${iconClass}" style="color: var(--accent-gold); font-size: 1.25rem;"></i>
              <h4 style="font-size: 1.15rem; font-weight: 700;">${service.name}</h4>
            </div>
            <span class="tag-mini" style="background: rgba(6,182,212,0.15); color: var(--accent-teal); margin-bottom: 0.5rem; display: inline-block;">${service.type}</span>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.5rem;"><i class="fa-solid fa-map-pin"></i> ${service.address}</p>
            ${service.price ? `<p style="font-size: 0.88rem; color: var(--accent-gold); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-ticket"></i> Precios: <strong>${service.price}</strong></p>` : ''}
            <p style="font-size: 0.9rem; color: var(--text-main);">${service.desc}</p>
          </div>
          ${service.url ? `
            <div style="margin-top: 1rem;">
              <a href="${service.url}" ${isInternal ? '' : 'target="_blank" rel="noopener noreferrer"'} class="chip-btn active" style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; padding: 0.4rem 0.85rem; text-decoration: none;">
                <i class="${btnIcon}"></i> ${btnLabel} <i class="${arrowIcon}" style="font-size: 0.75rem;"></i>
              </a>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
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
              <a href="${escapeHtml(slot.url)}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--accent-teal); font-weight: 700; margin-top: 0.5rem; text-decoration: underline;">
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

    // Leer constantes financieras desde la fuente de verdad centralizada (js/data.js)
    const financials = TRIP_DATA.financials || {};
    const basePerPersonBRL = financials.baseBudgetPerPersonBRL || 1200;
    const rateUSD = financials.exchangeRateBRL_USD || 5.2;

    function updateCalc() {
      const people = parseInt(calcPeople.value, 10);
      const curr = calcCurrency.value;

      const totalBRL = basePerPersonBRL * people;

      if (curr === 'BRL') {
        calcTotalAmount.textContent = `R$ ${totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        calcBreakdown.innerHTML = people === 1
          ? `Presupuesto estimado individual de <strong>R$ ${basePerPersonBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> para 5 días en Río.`
          : `Equivalente a <strong>R$ ${basePerPersonBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por amigo</strong> para los 5 días en Río.`;
      } else {
        const totalUSD = totalBRL / rateUSD;
        const perPersonUSD = basePerPersonBRL / rateUSD;

        calcTotalAmount.textContent = `USD $ ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        calcBreakdown.innerHTML = people === 1
          ? `Presupuesto estimado individual de <strong>USD $ ${perPersonUSD.toFixed(2)}</strong> para 5 días.`
          : `Equivalente a <strong>USD $ ${perPersonUSD.toFixed(2)} por amigo</strong> (~$${perPersonUSD.toFixed(0)} USD por persona para los 5 días).`;
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

    // P-11: Guardar referencia y limpiar setInterval cuando la pestaña queda oculta (prevención de fuga de memoria)
    const autoplayInterval = setInterval(() => goToSlide(currentIndex + 1), 6000);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearInterval(autoplayInterval);
    });
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

  /* ==========================================================
     Consumo de API Open-Meteo para Clima de Río de Janeiro
     ========================================================== */
  async function initOpenMeteoWeather() {
    const lat = -22.9068;
    const lon = -43.1729;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=10&timezone=America%2FSao_Paulo`;

    const weatherCodeMap = {
      0: { label: "Despejado / Sol", icon: "fa-sun", color: "#f59e0b" },
      1: { label: "Principalmente Despejado", icon: "fa-cloud-sun", color: "#f59e0b" },
      2: { label: "Parcialmente Nublado", icon: "fa-cloud-sun", color: "#f59e0b" },
      3: { label: "Nublado", icon: "fa-cloud", color: "#94a3b8" },
      45: { label: "Neblina", icon: "fa-smog", color: "#94a3b8" },
      48: { label: "Neblina Escarchada", icon: "fa-smog", color: "#94a3b8" },
      51: { label: "Llovizna Ligera", icon: "fa-cloud-rain", color: "#06b6d4" },
      53: { label: "Llovizna Moderada", icon: "fa-cloud-rain", color: "#06b6d4" },
      55: { label: "Llovizna Densa", icon: "fa-cloud-showers-heavy", color: "#06b6d4" },
      61: { label: "Lluvia Ligera", icon: "fa-cloud-rain", color: "#06b6d4" },
      63: { label: "Lluvia Moderada", icon: "fa-cloud-showers-heavy", color: "#06b6d4" },
      65: { label: "Lluvia Fuerte", icon: "fa-cloud-showers-heavy", color: "#06b6d4" },
      80: { label: "Chubascos Ligeros", icon: "fa-cloud-sun-rain", color: "#06b6d4" },
      81: { label: "Chubascos Moderados", icon: "fa-cloud-showers-heavy", color: "#06b6d4" },
      82: { label: "Chubascos Violentos", icon: "fa-cloud-showers-water", color: "#06b6d4" },
      95: { label: "Tormenta Eléctrica", icon: "fa-bolt", color: "#ef4444" },
      96: { label: "Tormenta con Granizo", icon: "fa-bolt", color: "#ef4444" }
    };

    function getWeatherMeta(code) {
      return weatherCodeMap[code] || { label: "Tiempo Suave", icon: "fa-cloud-sun", color: "#f59e0b" };
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const data = await response.json();

      // Current Weather
      const current = data.current_weather;
      if (current) {
        const meta = getWeatherMeta(current.weathercode);
        const tempRounded = Math.round(current.temperature);

        const heroWidgetText = document.getElementById('hero-weather-text');
        if (heroWidgetText) {
          heroWidgetText.innerHTML = `${tempRounded}°C (${meta.label})`;
        }

        const tempEl = document.getElementById('current-weather-temp');
        const descEl = document.getElementById('current-weather-desc');
        const iconWrapEl = document.getElementById('current-weather-icon-wrap');
        const windEl = document.getElementById('current-weather-wind');

        if (tempEl) tempEl.textContent = `${tempRounded}°C`;
        if (descEl) descEl.textContent = meta.label;
        if (windEl) windEl.textContent = `${current.windspeed} km/h`;
        if (iconWrapEl) {
          iconWrapEl.innerHTML = `<i class="fa-solid ${meta.icon}"></i>`;
          iconWrapEl.style.color = meta.color;
        }
      }

      // 10-Day Forecast Carousel
      const daily = data.daily;
      const scrollContainer = document.getElementById('weather-scroll-container');
      if (daily && daily.time && scrollContainer) {
        scrollContainer.innerHTML = '';

        daily.time.forEach((dateStr, index) => {
          const maxTemp = Math.round(daily.temperature_2m_max[index]);
          const minTemp = Math.round(daily.temperature_2m_min[index]);
          const code = daily.weathercode[index];
          const meta = getWeatherMeta(code);

          const dateObj = new Date(dateStr + 'T00:00:00');
          const dayName = dateObj.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

          const dayCard = document.createElement('div');
          dayCard.className = 'weather-day-card';
          dayCard.innerHTML = `
            <div class="weather-day-date">${dayName}</div>
            <div class="weather-day-icon" style="color: ${meta.color};"><i class="fa-solid ${meta.icon}"></i></div>
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${meta.label}</div>
            <div class="weather-day-temps">
              <span class="weather-day-max">${maxTemp}°</span>
              <span class="weather-day-min">${minTemp}°</span>
            </div>
          `;
          scrollContainer.appendChild(dayCard);
        });
      }
    } catch (err) {
      console.warn('Error al cargar clima Open-Meteo:', err);
      const scrollContainer = document.getElementById('weather-scroll-container');
      if (scrollContainer) {
        scrollContainer.innerHTML = `
          <div style="padding: 1rem; color: var(--text-muted); font-size: 0.9rem;">
            <i class="fa-solid fa-cloud-sun"></i> Clima estimado en Río: 18°C - 26°C (Suave y seco).
          </div>
        `;
      }
    }
  }

  /* ==========================================================
     Controlador del Checklist Interactivo de Mochila (LocalStorage)
     ========================================================== */
  function initPackingChecklist() {
    const checkboxes = document.querySelectorAll('.pack-checkbox');
    const progressBar = document.getElementById('packing-progress-bar');
    const progressText = document.getElementById('packing-progress-text');
    if (!checkboxes.length || !progressBar || !progressText) return;

    const STORAGE_KEY = 'rio_packing_checklist_v1';
    let savedState = {};

    try {
      savedState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      savedState = {};
    }

    function updateProgress() {
      const total = checkboxes.length;
      let checkedCount = 0;

      checkboxes.forEach(cb => {
        const id = cb.getAttribute('data-id');
        if (savedState[id]) {
          cb.checked = true;
          checkedCount++;
        } else {
          cb.checked = false;
        }
      });

      const percentage = Math.round((checkedCount / total) * 100);
      progressBar.style.width = `${percentage}%`;
      progressText.textContent = `${percentage}% (${checkedCount}/${total})`;
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        savedState[id] = e.target.checked;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
        } catch (err) {
          console.warn('LocalStorage no disponible:', err);
        }
        updateProgress();
      });
    });

    updateProgress();
  }

  /* ==========================================================
     Controlador de Atracciones & Excursiones (Proxy getTopRioTours)
     ========================================================== */
  async function initToursSection() {
    const toursContainer = document.getElementById('tours-scroll-container');
    if (!toursContainer) return;

    let tours = (typeof TRIP_DATA !== 'undefined' && TRIP_DATA.topRioTours) ? TRIP_DATA.topRioTours : [];

    try {
      const response = await fetch('/api/getTopRioTours');
      if (response.ok) {
        const result = await response.json();
        if (result && result.data && result.data.length > 0) {
          tours = result.data;
        }
      }
    } catch (e) {
      console.info('Utilizando dataset curado de excursiones:', e);
    }

    renderToursCards(toursContainer, tours);
  }

  function renderToursCards(container, tours) {
    if (!tours || !tours.length) {
      container.innerHTML = `<p style="color: var(--text-muted); text-align: center; width: 100%;">No hay excursiones disponibles en este momento.</p>`;
      return;
    }

    container.innerHTML = tours.map(tour => `
      <div class="glass-card tour-card">
        <div class="tour-card-header">
          <img src="${tour.image}" alt="${tour.title}" loading="lazy">
          <span class="tour-category-tag"><i class="fa-solid fa-tag"></i> ${tour.category}</span>
          ${tour.badge ? `<span class="tour-badge-tag"><i class="fa-solid fa-star"></i> ${tour.badge}</span>` : ''}
        </div>
        <div class="tour-card-body">
          <div>
            <h3 class="tour-title">${tour.title}</h3>
            <div class="tour-meta">
              <span class="tour-rating"><i class="fa-solid fa-star"></i> ${tour.rating} (${tour.reviewsCount.toLocaleString()})</span>
              <span class="tour-duration"><i class="fa-solid fa-clock"></i> ${tour.duration}</span>
            </div>
            <div class="tour-price-wrap">
              <span class="tour-price-val">${tour.priceBRL === 0 ? 'Gratis' : `R$ ${tour.priceBRL}`}</span>
              ${tour.priceUSD > 0 ? `<span class="tour-price-usd">(~$${tour.priceUSD} USD / pers)</span>` : ''}
            </div>
            <p class="tour-desc">${tour.description}</p>
          </div>
          <div class="tour-card-footer">
            <a href="${tour.bookingUrl}" target="_blank" rel="noopener noreferrer" class="search-btn tour-cta-btn" aria-label="Reservar excursión ${tour.title}">
              <span>Reservar Excursión</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  initToursSection();
});
