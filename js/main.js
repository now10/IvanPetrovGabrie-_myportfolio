// ==================== GLOBAL VARIABLES ====================
let gameInterval;
let timeLeft = 60;
let currentGame = null;
let canvas = document.getElementById('game-canvas');
let ctx = canvas ? canvas.getContext('2d') : null;

// ==================== PROJECTS DATA ====================
const projects = [
    {
        id: 'match3-adventure',
        title: 'Match-3 Adventure',
        category: 'match3 ios',
        image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Soft-launched match-3 puzzle with 1M+ downloads. Built core systems, optimized iOS performance to 60 FPS.',
        tags: ['Unity', 'C#', 'HLSL', 'ironSource'],
        badge: 'iOS • Android'
    },
    {
        id: 'word-mosaic',
        title: 'Word Mosaic',
        category: 'word ios',
        image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Crossword/word search game featured on App Store. Reduced build size by 25% on iOS.',
        tags: ['Unity', 'uGUI', 'Firebase', 'AdMob'],
        badge: 'iOS Featured'
    },
    {
        id: 'sort-it-out',
        title: 'Sort It Out!',
        category: 'sorting',
        image: 'https://images.pexels.com/photos/7654125/pexels-photo-7654125.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Casual sorting puzzle with 500k+ downloads. Built scalable UI architecture.',
        tags: ['Unity', 'IAP', 'AppLovin'],
        badge: 'Android • iOS'
    },
    {
        id: 'puzzle-quest',
        title: 'Puzzle Quest',
        category: 'match3 ios',
        image: 'https://images.pexels.com/photos/1192545/pexels-photo-1192545.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Hybrid-casual match-3. Wrote custom HLSL shaders for iPhone 6–14 optimization.',
        tags: ['Unity', 'Metal', 'HLSL'],
        badge: 'iOS Exclusive'
    },
    {
        id: 'word-connect',
        title: 'Word Connect',
        category: 'word',
        image: 'https://images.pexels.com/photos/3112666/pexels-photo-3112666.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Daily word puzzle with A/B testing framework for retention optimization.',
        tags: ['Unity', 'AppsFlyer'],
        badge: 'Android'
    },
    {
        id: 'unannounced',
        title: 'Unannounced Title',
        category: 'sorting ios',
        image: 'https://images.pexels.com/photos/4065892/pexels-photo-4065892.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Confidential sorting puzzle. Built scalable architecture, integrated AdMob/ironSource.',
        tags: ['Unity', 'SDK'],
        badge: 'Soft Launch'
    }
];

// ==================== SKILLS DATA ====================
const skills = [
    { name: 'Unity / C#', percent: 98 },
    { name: 'iOS Optimization', percent: 95 },
    { name: 'HLSL Shaders', percent: 85 },
    { name: 'SDK Integration', percent: 90 },
    { name: 'Android Development', percent: 88 }
];

