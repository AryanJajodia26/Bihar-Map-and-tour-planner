const API_BASE_URL = 'http://localhost:3000';

// Distance matrix for tourist cities

    const distanceMatrix = {
        'Patna': {
            'Patna': 0,
            'Rajgir-Nalanda': 90,
            'Gaya': 110,
            'Vaishali': 35,
            'East Champaran': 220,
            'West Champaran': 220,
            'Munger': 180,
            'Bhagalpur': 240,
            'Darbhanga': 140,
            'Pawapuri': 93,
            'Sitamarhi': 160
        },
        'Rajgir-Nalanda': {
            'Patna': 90,
            'Rajgir-Nalanda': 0,
            'Gaya': 70,
            'Vaishali': 120,
            'East Champaran': 300,
            'West Champaran': 300,
            'Munger': 210,
            'Bhagalpur': 270,
            'Darbhanga': 180,
            'Pawapuri': 15,
            'Sitamarhi': 200
        },
        'Gaya': {
            'Patna': 110,
            'Rajgir-Nalanda': 70,
            'Gaya': 0,
            'Vaishali': 140,
            'East Champaran': 320,
            'West Champaran': 320,
            'Munger': 230,
            'Bhagalpur': 260,
            'Darbhanga': 210,
            'Pawapuri': 60,
            'Sitamarhi': 230
        },
        'Vaishali': {
            'Patna': 35,
            'Rajgir-Nalanda': 120,
            'Gaya': 140,
            'Vaishali': 0,
            'East Champaran': 150,
            'West Champaran': 150,
            'Munger': 210,
            'Bhagalpur': 270,
            'Darbhanga': 70,
            'Pawapuri': 125,
            'Sitamarhi': 100
        },
        'East Champaran': {
            'Patna': 220,
            'Rajgir-Nalanda': 300,
            'Gaya': 320,
            'Vaishali': 150,
            'East Champaran': 0,
            'West Champaran': 50,
            'Munger': 300,
            'Bhagalpur': 350,
            'Darbhanga': 140,
            'Pawapuri': 310,
            'Sitamarhi': 130
        },
        'West Champaran': {
            'Patna': 220,
            'Rajgir-Nalanda': 300,
            'Gaya': 320,
            'Vaishali': 150,
            'East Champaran': 50,
            'West Champaran': 0,
            'Munger': 300,
            'Bhagalpur': 350,
            'Darbhanga': 160,
            'Pawapuri': 320,
            'Sitamarhi': 150
        },
        'Munger': {
            'Patna': 180,
            'Rajgir-Nalanda': 210,
            'Gaya': 230,
            'Vaishali': 210,
            'East Champaran': 300,
            'West Champaran': 300,
            'Munger': 0,
            'Bhagalpur': 60,
            'Darbhanga': 200,
            'Pawapuri': 215,
            'Sitamarhi': 220
        },
        'Bhagalpur': {
            'Patna': 240,
            'Rajgir-Nalanda': 270,
            'Gaya': 260,
            'Vaishali': 270,
            'East Champaran': 350,
            'West Champaran': 350,
            'Munger': 60,
            'Bhagalpur': 0,
            'Darbhanga': 240,
            'Pawapuri': 270,
            'Sitamarhi': 250
        },
        'Darbhanga': {
            'Patna': 140,
            'Rajgir-Nalanda': 180,
            'Gaya': 210,
            'Vaishali': 70,
            'East Champaran': 140,
            'West Champaran': 160,
            'Munger': 200,
            'Bhagalpur': 240,
            'Darbhanga': 0,
            'Pawapuri': 175,
            'Sitamarhi': 60
        },
        'Pawapuri': {
            'Patna': 93,
            'Rajgir-Nalanda': 15,
            'Gaya': 60,
            'Vaishali': 125,
            'East Champaran': 310,
            'West Champaran': 320,
            'Munger': 215,
            'Bhagalpur': 270,
            'Darbhanga': 175,
            'Pawapuri': 0,
            'Sitamarhi': 210
        },
        'Sitamarhi': {
            'Patna': 160,
            'Rajgir-Nalanda': 200,
            'Gaya': 230,
            'Vaishali': 100,
            'East Champaran': 130,
            'West Champaran': 150,
            'Munger': 220,
            'Bhagalpur': 250,
            'Darbhanga': 60,
            'Pawapuri': 210,
            'Sitamarhi': 0
        }
    };
    

// Tourist attractions for each city
const touristAttractions = {
    'Patna': ['Golghar', 'Takht Sri Patna Sahib', 'Maner Sharif'],
    'Rajgir-Nalanda': ['Nalanda University Ruins', 'Rajgir Hot Springs', 'Cyclopean Wall'],
    'Gaya': ['Mahabodhi Temple', 'Vishnupad Temple'],
    'Vaishali': ['Ashokan Pillar', 'Buddha Stupa'],
    'East Champaran': ['Kesaria Stupa'],
    'West Champaran': ['Valmiki National Park'],
    'Munger': ['Munger Fort', 'Bhimbandh Wildlife Sanctuary'],
    'Bhagalpur': ['Vikramshila University', 'Dolphin Sanctuary'],
    'Darbhanga': ['Ahilya Asthan', 'Chandradhari Museum'],
    'Pawapuri': ['Jal Mandir', 'Samosharan Mandir'],
    'Sitamarhi': ['Janki Temple', 'Haleshwar Sthan']
};


