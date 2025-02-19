// Add hover effect for mobile devices
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        const dropdowns = document.querySelectorAll('.dropdown, .nested-dropdown');

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                e.preventDefault();
                const content = dropdown.querySelector('.dropdown-content, .nested-dropdown-content');
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });
        });
    }
});

// Navigation and scroll functionality
function scrollToLearningPaths() {
    const learningPaths = document.getElementById('learning-paths');
    learningPaths.scrollIntoView({ behavior: 'smooth' });
}

// Path cards interaction
document.querySelectorAll('.path-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });

    const exploreBtn = card.querySelector('.explore-btn');
    exploreBtn.addEventListener('click', () => {
        const path = card.dataset.path;
        alert(`Coming soon: Detailed curriculum for ${path} development!`);
    });
});

// Code playground functionality
const htmlEditor = document.getElementById('html-editor');
const cssEditor = document.getElementById('css-editor');
const jsEditor = document.getElementById('js-editor');
const outputFrame = document.getElementById('output-frame');
const consoleOutput = document.getElementById('console-output');
const consoleContent = document.getElementById('console-content');

// Default code templates
const defaultCode = {
    html: `<!-- Write your HTML here -->
<div class="container">
    <h1>Hello World!</h1>
    <button id="clickMe">Click Me!</button>
</div>`,
    css: `/* Write your CSS here */
.container {
    text-align: center;
    padding: 20px;
}

h1 {
    color: #3498db;
    transition: color 0.3s;
}

button {
    padding: 10px 20px;
    background: #2ecc71;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s;
}

button:hover {
    transform: scale(1.1);
}`,
    js: `// Write your JavaScript here
document.getElementById('clickMe').addEventListener('click', () => {
    const heading = document.querySelector('h1');
    heading.style.color = '#e74c3c';
    console.log('Button clicked!');
    console.info('Color changed to #e74c3c');
});

// Example of different console methods
console.log('Normal log message');
console.info('Info message');
console.warn('Warning message');
console.error('Error message');`
};

// Code templates
const templates = {
    button: {
        html: `<button class="fancy-button">
    <span class="button-text">Hover Me</span>
    <span class="button-icon">🚀</span>
</button>`,
        css: `.fancy-button {
    padding: 12px 24px;
    background: linear-gradient(45deg, #3498db, #2ecc71);
    border: none;
    border-radius: 25px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
}

.button-text {
    position: relative;
    z-index: 1;
}

.button-icon {
    position: absolute;
    right: -20px;
    opacity: 0;
    transition: all 0.3s;
}

.fancy-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    padding-right: 45px;
}

.fancy-button:hover .button-icon {
    right: 15px;
    opacity: 1;
}`,
        js: `// Add click animation
document.querySelector('.fancy-button').addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 100);
    console.log('Button clicked! 🚀');
});`
    },
    card: {
        html: `<div class="profile-card">
    <div class="card-header">
        <img src="https://picsum.photos/100" alt="Profile" class="profile-img">
        <h2>John Doe</h2>
        <p class="title">Full Stack Developer</p>
    </div>
    <div class="card-body">
        <div class="stats">
            <div class="stat">
                <span class="value">127</span>
                <span class="label">Projects</span>
            </div>
            <div class="stat">
                <span class="value">1.4k</span>
                <span class="label">Followers</span>
            </div>
            <div class="stat">
                <span class="value">5.2k</span>
                <span class="label">Likes</span>
            </div>
        </div>
        <button class="follow-btn">Follow</button>
    </div>
</div>`,
        css: `.profile-card {
    width: 300px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    overflow: hidden;
    text-align: center;
}

.card-header {
    background: linear-gradient(45deg, #3498db, #2ecc71);
    padding: 30px;
    color: white;
}

.profile-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid white;
    margin-bottom: 10px;
}

.title {
    color: rgba(255,255,255,0.8);
    font-size: 0.9em;
}

.card-body {
    padding: 20px;
}

.stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.stat {
    display: flex;
    flex-direction: column;
}

.value {
    font-size: 1.5em;
    font-weight: bold;
    color: #2c3e50;
}

.label {
    color: #7f8c8d;
    font-size: 0.8em;
}

.follow-btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 30px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
}

.follow-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
}`,
        js: `const followBtn = document.querySelector('.follow-btn');
let following = false;

followBtn.addEventListener('click', () => {
    following = !following;
    followBtn.textContent = following ? 'Following' : 'Follow';
    followBtn.style.background = following ? '#2ecc71' : '#3498db';
    console.log(following ? 'Started following!' : 'Unfollowed');
});

// Animate stats on hover
document.querySelectorAll('.stat').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        const value = stat.querySelector('.value');
        value.style.transform = 'scale(1.2)';
        value.style.color = '#3498db';
    });
    
    stat.addEventListener('mouseleave', () => {
        const value = stat.querySelector('.value');
        value.style.transform = '';
        value.style.color = '';
    });
});`
    }
};

