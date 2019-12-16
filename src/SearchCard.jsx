import React from "react";
import { useDrag } from "react-dnd";
import "./SearchCard.css";

const SearchCard = ({ label, id }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "card",
      cardFromSearch: true,
      label,
      id,
      originalIndex: "???"
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className="SearchCard"
      style={{ opacity: isDragging ? "0.5" : "1" }}
    >
      {label}
    </div>
  );
};

export default SearchCard;
