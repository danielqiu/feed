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

Feed.refreshIntervalHandles = {};

Feed.read = function() {

    console.log("Reading feed...");

    function fetchEntries(feed) {
        feed.latest_date = null;
        if (feed.type === FeedType.TWITTER) {
            fetchTweets(feed);
        } else if (feed.type === FeedType.ATOM || feed.type === FeedType.RSS) {
            fetchAtomRss(feed);
        }
    }

    // get all the feeds details
    var feeds = Feeds.find().fetch();

    _.each(feeds, function(feed) {

        fetchEntries(feed);

        // get the refresh interval from feed setting
        // if the refresh_interval is not set, set to default 10 seconds
        var refresh_interval = feed.refresh_interval || 10000 ;
        var intervalHandle = Meteor.setInterval(function() {
            fetchEntries(feed);
        }, refresh_interval);

        Feed.refreshIntervalHandles[feed._id] = intervalHandle;

    });

};

Feed.stopReading = function() {
    if (!_.isEmpty(Feed.refreshIntervalHandles)) {
        _.each(_.values(Feed.refreshIntervalHandles), function(intervalHandle) {
            Meteor.clearInterval(intervalHandle);
        });
        console.log(
            "Stopped " + _.keys(Feed.refreshIntervalHandles).length + " feeds"
        );
        Feed.refreshIntervalHandles = {};
    }
};
