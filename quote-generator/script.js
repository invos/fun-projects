const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const error = document.getElementById('error');

const MAX_FETCH_TRIES = 3;
let noOfFetchTries = 0;

function showLoader() {
  loader.style.display = 'block';
  quoteContainer.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
  quoteContainer.style.display = 'block';
}

function showError(message) {
  error.innerText = message;
  error.style.display = 'block';
}

async function getQuote() {
  if (++noOfFetchTries > MAX_FETCH_TRIES) {
    const errorMessage = 'Network error, Please try again later.';
    showError(errorMessage);
    throw Error(errorMessage);
  }
  showLoader();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    authorText.innerText = data.quoteAuthor || 'Unknown';
    if (data.quoteText.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    noOfFetchTries = 0;
    hideLoader();
  } catch(error) {
    getQuote();
    console.log(error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// on load
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
getQuote();