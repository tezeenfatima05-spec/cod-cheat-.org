function initFonts() {
  const root = document.documentElement;

  const markReady = () => {
    root.classList.remove('fonts-pending');
    root.classList.add('fonts-ready');
  };

  if (!document.fonts?.ready) {
    markReady();
    return;
  }

  document.fonts.ready.then(markReady).catch(markReady);
}

function initNavHighlight() {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const linkPath = href.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    let isActive = false;

    if (linkPath === '/') {
      isActive = path === '/';
    } else {
      isActive = path === linkPath || path.startsWith(`${linkPath}/`);
    }

    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function normalizePathname(path: string) {
  let p = path.replace(/\/index\.html$/, '');
  if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function initHashScrollOnLoad() {
  const run = () => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    scrollToSection(hash);
  };
  run();
  window.addEventListener('hashchange', run);
  document.addEventListener('astro:page-load', run);
}

function initInPageScroll() {
  document.addEventListener('click', (event) => {
    const el = (event.target as HTMLElement).closest<HTMLElement>('[data-scroll-target]');
    if (!el) return;

    const id = el.getAttribute('data-scroll-target');
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    if (el instanceof HTMLAnchorElement && el.hasAttribute('href')) {
      const href = el.getAttribute('href') ?? '';
      let linkPath = '/';
      try {
        linkPath = normalizePathname(new URL(href, window.location.href).pathname);
      } catch {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      const here = normalizePathname(window.location.pathname);

      if (linkPath !== here) {
        event.preventDefault();
        const url = new URL(href, window.location.href);
        url.hash = id;
        window.location.assign(url.toString());
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // <button> or other controls (e.g. Starwind Button as button)
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  initHashScrollOnLoad();
}

function initSkipLink() {
  document.querySelectorAll<HTMLElement>('[data-skip-to-main]').forEach((button) => {
    button.addEventListener('click', () => {
      const main = document.getElementById('main-content');
      if (!main) return;

      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initFaqFilters() {
  if (document.documentElement.dataset.faqFiltersDelegated === 'true') return;
  document.documentElement.dataset.faqFiltersDelegated = 'true';

  document.addEventListener(
    'click',
    (event) => {
      const chip = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-faq-filter]');
      if (!chip) return;
      const container = chip.closest('[data-faq-filters]');
      if (!container) return;

      const section = container.closest('[data-faq-section]');
      const list = section?.querySelector('[data-faq-list]');
      if (!list) return;

      const items = list.querySelectorAll<HTMLElement>('[data-faq-topic]');
      const chips = container.querySelectorAll<HTMLButtonElement>('[data-faq-filter]');
      const topic = chip.getAttribute('data-faq-filter');

      chips.forEach((c) => c.classList.toggle('is-active', c === chip));
      items.forEach((item) => {
        const itemTopic = item.getAttribute('data-faq-topic');
        const show = topic === 'all' || itemTopic === topic;
        item.toggleAttribute('data-hidden', !show);
      });
    },
    true,
  );
}

function initThemeMetaColor() {
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!metaTheme) return;

  const update = () => {
    metaTheme.content = document.documentElement.classList.contains('dark') ? '#7F3DEE' : '#f5f7fa';
  };

  update();
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

async function initBlogPage() {
  if (!document.getElementById('blog-grid')) return;
  const { initBlogIndexFilters } = await import('./blog-index');
  initBlogIndexFilters();
}

function bootSite() {
  initFonts();
  initFaqFilters();
  initNavHighlight();
  initInPageScroll();
  initSkipLink();
  initThemeMetaColor();
  void initBlogPage().catch(() => {});
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}

document.addEventListener('astro:page-load', () => {
  void initBlogPage().catch(() => {});
});
