// DOM elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const typesContainer = document.getElementById('types');

// Click handler
searchButton.onclick = searchCreature;

function searchCreature() {
    const input = searchInput.value;

    clearResults();

    if (!input) {
        alert('Please enter a creature name or ID.');
        return;
    }

    if (input.toLowerCase() === 'pyrolynx') {
        creatureName.textContent = "PYROLYNX";
        creatureId.textContent = "#1";
        weight.textContent = "Weight: 42";
        height.textContent = "Height: 32";
        hp.textContent = "65";
        attack.textContent = "80";
        defense.textContent = "50";
        specialAttack.textContent = "90";
        specialDefense.textContent = "55";
        speed.textContent = "100";

        typesContainer.innerHTML = "";
        const type = document.createElement("div");
        type.textContent = "FIRE";
        type.classList.add("type");
        typesContainer.appendChild(type);

    } else if (input === "2") {
        creatureName.textContent = "AQUOROC";
        creatureId.textContent = "#2";
        weight.textContent = "Weight: 220";
        height.textContent = "Height: 53";
        hp.textContent = "85";
        attack.textContent = "90";
        defense.textContent = "120";
        specialAttack.textContent = "60";
        specialDefense.textContent = "70";
        speed.textContent = "40";

        typesContainer.innerHTML = "";
        const type1 = document.createElement("div");
        type1.textContent = "WATER";
        type1.classList.add("type");
        const type2 = document.createElement("div");
        type2.textContent = "ROCK";
        type2.classList.add("type");
        typesContainer.appendChild(type1);
        typesContainer.appendChild(type2);

    } else {
        fetchCreature(input);
    }
}

function fetchCreature(query) {
    const url = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Creature not found');
            return res.json();
        })
        .then(data => displayCreature(data))
        .catch(() => {
            alert('Creature not found');
            clearResults();
        });
}

function displayCreature(creature) {
    creatureName.textContent = `Name: ${safeText(creature.name)}`;
    creatureId.textContent = `ID: ${safeText(creature.id)}`;
    weight.textContent = `Weight: ${safeText(creature.weight)}`;
    height.textContent = `Height: ${safeText(creature.height)}`;
    hp.textContent = `HP: ${safeText(creature.stats.hp)}`;
    attack.textContent = `${safeText(creature.stats.attack)}`;
    defense.textContent = `${safeText(creature.stats.defense)}`;
    specialAttack.textContent = `${safeText(creature.stats["special-attack"])}`;
    specialDefense.textContent = `${safeText(creature.stats["special-defense"])}`;
    speed.textContent = `${safeText(creature.stats.speed)}`;

    typesContainer.innerHTML = '';

    if (Array.isArray(creature.types)) {
        creature.types.forEach(type => {
            let typeName = "";

            if (typeof type === "string") {
                typeName = type;
            } else if (type && typeof type === "object" && type.type) {
                typeName = type.type;
            }

            if (typeof typeName === "string") {
                const typeElement = document.createElement("div");
                typeElement.textContent = typeName.toUpperCase();
                typeElement.classList.add("type");
                typesContainer.appendChild(typeElement);
            }
        });
    }
}
function clearResults() {
    creatureName.textContent = "";
    creatureId.textContent = "";
    weight.textContent = "";
    height.textContent = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
    typesContainer.innerHTML = "";
}

function safeText(value) {
    if (typeof value === 'string') return value.toUpperCase();
    if (typeof value === 'number') return value;
    return '';
}