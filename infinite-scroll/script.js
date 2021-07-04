// Unsplash API
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 5;
const apiKey = config?.keys?.unsplash; // get api key from https://api.unsplash.com
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach(photo => {
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    setAttributes(item, {
      'href': photo.links.html,
      'target': '_blank',
      'rel': 'noopener'
    });

    const img = document.createElement('img');
    setAttributes(img, {
      'src': photo.urls.regular,
      'alt': photo.alt_description,
      'title': photo.alt_description
    });
    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    loader.hidden = false;
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    loader.hidden = true;
  } catch (error) {
    loader.hidden = true;
    if (!apiKey) {
      imageContainer.innerText = 'API key is not provided! Please get a API key for from https://api.unsplash.com';
    }
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();