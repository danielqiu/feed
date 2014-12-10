fetchTweets = function (feed) {

    var Twit = new TwitMaker({
        consumer_key: Twitter.consumer_key,
        consumer_secret: Twitter.consumer_secret,
        access_token: Twitter.access_token,
        access_token_secret: Twitter.access_token_secret
    });

    Twit.get('statuses/user_timeline', {
        screen_name: Twitter.screen_name
    }, function (err, tweets) {
        _.each(tweets, function (tweet) {
            processFeed(tweet, feed);
        })
    })
}

