function renderHome() {
  const hero = DATA.heroSlides[state.heroIndex];
  const recentAudio = state.history.find(item => item.type === 'podcast' || item.type === 'radio');
  const recentItem = recentAudio ? getAudioItem(recentAudio.type, recentAudio.id) : DATA.podcasts[0];
  setScreen(`
    <section class="home-greeting" aria-labelledby="home-title">
      <div><p class="eyebrow">KARIBU MWANDA</p><h1 id="home-title">Good evening, Hawa</h1></div>
      <div class="avatar" aria-label="User avatar">HS</div>
    </section>

    <section class="hero-carousel" aria-label="Featured media carousel">
      <img src="${hero.image}" alt="${escapeHTML(hero.title)} feature artwork">
      <div class="hero-dots" aria-label="Select featured slide">
        ${DATA.heroSlides.map((_, index) => `<button class="hero-dot ${index === state.heroIndex ? 'is-active' : ''}" data-action="hero-slide" data-index="${index}" aria-label="Show slide ${index + 1}"></button>`).join('')}
      </div>
      <div class="hero-content">
        <span class="${hero.badge === 'LIVE' ? 'live-pill' : 'demo-pill'}">${hero.badge}</span>
        <h2>${escapeHTML(hero.title)}</h2>
        <p>${escapeHTML(hero.text)}</p>
        <div class="hero-actions">
          <button class="button button-primary button-small" data-route="${hero.route}">${icon('play')} Explore</button>
          <button class="button button-ghost button-small" data-action="share" data-title="${escapeHTML(hero.title)}">${icon('share')} Share</button>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="categories-title">
      <div class="section-heading"><h2 id="categories-title">Explore Mwanda</h2></div>
      <div class="category-grid">
        <button class="category-button" data-route="live"><span>${icon('tv')}</span><span>TV</span></button>
        <button class="category-button" data-route="videos"><span>${icon('play-circle')}</span><span>MedonTV</span></button>
        <button class="category-button" data-route="radio"><span>${icon('radio')}</span><span>Radio</span></button>
        <button class="category-button" data-route="market"><span>${icon('bag')}</span><span>Masoko</span></button>
        <button class="category-button" data-route="radio"><span>${icon('headphones')}</span><span>FM Mwanda</span></button>
        <button class="category-button" data-route="podcasts"><span>${icon('mic')}</span><span>Podcasts</span></button>
      </div>
    </section>

    <section class="section" aria-labelledby="live-now-title">
      <div class="section-heading"><h2 id="live-now-title">Live Now</h2><button class="text-button" data-route="live">Open live</button></div>
      <article class="card card-interactive live-card" data-route="live" tabindex="0" role="button">
        <div class="live-card-media"><img src="assets/images/hero-live.svg" alt="Mwanda Evening Live demo" loading="lazy"><span class="live-pill">Live</span></div>
        <div class="live-card-content"><span class="eyebrow">MWANDA TV</span><h3>Mwanda Evening Live</h3><p>Community conversations and a sample local stories programme.</p></div>
      </article>
    </section>

    <section class="section" aria-labelledby="trending-title">
      <div class="section-heading"><h2 id="trending-title">Trending stories</h2><span class="demo-pill">Concept content</span></div>
      <div class="horizontal-scroll">
        ${DATA.videos.slice(0, 3).map(video => `
          <article class="card card-interactive story-card" data-action="open-video" data-id="${video.id}" tabindex="0" role="button">
            <img src="${video.image}" alt="${escapeHTML(video.title)}" loading="lazy">
            <div class="overlay"><span class="category-pill">${escapeHTML(video.category)}</span><h3>${escapeHTML(video.title)}</h3></div>
          </article>`).join('')}
      </div>
    </section>

    <section class="section" aria-labelledby="latest-video-title">
      <div class="section-heading"><h2 id="latest-video-title">Latest videos</h2><button class="text-button" data-route="videos">View all</button></div>
      <div class="video-grid">${DATA.videos.slice(0, 4).map(videoCard).join('')}</div>
    </section>

    <section class="section" aria-labelledby="popular-audio-title">
      <div class="section-heading"><h2 id="popular-audio-title">Popular audio</h2><button class="text-button" data-route="podcasts">All audio</button></div>
      <div class="audio-list">${DATA.podcasts.slice(0, 2).map(item => audioRow(item, 'podcast')).join('')}</div>
    </section>

    <section class="section" aria-labelledby="community-title">
      <div class="section-heading"><h2 id="community-title">Community discussions</h2><button class="text-button" data-route="community">Join in</button></div>
      <div class="horizontal-scroll">${allPosts().slice(0, 3).map(post => `<article class="card card-interactive discussion-mini" data-action="open-post" data-id="${post.id}" tabindex="0" role="button"><span class="category-pill">${escapeHTML(post.category)}</span><h3>${escapeHTML(post.topic)}</h3><p>${escapeHTML(post.text)}</p></article>`).join('')}</div>
    </section>

    <section class="section" aria-labelledby="continue-title">
      <div class="section-heading"><h2 id="continue-title">Continue listening</h2></div>
      ${audioRow(recentItem, recentAudio?.type || 'podcast')}
    </section>
    ${footerNote()}
  `);
}

