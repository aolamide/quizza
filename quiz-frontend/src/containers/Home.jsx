import React from 'react';
import styles from  '../css/home.module.css';

function Home() {
  document.title = 'Quizza';
  return (
    <div>
      <div className="mask">
      </div>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className="center">
            <h1> Quizza </h1>
            <i>Create fun quizzes and share with friends</i>
          </div>
        </div>
          <p className={styles.creator}>Created by <a href="https://twitter.com/olamideaboyeji" target="_blank" rel="noopener noreferrer">Olamide Aboyeji </a> | {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default Home;
