import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [text, settext] = useState("");
  const [tempText, settempText] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [array, setarray] = useState([5, 6, 7, 8, 9]);
  const [gotResponseOrNot, setgotResponseOrNot] = useState(false);
  const [showData, setshowData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const url2 =
    "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyCugul8ngTXWI5pzvCFRxS52NRcMIyHtI8";

  async function callAPI() {
    setisLoading(true);
    settempText(text);
    setIsUpdated(true);
    console.log(text);
    setshowData((preVlist) => [...preVlist, { text: text, isUser: true }]);
    console.log("yo");
    const { data } = await axios({
      method: "POST",
      url: url2,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        contents: [
          {
            role: "user",
            parts: [{ text: text }],
          },
        ],
      },
    });
    setisLoading(false);
    setshowData((prevList) => [
      ...prevList,
      {
        text: data["candidates"][0]["content"]["parts"][0]["text"],
        isUser: false,
      },
    ]);
    setgotResponseOrNot(true);
    console.log(showData);
    settext("");
  }
  return (
    <>
      <h3>Asky (Your Chatbot Companion)</h3>
      <div className="main">
        <div className="chat-area">
          {showData.map((ele, index) => {
            if (ele.isUser) {
              return (
                <div
                  key={index}
                  className="same "
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    width: "fit-content",
                    backgroundColor: "#b0e0e6",
                    // left: "140px",
                  }}
                >
                  <i
                    class="fa-regular fa-user"
                    style={{ fontSize: "14px" }}
                  ></i>
                  {ele.text}
                </div>
              );
            } else
              return (
                <div
                  className="same "
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#add8e6",
                  }}
                  key={index}
                >
                  <img
                    src="https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-chatbot-icon-chat-bot-robot-png-image_4841963.png"
                    style={{ width: "40px" }}
                    alt=""
                  />
                  {ele.text}
                </div>
              );
          })}
          {/* Loading state */}
          {isLoading == false ? (
            <div></div>
          ) : (
            <div>
              <img
                width={130}
                src="https://cdn.dribbble.com/users/2496529/screenshots/5500128/botfactory_loader4x3.gif"
                alt=""
              />
            </div>
          )}
        </div>
        <div className="input-area">
          <input
            value={text}
            type="text"
            placeholder="Ask bot anything ...."
            onChange={(e) => {
              settext(e.target.value);
            }}
          />
          <button
            className="btn"
            style={{ border: "1px solid black", borderRadius: "10px" }}
            onClick={() => {
              callAPI();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
