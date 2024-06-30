document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(localStorage.getItem(currentUser));
        if (user) {
            document.getElementById('profileAvatar').src = user.avatar;
            document.getElementById('profileUsername').innerText = user.username;
        }
    }
    
    const libraryGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
    libraryGames.forEach((game, index) => renderGame(game, index));
});

function renderGame(game, index) {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game-card');

    gameElement.innerHTML = `
        <h2>${game.name}</h2>
        <img src="${game.background_image}" alt="${game.name}">
        <p class="release-date">Released: ${game.released}</p>
        <p class="rating">Rating: ${game.rating}</p>
        <button onclick="removeGame(${index})">Excluir</button>
    `;

    document.getElementById('libraryGames').appendChild(gameElement);
}

function removeGame(index) {
    const libraryGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
    libraryGames.splice(index, 1);
    localStorage.setItem('libraryGames', JSON.stringify(libraryGames));
    location.reload(); 
}
