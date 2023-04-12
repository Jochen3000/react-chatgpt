import React from "react";
import NewChat from "./NewChat";
import NavPrompt from "./NavPrompt";
import NavLinks from "./NavLinks";

const SideMenu = ({ chatLog, setChatLog }) => {
  return (
    <aside className="sideMenu">
      <NewChat setChatLog={setChatLog} />
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
          type="clearConversations"
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
      <NavLinks type="documentation" text="Dokumentation" />
      <div className="logo-container">
        <img src="/podojo-white.svg" alt="Podjo Logo" height="36" />
        <img src="/db-logo.svg" alt="DB Logo" height="30" />
      </div>
    </aside>
  );
};

export default SideMenu;