// ==================== CONTACT LINKS DATA ====================
const contactLinks = [
    { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'linkedin.com/in/ivanpetrov', url: '#' },
    { icon: 'fab fa-github', label: 'GitHub', value: 'github.com/ivanpetrov', url: '#' },
    { icon: 'fab fa-upwork', label: 'Upwork', value: 'Top Rated Plus', url: '#' },
    { icon: 'fas fa-phone-alt', label: 'Phone', value: '+1 (831) 247-0061', url: null },
    { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Remote (UTC+3)', url: null }
];

// ==================== SOCIAL LINKS ====================
const socialLinks = [
    { icon: 'fab fa-linkedin', url: '#' },
    { icon: 'fab fa-github', url: '#' },
    { icon: 'fab fa-twitter', url: '#' },
    { icon: 'fab fa-upwork', url: '#' }
];

// ==================== GAME DEFINITIONS ====================
const games = {
    'match3-adventure': {
        name: 'Match-3 Adventure',
        instruction: 'Click adjacent gems to swap and match 3 in a row. Score points before time runs out!',
        init: function() {
            this.grid = [];
            this.gems = ['🔴', '🔵', '🟢', '🟡', '🟣'];
            for (let i = 0; i < 8; i++) {
                this.grid[i] = [];
                for (let j = 0; j < 8; j++) {
                    this.grid[i][j] = Math.floor(Math.random() * 5);
                }
            }
            this.selectedGem = null;
            this.score = 0;
        },
        draw: function() {
            ctx.fillStyle = '#2d3748';
            ctx.fillRect(0, 0, 400, 600);
            
            const cellSize = 45;
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    let x = i * cellSize + 20;
                    let y = j * cellSize + 80;
                    
                    ctx.fillStyle = this.selectedGem && this.selectedGem.x === i && this.selectedGem.y === j ? '#fbbf24' : '#4a5568';
                    ctx.fillRect(x, y, cellSize-2, cellSize-2);
                    
                    ctx.font = '30px Arial';
                    ctx.fillStyle = 'white';
                    ctx.fillText(this.gems[this.grid[i][j]], x+8, y+35);
                }
            }
            
            ctx.fillStyle = 'white';
            ctx.font = '24px Inter, sans-serif';
            ctx.fillText(`Score: ${this.score}`, 20, 50);
        },
        handleClick: function(x, y) {
            const cellSize = 45;
            const gridX = Math.floor((x - 20) / cellSize);
            const gridY = Math.floor((y - 80) / cellSize);
            
            if (gridX >= 0 && gridX < 8 && gridY >= 0 && gridY < 8) {
                if (!this.selectedGem) {
                    this.selectedGem = { x: gridX, y: gridY };
                } else {
                    let dx = Math.abs(this.selectedGem.x - gridX);
                    let dy = Math.abs(this.selectedGem.y - gridY);
                    
                    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
                        let temp = this.grid[this.selectedGem.x][this.selectedGem.y];
                        this.grid[this.selectedGem.x][this.selectedGem.y] = this.grid[gridX][gridY];
                        this.grid[gridX][gridY] = temp;
                        this.score += 10;
                    }
                    this.selectedGem = null;
                }
            }
        }
    },
    
    'word-mosaic': {
        name: 'Word Mosaic',
        instruction: 'Find the hidden word by clicking letters in order. Type your guess when ready!',
        init: function() {
            this.words = ['UNITY', 'GAME', 'PUZZLE', 'CODE', 'IOS'];
            this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
            this.letters = this.currentWord.split('');
            this.found = new Array(this.letters.length).fill(false);
            this.guess = '';
            this.message = '';
        },
        draw: function() {
            ctx.fillStyle = '#2d3748';
            ctx.fillRect(0, 0, 400, 600);
            
            const tileSize = 50;
            for (let i = 0; i < this.letters.length; i++) {
                let x = i * (tileSize + 10) + 50;
                let y = 150;
                
                ctx.fillStyle = this.found[i] ? '#10b981' : '#4a5568';
                ctx.fillRect(x, y, tileSize, tileSize);
                
                ctx.fillStyle = 'white';
                ctx.font = '24px Inter, sans-serif';
                ctx.fillText(this.letters[i], x+15, y+35);
            }
            
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(50, 250, 300, 50);
            ctx.fillStyle = 'white';
            ctx.font = '20px Inter, sans-serif';
            ctx.fillText(this.guess, 60, 285);
            
            ctx.fillStyle = '#fbbf24';
            ctx.font = '16px Inter, sans-serif';
            ctx.fillText(this.message, 50, 330);
        },
        handleClick: function(x, y) {
            const tileSize = 50;
            for (let i = 0; i < this.letters.length; i++) {
                let tileX = i * (tileSize + 10) + 50;
                let tileY = 150;
                
                if (x >= tileX && x <= tileX + tileSize && y >= tileY && y <= tileY + tileSize) {
                    this.guess += this.letters[i];
                    if (this.guess.length === this.letters.length) {
                        if (this.guess === this.currentWord) {
                            this.message = '✅ Correct! +50 points';
                            timeLeft += 10;
                        } else {
                            this.message = '❌ Try again!';
                        }
                        this.guess = '';
                    }
                }
            }
        }
    },
    
    'sort-it-out': {
        name: 'Sort It Out!',
        instruction: 'Drag items to their correct bins. Sort as many as you can in 60 seconds!',
        init: function() {
            this.items = [
                { type: 'recycle', color: '#10b981', x: 100, y: 200, width: 40, height: 40 },
                { type: 'compost', color: '#f59e0b', x: 180, y: 200, width: 40, height: 40 },
                { type: 'trash', color: '#ef4444', x: 260, y: 200, width: 40, height: 40 }
            ];
            this.bins = [
                { type: 'recycle', x: 50, y: 400, width: 80, height: 80 },
                { type: 'compost', x: 160, y: 400, width: 80, height: 80 },
                { type: 'trash', x: 270, y: 400, width: 80, height: 80 }
            ];
            this.dragging = null;
            this.score = 0;
        },
        draw: function() {
            ctx.fillStyle = '#2d3748';
            ctx.fillRect(0, 0, 400, 600);
            
            this.bins.forEach(bin => {
                ctx.fillStyle = bin.type === 'recycle' ? '#10b981' : 
                               bin.type === 'compost' ? '#f59e0b' : '#ef4444';
                ctx.fillRect(bin.x, bin.y, bin.width, bin.height);
                
                ctx.fillStyle = 'white';
                ctx.font = '14px Inter, sans-serif';
                ctx.fillText(bin.type, bin.x + 10, bin.y + 45);
            });
            
            this.items.forEach(item => {
                ctx.fillStyle = item.color;
                ctx.fillRect(item.x, item.y, item.width, item.height);
            });
            
            ctx.fillStyle = 'white';
            ctx.font = '20px Inter, sans-serif';
            ctx.fillText(`Sorted: ${this.score}`, 20, 50);
        },
        handleClick: function(x, y) {
            for (let i = 0; i < this.items.length; i++) {
                let item = this.items[i];
                if (x >= item.x && x <= item.x + item.width && 
                    y >= item.y && y <= item.y + item.height) {
                    this.dragging = i;
                }
            }
        },
        handleMouseMove: function(x, y) {
            if (this.dragging !== null) {
                this.items[this.dragging].x = x - 20;
                this.items[this.dragging].y = y - 20;
            }
        },
        handleMouseUp: function(x, y) {
            if (this.dragging !== null) {
                let item = this.items[this.dragging];
                
                this.bins.forEach(bin => {
                    if (x >= bin.x && x <= bin.x + bin.width && 
                        y >= bin.y && y <= bin.y + bin.height && 
                        item.type === bin.type) {
                        this.score++;
                        item.x = 100 + Math.random() * 200;
                        item.y = 150 + Math.random() * 100;
                    }
                });
                this.dragging = null;
            }
        }
    }
};

