import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loading from "./Loading";
import { ReactTyped } from "react-typed";

function InputForm() {
  const [inPrompt, setInPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const btn = () => {
    output ? setOutput("") : "";
    setIsLoading(true);
    inPrompt ? console.log(inPrompt) : "";

    // const { GoogleGenerativeAI } = require("@google/generative-ai");

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    async function run() {
      const prompt = inPrompt;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (text) {
        setIsLoading(false);
        setOutput(text);
      }

      // console.log(prompt);
      // console.log(text);
    }

    run();

    setInPrompt("");
  };

  const typo = () => {
    if (output == "") {
      return 'displsy: "none"';
    }
  };

  return (
    <>
      <div className="w-3/5 px-2 py-4 flex flex-col justify-center items-start backdrop-blur-lg rounded-xl drop-shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="flex flex-col items-center py-5">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="unique-input"
            >
              Enter Prompt
            </label>
            <div className="w-full max-w-xs bg-white rounded-lg font-mono flex">
              <input
                className="text-sm custom-input w-4/6 px-4 py-2 border border-r-0 border-gray-300 rounded-lg rounded-r-none shadow-lg transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100 drop-shadow-md"
                placeholder="Enter text here"
                type="text"
                id="unique-input"
                name="inPrompt"
                value={inPrompt}
                onChange={handleChange}
              />
              <button
                onClick={btn}
                className="text-sm w-2/6 px-4 py-2 border border-l-0 border-gray-300 rounded-lg rounded-l-none shadow-lg transition duration-300 ease-in-out transform hover:shadow-lg hover:border-blue-500 hover:bg-blue-500 bg-blue-300"
              >
                Click
              </button>
            </div>
          </div>
        </form>
        <hr className="line1 rounded-lg w-4/5 mx-auto my-4" />
        <div
          className=" result w-full text-white h-56 px-5 overflow-scroll "
          style={{ overflowX: "hidden" }}
        >
          {isLoading == false && output == "" ? (
            <p className="w-full min-h-52 flex justify-center items-center text-2xl font-extrabold text-gray-400">
              <ReactTyped
                strings={["Type What's in our Mind :&#41;"]}
                typeSpeed={50}
                backSpeed={50}
                loop
                showCursor={false}
              />
            </p>
          ) : (
            ""
          )}

          {isLoading ? (
            <Loading />
          ) : (
            <pre className="text-pretty">
              <ReactTyped
                strings={[output]}
                typeSpeed={20}
                smartBackspace={true}
                cursorChar="&#9998;"
                style={{ display: output ? "" : "none" }}
              />
            </pre>
          )}
        </div>
      </div>
    </>
  );
}

export default InputForm;
