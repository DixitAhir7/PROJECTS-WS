// Sidebar Toggle
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const mainContent = document.querySelector('.main-content');

// Check for saved sidebar state
const isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
if (isSidebarCollapsed) {
    sidebar.classList.add('collapsed');
}

// Toggle sidebar
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('collapsed');
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close sidebar on mobile after clicking a link
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.sidebar-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Audio Player
const modal = document.getElementById('audio-modal');
const closeModal = document.querySelector('.close-modal');
const artistCards = document.querySelectorAll('.artist-card');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const currentArtistEl = document.getElementById('current-artist');
const currentSongEl = document.getElementById('current-song');

// Sample audio data
const audioData = {
    mayabhai: {
        name: 'Mayabhai Ahir',
        songs: [
            { title: 'Song 1', url: 'path/to/song1.mp3' },
            { title: 'Song 2', url: 'path/to/song2.mp3' },
            { title: 'Song 3', url: 'path/to/song3.mp3' }
        ]
    },
    kirtidan: {
        name: 'Kirtidan Gadhvi',
        songs: [
            { title: 'Song 1', url: 'path/to/song1.mp3' },
            { title: 'Song 2', url: 'path/to/song2.mp3' },
            { title: 'Song 3', url: 'path/to/song3.mp3' }
        ]
    }
};

let currentArtist = '';
let currentSongIndex = 0;
let audio = new Audio();
let isPlaying = false;

// Open modal when clicking on artist card
artistCards.forEach(card => {
    card.addEventListener('click', () => {
        const artist = card.dataset.artist;
        currentArtist = artist;
        currentSongIndex = 0;
        updateAudioPlayer(artist);
        modal.style.display = 'block';
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    audio.pause();
    isPlaying = false;
    updatePlayButton();
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        audio.pause();
        isPlaying = false;
        updatePlayButton();
    }
});

// Audio player controls
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', playPrevious);
nextBtn.addEventListener('click', playNext);

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

function playPrevious() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = audioData[currentArtist].songs.length - 1;
    }
    updateAudioPlayer(currentArtist);
}

function playNext() {
    currentSongIndex++;
    if (currentSongIndex >= audioData[currentArtist].songs.length) {
        currentSongIndex = 0;
    }
    updateAudioPlayer(currentArtist);
}

function updateAudioPlayer(artist) {
    const song = audioData[artist].songs[currentSongIndex];
    audio.src = song.url;
    currentArtistEl.textContent = audioData[artist].name;
    currentSongEl.textContent = song.title;

    if (isPlaying) {
        audio.play();
    }
}

function updatePlayButton() {
    playBtn.innerHTML = isPlaying ?
        '<i class="fas fa-pause"></i>' :
        '<i class="fas fa-play"></i>';
}

// Audio progress bar
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature, .artist-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// About section dropdown
const aboutHeader = document.querySelector('.about-header');
const aboutContent = document.querySelector('.about-content');

aboutHeader.addEventListener('click', () => {
    aboutHeader.classList.toggle('active');
    if (aboutHeader.classList.contains('active')) {
        aboutContent.style.display = 'grid';
    } else {
        aboutContent.style.display = 'none';
    }
});

// Initially hide the content
aboutContent.style.display = 'none'; 