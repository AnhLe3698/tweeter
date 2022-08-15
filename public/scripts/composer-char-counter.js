$(document).ready(function() {
  // --- our code goes here ---

  // Keyup is the better choice since it can also check for alternate key presses
  // such as 'delete' key unlike keypress. Keydown misses the first character.
  $("#tweet-text").keyup(function() {
    let lengthTweet = String($(this).val()).length;
    let counter = $(this).parent().parent().children('.bottomBar').children('.counter');
    counter.text(140 - lengthTweet);
    if (Number(counter.text()) < 0) {
      counter.css({"color": "red"});
    } else {
      counter.css({"color": "black"});
    }
    //$('.counter').text(140 - lengthTweet);
  });

});