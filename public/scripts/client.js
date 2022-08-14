// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
  let $gap = '<div class="gap"></div>';
  $(`#tweets-container`).append($gap);
};

const createTweetElement = function(tweet) {


  let $tweet = `
  <article class="all-tweets">
    <h1 class="tweet-title"><span><img src=${tweet.user.avatars} alt="profile"> ${tweet.user.name}
    </span><span id="handle">${tweet.user.handle}</span></h1>
    <p class="tweet-body">
      ${tweet.content.text}
    </p>
    <span id="blackLine"></span>
    <footer class="tweet-footer">
      <span>${tweet["created_at"]}</span> 
      <span>
        <object class="icons" data="./images/flag-solid.svg" width="16" height="16"> </object>
        <object class="icons" data="./images/retweet-solid.svg" width="16" height="16"> </object> 
        <object class="icons" data="./images/heart-solid.svg" width="16" height="16"></object>
      </span>
    </footer>
  </article>
  `;

  return $tweet;
};

renderTweets(data);