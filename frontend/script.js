const API_BASE_URL = 'http://localhost:3000';

// DOM Elements
const fromCitySelect = document.getElementById('fromCity');
const toCitySelect = document.getElementById('toCity');
const connectedCitySelect = document.getElementById('connectedCity');
const findRouteButton = document.getElementById('findRoute');
const addCityButton = document.getElementById('addCity');
const newCityInput = document.getElementById('newCity');
const distanceInput = document.getElementById('distance');
const resultsDiv = document.getElementById('results');
const routeDetailsDiv = document.getElementById('routeDetails');
const backgroundImage = document.getElementById('backgroundImage');
const mapLinkDiv = document.getElementById('mapLink');

// Set background image
function setBackgroundImage() {
    const imagePath = 'background.jpg'; // Change this to your image filename
    backgroundImage.style.backgroundImage = `url('${imagePath}')`;
}

// Create Google Maps route link
function createRouteLink(fromCity, toCity) {
    const encodedFrom = encodeURIComponent(`${fromCity}, Bihar, India`);
    const encodedTo = encodeURIComponent(`${toCity}, Bihar, India`);
    return `https://www.google.com/maps/dir/?api=1&origin=${encodedFrom}&destination=${encodedTo}&travelmode=driving`;
}

// Display map link
function displayMapLink(fromCity, toCity) {
    mapLinkDiv.innerHTML = `
        <a href="${createRouteLink(fromCity, toCity)}" target="_blank" 
           class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
            View Route on Google Maps
        </a>
    `;
}

// Load cities into dropdowns
async function loadCities() {
    try {
        const response = await fetch(`${API_BASE_URL}/cities`);
        const cities = await response.json();
        
        // Clear existing options
        fromCitySelect.innerHTML = '<option value="">Select starting city</option>';
        toCitySelect.innerHTML = '<option value="">Select destination city</option>';
        connectedCitySelect.innerHTML = '<option value="">Select existing city</option>';
        
        // Add cities to all dropdowns
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            
            fromCitySelect.appendChild(option.cloneNode(true));
            toCitySelect.appendChild(option.cloneNode(true));
            connectedCitySelect.appendChild(option.cloneNode(true));
        });
    } catch (error) {
        console.error('Error loading cities:', error);
        alert('Failed to load cities. Please try again.');
    }
}

// Find route
async function findRoute() {
    const from = fromCitySelect.value;
    const to = toCitySelect.value;
    const time = document.getElementById('timeOfDay').value;
    
    if (!from || !to) {
        alert('Please select both starting and destination cities');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/route?from=${from}&to=${to}&time=${time}`);
        const data = await response.json();
        
        if (response.ok) {
            displayResults(data, from, to);
        } else {
            alert(data.error || 'Failed to find route');
        }
    } catch (error) {
        console.error('Error finding route:', error);
        alert('Failed to find route. Please try again.');
    }
}

// Add new city
async function addNewCity() {
    const newCity = newCityInput.value.trim();
    const connectedCity = connectedCitySelect.value;
    const distance = parseFloat(distanceInput.value);
    
    if (!newCity || !connectedCity || isNaN(distance) || distance <= 0) {
        alert('Please fill in all fields with valid values');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/addCity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city: newCity,
                connections: [{
                    city: connectedCity,
                    distance: distance
                }]
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('City added successfully');
            newCityInput.value = '';
            distanceInput.value = '';
            loadCities(); // Reload cities to update dropdowns
        } else {
            alert(data.error || 'Failed to add city');
        }
    } catch (error) {
        console.error('Error adding city:', error);
        alert('Failed to add city. Please try again.');
    }
}

// Display route results
function displayResults(data, fromCity, toCity) {
    resultsDiv.classList.remove('hidden');
    routeDetailsDiv.innerHTML = `
        <p class="text-lg"><span class="font-semibold">Route:</span> ${data.path.join(' → ')}</p>
        <p class="text-lg"><span class="font-semibold">Total Distance:</span> ${data.distance} km</p>
        <p class="text-lg"><span class="font-semibold">Estimated Time:</span> ${data.estimatedTime.hours} hours ${data.estimatedTime.minutes} minutes</p>
    `;
    displayMapLink(fromCity, toCity);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    setBackgroundImage();
    loadCities();
});
findRouteButton.addEventListener('click', findRoute);
addCityButton.addEventListener('click', addNewCity); 