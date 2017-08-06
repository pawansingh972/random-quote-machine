$(document).ready(function() {
    var apiURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    var tweetBtnURL = "https:\/\/dev.twitter.com\/web\/tweet-button";
    var getTweeterBtn = function(quoteJson) {
        var twitterContainer = document.getElementById('tweet-container');;
        var tweetBtnConfig = {
            size: "large",
            text: quoteJson.quoteText,
            hashtags: "quote,"+ quoteJson.quoteAuthor,
            via: "https://codepen.io/pawansingh/full/zzWKjJ/"
        };
        twttr.widgets.createShareButton( tweetBtnURL, twitterContainer, tweetBtnConfig);
    };

    var processQuoteJSON = function(json) {
        var quoteText;
        var quoteAuthor;
        var quoteTextElem = $('.quoteText');
        var quoteAuthorElem = $('.quoteAuthor');
        var quoteJson = json;

        quoteText = '<i class="fa fa-quote-left" aria-hidden="true"></i>' + quoteJson.quoteText + '<i class="fa fa-quote-right" aria-hidden="true"></i>';
        quoteAuthor = quoteJson.quoteAuthor ? quoteJson.quoteAuthor : 'Unknown';
        quoteTextElem.html(quoteText);
        quoteAuthorElem.html( '- ' + quoteAuthor);

        getTweeterBtn(quoteJson);
    }

    $.getJSON(apiURL, processQuoteJSON);

    var cleanUpUI = function() {
        var tweeterWidgetElem = $('[id^=twitter-widget-]');
        $('.quote').hide().fadeIn('slow');
        tweeterWidgetElem.remove();
    }

    var updateUI = function() {
        $.getJSON(apiURL, function(json) {
            var quoteJson = json;
            cleanUpUI();
            processQuoteJSON(quoteJson);
        });
    }
    $('#quoteGETJSON').on('click', updateUI);
});
