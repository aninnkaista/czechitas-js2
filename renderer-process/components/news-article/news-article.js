// each news article into separate div
// export class to main.js
export class NewsArticle {
    constructor(newsContents) {
        this.newsContents = newsContents;
    }
    createDivForNews() {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('news-article');
        // to make background as newsarticle
        newsArticle.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), transparent), url(${this.newsContents.image})`;

        const title = document.createElement('span');
        title.classList.add('news-article__title');
        title.innerHTML = this.newsContents.title;
        newsArticle.appendChild(title);
        return newsArticle;
    }
}