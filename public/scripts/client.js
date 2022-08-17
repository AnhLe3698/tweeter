
const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
  // Add Gao at the end of the webpage
  let $gap = '<div class="gap"></div>';
  $(`#tweets-container`).append($gap);
};

// Safety Function which will wrap user input around safe characters
// This avoids html code injections
const escape = function (str) {
  let div = document.createElement("span");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creates all the tweets retreived from the database
const createTweetElement = function(tweet) {
  let time = timeago.format(tweet.created_at); // Calucates days from when tweet was generated
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
        <i id="icons" class="fa-solid fa-flag"></i>
        <i id="icons" class="fa-solid fa-retweet"></i>
        <i id="icons" class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>
  `;

  return $tweet;
};

const loadTweets = function() {
  $("#scrollUp").slideUp(); // Stretch hide scroll Up element
  $.getJSON('/tweets/', function(data) {
    renderTweets(data);
  });
};

//renderTweets(data);
loadTweets();

// Creating New Tweets
$("#newText").submit(function(event) {
  // Packaging the data as a serialized data string
  let data = $("#newText").serialize();

  // Prevents default of refreshing the page after submition
  event.preventDefault();

  if (data === 'null' || data === 'text=') {
    // Returns this message if there is no input
    $("#errorMessage").slideUp("slow"); // Hide
    $("#errorMessage2").slideDown("slow"); // Show

  } else if ($("#tweet-text").val().length > 140) {
    // Returns error message if message is too long
    $("#errorMessage2").slideUp("slow");  // Show
    $("#errorMessage").slideDown("slow"); // Hide
  } else {
    $("#errorMessage").slideUp("slow"); // Hide
    $("#errorMessage2").slideUp("slow"); // Hide
    $.post('/tweets/', data) // Submit form as a POST request
      .then(function() {
        // The follow code will execute once Post request finishes
        $.getJSON('/tweets/', function(data) {
          renderTweets(data); // Renders the JSON object as tweets
        });
      });
  }
});

// Open up Create Tweet Element upon clicking the arrow
$(".smFont").on('click', () => {
  if ($(".new-tweet").is(":hidden")) {
    $(".new-tweet").slideDown("slow");
  } else {
    $(".new-tweet").slideUp("slow");
  }
});

// Scrolling up or down will disable/enable tweet arrow
// or scroll up arrow
$(window).scroll(function(event) {

  if($(window).scrollTop()  >  200) {
    $(".new-tweet").slideUp("slow"); // Closes tweet form
    $(".smFont").slideUp("slow"); // Hide tweet arrow
    $("#scrollUp").slideDown(); // shows the scroll up arrow
  } else {
    $("#scrollUp").slideUp();
    $(".smFont").slideDown();
    $("nav").show();
  }
  if ($(window).scrollTop()  >  400) {
    $("nav").slideUp(); // Hides nav bar
  }
});

// Upon clicking the scroll up arrow, the page navigates to
// the top of page!
$("#scrollUp").on('click', ()=> {
  $("html, body").animate({ scrollTop: 0 }, 1000, () => {
    $(".smFont").slideDown(); // Shows tweet arrow
    $("#scrollUp").slideUp(); // Hides scroll up arrow
  });
});