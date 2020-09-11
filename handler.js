const twit = require("twit");

const t = new twit({
  consumer_key: "",
  consumer_secret: "",
  access_token: "",
  access_token_secret: "",
});

module.exports.botTwitter = (event, context, callback) => {
  let params = {
    q: "#javascript",
    result_type: "recent",
    count: 150,
  };
  t.get("search/tweets", params, (err, data, response) => {
    let tweets = data.statuses;
    if (!err) {
      for (let tweet of tweets) {
        let id = tweet.id_str;
        t.post("statuses/retweet/:id", { id: id }, (err, response) => {
          if (response) {
            return callback(null, "It was retweeted with the" + id);
          }
          if (err) {
            return callback("error", null);
          }
        });
      }
    }
  });
};
