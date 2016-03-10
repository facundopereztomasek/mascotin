var request = require('request');
var Twitter = require('twitter');
var sparkCode = "https://api.particle.io/v1/devices/350047000f47343339383037/enviaEvento/?access_token=ELTOKEN&args=mention";
var the_tweets = [];

var the_date = new Date('Wed Mar 01 2016 10:37:47 GMT-0300 (ART)');
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});


function hayTweet() {
  request.post(sparkCode, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
    }
  })
}

setInterval(function(){
  var q = '@aerolab';
  console.log(q)
  var cantTweets = 0;
  client.get('search/tweets', {q: q}, function(error, tweets, response){
    for(var t = 0 ; t < tweets.statuses.length ; t++) {
      if(tweets.statuses[t].id in the_tweets == false){
        the_tweets[tweets.statuses[t].id] = true;
        cantTweets++;
      }
    }
    if(cantTweets) {
      hayTweet();
    }
    console.log(cantTweets + ' Nuevos Tweets');
    the_date = new Date();
  })
}, 6000)
