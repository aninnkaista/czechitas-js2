const header = document.querySelector(
    'header.header-news > div.header-news__container',
);
// carousel settings
const carouselItemCount = 3;
let carouselItemStart = 0;
let articles;

//carousel buttons
const buttonLeft = document.getElementById('carousel-button-left');
const buttonRight = document.getElementById('carousel-button-right');

//----------------------------------task 2 to limit buttons---------------------
function checkButtonVisibity(itemStart, numberTotalItems) {
    if (itemStart === 0) {
        buttonLeft.hidden = true;
    } else if (itemStart >= numberTotalItems - carouselItemCount) {
        buttonRight.hidden = true;
    } else {
        buttonLeft.hidden = false;
        buttonRight.hidden = false;
    }
}
//-----------------------------------task 2--------------------------------------

// data with get method from js server
fetch('http://localhost:3000/news.json')
    .then((serverResponse) => serverResponse.text())
    .then((responseText) => {
        const data = JSON.parse(responseText);
        articles = data.articles;
        populateNewsCarousel(data.articles, carouselItemStart);
    });

// to populate carousel with news articles
function populateNewsCarousel(news, startAt) {
    //----------------------------task 2 to empty header-------------------------
    header.innerText = '';
    //----------------------------task 2-----------------------------------------
    for (let i = startAt; i < startAt + carouselItemCount; i++) {
        // to create an element
        const newsValue = news[i];
        const newsDiv = createDivForNews(newsValue);
        header.appendChild(newsDiv);
    }
    checkButtonVisibity(startAt, news.length);
}

// each news article into separate div
function createDivForNews(newsContents) {
    const newsArticle = document.createElement('div');
    newsArticle.classList.add('news-article');
    // to make background as newsarticle
    newsArticle.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), transparent), url(${newsContents.image})`;

    const title = document.createElement('span');
    title.classList.add('news-article__title');
    title.innerHTML = newsContents.title;
    newsArticle.appendChild(title);
    return newsArticle;
}

buttonLeft.addEventListener('click', () => {
    carouselItemStart--;
    populateNewsCarousel(articles, carouselItemStart);
});
buttonRight.addEventListener('click', () => {
    carouselItemStart++;
    populateNewsCarousel(articles, carouselItemStart);
});