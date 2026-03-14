// ==================== GLOBAL VARIABLES ====================
let currentView = 'games'; // 'games' or 'media'

// ==================== RENDER FUNCTIONS ====================
function renderGames() {
    const grid = document.getElementById('games-grid');
    if (!grid) return;
    
    grid.innerHTML = games.map(game => {
        // Determine icon and button text based on game type
        const isDriving = game.id === 'driving-stimulation';
        const icon = isDriving ? 'fa-car' : 'fa-gamepad';
        const buttonText = isDriving ? 'Drive Now' : 'Play Demo';
        
        return `
        <div class="game-card bg-[#1e293b] rounded-xl overflow-hidden cursor-pointer relative" onclick="openGameModal('${game.id}')">
            <div class="relative h-40">
                <img src="${game.image}" alt="${game.title}" class="w-full h-full object-cover">
                <div class="play-overlay absolute inset-0 flex items-center justify-center">
                    <i class="fas ${icon} text-5xl text-[#FF6B6B]"></i>
                </div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold">${game.title}</h3>
                    <span class="text-xs bg-gray-700 px-2 py-1 rounded">${game.category}</span>
                </div>
                <p class="text-sm text-gray-400 mb-2">${game.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xs text-[#FF6B6B]">${game.platform}</span>
                    <span class="text-xs text-gray-500"><i class="fas fa-external-link-alt mr-1"></i>${buttonText}</span>
                </div>
            </div>
        </div>
    `}).join('');
}

function renderImages() {
    const grid = document.getElementById('images-grid');
    if (!grid) return;
    
    grid.innerHTML = galleryImages.map(img => `
        <div class="media-card bg-[#1e293b] rounded-lg overflow-hidden cursor-pointer" onclick="openImageModal('${img.src}')">
            <img src="${img.src}" alt="${img.title}" class="w-full h-40 object-cover">
            <div class="p-2">
                <p class="text-xs text-gray-400">${img.title}</p>
            </div>
        </div>
    `).join('');
}

function renderVideos() {
    const grid = document.getElementById('videos-grid');
    if (!grid) return;
    
    grid.innerHTML = galleryVideos.map((video, index) => `
        <div class="media-card bg-[#1e293b] rounded-lg overflow-hidden cursor-pointer video-thumb" onclick="openVideoModal(${index})">
            <div class="relative">
                <img src="${video.poster}" alt="${video.title}" class="w-full h-48 object-cover">
                <div class="play-icon"><i class="fas fa-play-circle"></i></div>
                <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">${video.duration}</span>
            </div>
            <div class="p-3">
                <p class="font-medium">${video.title}</p>
            </div>
        </div>
    `).join('');
}

// ==================== TOGGLE VIEW ====================
window.toggleView = function() {
    const toggle = document.getElementById('toggle-switch');
    const gamesSection = document.getElementById('games-section');
    const mediaSection = document.getElementById('media-section');
    const gamesOption = document.getElementById('games-option');
    const mediaOption = document.getElementById('media-option');
    
    if (!toggle || !gamesSection || !mediaSection) return;
    
    toggle.classList.toggle('active');
    
    if (currentView === 'games') {
        // Switch to media
        gamesSection.classList.add('hidden');
        mediaSection.classList.remove('hidden');
        gamesOption.classList.remove('text-white');
        gamesOption.classList.add('text-gray-400');
        mediaOption.classList.remove('text-gray-400');
        mediaOption.classList.add('text-white');
        currentView = 'media';
    } else {
        // Switch to games
        gamesSection.classList.remove('hidden');
        mediaSection.classList.add('hidden');
        gamesOption.classList.remove('text-gray-400');
        gamesOption.classList.add('text-white');
        mediaOption.classList.remove('text-white');
        mediaOption.classList.add('text-gray-400');
        currentView = 'games';
    }
};

// ==================== MODAL FUNCTIONS ====================
// Opens game in new tab (fixes Replit embedding issue)
window.openGameModal = function(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game && game.webglUrl) {
        window.open(game.webglUrl, '_blank');
    }
};

// Video modal functions
window.openVideoModal = function(index) {
    const video = galleryVideos[index];
    const videoPlayer = document.getElementById('video-player');
    const videoModal = document.getElementById('video-modal');
    const videoTitle = document.getElementById('video-title');
    
    if (!videoPlayer || !videoModal) return;
    
    const source = videoPlayer.querySelector('source');
    if (source) {
        source.src = video.src;
        videoPlayer.load();
    }
    
    if (videoTitle) videoTitle.textContent = video.title;
    videoModal.style.display = 'block';
};

window.closeVideoModal = function() {
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    
    if (videoModal) videoModal.style.display = 'none';
    if (videoPlayer) videoPlayer.pause();
};

// Image lightbox
window.openImageModal = function(src) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="background: transparent; text-align: center;">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <img src="${src}" style="max-width: 90%; max-height: 80%; margin: auto; display: block; border-radius: 8px;">
        </div>
    `;
    document.body.appendChild(modal);
};

// Close modals on outside click
window.onclick = function(event) {
    const videoModal = document.getElementById('video-modal');
    if (event.target === videoModal) {
        closeVideoModal();
    }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    renderGames();
    renderImages();
    renderVideos();
    
    // Set initial toggle state
    const gamesOption = document.getElementById('games-option');
    const mediaOption = document.getElementById('media-option');
    if (gamesOption && mediaOption) {
        gamesOption.classList.add('text-white');
        mediaOption.classList.add('text-gray-400');
    }
});