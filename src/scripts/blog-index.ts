/** Blog index topic filters + Starwind sort select. */
let blogIndexDelegationBound = false;

function getBlogGrid() {
  return document.getElementById('blog-grid');
}

function getBlogEmptyEl() {
  return document.getElementById('blog-empty');
}

function getBlogSortRoot() {
  return document.getElementById('blog-sort-select');
}

function activeTag() {
  return (
    document.querySelector<HTMLButtonElement>('[data-blog-filter][aria-pressed="true"]')?.getAttribute(
      'data-blog-filter',
    ) ?? 'all'
  );
}

function getSortSelectRoot() {
  return getBlogSortRoot()?.querySelector<HTMLElement>('[data-sw-select]');
}

function getSort() {
  const sortRoot = getBlogSortRoot();
  const root = getSortSelectRoot();
  const fromAttr = root?.getAttribute('data-value');
  if (fromAttr) return fromAttr;
  const input = sortRoot?.querySelector<HTMLInputElement>('[data-sw-select-input]');
  return input?.value || 'newest';
}

function compareCards(a: HTMLElement, b: HTMLElement, sort: string) {
  const tsA = Number(a.getAttribute('data-ts') ?? 0);
  const tsB = Number(b.getAttribute('data-ts') ?? 0);
  const readA = Number(a.getAttribute('data-read-minutes') ?? 0);
  const readB = Number(b.getAttribute('data-read-minutes') ?? 0);
  if (sort === 'oldest') return tsA - tsB;
  if (sort === 'short') return readA - readB;
  if (sort === 'long') return readB - readA;
  return tsB - tsA;
}

function applyBlogFilters() {
  const grid = getBlogGrid();
  const emptyEl = getBlogEmptyEl();
  if (!grid) return;

  const msg = grid.dataset.blogEmptyMessage ?? 'No articles match this filter.';
  const tag = activeTag();
  const sort = getSort();
  const items = [...grid.querySelectorAll<HTMLElement>('[data-blog-card]')];

  const sorted = [...items].sort((a, b) => compareCards(a, b, sort));
  sorted.forEach((el) => grid.appendChild(el));

  let visibleCount = 0;
  items.forEach((el) => {
    const match = tag === 'all' || el.getAttribute('data-tag') === tag;
    // Native hidden — reliable vs Tailwind `.hidden` on Starwind Card markup
    el.hidden = !match;
    if (match) visibleCount += 1;
  });

  if (emptyEl) {
    emptyEl.hidden = visibleCount > 0;
    emptyEl.textContent = msg;
  }
}

function isBlogSortEvent(event: Event) {
  const sortRoot = getBlogSortRoot();
  const root = getSortSelectRoot();
  if (!root || !sortRoot) return false;
  const t = event.target;
  if (!(t instanceof Node)) return false;
  return root === t || root.contains(t) || sortRoot.contains(t);
}

function bindBlogIndexDelegation() {
  if (blogIndexDelegationBound) return;
  blogIndexDelegationBound = true;

  document.addEventListener(
    'click',
    (e) => {
      if (!getBlogGrid()) return;
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-blog-filter]');
      if (!btn) return;
      e.preventDefault();
      document.querySelectorAll<HTMLButtonElement>('[data-blog-filter]').forEach((b) => {
        b.setAttribute('aria-pressed', 'false');
      });
      btn.setAttribute('aria-pressed', 'true');
      applyBlogFilters();
    },
    true,
  );

  document.addEventListener(
    'starwind:value-change',
    (event: Event) => {
      if (!getBlogGrid()) return;
      if (!isBlogSortEvent(event)) return;
      applyBlogFilters();
    },
    true,
  );

  document.addEventListener(
    'change',
    (e) => {
      if (!getBlogGrid()) return;
      const t = e.target;
      if (!(t instanceof HTMLInputElement)) return;
      if (!t.matches('[data-sw-select-input]')) return;
      const sortRoot = getBlogSortRoot();
      if (!sortRoot?.contains(t)) return;
      applyBlogFilters();
    },
    true,
  );
}

/** Call from site boot on /blog/ — reads `data-blog-empty-message` on #blog-grid when present. */
export function initBlogIndexFilters(emptyMessage?: string) {
  const grid = getBlogGrid();
  if (!grid) return;

  const fromDom = grid.dataset.blogEmptyMessage?.trim();
  grid.dataset.blogEmptyMessage = fromDom || emptyMessage || 'No articles match this filter.';
  bindBlogIndexDelegation();

  const sortRoot = getBlogSortRoot();
  const selectRoot = getSortSelectRoot();
  if (selectRoot && !selectRoot.dataset.blogSortObserved) {
    selectRoot.dataset.blogSortObserved = 'true';
    const mo = new MutationObserver(() => {
      if (getBlogGrid()) applyBlogFilters();
    });
    mo.observe(selectRoot, { attributes: true, attributeFilter: ['data-value'] });
  }

  requestAnimationFrame(applyBlogFilters);
  window.setTimeout(applyBlogFilters, 0);
}
