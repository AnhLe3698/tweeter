// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
  let $gap = '<div class="gap"></div>';
  $(`#tweets-container`).append($gap);
};

// Safety Function which will wrap user input around safe characters
const escape = function (str) {
  let div = document.createElement("span");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  let time = timeago.format(tweet.created_at);
  const safeHTML = `<p class="tweet-body">${escape(tweet.content.text)}</p>`;
  let $tweet = `
  <article class="all-tweets">
    <h1 class="tweet-title"><span><img src=${tweet.user.avatars} alt="profile"> ${tweet.user.name}
    </span><span id="handle">${tweet.user.handle}</span></h1>
    ${safeHTML}
    <span id="blackLine"></span>
    <footer class="tweet-footer">
      <span>${time}</span> 
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

const loadTweets = function() {
  $.getJSON('/tweets/', function(data) {
    renderTweets(data);
  });
};

//renderTweets(data);
loadTweets();

$("#newText").submit(function(event) {

  let data = $("#newText").serialize();
  event.preventDefault();

  if (data === 'null' || data === 'text=') {
    // Returns this message if there is no input
    $("#errorMessage").slideUp("slow");
    $("#errorMessage2").slideDown("slow");
  } else if($("#tweet-text").val().length > 140) {
    // Grabs the plain text and checks length
    $("#errorMessage2").slideUp("slow");
    $("#errorMessage").slideDown("slow");
    // alert(`Your Message is too LONG!`);
  } else {
    $("#errorMessage").slideUp("slow");
    $("#errorMessage2").slideUp("slow");
    $.post('/tweets/', data)
      .then(function() {
        $.getJSON('/tweets/', function(data) {
          renderTweets(data);
        });
      });
  }
});