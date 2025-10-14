// ================= Helper =================
document.addEventListener('DOMContentLoaded', () => {
  const $id = id => document.getElementById(id);

  // ================= Hamburger Menu =================
  const hamburger = $id('hamburger');
  const navLinks = $id('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  // ================= Loader Control =================
  const loader = $id('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('fade-out');
        loader.style.pointerEvents = 'none';
      }, 2000);
    });
  }

  // ================= Services Accordion =================
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      accordions.forEach(h => {
        if (h !== header) h.parentElement.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });

  // ================= Team Modal =================
  const teamCards = document.querySelectorAll('.team-card');
  let teamModal = $id('teamModal');

  if (teamCards.length) {
    if (!teamModal) {
      teamModal = document.createElement('div');
      teamModal.id = 'teamModal';
      teamModal.className = 'team-modal';
      teamModal.innerHTML = `
        <div class="team-modal-content">
          <button class="close-modal" id="closeModal">&times;</button>
          <img id="modalImg" src="" alt="">
          <h3 id="modalName"></h3>
          <p id="modalRole" class="modal-role"></p>
          <p id="modalInfo" class="modal-info"></p>
        </div>
      `;
      document.body.appendChild(teamModal);
    }

    const modalImg = teamModal.querySelector('#modalImg');
    const modalName = teamModal.querySelector('#modalName');
    const modalRole = teamModal.querySelector('#modalRole');
    const modalInfo = teamModal.querySelector('#modalInfo');
    const closeModal = teamModal.querySelector('#closeModal');

    const showModal = () => {
      teamModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };
    const hideModal = () => {
      teamModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    teamCards.forEach(card => {
      card.addEventListener('click', () => {
        const name = card.dataset.name || card.querySelector('h3')?.textContent || '';
        const role = card.dataset.role || card.querySelector('p')?.textContent || '';
        const info = card.dataset.info || '';
        const img = card.dataset.img || card.querySelector('img')?.src || '';

        modalImg.src = img;
        modalName.textContent = name;
        modalRole.textContent = role;
        modalInfo.textContent = info;
        showModal();
      });
    });

    closeModal?.addEventListener('click', hideModal);
    teamModal.addEventListener('click', e => { if (e.target === teamModal) hideModal(); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });
  }

  // ================= News "Read More" Popup =================
  const readMoreButtons = document.querySelectorAll('.read-more');
  const popups = document.querySelectorAll('.popup');

  if (readMoreButtons.length) {
    readMoreButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const popup = document.getElementById(targetId);
        if (!popup) return;

        popup.style.display = 'flex';
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';

        // === Carousel Logic for images ===
        const imgs = popup.querySelectorAll('.popup-images img');
        let index = 0;
        const nextBtn = popup.querySelector('.next');
        const prevBtn = popup.querySelector('.prev');

        const updateImages = () => {
          imgs.forEach((img, i) => {
            img.style.display = (i === index) ? 'block' : 'none';
          });
        };
        updateImages();

        nextBtn?.addEventListener('click', () => {
          index = (index + 1) % imgs.length;
          updateImages();
        });

        prevBtn?.addEventListener('click', () => {
          index = (index - 1 + imgs.length) % imgs.length;
          updateImages();
        });
      });
    });

    // إغلاق النوافذ
    popups.forEach((popup) => {
      const closeBtn = popup.querySelector('.close');
      closeBtn?.addEventListener('click', () => {
        popup.style.display = 'none';
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });

    window.addEventListener('click', (e) => {
      popups.forEach((popup) => {
        if (e.target === popup) {
          popup.style.display = 'none';
          popup.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        popups.forEach((popup) => {
          popup.style.display = 'none';
          popup.classList.remove('active');
          document.body.style.overflow = 'auto';
        });
      }
    });

    console.log(`✅ News popups initialized (${readMoreButtons.length} items).`);
  }
});
