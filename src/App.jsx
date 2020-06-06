import React, { useEffect, useState } from "react";

import styles from "./app.module.scss";
import Header from "./components/header";
import { Card, CardBody } from "./components/card";
import BarChart from "./components/barchart";
import SentimentScores from "./components/sentiment-scores";
import Modal from "./components/modal";
import UsersList from "./components/users-list";

const DIMENTIONS = ["location", "department", "designation"];
const SENTIMENT_SCORE_API = `${process.env.REACT_APP_API_BASE_URL}/api/sentiment-score`;

function App() {
  const [dimention, setDimention] = useState(DIMENTIONS[0]);
  const [sentimentScores, setSentimentScores] = useState({});
  const [showUsers, setshowUsers] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`${SENTIMENT_SCORE_API}?dimention=${dimention}`, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error getting scores");
      })
      .then((data) => setSentimentScores(data))
      .catch((err) => console.error(err));

    return () => {
      controller.abort();
    };
  }, [dimention]);

  const handleDimentionChange = (evt) => {
    setDimention(evt.target.value);
  };

  const toggleUserModal = () => {
    setshowUsers(!showUsers);
  };

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <div className={styles.selectDimention}>
          <select value={dimention} onChange={handleDimentionChange}>
            {DIMENTIONS.map((dimentionOption) => (
              <option key={dimentionOption} value={dimentionOption}>
                {dimentionOption}
              </option>
            ))}
          </select>
          <button onClick={toggleUserModal}>Show Users</button>
        </div>
        <div className={styles.dataContainer}>
          <div className={`${styles.overallScore} mr-xxl`}>
            <Card className="h-100 flex flex-center">
              <CardBody className="flex flex-col">
                <span className="txt-center fs-xxl">Overall Sentiment</span>
                <span className="txt-center fs-xxxl">
                  {sentimentScores.overallSentiment}
                </span>
              </CardBody>
            </Card>
          </div>
          <div className="flex-grow">
            <Card>
              <CardBody>
                <BarChart scores={sentimentScores.scores || []} />
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="mt-xxl flex-grow">
          <Card>
            <CardBody>
              <SentimentScores scores={sentimentScores.scores || []} />
            </CardBody>
          </Card>
        </div>
      </div>
      {showUsers && (
        <Modal onClose={toggleUserModal}>
          <UsersList />
        </Modal>
      )}
    </div>
  );
}

export default App;
