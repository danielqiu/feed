var Fiber = Npm.require('fibers');

processFeed = function (source, feed) {
    Fiber(function () {
        var entry = null;
        if (feed.type === FeedType.TWITTER) {
            entry = convertTweetToFeedEntry(source, feed)
        } else if (feed.type === FeedType.ATOM || feed.type === FeedType.RSS) {
            entry = convertAtomFeedToFeedEntry(source, feed);
        } else {
            return;
        }

        // Ignore old entry
        if (entry.pubdate <= feed.last_updated) {
            return;
        }

        console.log("entry.pubdate: " + entry.pubdate);
        console.log("feed.last_updated: " + feed.last_updated);
        insertFeedEntry(entry, feed);

    }).run();
}

convertTweetToFeedEntry = function (tweet, feed) {

    var tweet_date = parseTwitterDate(tweet.created_at);

    var entry = {};
    entry._id = tweet.id_str;
    entry.feed_id = feed._id;
    entry.feed_category = feed.category;
    entry.pubdate = tweet_date;
    entry.date = tweet_date;
    entry.summary = tweet.text;
    entry.title = tweet.user.name;
    entry.description = tweet.text;
    entry.author = tweet.user.name;
    entry.link = feed.link;

    return entry;
}

// convert the created_at to a date and then to a friendly string
parseTwitterDate = function (text) {
    return new Date(Date.parse(text.replace(/( +)/, ' UTC$1')));
}

convertAtomFeedToFeedEntry = function (post, feed) {
    var entry = {};

    entry._id = post.guid;
    entry.feed_id = feed._id;
    entry.feed_category = feed.category;
    entry.pubdate = post.pubdate;
    entry.date = post.date;
    entry.summary = post.summary;
    entry.title = post.title;
    entry.description = post.description;
    entry.author = post.author;
    entry.link = post.link;

    return entry;
}
