// NB DIVERSITY x ARTENA - Core Logic

const STORAGE_KEY = 'nb_diversity_clients';

const saveClient = (client) => {
    const clients = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    clients.push({ ...client, date: new Date().toLocaleString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Fluid Scroll Animations ---
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? '&times;' : '☰';
        });
    }

    // --- Registration Modal Logic ---
    const modalRegister = document.getElementById('modal-register');
    const registerForm = document.getElementById('register-form');

    if (modalRegister && !localStorage.getItem('is_registered')) {
        setTimeout(() => {
            modalRegister.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }, 2000);
    }

    const closeRegister = document.getElementById('close-register');
    if (closeRegister) {
        closeRegister.addEventListener('click', () => {
            modalRegister.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const client = Object.fromEntries(formData.entries());
            saveClient(client);
            localStorage.setItem('is_registered', 'true');
            modalRegister.style.display = 'none';
            document.body.style.overflow = '';
            alert('Bienvenue !');
        });
    }

    // --- Video Modal ---
    const btnOpenVideo = document.getElementById('btn-open-video');
    const modalVideo = document.getElementById('modal-video');
    const closeVideo = modalVideo?.querySelector('.close-modal');
    const videoElement = document.getElementById('presentation-video');

    if (btnOpenVideo && modalVideo) {
        btnOpenVideo.addEventListener('click', () => {
            modalVideo.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            videoElement?.play();
        });
    }

    const closeModalVideo = () => {
        if (modalVideo) {
            modalVideo.style.display = 'none';
            document.body.style.overflow = '';
            videoElement?.pause();
        }
    };

    closeVideo?.addEventListener('click', closeModalVideo);
    window.addEventListener('click', (e) => { if (e.target === modalVideo) closeModalVideo(); });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
