# Mwanda Media — Mobile Web App Concept

A polished, mobile-first static media application concept for **Mwanda Media**, based in Salasala, Dar es Salaam, Tanzania.

The prototype combines:

- Television and demo live video
- MedonTV video library
- FM Mwanda and radio programmes
- Podcasts
- Masoko promotional listings
- Community discussions
- Local search, notifications, profile, saved content and history

> **Important:** Every video, audio clip, programme, discussion and marketplace listing included in this package is demo content. Replace it with authorised, reviewed Mwanda Media content before a public launch.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Local SVG, MP3 and MP4 demo assets
- No backend
- No database
- No Node server
- No paid API
- No build step

The app is ready to host as a static GitHub Pages project.

## Project structure

```text
mwanda-media/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── logo-mwanda.svg
    ├── favicon.svg
    ├── audio/
    │   ├── demo-podcast.mp3
    │   └── demo-radio.mp3
    ├── video/
    │   ├── demo-broadcast.mp4
    │   └── captions-demo.vtt
    └── images/
        ├── maasai-pattern.svg
        ├── hero-live.svg
        ├── podcast-cover.svg
        ├── radio-cover.svg
        ├── video-*.svg
        └── market-*.svg
```

## Preview locally

Because every path is relative, you can open `index.html` directly in a modern browser.

A local static server gives the most reliable media playback:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `mwanda-media`.
2. Upload all files and folders from this package to the repository root.
3. Open the repository **Settings**.
4. Select **Pages** in the left menu.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and the `/ (root)` folder.
7. Save the settings.
8. GitHub will publish the app at a URL similar to:

```text
https://YOUR-USERNAME.github.io/mwanda-media/
```

All links use relative paths, so the app works from a GitHub Pages project subdirectory.

## Replace the Mwanda logo

The supplied lion identity is included as:

```text
assets/logo-mwanda.svg
assets/favicon.svg
```

To replace it with the original master logo:

1. Export the official logo as an optimized SVG.
2. Name it `logo-mwanda.svg`.
3. Replace the existing file in `assets/`.
4. Copy the same file as `favicon.svg`, or create a separate simplified favicon.

Keep the same filenames to avoid editing the HTML, CSS or JavaScript.

A transparent PNG can also be used, but you must update every reference from:

```text
assets/logo-mwanda.svg
```

to the new filename.

## Change brand colors

Open `styles.css` and edit the variables at the beginning:

```css
:root {
  --charcoal: #111315;
  --ivory: #f7f2e8;
  --gold: #c99732;
  --red: #c93632;
  --brown: #6b4632;
  --beige: #d8b984;
  --grey: #e7e7e7;
}
```

## Replace demo videos

The demo player currently uses:

```text
assets/video/demo-broadcast.mp4
```

You can either replace that file while keeping the same filename, or edit the relevant `<source>` paths in `script.js`.

Recommended format:

- MP4
- H.264 video
- AAC audio
- Optimized for mobile
- 720p or 1080p
- Short poster-friendly clips for this prototype

Only use content owned by Mwanda Media or content for which written permission has been obtained.

### Captions

Replace:

```text
assets/video/captions-demo.vtt
```

with reviewed WebVTT captions for the official video.

## Replace demo audio

The current local placeholders are:

```text
assets/audio/demo-radio.mp3
assets/audio/demo-podcast.mp3
```

You can replace the files while keeping those filenames, or add new files and update the `audio` paths in `script.js`.

Recommended format:

- MP3
- 96–160 kbps for spoken audio
- Normalized volume
- Clear programme ownership and permission

## Add podcast episodes

Open `script.js` and find:

```js
DATA.podcasts
```

Duplicate an episode object and edit:

```js
{
  id: 'p6',
  show: 'Life on the Road',
  title: 'Episode 6 — Your title',
  hosts: 'Kinyemi Hassan & Silaji Hassan',
  duration: '30 min',
  date: '20 Jul 2026',
  description: 'Official reviewed description.',
  transcript: 'Official reviewed transcript.',
  image: 'assets/images/podcast-cover.svg',
  audio: 'assets/audio/your-episode.mp3'
}
```

Use a unique `id` for every episode.

## Add radio programmes

Open `script.js` and find:

```js
DATA.radioPrograms
```

Add a new object with a unique ID, title, presenter, schedule, category, description, image and audio path.

Example:

```js
{
  id: 'r5',
  title: 'Official Programme Name',
  presenter: 'Presenter Name',
  schedule: 'Sun · 16:00',
  category: 'Community',
  description: 'Reviewed programme description.',
  image: 'assets/images/radio-cover.svg',
  audio: 'assets/audio/official-programme.mp3'
}
```

## Edit forum categories

The category list appears in two places in `script.js`:

- `renderCommunity()`
- `openCreatePostModal()`

Keep both lists synchronized when adding or removing categories.

The current forum is only a local demonstration. User-created posts and comments are stored in `sessionStorage` and disappear when the browser session is cleared. A production community forum requires authentication, moderation, reporting, secure storage and a privacy policy.

## Edit marketplace content

Open `script.js` and find:

```js
DATA.marketItems
```

Each listing has:

- `id`
- `title`
- `category`
- `price`
- `image`
- `seller`
- `description`

Remove the **Demo listing** label only after the commercial details, seller verification and contact process are official.

## Change contact information

The current seller, WhatsApp and support actions are placeholders. Search `script.js` for:

```text
contact and WhatsApp details are placeholders
```

Replace the placeholder action with an approved link, for example:

```js
window.open('https://wa.me/255XXXXXXXXX', '_blank', 'noopener');
```

Use the official Mwanda Media phone number and verify the international Tanzania country code before publishing.

Also update the Help and Support action in the profile screen with an official email, phone number or support page.

## Replace demo content with official Mwanda media

Before launch:

1. Review every title, description, date and presenter name.
2. Replace fictional or sample programme details.
3. Replace all SVG placeholder artwork.
4. Add official videos, audio and podcast files.
5. Add accurate captions and transcripts.
6. Add official contact and WhatsApp information.
7. Add terms, privacy, moderation and commercial policies.
8. Confirm permissions for every media file.
9. Test on Android, iPhone and desktop browsers.
10. Compress media for mobile performance.

## Local data behaviour

The prototype uses `sessionStorage` for:

- Saved content
- Likes
- Search history
- Listening/viewing history
- New demo forum posts
- Local demo comments
- Notification state

No data is sent to a server.

## Accessibility

The concept includes:

- Semantic HTML
- Keyboard focus styles
- Accessible labels
- Alt text
- Responsive controls
- Captions placeholder
- Podcast transcript area
- Reduced-motion support
- Touch-friendly buttons

Official content should be reviewed again for accessibility before production release.

## Credits

**Mwanda Media** — Salasala, Dar es Salaam, Tanzania

Mobile Experience Concept by **SACKO CONCEPT**
