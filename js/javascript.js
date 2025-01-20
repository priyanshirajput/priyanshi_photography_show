const ApiKey = "44062922-cd468afa0b651c957755954fe";

async function getPhotos() {
    const queries = ["popular", "trend", "white", "hut"];
    const listContainers = [
        document.getElementsByClassName("box")[0],
        document.getElementsByClassName("box")[1],
        document.getElementsByClassName("box")[2],
        document.getElementsByClassName("box")[3],
    ];

    try {
        // Perform all fetch calls in parallel
        const responses = await Promise.all(
            queries.map(query =>
                fetch(`https://pixabay.com/api/?key=${ApiKey}&q=${query}&image_type=photo&pretty=true&per_page=6&editors_choice=true`)
            )
        );

        // Parse all responses in parallel
        const dataArr = await Promise.all(responses.map(response => response.json()));

        // Clear and populate galleries
        dataArr.forEach((data, index) => {
            const fragment = document.createDocumentFragment(); // Create a fragment for efficient DOM manipulation

            data.hits.forEach(image => {
                const img = document.createElement("img");
                img.src = image.largeImageURL;
                img.alt = image.tags;
                img.addEventListener("click", () => {
                    window.open(image.largeImageURL, "_blank");
                });
                fragment.appendChild(img);
            });

            // Clear the container and append the new images
            listContainers[index].innerHTML = ""; // Clear previous content
            listContainers[index].appendChild(fragment);
        });
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

getPhotos();

const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById("searchBar");

// Fetch images when the search button is clicked
searchButton.addEventListener("click", (e) => {
    const inputValue = searchBar.value.trim();
    if (inputValue) {
        getPhotos(inputValue);
        window.location.href = `gallery.html?search=${encodeURIComponent(inputValue)}`;
    } else {
        alert("Please enter a search term.");
    }
});
getPhotos("");


// back to top 

const scroll_Y = document.getElementById("scrollY");

window.onscroll = () => {
    if(window.scrollY > 0){
        scroll_Y.style.display = "block";
    }else{
        scroll_Y.style.display = "none";
    }
}


// slider 

async function fetchImages() {
    const response = await fetch(`https://pixabay.com/api/?key=${ApiKey}&image_type=photo&pretty=true&per_page=50`);
    const data = await response.json();
    return data.hits.map(image =>  image.largeImageURL);
}

// Function to change the image on the slider
async function startSlider() {
    const images = await fetchImages();
    let currentIndex = 0;
    
    // Get the image element
    const sliderImage = document.getElementById('sliderImage');
    
    // Set the first image
    sliderImage.src = images[currentIndex];

    // Change the image every 6 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        sliderImage.src = images[currentIndex];
    },5000); // 6000ms = 6 seconds
}

// Start the image slider
startSlider();
