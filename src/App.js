import logo from './logo.svg';
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
          {"role": "system", "content": `I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations`},
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
    console.log(response);
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
    <div className="container mx-auto my-5">
      <div className='flex flex-row'>
        <textarea 
          id="message" 
          rows="7" 
          className="basis-1/2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2" 
          placeholder="Type in your sentences, then I will translate to english and make it more elegant" 
          onChange={(event) => setInput(event.target.value)} value={input}/>
          <textarea 
            disabled={true}
            overflow-y="scroll"
            id="message" 
            rows="7" 
            className='basis-1/2 ml-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder="Translate result" 
            value={completedSentence}/>
      </div>
      <div className='flex justify-center'>
        <button className="p-2 my-5 rounded-md bg-indigo-500 hover:bg-cyan-600 text-white" onClick={handleClick}>Complete Sentence</button>
      </div>
      
    </div>
  );
}

export default App;
