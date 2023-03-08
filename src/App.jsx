import "./normal.css";
import "./App.css";
import { useState, useEffect } from "react";
import Avatar from "./components/Avatar";
import NewChat from "./components/NewChat";
import NavPrompt from "./components/NavPrompt";
import Loading from "./components/Loading";
import Error from "./components/Error";
import NavLinks from "./components/NavLink";
import BotResponse from "./components/BotResponse";
import IntroSection from "./components/IntroSection";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showMenu, setShowMenu] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    document.title = "Beta Chatbot - podojo";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatLog([...chatLog, { chatPrompt: inputPrompt }]);
    async function callAPI() {
      try {
        const response = await fetch(apiUrl + "/query-doku", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatPrompt:
              inputPrompt + " Respond in the language of the question",
            filename: "all-files.csv",
          }),
        });
        const data = await response.json();
        setChatLog([
          ...chatLog,
          {
            chatPrompt: inputPrompt,
            botMessage: data.botResponse,
          },
        ]);
        setErr(false);
      } catch (err) {
        setErr(err);
      }
    }
    callAPI();
    setInputPrompt("");
  };

  return (
    <div className="App">
      <aside className="sideMenu">
        <NewChat setChatLog={setChatLog} setShowMenu={setShowMenu} />
        <div className="navPromptWrapper">
          {chatLog.map(
            (chat, idx) =>
              chat.botMessage && (
                <NavPrompt chatPrompt={chat.chatPrompt} key={idx} />
              )
          )}
        </div>
        {chatLog.length > 0 && (
          <NavLinks
            svg={
              <svg
                fill="#fff"
                viewBox="0 0 24 24"
                data-name="Flat Line"
                xmlns="http://www.w3.org/2000/svg"
                className="icon flat-line"
                stroke="#fff"
                width={23}
                height={23}
              >
                <path
                  d="M5 8h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5V8Z"
                  transform="rotate(90 12 14)"
                  style={{
                    fill: "#fff202022",
                    strokeWidth: 2,
                  }}
                />
                <path
                  d="M16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
                  style={{
                    fill: "none",
                    stroke: "#fff202022000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                  }}
                />
                <path
                  data-name="primary"
                  d="M10 11v6m4-6v6M4 7h16m-2 13V7H6v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1Z"
                  style={{
                    fill: "none",
                    stroke: "#fff202022000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                  }}
                />
              </svg>
            }
            text="Clear Conversations"
            setChatLog={setChatLog}
          />
        )}
        <a href="https://calendly.com/db-product-coaching" target="_blank">
          <div className="navPrompt">
            <img src="/coaching.svg" alt="SVG Image" width="22" height="22" />
            <p>1:1 Coaching</p>
          </div>
        </a>
        <NavLinks
          svg={
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width={25}
              height={25}
            >
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6H7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5m-6 0 7.5-7.5M15 3h6v6"
              />
            </svg>
          }
          text="Dokumentation"
          link="https://sites.google.com/podojo.com/dbpodojoflow/db-po-dojo-home"
        />
        <div className="logo-container">
          <img src="/podojo-white.svg" alt="Podjo Logo" height="36" />
          <img src="/db-logo.svg" alt="DB Logo" height="30" />
        </div>
      </aside>

      <section className="chatBox">
        <div className="chatLogWrapper">
          {chatLog.length > 0 &&
            chatLog.map((chat, idx) => (
              <div className="chatLog" key={idx}>
                <div className="chatPromptMainContainer">
                  <div className="chatPromptWrapper">
                    <Avatar bg="#EC0016" className="userSVG">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={1.9}
                        viewBox="0 0 24 24"
                        // strokeLinecap="round"
                        // strokeLinejoin="round"
                        className="h-6 w-6"
                        height={40}
                        width={40}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                    </Avatar>
                    <div id="chatPrompt">{chat.chatPrompt}</div>
                  </div>
                </div>
                <div className="botMessageMainContainer">
                  <div className="botMessageWrapper">
                    <Avatar bg="#11a27f" className="openaiSVG">
                      <svg
                        width={41}
                        height={41}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth={1.5}
                        className="h-6 w-6"
                      >
                        <path
                          d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Avatar>
                    {chat.botMessage ? (
                      <div id="botMessage">
                        <BotResponse response={chat.botMessage} />
                      </div>
                    ) : err ? (
                      <Error err={err} />
                    ) : (
                      <Loading />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputPromptWrapper">
            <input
              name="inputPrompt"
              id=""
              className="inputPrompttTextarea"
              type="text"
              rows="1"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              autoFocus
            ></input>
            <p></p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;
