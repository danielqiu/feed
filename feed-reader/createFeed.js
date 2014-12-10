createFeed = function(feed) {

    Feeds.insert(feed, function (error, result) {
        if (error) {
            //console.log("Inserting Exception: ", error);
        }
    });
};