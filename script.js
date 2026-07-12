function showMainApp(guest = true) {
  state.signedIn = true;
  state.guest = guest;
  els.splash.hidden = true;
  els.auth.hidden = true;
  els.main.hidden = false;
  hydrateStaticIcons(els.main);
  navigate('home', { instant: true });
}

function playAudio(type, id) {
  const item = getAudioItem(type, id);
  if (!item) return;
  const sameItem = state.audio && state.audio.type === type && state.audio.id === id;
  if (sameItem) {
    if (els.audio.paused) {
      els.audio.play().catch(() => toast('Tap play again to start the demo audio.'));
    } else {
      els.audio.pause();
    }
  } else {
    state.audio = { type, id, title: item.title, art: item.image, src: item.audio };
    els.audio.src = item.audio;
    els.audio.play().catch(() => toast('Tap play again to start the demo audio.'));
    addHistory(type, id, item.title);
  }
  persist();
  updateMiniPlayer();
  setTimeout(updateAudioUI, 20);
}

function updateMiniPlayer() {
  if (!state.audio) {
    els.miniPlayer.hidden = true;
    return;
  }
  const item = getAudioItem(state.audio.type, state.audio.id);
  if (!item) return;
  els.miniPlayer.hidden = false;
  els.miniArt.src = item.image;
  els.miniTitle.textContent = item.title;
  els.miniLabel.textContent = state.audio.type === 'radio' ? 'FM Mwanda · Demo live' : 'Life on the Road';
  els.miniToggle.innerHTML = icon(els.audio.paused ? 'play' : 'pause');
  els.miniToggle.setAttribute('aria-label', els.audio.paused ? 'Play audio' : 'Pause audio');
}

function updateAudioUI() {
  updateMiniPlayer();
  const progress = document.getElementById('audio-progress');
  const current = document.getElementById('audio-current-time');
  const duration = document.getElementById('audio-duration');
  if (progress) {
    progress.max = Number.isFinite(els.audio.duration) && els.audio.duration > 0 ? els.audio.duration : 100;
    progress.value = els.audio.currentTime || 0;
  }
  if (current) current.textContent = formatTime(els.audio.currentTime);
  if (duration && Number.isFinite(els.audio.duration)) duration.textContent = formatTime(els.audio.duration);
  document.querySelectorAll('[data-action="play-audio"]').forEach(button => {
    const same = state.audio && state.audio.type === button.dataset.type && state.audio.id === button.dataset.id;
    const playing = same && !els.audio.paused;
    button.innerHTML = icon(playing ? 'pause' : 'play');
    button.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  });
}

function toggleSave(id) {
  if (state.saved.has(id)) {
    state.saved.delete(id);
    toast('Removed from saved content.');
  } else {
    state.saved.add(id);
    toast('Saved for this browser session.');
  }
  persist();
  renderRoute();
}

async function shareContent(title) {
  const shareData = { title: `Mwanda Media — ${title}`, text: `${title} on the Mwanda Media concept app.` };
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareData.title}\n${location.href}`);
      toast('Share text copied to clipboard.');
    } else toast('Sharing is a placeholder in this browser.');
  } catch (error) {
    if (error.name !== 'AbortError') toast('Sharing is not available right now.');
  }
}

function openCreatePostModal() {
  const categories = ['Local News','Entertainment','Drivers and Transport','Business','Community Issues','General Discussion'];
  els.modalRoot.innerHTML = `
    <div class="modal-backdrop" data-action="close-modal" role="presentation">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="create-post-title">
        <header class="modal-header"><h2 id="create-post-title">Create a demo post</h2><button class="icon-button" data-action="close-modal" aria-label="Close">${icon('x')}</button></header>
        <div class="modal-body"><form id="create-post-form" class="modal-form"><label>Category<select name="category" required>${categories.map(c => `<option>${c}</option>`).join('')}</select></label><label>Topic<input name="topic" maxlength="90" placeholder="What would you like to discuss?" required></label><label>Your message<textarea name="text" maxlength="500" placeholder="Write a respectful community message…" required></textarea></label><p class="caption">This post stays only in the current browser session. No data is sent to a server.</p><button class="button button-primary button-wide" type="submit">Publish demo post</button></form></div>
      </section>
    </div>`;
  els.modalRoot.querySelector('input')?.focus();
}

function closeModal(event) {
  if (event && event.target.closest('.modal') && !event.target.closest('[data-action="close-modal"]')) return;
  els.modalRoot.innerHTML = '';
}

function showSavedModal() {
  const savedItems = [
    ...DATA.videos.map(item => ({ ...item, type: 'Video' })),
    ...DATA.podcasts.map(item => ({ ...item, type: 'Podcast' })),
    ...DATA.radioPrograms.map(item => ({ ...item, type: 'Radio' })),
    ...DATA.marketItems.map(item => ({ ...item, type: 'Masoko' }))
  ].filter(item => state.saved.has(item.id));
  els.modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true"><header class="modal-header"><h2>Saved content</h2><button class="icon-button" data-action="close-modal">${icon('x')}</button></header><div class="modal-body"><div class="audio-list">${savedItems.length ? savedItems.map(item => `<article class="card audio-row"><img src="${item.image}" alt=""><div><strong>${escapeHTML(item.title)}</strong><p>${item.type}</p></div><button class="icon-button" data-action="toggle-save" data-id="${item.id}">${icon('bookmark-filled')}</button></article>`).join('') : '<div class="empty-state" style="min-height:220px"><div class="empty-state-inner"><h2>Nothing saved yet</h2><p>Save videos, programmes, episodes and Masoko items to find them here.</p></div></div>'}</div></div></section></div>`;
}

