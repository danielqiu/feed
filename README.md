[![Build Status](https://travis-ci.org/danielqiu/feed.png?branch=master)](https://travis-ci.org/danielqiu/feed)

Feed
======
Feed reader is a Meteor package for reading feeds, such as RSS, ATOM and Twitter streaming.

#Usage

Install package from Meteor:
```
meteor add danielqiu:feed
```
##Collection
Feed, such as Github, Twitter, Stackoverflow, is stored in the Feeds collection. Feed entries of each feed is stored in the FeedEntries collection. Create the two collections in the /lib directory which is shared by the server and client.

```javascript
Feeds = new Meteor.Collection("feeds");
FeedEntries = new Meteor.Collection("feed_entries");
```

##Create Feed, init Feed and invoke Feed.read()
```javascript
function feedReader() {

    // pass the created collections to Feed.collections()
    var collections = {
        feeds: Feeds,
        feed_entries: FeedEntries
    }

    Feed.collections(collections);
        
    var github_feed = {
        _id: Meteor.settings.github_id,
        category: Meteor.settings.github_category,
        link: Meteor.settings.github_link,
        refresh_interval: Meteor.settings.github_refresh_interval
    };
    
    Feed.createAtomFeed(github_feed);

    var stackoverflow_feed = {
        _id: Meteor.settings.stackoverflow_id,
        category: Meteor.settings.stackoverflow_category,
        link: Meteor.settings.stackoverflow_link,
        refresh_interval: Meteor.settings.stackoverflow_refresh_interval
    };
    

    Feed.createAtomFeed(stackoverflow_feed);

    var twitter_feed = {
        _id: Meteor.settings.twitter_id,
        category: Meteor.settings.twitter_category,
        link: Meteor.settings.twitter_link,
        refresh_interval: Meteor.settings.twitter_refresh_interval
    };

    Feed.createTwitterFeed(twitter_feed);

    var twitter_parameters = {
        consumer_key: Meteor.settings.twitter_consumer_key,
        consumer_secret: Meteor.settings.twitter_consumer_secret, 
        access_token: Meteor.settings.twitter_access_token,
        access_token_secret: Meteor.settings.twitter_access_token_secret,
        screen_name: Meteor.settings.twitter_screen_name
    };

    Feed.initTwitterFeed(twitter_parameters);

    // invoke Feed.read() to get real-time reactive social stream
    Feed.read();
}
```
##Settings.json
```json
{
    "twitter_consumer_key": "Your twitter consumer key here",
    "twitter_consumer_secret": "Your twitter consumer secret here",
    "twitter_access_token": "Your twitter access token here",
    "twitter_access_token_secret": "Your twitter access token aecret here",

    "github_id": "daniel's github",
    "github_category": "Github",
    "github_link": "https://github.com/danielqiu.atom",
    "github_refresh_interval": 5000,

    "stackoverflow_id": "daniel's stackoverflow",
    "stackoverflow_category": "Stackoverflow",
    "stackoverflow_link": "http://stackoverflow.com/feeds/user/1871293",
    "stackoverflow_refresh_interval": 5000,

    "twitter_id": "daniel's Twitter",
    "twitter_category": "Twitter",
    "twitter_link": "https://twitter.com/danqiu",
    "twitter_refresh_interval": 5000,

    "twitter_screen_name": "danqiu"
}
```

##Example
Please visit [Feed-demo](https://github.com/danielqiu/feed-demo) to see the example.