// Function to calculate time in hours based on distance
function calculateTime(distance) {
    return distance / 40; // Assuming average speed of 40 km/h
}

// Function to find nearest unvisited city
function findNearestCity(currentCity, unvisitedCities) {
    let nearestCity = null;
    let minDistance = Infinity;

    for (const city of unvisitedCities) {
        const distance = distanceMatrix[currentCity][city];
        if (distance < minDistance) {
            minDistance = distance;
            nearestCity = city;
        }
    }

    return { city: nearestCity, distance: minDistance };
}

// Function to generate tour plan
function generateTourPlan(selectedCities) {
    if (selectedCities.length === 0) return [];

    const plan = [];
    let currentCity = selectedCities[0];
    let unvisitedCities = new Set(selectedCities.slice(1));
    let day = 1;
    let dailyTravelTime = 0;
    let currentDayCities = [currentCity];
    let totalDailyDistance = 0;
    let currentDayAttractions = touristAttractions[currentCity].length;

    while (unvisitedCities.size > 0) {
        const { city: nearestCity, distance } = findNearestCity(currentCity, Array.from(unvisitedCities));
        const travelTime = calculateTime(distance);
        const nextCityAttractions = touristAttractions[nearestCity].length;

        // Check if adding this city would exceed 8 hours of travel time or 3 attractions
        if (dailyTravelTime + travelTime > 8 || currentDayAttractions + nextCityAttractions > 3) {
            plan.push({
                day,
                cities: currentDayCities,
                totalDistance: totalDailyDistance,
                totalTime: dailyTravelTime,
                attractions: currentDayAttractions
            });

            day++;
            dailyTravelTime = 0;
            totalDailyDistance = 0;
            currentDayCities = [currentCity];
            currentDayAttractions = touristAttractions[currentCity].length;
        }

        currentDayCities.push(nearestCity);
        dailyTravelTime += travelTime;
        totalDailyDistance += distance;
        currentDayAttractions += nextCityAttractions;
        currentCity = nearestCity;
        unvisitedCities.delete(nearestCity);
    }

    // Add the last day's plan
    if (currentDayCities.length > 0) {
        plan.push({
            day,
            cities: currentDayCities,
            totalDistance: totalDailyDistance,
            totalTime: dailyTravelTime,
            attractions: currentDayAttractions
        });
    }

    return plan;
}

// Function to display tour plan
function displayTourPlan(plan) {
    const planDetails = document.getElementById('planDetails');
    planDetails.innerHTML = '';

    plan.forEach(dayPlan => {
        const dayCard = document.createElement('div');
        dayCard.className = 'bg-white p-4 rounded-lg shadow-md mb-4';
        
        const dayHeader = document.createElement('h3');
        dayHeader.className = 'text-xl font-semibold mb-2';
        dayHeader.textContent = `Day ${dayPlan.day}`;
        
        const citiesList = document.createElement('ul');
        citiesList.className = 'list-disc list-inside mb-2';
        
        dayPlan.cities.forEach(city => {
            const cityItem = document.createElement('li');
            cityItem.className = 'mb-1';
            cityItem.innerHTML = `<span class="font-medium">${city}</span>`;
            
            const attractions = document.createElement('ul');
            attractions.className = 'list-none ml-4 text-sm text-gray-600';
            touristAttractions[city].forEach(attraction => {
                const attractionItem = document.createElement('li');
                attractionItem.textContent = attraction;
                attractions.appendChild(attractionItem);
            });
            
            cityItem.appendChild(attractions);
            citiesList.appendChild(cityItem);
        });

        const stats = document.createElement('div');
        stats.className = 'mt-2 text-sm text-gray-600';
        stats.innerHTML = `
            <p>Total Distance: ${dayPlan.totalDistance.toFixed(1)} km</p>
            <p>Travel Time: ${dayPlan.totalTime.toFixed(1)} hours</p>
            <p>Number of Attractions: ${dayPlan.attractions}</p>
        `;

        dayCard.appendChild(dayHeader);
        dayCard.appendChild(citiesList);
        dayCard.appendChild(stats);
        planDetails.appendChild(dayCard);
    });

    document.getElementById('tourPlan').classList.remove('hidden');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Generate Plan button click handler
    document.getElementById('generatePlan').addEventListener('click', () => {
        const selectedCities = Array.from(document.querySelectorAll('.city-checkbox:checked'))
            .map(checkbox => checkbox.value);

        if (selectedCities.length === 0) {
            alert('Please select at least one destination');
            return;
        }

        const plan = generateTourPlan(selectedCities);
        displayTourPlan(plan);
    });
}); 