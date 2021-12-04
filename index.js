require('dotenv').config();

const CronJob = require('cron').CronJob;
const Twit = require('twit');
const axios = require('axios').default;

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

var stream = T.stream('statuses/filter', { track: 'Chakra UI' });

stream.on('tweet', function (tweet) {
  axios.post(
    process.env.DISCORD_WEBHOOK,
    {
      content: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
});
