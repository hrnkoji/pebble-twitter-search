/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'twitter-search',
  body: '▲猫▶鳥▼犬.'
});

main.show();

// 猫
main.on('click', 'up', function() {
  api('猫', 'http://api-twitter.herokuapp.com/search?q=%E7%8C%AB&count=10');
});

// 鳥
main.on('click', 'select', function() {
  api('鳥', 'http://api-twitter.herokuapp.com/search?q=%E9%B3%A5&count=10');
});

// 犬
main.on('click', 'down', function() {
  api('犬', 'http://api-twitter.herokuapp.com/search?q=%E7%8A%AC&count=10');
});

function api(str, url) {
  ajax({
      url: url,
      type: 'json'
    },
    function(data) {
      // Success!
      var tweets = [];
      for(var i = 0,l = data.length; i < l; i++) {
        tweets.push({title: data[i].text});
      }
  
      var list = new UI.Menu({
        sections: [{
          title: str,
          items: tweets
        }]
      });
      list.show();
    },
    function(error) {
      // Failure!
      console.log('Failed fetching weather data: ' + error);
    }
  );
}