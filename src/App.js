import React from "react";
import "./App.css";
import SearchList from "./SearchList";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Slider from "./Slider";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <SearchList></SearchList>
        <Slider></Slider>
      </div>
    </DndProvider>
  );
}

export default App;
