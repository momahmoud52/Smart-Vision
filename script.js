// script.js — نسخة مُحسنة وشاملة
document.addEventListener('DOMContentLoaded', () => {
  console.log('script.js loaded');

  // --- helper --
  const $id = id => document.getElementById(id);

  // ================= Hamburger Menu =================
  const hamburger = $id('hamburger');
  const navLinks = $id('navLinks');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (navLinks) navLinks.classList.toggle('active');
      else console.warn('navLinks element not found (id="navLinks").');
    });
  } else {
    console.warn('hamburger element not found (id="hamburger").');
  }

  // ================= Loader Control =================
  const loader = $id('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('fade-out');
        // ensure it's hidden even if CSS missing
        loader.style.pointerEvents = 'none';
      }, 2000);
    });
  } else {
    // it's optional — لا مشكلة إن لم يوجد
    // console.info('No loader (#loader) found — skipping loader logic.');
  }

  // ================= Services Accordion =================
  const accordions = document.querySelectorAll('.accordion-header');
  if (accordions.length) {
    accordions.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        // إغلاق الباقي (اختياري لكن مفيد UX)
        accordions.forEach(h => {
          if (h !== header) h.parentElement.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    });
  } else {
    // no accordions on this page — لا مشكلة
  }

  // ================= Team Modal (Popup) =================
  const teamCards = document.querySelectorAll('.team-card');
  if (!teamCards.length) {
    console.warn('No .team-card elements found. (لم يتم العثور على كروت الفريق)');
    return; // لا داعي لمواصلة منطق المودال إن لم توجد كروت
  }

  // التأكد من وجود المودال، وإن لم يكن ينشأ ديناميكياً
  let teamModal = $id('teamModal');
  if (!teamModal) {
    teamModal = document.createElement('div');
    teamModal.id = 'teamModal';
    teamModal.className = 'team-modal';
    teamModal.innerHTML = `
      <div class="team-modal-content" role="dialog" aria-modal="true">
        <button class="close-modal" id="closeModal" aria-label="Close">&times;</button>
        <img id="modalImg" src="" alt="" />
        <h3 id="modalName"></h3>
        <p class="modal-role" id="modalRole"></p>
        <p class="modal-info" id="modalInfo"></p>
      </div>
    `;
    document.body.appendChild(teamModal);

    // fallback inline styles in case CSS for modal is missing
    const s = teamModal.style;
    s.display = 'none';
    s.position = 'fixed';
    s.inset = '0';
    s.justifyContent = 'center';
    s.alignItems = 'center';
    s.background = 'rgba(0,0,0,0.8)';
    s.zIndex = '1200';
  }

  const modalContent = teamModal.querySelector('.team-modal-content');
  const modalImg = teamModal.querySelector('#modalImg');
  const modalName = teamModal.querySelector('#modalName');
  const modalRole = teamModal.querySelector('#modalRole');
  const modalInfo = teamModal.querySelector('#modalInfo');
  const closeModal = teamModal.querySelector('#closeModal');

  // show / hide helpers — نستخدم style.display لضمان العمل حتى لو CSS لا يعرّف .active
  const showModal = () => {
    teamModal.style.display = 'flex';
    // make modal accessible for CSS animations if present
    teamModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // ensure focus for accessibility
    if (modalContent) modalContent.focus?.();
  };
  const hideModal = () => {
    teamModal.style.display = 'none';
    teamModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  // attach click handlers
  teamCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      // read data- attributes or fallback to inner elements
      const name = card.dataset.name?.trim() || (card.querySelector('h3')?.textContent || '').trim();
      const role = card.dataset.role?.trim() || (card.querySelector('p')?.textContent || '').trim();
      const info = (card.dataset.info?.trim() || card.dataset.bio?.trim() || '');
      const img = card.dataset.img?.trim() || (card.querySelector('img')?.src || '');

      if (modalImg) {
        modalImg.src = img || '';
        modalImg.alt = name || 'Team member';
      }
      if (modalName) modalName.textContent = name || '';
      if (modalRole) modalRole.textContent = role || '';
      if (modalInfo) modalInfo.textContent = info || '';

      showModal();
    });
  });

  // close handlers
  if (closeModal) {
    closeModal.addEventListener('click', hideModal);
  } else {
    console.warn('#closeModal not found inside modal — the modal will still close by clicking outside or pressing Escape.');
  }

  // click outside
  teamModal.addEventListener('click', (e) => {
    if (e.target === teamModal) hideModal();
  });

  // esc key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideModal();
  });

  console.log('Team modal initialized for', teamCards.length, 'cards.');
});
