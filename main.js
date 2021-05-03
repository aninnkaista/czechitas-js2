const header = document.querySelector('header.header-news');

//data with get method from js server
fetch('http://localhost:3000/news.json')
    .then((serverResponse) => serverResponse.text())
    .then((responseText) => {
        const data = JSON.parse(responseText);
        populateNewsCarousel(data.articles);
    });

function populateNewsCarousel(news) {
    for (let i = 0; i < news.length; i++) {
        // to create an element
        const newsValue = news[i];
        const newsDiv = createDivForNews(newsValue);
        header.appendChild(newsDiv);
    }
}

function createDivForNews(newsContent) {
    const newsArticle = document.createElement('div');
    newsArticle.innerText = newsContent.title;
    return newsArticle;
}