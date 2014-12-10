Tinytest.add('Feed - Test github Feed fetching', function (test) {
	
	var Feeds = new Meteor.Collection("feeds_test");
	var FeedEntries = new Meteor.Collection("feed_entries_test");

    var collections = {
        feeds: Feeds,
        feed_entries: FeedEntries
    }

    Feed.collections(collections);

    var github_feed = {
        _id: "daniel's github test",
        category: "Github",
        link: "https://github.com/danielqiu.atom",
        refresh_interval: 1000
    };

    Feed.createAtomFeed(github_feed);

    // invoke feedReader to get real-time reactive social stream
    Feed.read();

    var feed_created = Feeds.find();

    test.isNotNull(feed_created, "feed wasn't created");

    var feed_entries_created = FeedEntries.find();

    test.isNotNull(feed_entries_created, "feed entries weren't created");
});
