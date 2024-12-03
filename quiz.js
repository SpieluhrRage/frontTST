document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
});



const map = L.map('map').setView([51.1657, 10.4515], 4);
        
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

const festivals = [
    { name: 'Берлинале', coords: [52.5200, 13.4050], details: 'Крупнейший фестиваль в Германии' },
    { name: 'Локарно', coords: [46.1690, 8.7920], details: 'Фестиваль авторского кино в Швейцарии' },
    { name: 'Каннский фестиваль', coords: [43.5528, 7.0174], details: 'Престижный фестиваль во Франции' },
    { name: 'Московский кинофестиваль', coords: [55.7558, 37.6173], details: 'Один из старейших фестивалей в мире' },
    { name: 'Санкт-Петербургский фестиваль', coords: [59.9343, 30.3351], details: 'Современное кино и новые таланты' }
];

festivals.forEach(festival => {
    L.marker(festival.coords).addTo(map)
        .bindPopup(`<strong>${festival.name}</strong><br>${festival.details}`);
});

// Логика теста
document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const genre = document.querySelector('input[name="genre"]:checked')?.value;
    const location = document.querySelector('input[name="location"]:checked')?.value;
    const activities = document.querySelector('input[name="activities"]:checked')?.value;

    let resultText = 'Ваш фестиваль: ';

    if (genre === 'art' && location === 'city') {
        resultText += 'Берлинале';
    } else if (genre === 'indie' && location === 'nature') {
        resultText += 'Локарно';
    } else if (genre === 'blockbuster' && activities === 'screening') {
        resultText += 'Каннский фестиваль';
    } else if (location === 'city' && activities === 'masterclass') {
        resultText += 'Московский фестиваль';
    } else {
        resultText += 'Санкт-Петербургский фестиваль';
    }

    const quizResult = document.getElementById('quiz-result');
    quizResult.querySelector('p').textContent = resultText;
    quizResult.style.display = 'block';
});


