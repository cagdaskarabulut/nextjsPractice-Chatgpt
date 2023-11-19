"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [result, setResult] = useState();

  async function findAnswer(question) {
    await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: question,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        let response = Object.values(resData.choices);
        let onlyFirstResponse = response[0]?.message?.content;
        setResult(onlyFirstResponse);
        console.log(onlyFirstResponse);
      });
  }

  return (
    <main className={styles.main}>
      <button
        onClick={async () =>
          findAnswer(`Prepare an article for the page created for hero Aatrox's costume named "Justicar Aatrox" on the site developed for the League of Legends game. The article should not have a title. At the beginning of this article, if you know, write in bold how many RP the costume cost and on which date the costume was released, but if you do not know, do not write this sentence at all. In the content of this article, I will talk about the story of Aatrox's "Justicar Aatrox" costume and all the details of the costume in detail, and then make a short narrative about the hero's story, listing his strengths and weaknesses, his past in the game, his place in the game, and then write that you can access information and videos about all the appearances of our hero on this page. end by stating. The article must be in English and consist of at least 1000 words. Return with html tags in div format without style.`)
        }
      >
        Hit API
      </button>

      <div dangerouslySetInnerHTML={ {__html: result} } />
    </main>
  );
}
