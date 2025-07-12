const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author-text");

const volume = document.getElementById("volume");
const xTwitter = document.getElementById("x-twitter");
const copy = document.getElementById("copy");

const newQuote = document.getElementById("new-quote");

const apiUrl = "https://api.quotable.io/random";

newQuote.addEventListener("click", function() {
    getQuote(apiUrl);
});

volume.addEventListener("click", readAloud);

xTwitter.addEventListener("click", tweet);

copy.addEventListener("click", copyQuote);

async function getQuote(apiUrl) {
    try {
        quoteText.textContent = "Loading...";
        quoteText.classList.add("loading");
        authorText.textContent = "";

        const response = await fetch(apiUrl);
        const data = await response.json();
        
        quoteText.classList.remove("loading");
        quoteText.textContent = data.content;
        authorText.textContent = data.author;
    } catch (error) {
        quoteText.classList.remove("loading");
        quoteText.textContent = "Failed to load quote.";
        authorText.textContent = "";
    }
}

function readAloud() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const textToSpeak = `${quote} by ${author}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);
}

function tweet() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const tweetText = `${quote} - ${author}`;

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    window.open(tweetUrl, "Tweet Window", "width=600, height=300");
}

function copyQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const fullQuote = `${quote} - ${author}`;

    navigator.clipboard.writeText(fullQuote)
        .then(() => {
            showCopyMessage();
        })
        .catch(err => {
            console.error("Failed to copy quote:", err);
        });
}

function showCopyMessage() {
    const msg = document.getElementById("copy-msg");

    msg.textContent = "Copied!";
    msg.classList.add("show");

    setTimeout(() => {
        msg.classList.remove("show");
        msg.textContent = "";
    }, 1500);
}

getQuote(apiUrl);
