import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./massagecon.css"; // Assuming you have a CSS file for styling
import x from "../botimg.png";

export default function Massagecon() {
  const [userInput, setUserInput] = useState([]);
  const [valInput, setVal] = useState("");
  const [isRecording, setIsRecording] = useState(false); // Track recording state
  const mediaRecorderRef = useRef(null); // Reference to MediaRecorder object

  const userQust = () => {
    if (valInput.trim() !== "") {
      setUserInput((prevUserInput) => [...prevUserInput, valInput]);
      setVal("");
    }
  };

  const startRecording = async () => {
    setIsRecording(true); // Set recording state to true

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder; // Store reference
      const chunks = []; // Store audio data chunks

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Combine audio data chunks into a single Blob
        const recordedBlob = new Blob(chunks, { type: "audio/wav" });

        // Convert Blob to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(recordedBlob);
        reader.onloadend = () => {
          const audioDataUrl = reader.result;
          setUserInput((prevUserInput) => [
            ...prevUserInput,
            { id: Date.now(), audioURL: audioDataUrl }
          ]); // Store base64 string along with start time as id
        };
      };

      mediaRecorder.start(1000); // Record in 1-second chunks (adjust as needed)

    } catch (error) {
      console.error("Error:", error);
      setIsRecording(false); // Reset recording state on error
      // Optionally display an error message to the user
    }
  };

  const stopRecording = async () => {
    setIsRecording(false); // Set recording state to false
    mediaRecorderRef.current.stop();
  };

  return (
    <div className="d-flex">
      <div className="massagearea">
        <div className="mscont border border-white rounded-4 p-2 d-flex flex-column">
          {userInput.map((item, index) => (
            <div className="ques align-self-end" key={item.id}>
              {typeof item === "string" ? (
                <p className="badge text-bg-secondary fs-4 m-3">{item}</p>
              ) : (
                <audio key={item.id} controls>
                  <source src={item.audioURL} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          ))}
        </div>

        <div className="msinput">
          <div className="input-group">
            <input
              type="text"
              className="form-control input"
              placeholder="Enter Your Text"
              aria-label="Recipient's username with two button addons"
              value={valInput}
              onChange={(e) => setVal(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary bg-success text-white"
              type="button"
              onClick={userQust}
            >
              Send
            </button>

            {isRecording ? (
              <button
                className="btn btn-outline-info bg-danger text-white"
                type="button"
                onClick={stopRecording}
              >
                STOP
              </button>
            ) : (
              <button
                className="btn btn-outline-info bg-success text-white"
                type="button"
                onClick={startRecording}
              >
                REC
              </button>
            )}

          </div>
        </div>
      </div>

      <div className="test d-flex justify-content-center">
        <img src={x} alt="botimage" className="botimage" />
      </div>
    </div>
  );
}
