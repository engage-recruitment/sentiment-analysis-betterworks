const { groupBy, keyBy } = require("./utils");
const users = require("./data/users");
const votes = require("./data/votes");

const getSentimentScores = (dimention = "location") => {
  const segmentedUsers = groupBy(users, dimention);
  const segments = Object.keys(segmentedUsers);
  return segments.map((segment) => {
    return {
      segment,
      ...getScoresBySegment(segmentedUsers[segment]),
    };
  });
};

const getScoresBySegment = (segmentUsers) => {
  const segmentUsersById = keyBy(segmentUsers, "user");
  const totalUsersInSegment = Object.keys(segmentUsersById).length;

  const { positiveVotes, negativeVotes, participants } = votes.reduce(
    (totals, vote) => {
      if (segmentUsersById[vote.userId]) {
        totals.participants.add(vote.userId);

        if (isPositiveVote(vote.vote)) {
          totals.positiveVotes.push(vote);
        }
        if (isNegativeVote(vote.vote)) {
          totals.negativeVotes.push(vote);
        }
      }
      return totals;
    },
    // Initial values for the reduce
    {
      positiveVotes: [],
      negativeVotes: [],
      participants: new Set(),
    }
  );
  return {
    sentimentScore: positiveVotes.length - negativeVotes.length,
    participation: (participants.size / totalUsersInSegment) * 100,
  };
};

const isPositiveVote = (vote) => vote > 3;

const isNegativeVote = (vote) => vote < 3;

console.table(getSentimentScores());
