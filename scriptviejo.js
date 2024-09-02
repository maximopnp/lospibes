document.addEventListener('DOMContentLoaded', () => {
    // Reproducción automática de la música de fondo
    const audio = document.getElementById('background-music');
    audio.loop = true; // Asegúrate de que el audio se repita en bucle

    // Intenta reproducir el audio automáticamente
    audio.play().catch(error => {
        console.log('Error al intentar reproducir el audio: ', error);
    });

    // Controla la carga de la página y la preloader
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 5000);

    // Datos para el carrusel y la galería
    const images = [
        { src: '/roman.jpg', name: 'Roman', age: '20', occupation: 'El gato', instagram: 'https://www.instagram.com/roman_molin/' },
        { src: '/theo.jpeg', name: 'Theo', age: '19', occupation: 'El menor', instagram: 'https://www.instagram.com/theo.alvarengaok' },
        { src: '/alejo.jpeg', name: 'Alejo', age: '20', occupation: 'El gobernado', instagram: 'https://www.instagram.com/alejobraga_' },
        { src: '/eric.jpeg', name: 'Eric', age: '19', occupation: 'El Turro', instagram: 'https://www.instagram.com/alonsoericc_/' },
        { src: '/santi.jpeg', name: 'Santi', age: '21', occupation: '', instagram: 'https://www.instagram.com/santicuevass_/' },
        { src: '/fran.jpeg', name: 'Franco', age: '21', occupation: '', instagram: 'https://www.instagram.com/francopiazza_/' },
        { src: '/maxi.jpeg', name: 'Maxi', age: '20', occupation: 'lolero', instagram: 'https://www.instagram.com/maximoopaz_/' },
    ];

    let currentIndex = 0;
    const carousel = document.querySelector('.carousel');
    const gallery = document.querySelector('.gallery');
    const countdownContainer = document.querySelector('.countdown-container');

    function showImage(index) {
        const img = document.createElement('img');
        img.src = images[index].src;
        img.classList.add('active');
        const desc = document.createElement('div');
        desc.classList.add('description');
        desc.innerHTML = `
            <h2>${images[index].name}</h2>
            <p>Edad: ${images[index].age}</p>
            <span>${images[index].occupation}</span>
            <a href="${images[index].instagram}" target="_blank" class="instagram-link">
                <img src="/instagram.png" alt="Instagram">
            </a>
        `;
        carousel.innerHTML = '';
        carousel.appendChild(img);
        carousel.appendChild(desc);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
        if (currentIndex === images.length - 1) {
            setTimeout(() => showGallery(), 7000);
        }
    }

    function showGallery() {
        carousel.style.display = 'none';
        gallery.innerHTML = '';
        gallery.style.display = 'flex';
        images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.name;
            img.addEventListener('click', () => {
                window.location.href = image.instagram;
            });
            gallery.appendChild(img);
        });
        showCountdown();
    }

    function showCountdown() {
        countdownContainer.style.display = 'flex';
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        const targetDate = new Date('2025-01-16T00:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    showImage(currentIndex);
    setInterval(nextImage, 7000);
});