// Initialize editors with default code
function initializeEditors() {
    htmlEditor.textContent = defaultCode.html;
    cssEditor.textContent = defaultCode.css;
    jsEditor.textContent = defaultCode.js;
    runCode();
}

// Handle template loading
function loadTemplate() {
    const template = document.getElementById('template-select').value;
    if (template && templates[template]) {
        htmlEditor.textContent = templates[template].html;
        cssEditor.textContent = templates[template].css;
        jsEditor.textContent = templates[template].js;
        runCode();
    }
}

// Reset individual editors
document.querySelectorAll('.reset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        const editor = document.getElementById(`${lang}-editor`);
        editor.textContent = defaultCode[lang];
        runCode();
    });
});

// Console functionality
function createCustomConsole() {
    return {
        log: (...args) => appendToConsole('log', ...args),
        info: (...args) => appendToConsole('info', ...args),
        warn: (...args) => appendToConsole('warning', ...args),
        error: (...args) => appendToConsole('error', ...args)
    };
}

function appendToConsole(type, ...args) {
    const line = document.createElement('div');
    line.className = `console-${type}`;
    line.textContent = args.join(' ');
    consoleContent.appendChild(line);
    consoleContent.scrollTop = consoleContent.scrollHeight;
}

function clearConsole() {
    consoleContent.innerHTML = '';
}

function toggleConsole() {
    consoleOutput.classList.toggle('show');
}

// Run the code
function runCode() {
    // Clear previous console output
    clearConsole();

    // Create HTML document for the iframe
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssEditor.textContent}</style>
        </head>
        <body>
            ${htmlEditor.textContent}
            <script>
                // Override console methods
                const customConsole = parent.createCustomConsole();
                console.log = customConsole.log;
                console.info = customConsole.info;
                console.warn = customConsole.warn;
                console.error = customConsole.error;
                
                try {
                    ${jsEditor.textContent}
                } catch (error) {
                    console.error('Error:', error.message);
                }
            </script>
        </body>
        </html>
    `;

    // Update iframe content
    outputFrame.srcdoc = htmlContent;
}

// Save code to localStorage
function saveCode() {
    const code = {
        html: htmlEditor.textContent,
        css: cssEditor.textContent,
        js: jsEditor.textContent
    };
    localStorage.setItem('savedCode', JSON.stringify(code));
    alert('Code saved successfully!');
}

// Share code
function shareCode() {
    const code = {
        html: htmlEditor.textContent,
        css: cssEditor.textContent,
        js: jsEditor.textContent
    };

    // Convert code to base64 to make it URL-friendly
    const codeStr = btoa(JSON.stringify(code));
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${codeStr}`;

    // Create a temporary input to copy the URL
    const input = document.createElement('input');
    input.value = shareUrl;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    alert('Share URL copied to clipboard!');
}

// Load shared code from URL if present
function loadSharedCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCode = urlParams.get('code');

    if (sharedCode) {
        try {
            const code = JSON.parse(atob(sharedCode));
            htmlEditor.textContent = code.html;
            cssEditor.textContent = code.css;
            jsEditor.textContent = code.js;
            runCode();
        } catch (error) {
            console.error('Error loading shared code:', error);
        }
    }
}

// Initialize the playground
document.addEventListener('DOMContentLoaded', () => {
    initializeEditors();
    loadSharedCode();
});

// Tips carousel functionality
const tipsCarousel = document.getElementById('tips-carousel');
const tipCards = document.querySelectorAll('.tip-card');
let currentTipIndex = 0;

function showTip(index) {
    tipCards.forEach(card => {
        card.classList.remove('active');
        card.style.transform = 'translateX(50px)';
        card.style.opacity = '0';
    });

    tipCards[index].classList.add('active');
    tipCards[index].style.transform = 'translateX(0)';
    tipCards[index].style.opacity = '1';
}

function nextTip() {
    currentTipIndex = (currentTipIndex + 1) % tipCards.length;
    showTip(currentTipIndex);
}

function prevTip() {
    currentTipIndex = (currentTipIndex - 1 + tipCards.length) % tipCards.length;
    showTip(currentTipIndex);
}

// Auto-advance tips every 5 seconds
setInterval(nextTip, 5000);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    showTip(0);
});
