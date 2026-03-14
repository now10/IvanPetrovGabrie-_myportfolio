// ==================== GAMES DATA ====================
// All playable game data - easy to update URLs here
const REPLIT_URL = 'https://0908e881-5d9e-4d43-9f2b-804fdb26c5f2-00-1k70vj9b28rqi.picard.replit.dev/';
const DRIVING_URL = 'https://d89752c8-c350-4b63-a89a-79ad61e7f000-00-23ouew19ry8y5.riker.replit.dev/';

const games = [
    {
        id: 'match3-adventure',
        title: 'Match-3 Adventure',
        category: 'Match-3',
        platform: 'iOS • Android',
        image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Puzzle match-3 with 1M+ downloads'
    },
    {
        id: 'driving-stimulation',
        title: 'Extreme Car Driving Simulator',
        category: 'Simulation',
        platform: 'WebGL • 3D',
        image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: DRIVING_URL,
        description: '3D open-world driving with realistic physics, AI traffic, and 4 camera angles'
    },
    {
        id: 'word-mosaic',
        title: 'Word Mosaic',
        category: 'Word',
        platform: 'iOS Featured',
        image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Crossword puzzle game'
    },
    {
        id: 'sort-it-out',
        title: 'Sort It Out!',
        category: 'Sorting',
        platform: 'iOS • Android',
        image: 'https://images.pexels.com/photos/7654125/pexels-photo-7654125.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Casual sorting puzzle'
    },
    {
        id: 'puzzle-quest',
        title: 'Puzzle Quest',
        category: 'Match-3',
        platform: 'iOS Exclusive',
        image: 'https://images.pexels.com/photos/1192545/pexels-photo-1192545.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Hybrid-casual match-3'
    },
    {
        id: 'word-connect',
        title: 'Word Connect',
        category: 'Word',
        platform: 'Android',
        image: 'https://images.pexels.com/photos/3112666/pexels-photo-3112666.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Daily word puzzle'
    },
    {
        id: 'block-blast',
        title: 'Block Blast',
        category: 'Block Puzzle',
        platform: 'iOS • Android',
        image: 'https://images.pexels.com/photos/4065892/pexels-photo-4065892.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Classic block puzzle'
    },
    {
        id: 'sort-master',
        title: 'Sort Master',
        category: 'Sorting',
        platform: 'iOS',
        image: 'https://images.pexels.com/photos/7654125/pexels-photo-7654125.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Advanced sorting mechanics'
    },
    {
        id: 'word-search-pro',
        title: 'Word Search Pro',
        category: 'Word',
        platform: 'iOS • Android',
        image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: '500+ levels'
    },
    {
        id: 'match-3-journey',
        title: 'Match-3 Journey',
        category: 'Match-3',
        platform: 'iOS',
        image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Story-driven puzzle'
    },
    {
        id: 'tile-master',
        title: 'Tile Master',
        category: 'Block Puzzle',
        platform: 'Android',
        image: 'https://images.pexels.com/photos/4065892/pexels-photo-4065892.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Relaxing block puzzle'
    },
    {
        id: 'word-cross',
        title: 'Word Cross',
        category: 'Word',
        platform: 'iOS Featured',
        image: 'https://images.pexels.com/photos/3112666/pexels-photo-3112666.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Crossword puzzles'
    },
    {
        id: 'sort-challenge',
        title: 'Sort Challenge',
        category: 'Sorting',
        platform: 'iOS • Android',
        image: 'https://images.pexels.com/photos/7654125/pexels-photo-7654125.jpeg?auto=compress&cs=tinysrgb&w=600',
        webglUrl: REPLIT_URL,
        description: 'Fast-paced sorting'
    }
];

// ==================== MEDIA GALLERY DATA ====================
// 8 Images
const galleryImages = [
    { src: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Match-3 Adventure Gameplay', category: 'Match-3' },
    { src: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Extreme Car Driving - Open World', category: 'Simulation' },
    { src: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Word Mosaic Level Design', category: 'Word' },
    { src: 'https://images.pexels.com/photos/7654125/pexels-photo-7654125.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Sort It Out! Interface', category: 'Sorting' },
    { src: 'https://images.pexels.com/photos/1192545/pexels-photo-1192545.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Puzzle Quest Power-ups', category: 'Match-3' },
    { src: 'https://images.pexels.com/photos/3112666/pexels-photo-3112666.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Word Connect Daily Challenge', category: 'Word' },
    { src: 'https://images.pexels.com/photos/4065892/pexels-photo-4065892.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Block Blast Effects', category: 'Block' },
    { src: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Sort Master UI Design', category: 'Sorting' }
];

// 4 Videos - replace with your actual video URLs
const galleryVideos = [
    { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', poster: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Match-3 Adventure - Gameplay Trailer', duration: '0:32' },
    { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', poster: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Extreme Car Driving - Open World Gameplay', duration: '0:45' },
    { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', poster: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Word Mosaic - Level Progression', duration: '0:28' },
    { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', poster: 'https://images.pexels.com/photos/1192545/pexels-photo-1192545.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Puzzle Quest - Boss Level', duration: '0:51' }
];