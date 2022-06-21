import apiData from './api.json' assert { type: "json" };

const buttonContainer = document.getElementsByClassName('buttons-container')[0];
const contentContainer = document.getElementsByClassName('content')[0];

const buildList = (key) => {
    const list = document.createElement('div');

    for (let subKey in apiData[key]) {
        const property = apiData[key][subKey];
        const item = document.createElement('div');

        item.innerHTML = `
            <div class="item closed">
                <header>
                    <span class="${property.type.toLowerCase()}">${property.type}</span>
                    <h1>${subKey}</h1>
                </header>
                <div>
                    <p class="description">${property.description}</p>
                    <h2>Usage</h2>
                    <p class="usage">${property.usage}</p>
                    <h2>Return values</h2>
                    <p class="returns">${property.returns}</p>
                    <h2>Errors</h2>
                    <div class="exceptions">
                        ${property.exceptions.map(exception => `
                            <div class="exception">
                                <h3>${exception.name}</h3>
                                <p class="exception-description">Description: ${exception.description}</p>
                                <p class="exception-code">Code d'erreur: ${exception.code}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        list.appendChild(item);
    }
    contentContainer.innerHTML = '';
    contentContainer.appendChild(list);
}

let selectedCategory = 'authentication';
buildList(selectedCategory);
const buttons = [];
for (let key in apiData) {
    const button = document.createElement('button');
    button.innerText = key;
    buttons.push(button);
    buttonContainer.appendChild(button);
    button.addEventListener('click', () => {
        selectedCategory = key;
        contentContainer.innerHTML = '';
        buildList(key);
    });
}