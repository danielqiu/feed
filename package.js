Package.describe({
  name: 'danielqiu:feed',
  summary: 'Feed reader for RSS, ATOM and Twitter streaming.',
  version: '0.0.2',
  author: "Daniel Qiu",
  git: 'https://github.com/danielqiu/feed.git'
});

/* This defines the actual package */
Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('dbeath:feedparser@0.16.6');
  api.use('mrt:twit@0.2.0');

  // Specify the source code for the package.
  api.addFiles('danielqiu:feed.js');
  api.addFiles('feed-reader/collections.js');
  api.addFiles('feed-reader/feedTypeEnum.js');
  api.addFiles('feed-reader/createFeed.js');
  api.addFiles('feed-reader/fetchFeedAtom.js');
  api.addFiles('feed-reader/fetchTweets.js');
  api.addFiles('feed-reader/processFeed.js');  
  api.addFiles('feed-reader/saveFeed.js');
  
  // Export the object 'Feed' to packages or apps that use this package.
  api.export('Feed', 'server');
});

/* This defines the tests for the package */
Package.onTest(function(api) {
  // Sets up a dependency on this package
  api.use('danielqiu:feed');

  // Allows to use the 'tinytest' framework
  api.use('tinytest', 'server');  

  // Specify the source code for the package tests
  api.addFiles('test/danielqiu:feed-tests.js');
});

/* This lets you use npm packages in your package*/
Npm.depends({
});
