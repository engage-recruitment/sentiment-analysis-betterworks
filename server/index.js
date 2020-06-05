const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const PORT = process.env.PORT || 4100;

const analyser = require("./analyser");
const users = require("./data/users.json");
const votes = require("./data/votes.json");
const { groupBy } = require("./utils");

const app = express();

app.use([
  morgan("combined"),
  helmet(),
  compression(),
  bodyParser.urlencoded({ extended:true })
]);

app.get('/api/sentiment-score', ({ query: { dimention }}, response) => {
  const scores = analyser.getSentimentScores(dimention);
  const overallSentiment = analyser.getOverallScore(scores);

  response.json({
    scores, overallSentiment
  });
});

app.get('/api/users', (_, response) => {
  const votesByUser = groupBy(votes, "userId");
  const usersWithVotes = users.map(user => ({...user, votes: votesByUser[user.user]}));

  response.json({
    users: usersWithVotes
  });
});

app.listen(PORT, () => {
  console.log("Listening on PORT ", PORT);
});