function renderLive() {
  const saved = state.saved.has('live-show');
  setScreen(`
    <div class="page-heading"><div><p class="eyebrow">MWANDA TV</p><h1>Live television</h1><p>Authorised demo media only.</p></div><span class="live-pill">Live</span></div>
    <section class="media-player-wrap" aria-label="Mwanda demo live player">
      <video id="live-video" controls playsinline preload="metadata" poster="assets/images/hero-live.svg">
        <source src="assets/video/demo-broadcast.mp4" type="video/mp4">
        <track kind="captions" src="assets/video/captions-demo.vtt" srclang="en" label="English demo captions" default>
        Your browser does not support HTML5 video.
      </video>
    </section>
    <section class="media-info">
      <div class="meta-row"><span class="live-pill">Live</span><span>1.2K viewers · placeholder</span></div>
      <h1>Mwanda Evening Live</h1>
      <p>A fictional programme preview for community interviews, local conversations and studio segments. This is not an official news broadcast.</p>
      <div class="action-row">
        <button class="button button-soft button-small" data-action="toggle-save" data-id="live-show">${icon(saved ? 'bookmark-filled' : 'bookmark')} ${saved ? 'Saved' : 'Favorite'}</button>
        <button class="button button-ghost button-small" data-action="share" data-title="Mwanda Evening Live">${icon('share')} Share</button>
        <button class="button button-ghost button-small" data-action="fullscreen-video">${icon('expand')} Full screen</button>
      </div>
    </section>

    <section class="section"><div class="section-heading"><h2>Programme schedule</h2><span class="caption">Demo timetable</span></div>
      <div class="schedule-list">
        ${[
          ['18:00', 'Mwanda Evening Live', 'Current programme', true],
          ['19:00', 'Community Focus', 'Local discussion concept'],
          ['20:00', 'MedonTV Highlights', 'Video showcase'],
          ['21:00', 'Weekend Sound', 'Original entertainment concept']
        ].map(item => `<article class="schedule-item"><span class="schedule-time">${item[0]}</span><div><h3>${item[1]}</h3><p>${item[2]}</p></div>${item[3] ? '<span class="status-pill">On air</span>' : icon('chevron')}</article>`).join('')}
      </div>
    </section>

    <section class="section"><div class="section-heading"><h2>Related programmes</h2><button class="text-button" data-route="videos">Open MedonTV</button></div><div class="video-grid">${DATA.videos.slice(2, 6).map(videoCard).join('')}</div></section>
    ${footerNote()}
  `);
}

