import DownArrow from "./down-arrow.png";
import axios from "axios";
import { useState } from "react";
import { Textarea, Button, Typography } from "@material-tailwind/react";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-XXXXX-X"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const analyticsEventTracker = (category = "On Click Translate") => {
  const eventTracker = (action = "Click", label = "Translate") => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};

function App() {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const fetchData = async (input) => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations`,
          },
          { role: "user", content: `"${input}"` },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    );
    return response.data.choices[0].message.content;
  };

  async function handleClick() {
    try {
      setIsTranslating(true);
      setCompletedSentence("");
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
      setIsTranslating(false);
      analyticsEventTracker();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mx-auto my-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-center">
          <h1 className="text-2xl mb-5 font-bold">Tarabol Sentence Coach</h1>
        </div>
        <div className="flex justify-center content-center mb-5">
          <div className="mx-5 md:basis-1/2">
            <p>
              This is an application focus on both translation and improving
              English sentences. It is supporting in many languages includes
              Vietnamese, Japanese, Chinese ...
            </p>
            <h1 className="font-bold text-lg mt-3">How to use</h1>
            <ul className="list-disc">
              <li>
                First, you need to input the sentence you want to translate in
                the input section of the app. Once you have inputted the
                sentence, the app will analyze it and translate it into English.
              </li>
              <li>
                The translated sentence will then appear in the output section
                of the app, which can be a separate text box.
              </li>
              <li>
                With these simple steps, you can effectively use a translate
                English app to overcome language barriers and communicate with
                people from different cultures and backgrounds.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="md:flex md:flex-row md:justify-center">
        <div className="mx-3 md:basis-1/2 gap-6">
          <Textarea
            color="blue"
            label="Your sentences"
            onChange={(event) => setInput(event.target.value)}
            value={input}
            rows="7"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <img src={DownArrow} alt="React Logo" className="my-3 w-4 h-6" />
      </div>
      <div className="md:flex md:flex-row md:justify-center ">
        <div className="mx-3 md:basis-1/2 gap-6">
          <Textarea
            color="black"
            onChange={(event) => setInput(event.target.value)}
            value={completedSentence}
            rows="7"
            disabled={true}
          />
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <Button color="blue" onClick={handleClick}>
          Translate and improve
        </Button>
      </div>
      {isTranslating && (
        <div className="flex justify-center mt-5" role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <footer className="w-full bg-white p-8">
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="blue-gray" className="text-center font-normal">
          &copy; Copyright 2023 Tarabol. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}

export default App;
