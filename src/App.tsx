import React from "react";
import "./i18n";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./features/layouts/navigationBar";


const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <NavigationBar />
      </BrowserRouter>
    </div>
  );
};

export default App;
