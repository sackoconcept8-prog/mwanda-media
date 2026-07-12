function safeParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function escapeHTML(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function icon(name) {
  const body = icons[name] || icons.info;
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
}

function hydrateStaticIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(node => {
    node.innerHTML = icon(node.dataset.icon);
  });
}

function persist() {
  const payload = {
    saved: [...state.saved],
    liked: [...state.liked],
    history: state.history.slice(0, 20),
    recentSearches: state.recentSearches.slice(0, 8),
    createdPosts: state.createdPosts,
    extraComments: state.extraComments,
    notifications: state.notifications,
    audio: state.audio
  };
  sessionStorage.setItem(storageKey, JSON.stringify(payload));
}

function allPosts() {
  return [...state.createdPosts, ...DATA.forumPosts].map(post => ({
    ...post,
    comments: [...(post.comments || []), ...(state.extraComments[post.id] || [])]
  }));
}

function getAudioItem(type, id) {
  if (type === 'radio') return DATA.radioPrograms.find(item => item.id === id);
  if (type === 'podcast') return DATA.podcasts.find(item => item.id === id);
  return null;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function addHistory(type, id, title) {
  state.history = [{ type, id, title, at: Date.now() }, ...state.history.filter(item => !(item.type === type && item.id === id))].slice(0, 20);
  persist();
}

function toast(message) {
  const node = document.createElement('div');
  node.className = 'toast';
  node.innerHTML = `<span class="toast-icon">${icon('check')}</span><span>${escapeHTML(message)}</span>`;
  els.toastRegion.append(node);
  setTimeout(() => node.remove(), 2800);
}

function updateNotificationDot() {
  const unread = state.notifications.some(item => !item.read);
  els.notificationDot.hidden = !unread;
}

function footerNote() {
  return '<p class="footer-note">Mobile Experience Concept by SACKO CONCEPT</p>';
}

function savedIcon(id) {
  return state.saved.has(id) ? 'bookmark-filled' : 'bookmark';
}

function backButton(route = 'home') {
  return `<button class="icon-button" data-route="${route}" aria-label="Go back">${icon('arrowleft')}</button>`;
}

function setScreen(content) {
  els.screen.innerHTML = content;
  els.screen.classList.remove('route-enter');
  void els.screen.offsetWidth;
  els.screen.classList.add('route-enter');
  hydrateStaticIcons(els.screen);
  els.screen.focus({ preventScroll: true });
  updateAudioUI();
}

function updateNav() {
  const map = {
    home: 'home', live: 'live', videos: 'home', 'video-detail': 'home', radio: 'live', market: 'home',
    podcasts: 'podcasts', 'podcast-detail': 'podcasts', community: 'community', 'discussion-detail': 'community',
    profile: 'profile', search: '', notifications: ''
  };
  const active = map[state.route];
  document.querySelectorAll('.nav-item').forEach(button => {
    const on = button.dataset.route === active;
    button.classList.toggle('is-active', on);
    if (on) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
  });
}

function navigate(route, options = {}) {
  if (options.videoId) state.activeVideoId = options.videoId;
  if (options.podcastId) state.activePodcastId = options.podcastId;
  if (options.postId) state.activePostId = options.postId;
  if (options.radioId) state.activeRadioId = options.radioId;
  state.route = route;
  updateNav();
  window.scrollTo({ top: 0, behavior: state.reducedMotion ? 'auto' : 'smooth' });

  if (!state.reducedMotion && !options.instant) {
    els.screen.innerHTML = els.loadingTemplate.innerHTML;
    setTimeout(renderRoute, 120);
  } else {
    renderRoute();
  }
}

function renderRoute() {
  const routes = {
    home: renderHome,
    live: renderLive,
    videos: renderVideos,
    'video-detail': renderVideoDetail,
    radio: renderRadio,
    podcasts: renderPodcasts,
    'podcast-detail': renderPodcastDetail,
    market: renderMarket,
    community: renderCommunity,
    'discussion-detail': renderDiscussionDetail,
    search: renderSearch,
    notifications: renderNotifications,
    profile: renderProfile
  };
  (routes[state.route] || renderHome)();
  updateNotificationDot();
}

function videoCard(video) {
  return `
    <article class="card card-interactive video-card" data-action="open-video" data-id="${video.id}" tabindex="0" role="button" aria-label="Open ${escapeHTML(video.title)}">
      <div class="video-thumb">
        <img src="${video.image}" alt="Demo thumbnail for ${escapeHTML(video.title)}" loading="lazy">
        <span class="duration">${video.duration}</span>
      </div>
      <div class="card-content">
        <h3>${escapeHTML(video.title)}</h3>
        <div class="meta-row"><span>${escapeHTML(video.category)}</span><span>•</span><span>${video.date}</span></div>
      </div>
    </article>`;
}

function audioRow(item, type = 'podcast') {
  const subtitle = type === 'podcast' ? `${item.hosts} · ${item.duration}` : `${item.presenter} · ${item.schedule}`;
  const isCurrent = state.audio && state.audio.type === type && state.audio.id === item.id;
  const isPlaying = isCurrent && !els.audio.paused;
  return `
    <article class="card audio-row">
      <img src="${item.image}" alt="${escapeHTML(item.title)} artwork" loading="lazy">
      <button class="mini-player-main" data-action="${type === 'podcast' ? 'open-podcast' : 'select-radio'}" data-id="${item.id}">
        <strong>${escapeHTML(item.title)}</strong>
        <p>${escapeHTML(subtitle)}</p>
      </button>
      <button class="icon-button mini-play-button" data-action="play-audio" data-type="${type}" data-id="${item.id}" aria-label="${isPlaying ? 'Pause' : 'Play'} ${escapeHTML(item.title)}">${icon(isPlaying ? 'pause' : 'play')}</button>
    </article>`;
}

function postCard(post) {
  const liked = state.liked.has(post.id);
  const likeCount = post.likes + (liked ? 1 : 0);
  return `
    <article class="card post-card">
      <div class="post-author">
        <div class="avatar" aria-hidden="true">${escapeHTML(post.initials)}</div>
        <div><h3>${escapeHTML(post.name)}</h3><p>${escapeHTML(post.time)} · ${escapeHTML(post.category)}</p></div>
        <span class="demo-pill">Demo</span>
      </div>
      <h3 class="post-topic">${escapeHTML(post.topic)}</h3>
      <p class="post-text">${escapeHTML(post.text)}</p>
      <div class="post-actions">
        <button class="post-action ${liked ? 'is-active' : ''}" data-action="like-post" data-id="${post.id}" aria-label="Like post">${icon('thumb')} <span>${likeCount}</span></button>
        <button class="post-action" data-action="open-post" data-id="${post.id}">${icon('message')} <span>${post.comments.length}</span></button>
        <button class="post-action" data-action="share" data-title="${escapeHTML(post.topic)}">${icon('share')} <span>Share</span></button>
      </div>
    </article>`;
}
