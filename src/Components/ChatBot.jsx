import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./chatbot.css";

const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const apiKey = "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"; // استبدل YOUR_OPENAI_API_KEY بمفتاح API الخاص بك

  const sendMessage = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, isUser: true },
    ]);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo-instruct",
          prompt: userInput,
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const reply = response.data.choices[0].text.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: reply, isUser: false },
      ]);
    } catch (error) {
      console.error("Error sending message to OpenAI:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Error occurred while processing your request.",
          isUser: false,
        },
      ]);
    }
    setUserInput("");
  };

  return (
    <div className="msarea p-4">
      <div className="mascont  mt-5">
        <div> 
          {messages.map((message, index) => (
            <div
              key={index}
              style={{ textAlign: message.isUser ? "right" : "left" }}
              // className="alert alert-dark  m-2"
              className={ message.isUser ? "alert alert-dark text-right m-2" : "m-2 alert alert-info text-left" }
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>



        
      </div>
      <div className="msinput m-auto mt-2 w-50">
          <div className="input-group">
            <input
              type="text"
              className="form-control input"
              placeholder="Enter Your Text"
              aria-label="Recipient's username with two button addons"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary bg-success text-white"
              type="button"
              onClick={sendMessage}
            >
              Send
            </button>

            <button
              className="btn btn-outline-info bg-success text-white"
              type="button"
              id="rec"
            >
              REC
            </button>
          </div>
        </div>
      {/* <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="btn btn-secondary" onClick={sendMessage}>Send</button> */}

      

    </div>
  );
};

export default ChatBot;