// ==================== RENDER FUNCTIONS ====================
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    grid.innerHTML = projects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-badge">${project.badge}</span>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <button onclick="openGameModal('${project.id}')" class="project-button">
                    <i class="fas fa-play mr-2"></i>Play Demo
                </button>
            </div>
        </div>
    `).join('');
}

function renderSkillBars() {
    const container = document.getElementById('skill-bars');
    if (!container) return;
    
    container.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percent">${skill.percent}%</span>
            </div>
            <div class="skill-bar-bg">
                <div class="skill-bar-fill" style="width: ${skill.percent}%"></div>
            </div>
        </div>
    `).join('');
}

function renderContactLinks() {
    const container = document.getElementById('contact-links');
    if (!container) return;
    
    container.innerHTML = contactLinks.map(link => {
        if (link.url) {
            return `
                <a href="${link.url}" class="contact-link" target="_blank" rel="noopener">
                    <i class="${link.icon} contact-icon"></i>
                    <div class="contact-info">
                        <div class="label">${link.label}</div>
                        <div class="value">${link.value}</div>
                    </div>
                </a>
            `;
        } else {
            return `
                <div class="contact-link" style="cursor: default;">
                    <i class="${link.icon} contact-icon"></i>
                    <div class="contact-info">
                        <div class="label">${link.label}</div>
                        <div class="value">${link.value}</div>
                    </div>
                </div>
            `;
        }
    }).join('');
}

