window.onload = async () => {
    const listElement = document.querySelector('#state-list');

    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const states = await response.json();
        states.forEach(insertStateInList);
    }catch(error) {
        console.error(error);
    }

    function insertStateInList(state) {
        const anchorElement = document.createElement('a');
        anchorElement.textContent = state.nome;
        anchorElement.href = `./municipios/index.html?uf=${state.nome}&id=${state.id}`;
        const itemElement = document.createElement('li');
        itemElement.appendChild(anchorElement);
        listElement.appendChild(itemElement);
    }
}