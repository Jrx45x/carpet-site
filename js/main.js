// $CARPET — main.js
// Copy-to-clipboard for CA, smooth scroll, light interactions.

(function () {
  'use strict';

  // ---------- Copy CA ----------
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const text = copyBtn.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(text);
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied ✓';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.classList.remove('copied');
        }, 1600);
      } catch (err) {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        copyBtn.textContent = 'Copied ✓';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 1600);
      }
    });
  }

  // ---------- Reveal on scroll (lightweight) ----------
  const observer = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  if (observer) {
    document.querySelectorAll('.pillar, .panel, .step, .stand-grid > div').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // ---------- Year (if a footer ever needs it) ----------
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // ---------- Cursor-following spotlight (smooth lag) ----------
  const bgFx = document.querySelector('.bg-fx');
  if (bgFx && window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let raf = null;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      curX = lerp(curX, targetX, 0.08);
      curY = lerp(curY, targetY, 0.08);
      bgFx.style.setProperty('--cx', curX + 'px');
      bgFx.style.setProperty('--cy', curY + 'px');
      // Stop the loop when we've effectively caught up
      if (Math.abs(curX - targetX) < 0.3 && Math.abs(curY - targetY) < 0.3) {
        raf = null;
      } else {
        raf = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('pointermove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (raf == null) raf = requestAnimationFrame(animate);
    }, { passive: true });
  }

  // ---------- Scroll-driven unrolling carpet behind #story ----------
  const story = document.getElementById('story');
  if (story) {
    let storyTop = 0;
    let storyHeight = 0;
    let vh = 0;

    const measure = () => {
      const r = story.getBoundingClientRect();
      storyTop = r.top + window.scrollY;
      storyHeight = r.height;
      vh = window.innerHeight || document.documentElement.clientHeight;
    };

    const easeInOut = (t) => t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;

    let lastP = -1;
    let ticking = false;
    const update = () => {
      ticking = false;
      const sy = window.scrollY;
      const start = storyTop - vh;
      const end   = storyTop + storyHeight - vh * 0.4;
      const range = Math.max(end - start, 1);
      let raw = (sy - start) / range;
      raw = raw < 0 ? 0 : raw > 1 ? 1 : raw;
      const p = easeInOut(raw);

      if (Math.abs(p - lastP) < 0.0008 && p !== 0 && p !== 1) return;
      lastP = p;

      const y = (p * storyHeight).toFixed(1);
      const scale = (1 - p * 0.22).toFixed(3);

      story.style.setProperty('--unroll-y', y + 'px');
      story.style.setProperty('--unroll-scale', scale);

      story.dataset.unroll = p < 0.001 ? 'hidden' : (p > 0.998 ? 'done' : 'active');
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const remeasure = () => { measure(); update(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', remeasure);
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(remeasure);
      ro.observe(document.body);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(remeasure);
    }
    measure();
    update();
  }

})();
