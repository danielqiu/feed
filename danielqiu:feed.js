Feed = function(options) {};

Feed.collections = function(collections) {
    Feeds = collections.feeds;
    FeedEntries = collections.feed_entries;
}

Feed.createTwitterFeed = function(feed) {

    feed.type = FeedType.TWITTER;

    createFeed(feed);
};

Feed.createAtomFeed = function(feed) {

    feed.type = FeedType.ATOM;

    createFeed(feed);
};

Feed.createRssFeed = function(feed) {

    feed.type = FeedType.RSS;

    createFeed(feed);
};

// Variable to take values of Twitter parameters,
// such as consumer key, consumer secret, access token , access token secret
// and screen name
Twitter = {};

Feed.initTwitterFeed = function(arguments) {

    Twitter.consumer_key = arguments.consumer_key;
    Twitter.consumer_secret = arguments.consumer_secret;
    Twitter.access_token = arguments.access_token;
    Twitter.access_token_secret = arguments.access_token_secret;

    Twitter.screen_name = arguments.screen_name;
};

var refreshIntervalIds = {};

Feed.read = function() {

    console.log("Reading feed...");

    // get all the feeds details
    var feeds = Feeds.find().fetch();

    _.each(feeds, function(feed) {
        // get the refresh interval from feed setting
        // if the refresh_interval is not set, set to default 10 seconds
        var refresh_interval = feed.refresh_interval || 10000 ;

        var intervalId = Meteor.setInterval(function() {

            feed.latest_date = null;

            if (feed.type === FeedType.TWITTER) {
                fetchTweets(feed);
            } else if (feed.type === FeedType.ATOM || feed.type === FeedType.RSS) {
                fetchAtomRss(feed);
            }
        }, refresh_interval);

        refreshIntervalIds[feed._id] = intervalId;

    });

};

Feed.stopReading = function() {
    if (!_.isEmpty(refreshIntervalIds)) {
        _.each(_.values(refreshIntervalIds), function(intervalId) {
            Meteor.clearInterval(intervalId);
        });
        console.log("Stopped " + _.keys(refreshIntervalIds).length + " feeds");
    }
};
