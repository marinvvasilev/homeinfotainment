const parser = require('rss-parser');

let Feed = module.exports = function (callback) {
    let results = [];
    Feed.fetchAllNews((articles) => {
        callback(articles);
    })
}

/**
 * Contacts the dnes.bg feed and returns global portal news articles
 */
Feed.fetchAllNews = function (next) {
    parser.parseURL("http://www.dnes.bg/rss.php?today", function (err, articles) {
        if (err) {
            throw new Error(err)
        };
        // Each article has the following properties:
        // 
        //   * "title"     - The article title (String).
        //   * "author"    - The author's name (String).
        //   * "link"      - The original article link (String).
        //   * "content"   - The HTML content of the article (String).
        //   * "published" - The date that the article was published (Date).
        //   * "feed"      - {name, source, link}
        // 
        next(_createArticles(articles.feed.entries));
    });
};

/**
 * Contacts the dnes.bg feed and returns "world" news articles
 */
Feed.fetchWorldNews = function (next) {
    parser.parseURL("http://www.dnes.bg/rss.php?cat=2", function (err, articles) {
        if (err) {
            throw new Error(err);
        }
        next(_createArticles(articles.feed.entries));
    });
};

/**
 * Contacts the dnes.bg feed and returns "Business" news articles
 */
Feed.fetchBusinessNews = function (next) {
    parser.parseURL("http://www.dnes.bg/rss.php?cat=3", function (err, articles) {
        if (err) {
            throw new Error(err);
        }
        next(_createArticles(articles.feed.entries));
    });
};

/**
 * Contacts the dnes.bg feed and returns "Sports" news articles
 */
Feed.fetchBusinessNews = function (next) {
    parser.parseURL("http://www.dnes.bg/rss.php?cat=9", function (err, articles) {
        if (err) {
            throw new Error(err);
        }
        next(_createArticles(articles.feed.entries));
    });
};

/**
 * Contacts the dnes.bg feed and returns "Other" news articles
 */
Feed.fetchOtherNews = function (next) {
    parser.parseURL("http://www.dnes.bg/rss.php?cat=7", function (err, articles) {
        if (err) {
            throw new Error(err);
        }
        next(_createArticles(articles.feed.entries));
    });
};

function _createArticles(feed) {
    let articles = [];
    feed.map((item, index) => {
        articles.push({
            title: item.title,
            description: item.contentSnippet,
            link: item.link,
            image: item.enclosure.url
        });
    })
    return articles;
}
