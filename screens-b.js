function renderMarket() {
  const categories = ['All', ...new Set(DATA.marketItems.map(item => item.category))];
  const items = state.marketFilter === 'All' ? DATA.marketItems : DATA.marketItems.filter(item => item.category === state.marketFilter);
  setScreen(`
    <div class="page-heading"><div><p class="eyebrow">MASOKO</p><h1>Local promotions</h1><p>Promotional content and marketplace concepts.</p></div><button class="icon-button" data-route="search" aria-label="Search marketplace">${icon('search')}</button></div>
    <section class="card market-hero"><span class="demo-pill">All listings are demo content</span><h1>Discover local services and offers.</h1><p>Businesses can be featured here after Mwanda adds an official commercial policy, verification process and contact information.</p></section>
    <section class="section"><div class="chip-row">${categories.map(category => `<button class="chip ${category === state.marketFilter ? 'is-active' : ''}" data-action="market-filter" data-value="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join('')}</div></section>
    <section class="section"><div class="section-heading"><h2>Featured promotions</h2><span class="caption">${items.length} demo listings</span></div><div class="market-grid">${items.map(item => `
      <article class="card market-card"><img src="${item.image}" alt="Demo image for ${escapeHTML(item.title)}" loading="lazy"><div class="card-content"><span class="category-pill">${escapeHTML(item.category)}</span><h3 style="margin-top:10px">${escapeHTML(item.title)}</h3><p class="price">${escapeHTML(item.price)}</p><span class="demo-pill">Demo listing</span><div class="action-row"><button class="button button-soft button-small" data-action="contact-seller" data-id="${item.id}">Contact</button><button class="icon-button" data-action="toggle-save" data-id="${item.id}" aria-label="Save item">${icon(savedIcon(item.id))}</button></div></div></article>`).join('')}</div></section>
    ${footerNote()}
  `);
}

function renderCommunity() {
  const categories = ['All', 'Local News', 'Entertainment', 'Drivers and Transport', 'Business', 'Community Issues', 'General Discussion'];
  const posts = allPosts().filter(post => state.communityFilter === 'All' || post.category === state.communityFilter);
  setScreen(`
    <section class="card community-hero"><div><p class="eyebrow">MWANDA COMMUNITY</p><h1>Talk. Listen. Connect.</h1><p>Local demo conversations stored only for this browser session.</p></div><div class="community-avatar-stack" aria-hidden="true"><span>RM</span><span>BJ</span><span>NA</span></div></section>
    <div class="action-row" style="justify-content:space-between"><button class="button button-primary" data-action="create-post">${icon('plus')} Create post</button><button class="icon-button" data-route="search" aria-label="Search discussions">${icon('search')}</button></div>
    <section class="section"><div class="chip-row">${categories.map(category => `<button class="chip ${category === state.communityFilter ? 'is-active' : ''}" data-action="community-filter" data-value="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join('')}</div></section>
    <section class="section"><div class="section-heading"><h2>${state.communityFilter === 'All' ? 'Latest discussions' : escapeHTML(state.communityFilter)}</h2><span class="caption">${posts.length} posts</span></div><div class="post-list">${posts.map(postCard).join('')}</div></section>
    ${footerNote()}
  `);
}

function renderDiscussionDetail() {
  const post = allPosts().find(item => item.id === state.activePostId) || allPosts()[0];
  const liked = state.liked.has(post.id);
  setScreen(`
    <div class="page-heading"><div>${backButton('community')}</div><span class="category-pill">${escapeHTML(post.category)}</span></div>
    <article class="card post-card">
      <div class="post-author"><div class="avatar">${escapeHTML(post.initials)}</div><div><h3>${escapeHTML(post.name)}</h3><p>${escapeHTML(post.time)} · Demo discussion</p></div><span class="demo-pill">Demo</span></div>
      <h1 style="font-size:1.55rem;line-height:1.15;letter-spacing:-.04em;margin:18px 0 10px">${escapeHTML(post.topic)}</h1>
      <p class="post-text" style="font-size:.88rem">${escapeHTML(post.text)}</p>
      <div class="post-actions"><button class="post-action ${liked ? 'is-active' : ''}" data-action="like-post" data-id="${post.id}">${icon('thumb')} ${post.likes + (liked ? 1 : 0)}</button><button class="post-action">${icon('message')} ${post.comments.length}</button><button class="post-action" data-action="share" data-title="${escapeHTML(post.topic)}">${icon('share')} Share</button></div>
    </article>
    <section class="section"><div class="section-heading"><h2>Comments</h2><span class="caption">Local demo replies</span></div><div class="comment-list">${post.comments.length ? post.comments.map(comment => `<article class="comment-card"><strong>${escapeHTML(comment.name)}</strong><p>${escapeHTML(comment.text)}</p></article>`).join('') : '<div class="empty-state" style="min-height:150px"><div class="empty-state-inner"><p>No comments yet.</p></div></div>'}</div>
      <form id="comment-form" class="comment-form" data-post-id="${post.id}"><input name="comment" aria-label="Add a comment" placeholder="Add a respectful comment…" maxlength="280" required><button class="button button-primary button-small" type="submit">Post</button></form>
    </section>
    ${footerNote()}
  `);
}

function searchItems(query, category) {
  const normalized = query.trim().toLowerCase();
  const collections = [
    ...DATA.videos.map(item => ({ type: 'Videos', id: item.id, title: item.title, text: `${item.category} ${item.description}`, image: item.image, route: 'video-detail' })),
    ...DATA.radioPrograms.map(item => ({ type: 'Radio', id: item.id, title: item.title, text: `${item.presenter} ${item.description}`, image: item.image, route: 'radio' })),
    ...DATA.podcasts.map(item => ({ type: 'Podcasts', id: item.id, title: item.title, text: `${item.hosts} ${item.description}`, image: item.image, route: 'podcast-detail' })),
    ...allPosts().map(item => ({ type: 'Community', id: item.id, title: item.topic, text: `${item.category} ${item.text}`, image: 'assets/images/video-community.svg', route: 'discussion-detail' }))
  ];
  return collections.filter(item => {
    const categoryMatch = category === 'All' || item.type === category;
    const queryMatch = !normalized || `${item.title} ${item.text}`.toLowerCase().includes(normalized);
    return categoryMatch && queryMatch;
  });
}

function searchResultCard(item) {
  return `<article class="card card-interactive search-result" data-action="open-search-result" data-route-target="${item.route}" data-id="${item.id}" tabindex="0" role="button"><img src="${item.image}" alt=""><div><span class="category-pill">${item.type}</span><h3 style="margin-top:8px">${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text).slice(0, 82)}…</p></div>${icon('chevron')}</article>`;
}

function renderSearch() {
  const results = searchItems(state.searchQuery, state.searchCategory);
  setScreen(`
    <div class="page-heading"><div><p class="eyebrow">DISCOVER</p><h1>Search Mwanda</h1></div></div>
    <form id="search-form" class="search-box" role="search">${icon('search')}<input id="global-search" name="search" type="search" value="${escapeHTML(state.searchQuery)}" placeholder="Videos, radio, podcasts, discussions…" autocomplete="off" aria-label="Search Mwanda Media"><button class="icon-button" type="button" data-action="clear-search" aria-label="Clear search">${icon('x')}</button></form>
    <section class="section"><div class="chip-row" aria-label="Search categories">${['All','Videos','Radio','Podcasts','Community'].map(category => `<button class="chip ${category === state.searchCategory ? 'is-active' : ''}" data-action="search-category" data-value="${category}">${category}</button>`).join('')}</div></section>
    <section id="search-results-section" class="section">${renderSearchResultsMarkup(results)}</section>
    ${footerNote()}
  `);
  document.getElementById('global-search')?.focus({ preventScroll: true });
}

function renderSearchResultsMarkup(results) {
  if (!state.searchQuery.trim()) {
    return `<div class="section-heading"><h2>Recent searches</h2></div><div class="chip-row">${state.recentSearches.length ? state.recentSearches.map(term => `<button class="chip" data-action="recent-search" data-value="${escapeHTML(term)}">${escapeHTML(term)}</button>`).join('') : '<span class="caption">No recent searches.</span>'}</div><div class="section-heading" style="margin-top:24px"><h2>Browse everything</h2><span class="caption">${results.length} items</span></div><div class="post-list">${results.slice(0, 8).map(searchResultCard).join('')}</div>`;
  }
  if (!results.length) {
    return `<div class="empty-state"><div class="empty-state-inner"><div class="empty-icon">${icon('search')}</div><h2>No results found</h2><p>Try a different word or switch to another category.</p></div></div>`;
  }
  return `<div class="section-heading"><h2>Search results</h2><span class="caption">${results.length} matches</span></div><div class="post-list">${results.map(searchResultCard).join('')}</div>`;
}

function updateSearchResults() {
  const section = document.getElementById('search-results-section');
  if (!section) return;
  section.innerHTML = renderSearchResultsMarkup(searchItems(state.searchQuery, state.searchCategory));
}

function notificationIcon(type) {
  return { live: 'tv', podcast: 'mic', reply: 'message', radio: 'radio' }[type] || 'bell';
}

function renderNotifications() {
  setScreen(`
    <div class="page-heading"><div><p class="eyebrow">UPDATES</p><h1>Notifications</h1><p>${state.notifications.filter(item => !item.read).length} unread alerts</p></div><button class="icon-button" data-action="clear-notifications" aria-label="Clear notifications">${icon('trash')}</button></div>
    <div class="action-row"><button class="button button-soft button-small" data-action="mark-all-read">${icon('check')} Mark all as read</button></div>
    <section class="section"><div class="notification-list">${state.notifications.length ? state.notifications.map(item => `<article class="card notification-card ${item.read ? '' : 'is-unread'}"><div class="notification-icon">${icon(notificationIcon(item.type))}</div><button class="mini-player-main" data-action="read-notification" data-id="${item.id}"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p><span class="caption">${escapeHTML(item.time)}</span></button>${item.read ? '' : '<span class="unread-dot" aria-label="Unread"></span>'}</article>`).join('') : `<div class="empty-state"><div class="empty-state-inner"><div class="empty-icon">${icon('bell')}</div><h2>You are all caught up</h2><p>New programme, podcast and community alerts will appear here.</p></div></div>`}</div></section>
    ${footerNote()}
  `);
}

function renderProfile() {
  const savedItemsCount = state.saved.size;
  const forumCount = state.createdPosts.length;
  setScreen(`
    <section class="card profile-hero"><div class="profile-avatar">HS</div><h1>${state.guest ? 'Mwanda Guest' : 'Hawa Sacko'}</h1><p>${icon('map')} Salasala · Dar es Salaam, Tanzania</p><div class="profile-stats"><div class="profile-stat"><strong>${savedItemsCount}</strong><span>Saved</span></div><div class="profile-stat"><strong>${state.history.length}</strong><span>History</span></div><div class="profile-stat"><strong>${forumCount}</strong><span>Posts</span></div></div></section>
    <section class="section"><div class="section-heading"><h2>Your media</h2></div><div class="settings-list">
      <button class="setting-row" data-action="profile-saved"><span class="setting-icon">${icon('bookmark')}</span><span><h3>Saved content</h3><p>${savedItemsCount} saved items in this session</p></span>${icon('chevron')}</button>
      <button class="setting-row" data-action="profile-history"><span class="setting-icon">${icon('clock')}</span><span><h3>Listening history</h3><p>${state.history.length} recently opened items</p></span>${icon('chevron')}</button>
      <button class="setting-row" data-route="radio"><span class="setting-icon">${icon('heart')}</span><span><h3>Favorite shows</h3><p>FM Mwanda and saved programmes</p></span>${icon('chevron')}</button>
      <button class="setting-row" data-route="community"><span class="setting-icon">${icon('message')}</span><span><h3>Forum posts</h3><p>${forumCount} local demo posts</p></span>${icon('chevron')}</button>
    </div></section>
    <section class="section"><div class="section-heading"><h2>Account settings</h2></div><div class="settings-list">
      <button class="setting-row" data-action="placeholder-setting"><span class="setting-icon">${icon('settings')}</span><span><h3>Account settings</h3><p>Profile and privacy placeholder</p></span>${icon('chevron')}</button>
      <button class="setting-row" data-action="language-placeholder"><span class="setting-icon">${icon('globe')}</span><span><h3>Language</h3><p>English · Kiswahili placeholder</p></span>${icon('chevron')}</button>
      <div class="setting-row"><span class="setting-icon">${icon('bell')}</span><span><h3>Notification preferences</h3><p>Programme and community alerts</p></span><label class="switch"><input id="notification-switch" type="checkbox" checked aria-label="Enable notifications"><span class="switch-slider"></span></label></div>
      <button class="setting-row" data-action="support-placeholder"><span class="setting-icon">${icon('help')}</span><span><h3>Help and support</h3><p>Add official contact information</p></span>${icon('chevron')}</button>
    </div></section>
    <button class="button button-ghost button-wide" data-action="logout">${icon('logout')} Log out</button>
    ${footerNote()}
  `);
}
