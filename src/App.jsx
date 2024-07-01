import React from "react";
import "./App.css";
import InputForm from "./InputForm";

function App() {
  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center font-mono bg-[url('./assets/Gemini_bg.jpg')] bg-cover bg-no-repeat bg-center">
        <InputForm />
      </div>
    </>
  );
}

export default App;