function showHistoryModal() {
  els.modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true"><header class="modal-header"><h2>Listening & viewing history</h2><button class="icon-button" data-action="close-modal">${icon('x')}</button></header><div class="modal-body"><div class="schedule-list">${state.history.length ? state.history.map(item => `<article class="schedule-item"><span class="setting-icon">${icon(item.type === 'video' ? 'tv' : item.type === 'radio' ? 'radio' : 'mic')}</span><div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.type)}</p></div>${icon('chevron')}</article>`).join('') : '<p class="muted">No history in this session.</p>'}</div></div></section></div>`;
}

function handleSearchResult(button) {
  const route = button.dataset.routeTarget;
  const id = button.dataset.id;
  if (route === 'video-detail') navigate(route, { videoId: id });
  else if (route === 'podcast-detail') navigate(route, { podcastId: id });
  else if (route === 'discussion-detail') navigate(route, { postId: id });
  else if (route === 'radio') navigate(route, { radioId: id });
}

function routeFromNotification(type) {
  return { live: 'live', podcast: 'podcasts', reply: 'community', radio: 'radio' }[type] || 'home';
}

function handleAction(button, event) {
  const action = button.dataset.action;
  if (!action) return;

  switch (action) {
    case 'enter-app':
      els.splash.hidden = true;
      els.auth.hidden = false;
      document.getElementById('identity')?.focus();
      break;
    case 'guest': showMainApp(true); break;
    case 'toggle-password': {
      const input = document.getElementById('password');
      if (!input) break;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.textContent = show ? 'Hide' : 'Show';
      button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      break;
    }
    case 'forgot-password': toast('Password recovery is a demo placeholder.'); break;
    case 'create-account': toast('Account registration is a demo placeholder.'); break;
    case 'social-placeholder': toast('Social sign-in will be connected in a future production version.'); break;
    case 'hero-slide': state.heroIndex = Number(button.dataset.index); renderHome(); break;
    case 'video-filter': state.videoFilter = button.dataset.value; renderVideos(); break;
    case 'market-filter': state.marketFilter = button.dataset.value; renderMarket(); break;
    case 'community-filter': state.communityFilter = button.dataset.value; renderCommunity(); break;
    case 'search-category': state.searchCategory = button.dataset.value; renderSearch(); break;
    case 'recent-search': state.searchQuery = button.dataset.value; renderSearch(); break;
    case 'clear-search': state.searchQuery = ''; renderSearch(); break;
    case 'open-video': navigate('video-detail', { videoId: button.dataset.id }); break;
    case 'open-podcast': navigate('podcast-detail', { podcastId: button.dataset.id }); break;
    case 'open-post': navigate('discussion-detail', { postId: button.dataset.id }); break;
    case 'open-search-result': handleSearchResult(button); break;
    case 'select-radio': state.activeRadioId = button.dataset.id; renderRadio(); break;
    case 'play-audio': playAudio(button.dataset.type, button.dataset.id); break;
    case 'toggle-audio':
      if (!state.audio) playAudio('radio', 'r1');
      else if (els.audio.paused) els.audio.play().catch(() => toast('Tap again to play demo audio.'));
      else els.audio.pause();
      break;
    case 'close-mini-player': els.audio.pause(); state.audio = null; persist(); updateMiniPlayer(); break;
    case 'open-now-playing':
      if (!state.audio) break;
      if (state.audio.type === 'radio') navigate('radio', { radioId: state.audio.id });
      else navigate('podcast-detail', { podcastId: state.audio.id });
      break;
    case 'rewind-audio': els.audio.currentTime = Math.max(0, els.audio.currentTime - 10); break;
    case 'forward-audio': els.audio.currentTime = Math.min(els.audio.duration || Infinity, els.audio.currentTime + 10); break;
    case 'toggle-save': toggleSave(button.dataset.id); break;
    case 'like-post':
      if (state.liked.has(button.dataset.id)) state.liked.delete(button.dataset.id); else state.liked.add(button.dataset.id);
      persist(); renderRoute(); break;
    case 'share': shareContent(button.dataset.title || 'Mwanda Media'); break;
    case 'fullscreen-video': {
      const video = document.querySelector('.media-player-wrap video');
      if (video?.requestFullscreen) video.requestFullscreen(); else toast('Full-screen mode is not supported by this browser.');
      break;
    }
    case 'create-post': openCreatePostModal(); break;
    case 'close-modal': closeModal(event); break;
    case 'download-placeholder': toast('Demo download only. Add the official episode file before launch.'); break;
    case 'contact-seller': {
      const item = DATA.marketItems.find(entry => entry.id === button.dataset.id);
      toast(`${item?.seller || 'Seller'} contact and WhatsApp details are placeholders.`);
      break;
    }
    case 'mark-all-read': state.notifications.forEach(item => item.read = true); persist(); renderNotifications(); break;
    case 'clear-notifications': state.notifications = []; persist(); renderNotifications(); toast('Notifications cleared for this session.'); break;
    case 'read-notification': {
      const notification = state.notifications.find(item => item.id === button.dataset.id);
      if (notification) { notification.read = true; persist(); navigate(routeFromNotification(notification.type)); }
      break;
    }
    case 'profile-saved': showSavedModal(); break;
    case 'profile-history': showHistoryModal(); break;
    case 'placeholder-setting': toast('Account settings are a production placeholder.'); break;
    case 'language-placeholder': toast('English and Kiswahili can be added in the production version.'); break;
    case 'support-placeholder': toast('Replace this placeholder with Mwanda phone, email or WhatsApp details.'); break;
    case 'logout':
      els.audio.pause(); state.audio = null; persist();
      els.main.hidden = true; els.auth.hidden = false; state.signedIn = false;
      toast('You have logged out of the demo.');
      break;
  }
}

