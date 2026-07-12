'use strict';

const DATA = {
  heroSlides: [
    {
      id: 'hero-live',
      label: 'Live demo',
      title: 'Mwanda Evening Live',
      text: 'A sample television experience for local conversations, interviews and community stories.',
      image: 'assets/images/hero-live.svg',
      route: 'live',
      badge: 'LIVE'
    },
    {
      id: 'hero-road',
      label: 'Featured podcast',
      title: 'Life on the Road',
      text: 'Kinyemi Hassan and Silaji Hassan discuss driver experiences, work, roads and daily life.',
      image: 'assets/images/podcast-cover.svg',
      route: 'podcasts',
      badge: 'PODCAST'
    },
    {
      id: 'hero-market',
      label: 'Local promotions',
      title: 'Discover Masoko',
      text: 'Explore sample offers from local businesses and service providers around Dar es Salaam.',
      image: 'assets/images/video-market.svg',
      route: 'market',
      badge: 'DEMO'
    }
  ],
  videos: [
    {
      id: 'v1',
      title: 'Road Stories: A Morning in Salasala',
      category: 'Local Stories',
      duration: '08:42',
      date: '12 Jul 2026',
      image: 'assets/images/video-roads.svg',
      description: 'A fictional demo feature following the rhythm of an early morning commute in Salasala. Replace this placeholder with authorised Mwanda Media footage.',
      featured: true
    },
    {
      id: 'v2',
      title: 'Inside a Neighbourhood Market',
      category: 'Business',
      duration: '06:18',
      date: '11 Jul 2026',
      image: 'assets/images/video-market.svg',
      description: 'A sample programme concept about local trade, customer relationships and small-business creativity.'
    },
    {
      id: 'v3',
      title: 'Community Voices: Building Together',
      category: 'Community',
      duration: '12:04',
      date: '10 Jul 2026',
      image: 'assets/images/video-community.svg',
      description: 'A fictional community roundtable showing how the Mwanda platform could present respectful local conversations.'
    },
    {
      id: 'v4',
      title: 'Contemporary Culture in Dar es Salaam',
      category: 'Culture',
      duration: '09:27',
      date: '09 Jul 2026',
      image: 'assets/images/video-culture.svg',
      description: 'A demo video format focused on modern creative expression, design, music and cultural identity.'
    },
    {
      id: 'v5',
      title: 'Business Basics: Starting Small',
      category: 'Business',
      duration: '07:56',
      date: '08 Jul 2026',
      image: 'assets/images/video-business.svg',
      description: 'A sample educational episode with practical discussion prompts for entrepreneurs and local service providers.'
    },
    {
      id: 'v6',
      title: 'Weekend Sound: Studio Sessions',
      category: 'Entertainment',
      duration: '15:10',
      date: '06 Jul 2026',
      image: 'assets/images/video-music.svg',
      description: 'A fictional music programme placeholder. Only licensed or original performances should replace this demo media.'
    }
  ],
  radioPrograms: [
    {
      id: 'r1',
      title: 'Mwanda Morning Drive',
      presenter: 'Asha Mrema',
      schedule: 'Mon–Fri · 06:00',
      category: 'FM Mwanda',
      description: 'A fictional breakfast show concept with traffic conversation, local updates and positive morning energy.',
      image: 'assets/images/radio-cover.svg',
      audio: 'assets/audio/demo-radio.mp3'
    },
    {
      id: 'r2',
      title: 'Salasala Community Hour',
      presenter: 'Juma Kweka',
      schedule: 'Mon–Fri · 10:00',
      category: 'Community',
      description: 'A sample call-in format for neighbourhood initiatives, services and community discussion.',
      image: 'assets/images/video-community.svg',
      audio: 'assets/audio/demo-radio.mp3'
    },
    {
      id: 'r3',
      title: 'Biashara Today',
      presenter: 'Neema Said',
      schedule: 'Tue & Thu · 14:00',
      category: 'Business',
      description: 'A fictional radio magazine for local entrepreneurship, customer service and business lessons.',
      image: 'assets/images/video-business.svg',
      audio: 'assets/audio/demo-radio.mp3'
    },
    {
      id: 'r4',
      title: 'Mwanda Weekend Mix',
      presenter: 'Kelvin Mushi',
      schedule: 'Sat · 18:00',
      category: 'Entertainment',
      description: 'A demo entertainment programme. Replace with original or properly licensed audio before launch.',
      image: 'assets/images/video-music.svg',
      audio: 'assets/audio/demo-radio.mp3'
    }
  ],
  podcasts: [
    {
      id: 'p1',
      show: 'Life on the Road',
      title: 'Episode 1 — The First Kilometres',
      hosts: 'Kinyemi Hassan & Silaji Hassan',
      duration: '24 min',
      date: '12 Jul 2026',
      description: 'The hosts introduce the realities of road life, early starts, responsibility and the lessons drivers carry between destinations.',
      transcript: 'Demo transcript: Kinyemi and Silaji welcome listeners and describe the purpose of Life on the Road. They discuss preparation, patience and the importance of treating every journey with respect. This text is a placeholder until an official transcript is supplied.',
      image: 'assets/images/podcast-cover.svg',
      audio: 'assets/audio/demo-podcast.mp3'
    },
    {
      id: 'p2',
      show: 'Life on the Road',
      title: 'Episode 2 — Traffic, Time and Patience',
      hosts: 'Kinyemi Hassan & Silaji Hassan',
      duration: '31 min',
      date: '05 Jul 2026',
      description: 'A fictional discussion about managing pressure, delays and communication during difficult journeys.',
      transcript: 'Demo transcript placeholder. The episode explores practical ways drivers can manage time, communicate delays and protect their wellbeing during demanding days.',
      image: 'assets/images/podcast-cover.svg',
      audio: 'assets/audio/demo-podcast.mp3'
    },
    {
      id: 'p3',
      show: 'Life on the Road',
      title: 'Episode 3 — Stories from the Highway',
      hosts: 'Kinyemi Hassan & Silaji Hassan',
      duration: '27 min',
      date: '28 Jun 2026',
      description: 'Sample stories about unexpected moments, memorable passengers and the human side of transport work.',
      transcript: 'Demo transcript placeholder. No story in this concept should be treated as a factual claim about a real person or event.',
      image: 'assets/images/podcast-cover.svg',
      audio: 'assets/audio/demo-podcast.mp3'
    },
    {
      id: 'p4',
      show: 'Life on the Road',
      title: 'Episode 4 — Work, Family and Distance',
      hosts: 'Kinyemi Hassan & Silaji Hassan',
      duration: '35 min',
      date: '21 Jun 2026',
      description: 'A thoughtful sample conversation about balancing work schedules, family time and long days away from home.',
      transcript: 'Demo transcript placeholder. The hosts discuss boundaries, communication and planning from a general perspective.',
      image: 'assets/images/podcast-cover.svg',
      audio: 'assets/audio/demo-podcast.mp3'
    },
    {
      id: 'p5',
      show: 'Life on the Road',
      title: 'Episode 5 — The Road Ahead',
      hosts: 'Kinyemi Hassan & Silaji Hassan',
      duration: '29 min',
      date: '14 Jun 2026',
      description: 'A demo conversation about professional growth, changing transport technology and hopes for the future.',
      transcript: 'Demo transcript placeholder. Replace this area with a reviewed transcript when official recordings are available.',
      image: 'assets/images/podcast-cover.svg',
      audio: 'assets/audio/demo-podcast.mp3'
    }
  ],
  forumPosts: [
    {
      id: 'f1',
      name: 'Rehema M.',
      initials: 'RM',
      time: '18 min ago',
      category: 'Local News',
      topic: 'What local stories should Mwanda cover first?',
      text: 'This is a demo discussion. Share the kinds of constructive neighbourhood stories, people and initiatives you would like to see represented.',
      likes: 18,
      comments: [
        { name: 'Amani K.', text: 'Small-business stories and youth projects would be a strong start.' },
        { name: 'Joyce P.', text: 'Community services and practical local information too.' }
      ]
    },
    {
      id: 'f2',
      name: 'Baraka J.',
      initials: 'BJ',
      time: '43 min ago',
      category: 'Drivers and Transport',
      topic: 'Best ways to stay focused on long driving days',
      text: 'Drivers, what routines help you stay organised and alert? Please keep advice general and prioritise professional safety guidance.',
      likes: 34,
      comments: [{ name: 'Kassim D.', text: 'Planning rest stops before leaving makes a big difference for me.' }]
    },
    {
      id: 'f3',
      name: 'Nuru A.',
      initials: 'NA',
      time: '1 hr ago',
      category: 'Business',
      topic: 'How can local businesses tell better stories online?',
      text: 'I would love a weekly segment showing simple ways local sellers can photograph products and explain what makes their service useful.',
      likes: 27,
      comments: [{ name: 'Mariam S.', text: 'Before-and-after examples could be very helpful.' }]
    },
    {
      id: 'f4',
      name: 'Kelvin T.',
      initials: 'KT',
      time: '2 hrs ago',
      category: 'Entertainment',
      topic: 'Ideas for an original weekend culture programme',
      text: 'A studio format with new creators, short interviews and performances could give the platform a unique voice.',
      likes: 41,
      comments: [{ name: 'Zawadi B.', text: 'Including visual artists and designers would make it even broader.' }]
    },
    {
      id: 'f5',
      name: 'Sophia L.',
      initials: 'SL',
      time: '3 hrs ago',
      category: 'Community Issues',
      topic: 'A space for practical community announcements',
      text: 'Could the app include verified notices about events and local initiatives once the official editorial process is in place?',
      likes: 22,
      comments: [{ name: 'Admin Demo', text: 'That could be considered with clear verification and moderation rules.' }]
    },
    {
      id: 'f6',
      name: 'Hassan P.',
      initials: 'HP',
      time: '5 hrs ago',
      category: 'General Discussion',
      topic: 'Which Mwanda section are you most excited to use?',
      text: 'For me it is the combination of FM Mwanda and podcasts in the same simple mobile experience.',
      likes: 16,
      comments: [{ name: 'Diana N.', text: 'The community section looks promising too.' }]
    }
  ],
  marketItems: [
    {
      id: 'm1', title: 'Local Catering Showcase', category: 'Food & Events', price: 'Contact seller', image: 'assets/images/market-1.svg', seller: 'Salasala Kitchen Demo', description: 'Demo promotional listing for catering and small-event food service.'
    },
    {
      id: 'm2', title: 'Professional Driver Service', category: 'Transport', price: 'From TSh 45,000', image: 'assets/images/market-2.svg', seller: 'Safari Route Demo', description: 'Demo listing for a fictional local transport service.'
    },
    {
      id: 'm3', title: 'Brand Photography Session', category: 'Creative Services', price: 'From TSh 120,000', image: 'assets/images/market-3.svg', seller: 'Mwanga Studio Demo', description: 'Sample promotional card for a fictional photography service.'
    },
    {
      id: 'm4', title: 'Home Repair Support', category: 'Home Services', price: 'Request quote', image: 'assets/images/market-4.svg', seller: 'Jirani Fix Demo', description: 'Demo content showing how local services could be presented.'
    },
    {
      id: 'm5', title: 'Handmade Accessories', category: 'Fashion', price: 'From TSh 25,000', image: 'assets/images/market-5.svg', seller: 'Kito Craft Demo', description: 'Fictional marketplace listing for locally inspired accessories.'
    },
    {
      id: 'm6', title: 'Small Business Promotion', category: 'Advertising', price: 'Contact Mwanda', image: 'assets/images/market-6.svg', seller: 'Mwanda Media Demo', description: 'Demo promotional placement concept. Official terms and contacts must be added before launch.'
    }
  ],
  notifications: [
    { id: 'n1', type: 'live', title: 'Demo broadcast is now live', text: 'Mwanda Evening Live concept is ready to preview.', time: 'Now', read: false },
    { id: 'n2', type: 'podcast', title: 'New Life on the Road episode', text: 'Episode 1 — The First Kilometres has been added as demo content.', time: '20 min ago', read: false },
    { id: 'n3', type: 'reply', title: 'New community reply', text: 'A demo member replied to a transport discussion.', time: '1 hr ago', read: false },
    { id: 'n4', type: 'radio', title: 'FM Mwanda programme reminder', text: 'Mwanda Morning Drive starts at 06:00 in this concept schedule.', time: 'Yesterday', read: true }
  ]
};

