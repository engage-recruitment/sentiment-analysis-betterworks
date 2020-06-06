import React from "react";

const SentimentScores = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Segment</th>
          <th>Scores</th>
          <th>Participation</th>
        </tr>
      </thead>
      <tbody>
        {props.scores.map((score, i) => (
          <tr key={`${i}-${score.segment}`}>
            <td>{score.segment}</td>
            <td>{score.sentimentScore}</td>
            <td>{score.participation}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SentimentScores;
