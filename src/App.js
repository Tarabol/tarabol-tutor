import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';



function App() {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");
  const fetchData = async (input) => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": `I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is "istanbulu cok seviyom burada olmak cok guzel"`},
          {"role": "user", "content": `"${input}"`}
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    )
    return response.data.choices[0].message.content
  }

  async function handleClick() {
    try {
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <h2>Tell me something, and I'll tell you more</h2>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={5}
        placeholder="Type in some words and I'll finish the rest..."
      />
      <button className="button" onClick={handleClick}>Complete Sentence</button>
      {completedSentence && <p>Completed sentence: {completedSentence}</p>}
    </div>
  );
}

export default App;
