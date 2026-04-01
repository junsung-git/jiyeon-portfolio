// =============================================
//  SCROLL REVEAL
// =============================================
(function () {
  'use strict';

  const revealEls = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  // 페이지 진입 시 이미 보이는 요소 즉시 표시
  window.addEventListener('load', function () {
    revealEls.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  });
})();

// =============================================
//  ARTWORK 섹션 내 이미지 stagger 딜레이
// =============================================
(function () {
  'use strict';

  document.querySelectorAll('.artwork').forEach(function (section) {
    const grid = section.querySelector('.img-grid');
    if (!grid) return;

    const imgs = grid.querySelectorAll('img');
    imgs.forEach(function (img, i) {
      img.style.opacity = '0';
      img.style.transform = 'translateY(20px)';
      img.style.transition = 'opacity 0.6s ease ' + (i * 0.1) + 's, transform 0.6s ease ' + (i * 0.1) + 's';
    });

    const gridObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          imgs.forEach(function (img) {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
          });
          gridObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    gridObserver.observe(grid);
  });
})();
