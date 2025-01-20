const ApiKey = "44062922-cd468afa0b651c957755954fe";
async function getPhotos(value) {

    const listContainers = document.getElementById("minibox");
    // Clear previous images before appending new ones
    listContainers.innerHTML = "";

    try {
        const response = await fetch(`https://pixabay.com/api/?key=${ApiKey}&q=${value}&image_type=all&pretty=true&per_page=75`);
        const data = await response.json();

        if (data.hits.length === 0) {
            listContainers.textContent = "No results found.";
            return;
        }

        data.hits.forEach(image => {
            const img = document.createElement("img");
            img.src = image.webformatURL;
            img.alt = image.tags;
            img.loading = "lazy";
            img.addEventListener("click", () => {
                window.open(image.largeImageURL, "_blank");
            });
            listContainers.appendChild(img);
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        listContainers.textContent = "An error occurred while fetching images. Please try again.";
        listContainers.style.color = "red";
        listContainers.style.fontWeight = "bold";
        listContainers.style.textAlign = "center";
        listContainers.style.display = "flex";
        listContainers.style.justifyContent = "center";
        listContainers.style.alignItems = "center";
    }
}

const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById("searchBar");

// Fetch images when the search button is clicked
searchButton.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const inputValue = searchBar.value.trim();
    if (inputValue) {
        getPhotos(inputValue);
        params.get("search") !== inputValue && (window.location.href = `gallery.html?search=${encodeURIComponent(inputValue)}`);
    } else {
        alert("Please enter a search term.");
    }
});

function getSearchTerm() {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');
    searchBar.value = searchTerm;
    if (searchTerm) {
        getPhotos(searchTerm);
    } else {
        window.location.href = `index.html`
    }
}
window.onload = getSearchTerm;