import "./normal.css";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Upload from "./pages/Upload";
import Bot from "./pages/Bot";

function App() {
  useEffect(() => {
    document.title = "User Research - podojo docu";
  }, []);

  return (
    <div className="page-container wf-section">
      <div className="w-layout-grid page-grid">
        <div className="main">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Bot />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
