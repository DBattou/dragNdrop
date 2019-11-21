import React from "react";
import "./App.css";
import SearchList from "./SearchList";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Slider from "./Slider";
// import whyDidYouRender from "@welldone-software/why-did-you-render";

// whyDidYouRender(React, {
//   onlyLogs: true,
//   titleColor: "green",
//   diffNameColor: "darkturquoise"
// });

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <div className="App" style={{ display: "flex", flexDirection: "row" }}>
        <SearchList></SearchList>
        <Slider></Slider>
      </div> */}
      <Slider></Slider>
    </DndProvider>
  );
}

// App.whyDidYouRender = true;

export default App;