function renderVideos() {
  const categories = ['All', ...new Set(DATA.videos.map(item => item.category))];
  const list = state.videoFilter === 'All' ? DATA.videos : DATA.videos.filter(item => item.category === state.videoFilter);
  const featured = DATA.videos.find(item => item.featured) || DATA.videos[0];
  setScreen(`
    <div class="page-heading"><div><p class="eyebrow">MEDONTV</p><h1>Video library</h1><p>Stories, interviews and original programme concepts.</p></div><button class="icon-button" data-route="search" aria-label="Search videos">${icon('search')}</button></div>
    <article class="card card-interactive story-card" style="min-height:230px" data-action="open-video" data-id="${featured.id}" tabindex="0" role="button">
      <img src="${featured.image}" alt="${escapeHTML(featured.title)}" style="height:230px">
      <div class="overlay"><span class="category-pill">Featured video</span><h3 style="font-size:1.35rem">${escapeHTML(featured.title)}</h3><div class="meta-row"><span>${featured.duration}</span><span>•</span><span>${featured.date}</span></div></div>
    </article>
    <section class="section"><div class="chip-row" aria-label="Video categories">${categories.map(category => `<button class="chip ${category === state.videoFilter ? 'is-active' : ''}" data-action="video-filter" data-value="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join('')}</div></section>
    <section class="section"><div class="section-heading"><h2>${state.videoFilter === 'All' ? 'Latest episodes' : escapeHTML(state.videoFilter)}</h2><span class="caption">${list.length} videos</span></div><div class="video-grid">${list.map(videoCard).join('')}</div></section>
    ${footerNote()}
  `);
}

function renderVideoDetail() {
  const video = DATA.videos.find(item => item.id === state.activeVideoId) || DATA.videos[0];
  const saved = state.saved.has(video.id);
  addHistory('video', video.id, video.title);
  setScreen(`
    <div class="page-heading"><div>${backButton('videos')}</div><span class="demo-pill">Demo video</span></div>
    <section class="media-player-wrap">
      <video id="detail-video" controls playsinline preload="metadata" poster="${video.image}">
        <source src="assets/video/demo-broadcast.mp4" type="video/mp4">
        <track kind="captions" src="assets/video/captions-demo.vtt" srclang="en" label="English demo captions" default>
      </video>
    </section>
    <section class="media-info">
      <div class="meta-row"><span>${escapeHTML(video.category)}</span><span>•</span><span>${video.duration}</span><span>•</span><span>${video.date}</span></div>
      <h1>${escapeHTML(video.title)}</h1>
      <p>${escapeHTML(video.description)}</p>
      <div class="action-row">
        <button class="button button-soft button-small" data-action="toggle-save" data-id="${video.id}">${icon(saved ? 'bookmark-filled' : 'bookmark')} ${saved ? 'Saved' : 'Save video'}</button>
        <button class="button button-ghost button-small" data-action="share" data-title="${escapeHTML(video.title)}">${icon('share')} Share</button>
        <button class="button button-ghost button-small" data-action="fullscreen-video">${icon('expand')} Full screen</button>
      </div>
    </section>
    <section class="section"><div class="section-heading"><h2>More from MedonTV</h2></div><div class="video-grid">${DATA.videos.filter(item => item.id !== video.id).slice(0, 4).map(videoCard).join('')}</div></section>
    ${footerNote()}
  `);
}

function renderAudioPlayer(item, type) {
  const isCurrent = state.audio && state.audio.type === type && state.audio.id === item.id;
  const isPlaying = isCurrent && !els.audio.paused;
  const current = isCurrent ? els.audio.currentTime : 0;
  const duration = isCurrent && Number.isFinite(els.audio.duration) ? els.audio.duration : 0;
  const saved = state.saved.has(item.id);
  const subtitle = type === 'radio' ? `${item.presenter} · ${item.schedule}` : item.hosts;
  return `
    <section class="card audio-player-card">
      <span class="demo-pill">Demo audio</span>
      <img class="audio-player-art" src="${item.image}" alt="${escapeHTML(item.title)} artwork">
      <h1>${escapeHTML(item.title)}</h1>
      <p class="player-subtitle">${escapeHTML(subtitle)}</p>
      <div class="progress-wrap">
        <input id="audio-progress" class="progress-range" type="range" min="0" max="${duration || 100}" value="${current}" step="0.1" aria-label="Audio progress">
        <div class="time-row"><span id="audio-current-time">${formatTime(current)}</span><span id="audio-duration">${duration ? formatTime(duration) : type === 'podcast' ? item.duration : 'Demo'}</span></div>
      </div>
      <div class="player-controls">
        <button class="icon-button" data-action="rewind-audio" aria-label="Rewind 10 seconds">−10</button>
        <button class="icon-button main-play-button" data-action="play-audio" data-type="${type}" data-id="${item.id}" aria-label="${isPlaying ? 'Pause' : 'Play'}">${icon(isPlaying ? 'pause' : 'play')}</button>
        <button class="icon-button" data-action="forward-audio" aria-label="Forward 10 seconds">+10</button>
      </div>
      <div class="volume-wrap">${icon('volume')}<input id="audio-volume" class="volume-range" type="range" min="0" max="1" value="${els.audio.volume}" step="0.05" aria-label="Volume"></div>
      <div class="action-row" style="justify-content:center">
        <button class="button button-soft button-small" data-action="toggle-save" data-id="${item.id}">${icon(saved ? 'bookmark-filled' : 'bookmark')} ${saved ? 'Saved' : 'Save'}</button>
        <button class="button button-ghost button-small" data-action="share" data-title="${escapeHTML(item.title)}">${icon('share')} Share</button>
      </div>
    </section>`;
}

function renderRadio() {
  const active = DATA.radioPrograms.find(item => item.id === state.activeRadioId) || DATA.radioPrograms[0];
  setScreen(`
    <div class="page-heading"><div><p class="eyebrow">FM MWANDA</p><h1>Radio</h1><p>Live-style local audio experience.</p></div><span class="live-pill">Demo live</span></div>
    ${renderAudioPlayer(active, 'radio')}
    <section class="section"><div class="section-heading"><h2>Current programme</h2></div><article class="card card-content"><span class="category-pill">${escapeHTML(active.category)}</span><h3 style="margin-top:12px">${escapeHTML(active.title)}</h3><p style="line-height:1.6">${escapeHTML(active.description)}</p><div class="player-meta-grid"><div class="player-meta-box"><span>Presenter</span><strong>${escapeHTML(active.presenter)}</strong></div><div class="player-meta-box"><span>Schedule</span><strong>${escapeHTML(active.schedule)}</strong></div></div></article></section>
    <section class="section"><div class="section-heading"><h2>Show schedule</h2><span class="caption">Demo schedule</span></div><div class="schedule-list">${DATA.radioPrograms.map(item => `<article class="schedule-item card-interactive" data-action="select-radio" data-id="${item.id}" tabindex="0" role="button"><span class="schedule-time">${escapeHTML(item.schedule.split('·').pop().trim())}</span><div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.presenter)}</p></div>${item.id === active.id ? '<span class="status-pill">Selected</span>' : icon('chevron')}</article>`).join('')}</div></section>
    <section class="section"><div class="section-heading"><h2>Recent shows</h2></div><div class="audio-list">${DATA.radioPrograms.map(item => audioRow(item, 'radio')).join('')}</div></section>
    ${footerNote()}
  `);
}

function renderPodcasts() {
  const featured = DATA.podcasts[0];
  setScreen(`
    <div class="page-heading"><div><p class="eyebrow">MWANDA PODCASTS</p><h1>Listen deeper</h1><p>Original voices, work stories and daily life.</p></div><button class="icon-button" data-route="search" aria-label="Search podcasts">${icon('search')}</button></div>
    <article class="card" style="background:linear-gradient(145deg,#6b4632,#181a1c 62%)">
      <img src="${featured.image}" alt="Life on the Road podcast cover" style="width:100%;aspect-ratio:16/10;object-fit:cover">
      <div class="card-content" style="padding:18px"><span class="category-pill">Featured podcast</span><h2 style="font-size:1.65rem;margin:12px 0 6px;letter-spacing:-.04em">Life on the Road</h2><p style="line-height:1.55">Kinyemi Hassan and Silaji Hassan discuss driver experiences, roads, work, responsibility and daily life.</p><div class="meta-row"><span>Kinyemi Hassan</span><span>•</span><span>Silaji Hassan</span></div><div class="action-row"><button class="button button-primary button-small" data-action="play-audio" data-type="podcast" data-id="p1">${icon('play')} Play latest</button><button class="button button-ghost button-small" data-action="open-podcast" data-id="p1">Episode details</button></div></div>
    </article>
    <section class="section"><div class="section-heading"><h2>Life on the Road episodes</h2><span class="caption">5 demo episodes</span></div><div class="audio-list">${DATA.podcasts.map(item => audioRow(item, 'podcast')).join('')}</div></section>
    ${footerNote()}
  `);
}

function renderPodcastDetail() {
  const episode = DATA.podcasts.find(item => item.id === state.activePodcastId) || DATA.podcasts[0];
  addHistory('podcast', episode.id, episode.title);
  setScreen(`
    <div class="page-heading"><div>${backButton('podcasts')}</div><span class="demo-pill">Life on the Road</span></div>
    ${renderAudioPlayer(episode, 'podcast')}
    <section class="section"><div class="section-heading"><h2>Episode details</h2></div><article class="card card-content"><p class="eyebrow">${escapeHTML(episode.show)}</p><h2 style="margin:10px 0 8px;line-height:1.2">${escapeHTML(episode.title)}</h2><div class="meta-row"><span>${escapeHTML(episode.hosts)}</span><span>•</span><span>${episode.duration}</span><span>•</span><span>${episode.date}</span></div><p style="line-height:1.65">${escapeHTML(episode.description)}</p><div class="action-row"><button class="button button-ghost button-small" data-action="download-placeholder">${icon('download')} Download</button><button class="button button-ghost button-small" data-action="share" data-title="${escapeHTML(episode.title)}">${icon('share')} Share</button></div></article></section>
    <section class="section"><div class="section-heading"><h2>Transcript</h2><span class="caption">Accessibility placeholder</span></div><div class="transcript">${escapeHTML(episode.transcript)}</div></section>
    <section class="section"><div class="section-heading"><h2>More episodes</h2></div><div class="audio-list">${DATA.podcasts.filter(item => item.id !== episode.id).slice(0, 3).map(item => audioRow(item, 'podcast')).join('')}</div></section>
    ${footerNote()}
  `);
}
