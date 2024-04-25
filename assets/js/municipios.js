window.onload = async () => {
    const queryString = new URLSearchParams(document.location.search);
    const listElement = document.querySelector('#cities-list');

    for (const [key, value] of queryString) {
        if (key === 'id') {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`);
            const cities = await response.json();
            console.log(cities)
            cities.forEach(insertCityInList);
        }

        if (key === 'uf') {
            const titleString = "Municípios de " + value;
            document.title = titleString;
            const headerTitleElement = document.querySelector('#header-title');
            headerTitleElement.textContent = titleString;
        }
    }

    function insertCityInList(city) {
        const itemElement = document.createElement('li');
        const spanElement = createSpanElement(city.nome);
        const buttonElement = createButtonElement(city.id, city.nome);

        itemElement.appendChild(spanElement);
        itemElement.appendChild(buttonElement);
        listElement.appendChild(itemElement);
    }

    function createButtonElement(cityId, cityName) {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'Favoritar';
        buttonElement.classList.add('button-favorite-city');
        buttonElement.type = 'submit';
        buttonElement.addEventListener('click', addCityToFavorites);
        buttonElement.dataset.cityId = cityId;
        buttonElement.dataset.cityName = cityName;
        return buttonElement;
    }

    function createSpanElement(cityName) {
        const spanElement = document.createElement('span');
        spanElement.textContent = cityName;
        return spanElement;
    }

    function addCityToFavorites(event) {
        const cityId = event.target.dataset.cityId;
        const cityName = event.target.dataset.cityName;
        const favoriteCities = getFavoriteCitiesFromLocalStorage();

        if (!favoriteCities.some(city => city.id == cityId)) {
            favoriteCities.push({ id: cityId, name: cityName });
        }

        updateFavoriteCitiesFromLocalStorage(favoriteCities);
    }

    function getFavoriteCitiesFromLocalStorage() {
        const favoriteItem = localStorage.getItem('favoritos');
        let favoriteCities = [];

        if (favoriteItem !== null) {
            favoriteCities = JSON.parse(favoriteItem);
        }
        return favoriteCities;
    }

    function updateFavoriteCitiesFromLocalStorage(favorites) {
        const favoritesString = JSON.stringify(favorites);
        localStorage.setItem('favoritos', favoritesString);
    }
}