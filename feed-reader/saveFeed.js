insertFeedEntry = function (entry, feed) {
    console.log("inserting ", entry._id);

    try {
        FeedEntries.insert(entry);
        console.log("inserted");

    } catch (e) {
        console.log("Exception: " + e);
    };

    // store the latest feed date
    console.log("typeof feed.latest_date: " + typeof feed.latest_date);
    console.log("feed.latest_date: " + feed.latest_date);
    if (typeof feed.latest_date === 'undefined' || feed.latest_date == null
        || feed.latest_date < entry.pubdate) {

        feed.latest_date = entry.pubdate;
        // update database
        console.log("updating feed of " + feed._id + " with latest_date: " + entry.pubdate);
        Feeds.update({
            _id: feed._id
        }, {
            $set: {
                last_updated: entry.pubdate,
            }
        });

        //update in-memory variable of feed
        feed.last_updated = entry.pubdate;

    }
}
