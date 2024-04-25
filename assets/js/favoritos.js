window.onload = async () => {
    const listElement = document.querySelector('#favorites-list');
    const favoriteCities = getFavoriteCitiesFromLocalStorage();

    favoriteCities.forEach(insertFavoriteCityToList);

    function getFavoriteCitiesFromLocalStorage() {
        const favoriteItem = localStorage.getItem('favoritos');
        let favoriteCities = [];

        if (favoriteItem !== null) {
            favoriteCities = JSON.parse(favoriteItem);
        }
        return favoriteCities;
    }

    function insertFavoriteCityToList(city) {
        const itemElement = document.createElement('li');
        itemElement.textContent = city.name;
        listElement.appendChild(itemElement);
    }
}