function handleClick(event) {
  const routeButton = event.target.closest('[data-route]');
  if (routeButton && !routeButton.dataset.action) {
    navigate(routeButton.dataset.route);
    return;
  }
  const actionButton = event.target.closest('[data-action]');
  if (actionButton) handleAction(actionButton, event);
}

function handleKeydown(event) {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[role="button"][data-action], [role="button"][data-route]')) {
    event.preventDefault();
    event.target.click();
  }
  if (event.key === 'Escape' && els.modalRoot.innerHTML) closeModal();
}

function handleSubmit(event) {
  if (event.target.id === 'signin-form') {
    event.preventDefault();
    showMainApp(false);
    toast('Signed in to the local demo experience.');
  }
  if (event.target.id === 'search-form') {
    event.preventDefault();
    const term = state.searchQuery.trim();
    if (term) {
      state.recentSearches = [term, ...state.recentSearches.filter(item => item.toLowerCase() !== term.toLowerCase())].slice(0, 8);
      persist();
      updateSearchResults();
    }
  }
  if (event.target.id === 'create-post-form') {
    event.preventDefault();
    const form = new FormData(event.target);
    const newPost = {
      id: `local-${Date.now()}`,
      name: state.guest ? 'Mwanda Guest' : 'Hawa Sacko',
      initials: state.guest ? 'MG' : 'HS',
      time: 'Just now',
      category: String(form.get('category')),
      topic: String(form.get('topic')).trim(),
      text: String(form.get('text')).trim(),
      likes: 0,
      comments: []
    };
    state.createdPosts.unshift(newPost);
    persist();
    closeModal();
    state.communityFilter = 'All';
    navigate('community', { instant: true });
    toast('Demo post created for this browser session.');
  }
  if (event.target.id === 'comment-form') {
    event.preventDefault();
    const form = new FormData(event.target);
    const text = String(form.get('comment')).trim();
    const postId = event.target.dataset.postId;
    if (!text) return;
    state.extraComments[postId] ||= [];
    state.extraComments[postId].push({ name: state.guest ? 'Mwanda Guest' : 'Hawa Sacko', text });
    persist();
    renderDiscussionDetail();
    toast('Comment added locally.');
  }
}

function handleInput(event) {
  if (event.target.id === 'global-search') {
    state.searchQuery = event.target.value;
    updateSearchResults();
  }
  if (event.target.id === 'audio-progress') {
    els.audio.currentTime = Number(event.target.value);
  }
  if (event.target.id === 'audio-volume') {
    els.audio.volume = Number(event.target.value);
  }
}

function initialize() {
  hydrateStaticIcons();
  updateNotificationDot();
  els.audio.volume = 0.8;
  if (state.audio?.src) {
    els.audio.src = state.audio.src;
    updateMiniPlayer();
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('input', handleInput);
  els.audio.addEventListener('timeupdate', updateAudioUI);
  els.audio.addEventListener('loadedmetadata', updateAudioUI);
  els.audio.addEventListener('play', updateAudioUI);
  els.audio.addEventListener('pause', updateAudioUI);
  els.audio.addEventListener('ended', updateAudioUI);

  if (!state.reducedMotion) {
    setInterval(() => {
      if (state.route === 'home' && !els.main.hidden && window.scrollY < 520) {
        state.heroIndex = (state.heroIndex + 1) % DATA.heroSlides.length;
        renderHome();
      }
    }, 7000);
  }
}

initialize();
