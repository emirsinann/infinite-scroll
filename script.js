
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let initialLoad = true;
let photosArray = [];

/* Unsplash API */
const initialCount = 5;
const picCount = 20;
const apiKey = "vOlXB1blRy7nGZ5Bg0rBLeAlJKsQsAZNICVzojZiq5w";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

/* Update API URL with new count */
function updateAPIURLWithNewCount(picCount){
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

/* Helper Function to set attributes on DOM Elements */
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

/* Check if all images were loaded */
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        initialLoad = false;
    }
}

/* Create Elements for links and photos, add to DOM */
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
    if(initialLoad){
        updateAPIURLWithNewCount(picCount);
        initialLoad = false;
    }
  } catch (error) {
    // Catch error here
  }
}

/* Check to see if scrolling near bottom of page, load more photos */
window.addEventListener("scroll", ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }

})


// On load
getPhotos();