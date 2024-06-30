document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    const loginButton = document.getElementById('buttonLogin');
    const profileButton = document.getElementById('profileButton');
    const userAvatar = document.getElementById('userAvatar');
    const loginText = document.getElementById('text-login');

    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(currentUser));
        if (user && user.avatar) {
            userAvatar.src = user.avatar;
            userAvatar.style.display = 'block';
            loginText.innerText = 'Deslogar';
            loginText.href = '#';
            profileButton.style.display = 'inline-block';

            loginButton.addEventListener('click', function() {
                localStorage.removeItem('currentUser');
                location.reload();
            });
        }
    } else {
        profileButton.style.display = 'none';
        userAvatar.style.display = 'none';
    }

    document.getElementById('searchButton').addEventListener('click', function() {
        const query = document.getElementById('searchInput').value;
        searchGames(query);
    });

    document.getElementById('clearButton').addEventListener('click', function() {
        document.getElementById('searchInput').value = '';
        document.getElementById('gamesList').innerHTML = '';
    });
});

function searchGames(query) {
    fetch(`https://api.rawg.io/api/games?key=9fa7ef1b92634c39ad1f407e41de0ca3&search=${query}`)
        .then(response => response.json())
        .then(data => {
            const gamesList = document.getElementById('gamesList');
            gamesList.innerHTML = '';
            data.results.forEach(game => renderGame(game));
        })
        .catch(error => console.error('Error fetching games:', error));
}

function renderGame(game) {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game-card');

    gameElement.innerHTML = `
        <h2>${game.name}</h2>
        <img src="${game.background_image}" alt="${game.name}">
        <p class="release-date">Released: ${game.released}</p>
        <p class="rating">Rating: ${game.rating}</p>
        <button onclick='saveGameToLibrary(${JSON.stringify(game)})'>Salvar na Biblioteca</button>
    `;

    document.getElementById('gamesList').appendChild(gameElement);
}

function saveGameToLibrary(game) {
    const libraryGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
    libraryGames.push({
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating
    });
    localStorage.setItem('libraryGames', JSON.stringify(libraryGames));
    alert(`${game.name} foi salvo na sua biblioteca!`);
}


document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleModeButton');
    const body = document.body;

    toggleButton.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');

        const mode = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('mode', mode);
    });

    const savedMode = localStorage.getItem('mode') || 'light';
    body.classList.add(savedMode + '-mode');
});