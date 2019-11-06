import React from "react";
import { useDrag } from "react-dnd";

const Card = ({ label, id }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", cardFromSearch: true, label, id, index: '???'},
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      style={{
        border: "solid 1px black",
        margin: "20px",
        height: "20px",
        width: "100px",
        opacity: isDragging ? "0.5" : "1"
      }}
    >
      {label}
    </div>
  );
};

export default Card;
