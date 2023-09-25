const searchForm = document.querySelector('form');
const searchInput = document.getElementById('searchInput');
const container = document.querySelector('.container');
const APP_KEY = '9-rmmAKfSWdU8rK9XXGHHrMPh2ondbbnsMOXi5V4xOY'; // Replace with your API key

const backButton = document.getElementById('backButton');

backButton.addEventListener('click', () => {
 window.location.href = 'index.html'; 
   clearSearchResults();
});


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value;
    fetchAPI(searchQuery);
});

async function fetchAPI(query) {
    const baseURL = `https://api.unsplash.com/search/photos?client_id=${APP_KEY}&query=${query}`;

    try {
        const response = await fetch(baseURL);
        const data = await response.json();
        generateHTML(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function generateHTML(results) {

    container.innerHTML = ''; 
    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('item');

        const img = document.createElement('img');
        img.src = result.urls.regular;
        img.alt = result.alt_description;

        const title = document.createElement('h1');
        title.textContent = result.user.name;

        const viewBtn = document.createElement('a');
        viewBtn.href = result.links.html;
        viewBtn.target = '_blank';
        viewBtn.textContent = 'View Image';

        item.appendChild(img);
        item.appendChild(title);
        item.appendChild(viewBtn);

        container.appendChild(item);
    });
}