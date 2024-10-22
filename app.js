let energyProduction = 0;
let energyConsumption = 0;

const mapGrid = document.getElementById('mapGrid');
const productionElem = document.getElementById('production');
const consumptionElem = document.getElementById('consumption');
const recommendationElem = document.getElementById('recommendation');

const priorityMap = {
    'hospital': 5,
    'metro': 4,
    'factory': 3,
    'house': 3,
    'other': 1
};

const elements = ['Transformer', 'Energy Generator', 'Hospital', 'Metro', 'Factory', 'House', 'Storage'];

const gridCells = [];

// Create grid layout
for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('click', () => selectUnit(i));
    mapGrid.appendChild(cell);
    gridCells.push(cell);
}

// Handle unit selection and classification
function selectUnit(index) {
    const element = prompt(`Choose an element: \n${elements.join('\n')}`);
    if (!elements.includes(element)) {
        alert('Invalid element!');
        return;
    }

    const cell = gridCells[index];
    if (element === 'Energy Generator' || element === 'Storage') {
        cell.classList.add('energy-producer');
        energyProduction += 50; // Example production value
    } else {
        cell.classList.add('energy-consumer');
        energyConsumption += getConsumptionByElement(element);
    }

    updateStats();
    checkRecommendations();
}

// Fetch consumption values based on element priority
function getConsumptionByElement(element) {
    switch (element) {
        case 'Hospital': return 80;
        case 'Metro': return 50;
        case 'Factory': return 60;
        case 'House': return 20;
        default: return 10;
    }
}

// Update energy statistics
function updateStats() {
    productionElem.textContent = energyProduction;
    consumptionElem.textContent = energyConsumption;
}

// Provide industry-level recommendations based on stats
function checkRecommendations() {
    if (energyProduction > energyConsumption) {
        recommendationElem.textContent = "Production exceeds consumption. Consider reducing production or storing energy.";
    } else if (energyProduction < energyConsumption) {
        recommendationElem.textContent = "Consumption exceeds production! Consider increasing energy generation.";
    } else {
        recommendationElem.textContent = "Energy production and consumption are balanced.";
    }
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
}
