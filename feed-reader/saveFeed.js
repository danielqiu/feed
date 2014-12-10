insertFeedEntry = function (entry, feed) {
    console.log("inserting ", entry._id);

    try {
        FeedEntries.insert(entry);
        console.log("inserted");

        // store the latest feed date
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
    } catch (e) {
        console.log("Exception: " + e);
    };
}