import React, { useState } from "react";
import SearchCard from "./SearchCard";

const SearchList = () => {
  const [cards, setCards] = useState([
    { id: 1, label: "Coucou" },
    { id: 2, label: "Goodbye" },
    { id: 3, label: "Gutentag" },
    { id: 4, label: "Arrivedercci" }
  ]);

  return (
    <div style={{ margin: "40px", width: "500px" }}>
      {cards.map(card => (
        <SearchCard id={card.id} key={card.id} label={card.label}></SearchCard>
      ))}
    </div>
  );
};

export default SearchList;