function renderSocialLinks() {
    const container = document.getElementById('social-links');
    if (!container) return;
    
    container.innerHTML = socialLinks.map(link => `
        <a href="${link.url}" class="social-link" target="_blank" rel="noopener">
            <i class="${link.icon} text-2xl"></i>
        </a>
    `).join('');
}

// ==================== GAME FUNCTIONS ====================
window.openGameModal = function(gameId) {
    currentGame = games[gameId];
    if (!currentGame) return;
    
    document.getElementById('game-title').textContent = currentGame.name;
    document.getElementById('game-instruction').textContent = currentGame.instruction;
    
    currentGame.init();
    
    timeLeft = 60;
    document.getElementById('game-timer').textContent = timeLeft + 's';
    
    document.getElementById('game-modal').style.display = 'block';
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('game-timer').textContent = timeLeft + 's';
        
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert('⏰ Time\'s up! Thanks for playing!');
            closeGameModal();
        }
    }, 1000);
    
    function gameLoop() {
        if (currentGame) {
            currentGame.draw();
            requestAnimationFrame(gameLoop);
        }
    }
    gameLoop();
};

window.closeGameModal = function() {
    document.getElementById('game-modal').style.display = 'none';
    if (gameInterval) clearInterval(gameInterval);
    currentGame = null;
};

// ==================== FILTER FUNCTIONALITY ====================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('mobile-menu')?.classList.add('hidden');
            }
        });
    });
}

// ==================== CANVAS EVENT HANDLERS ====================
function initCanvasEvents() {
    if (!canvas) return;
    
    canvas.addEventListener('click', (e) => {
        if (!currentGame) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        currentGame.handleClick(x, y);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!currentGame || !currentGame.handleMouseMove) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        currentGame.handleMouseMove(x, y);
    });

    canvas.addEventListener('mouseup', (e) => {
        if (!currentGame || !currentGame.handleMouseUp) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        currentGame.handleMouseUp(x, y);
    });
    
    window.onclick = function(event) {
        const modal = document.getElementById('game-modal');
        if (event.target === modal) {
            closeGameModal();
        }
    };
}

// ==================== EMAILJS INTEGRATION ====================
function initEmailJS() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Initialize EmailJS with your Public Key
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); // REPLACE THIS
    
    const statusDiv = document.getElementById('form-status');
    const sendBtn = document.getElementById('send-btn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';
        sendBtn.classList.remove('btn-primary');
        sendBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        
        const templateParams = {
            user_name: document.getElementById('user_name').value,
            user_email: document.getElementById('user_email').value,
            user_message: document.getElementById('user_message').value,
        };
        
        // REPLACE THESE WITH YOUR ACTUAL IDs
        emailjs.send(
            'YOUR_SERVICE_ID', // Replace with your Service ID
            'YOUR_TEMPLATE_ID', // Replace with your Template ID
            templateParams
        ).then(
            function(response) {
                console.log('SUCCESS!', response.status, response.text);
                statusDiv.innerHTML = '<p class="text-green-600">✓ Message sent successfully! I\'ll get back to you soon.</p>';
                form.reset();
                
                sendBtn.disabled = false;
                sendBtn.textContent = 'Send Message';
                sendBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
                sendBtn.classList.add('btn-primary');
                
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            },
            function(error) {
                console.log('FAILED...', error);
                statusDiv.innerHTML = '<p class="text-red-600">✗ Failed to send. Please try again or email me directly.</p>';
                
                sendBtn.disabled = false;
                sendBtn.textContent = 'Send Message';
                sendBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
                sendBtn.classList.add('btn-primary');
            }
        );
    });
}

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    renderSkillBars();
    renderContactLinks();
    renderSocialLinks();
    initFilters();
    initMobileMenu();
    initSmoothScroll();
    initCanvasEvents();
    initEmailJS(); // This will run but won't work until you add your keys
});
