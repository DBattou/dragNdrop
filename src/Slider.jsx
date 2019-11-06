import React, { useState, useCallback } from "react";
import SortableCard from "./SortableCard";

const Slider = () => {
  const [cardList, setcardList] = useState([
    { id: 10, label: "Bonjour" },
    { id: 11, label: "Hello" },
    { id: 12, label: "Hi" },
    { id: 13, label: "Sayonara" }
  ]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cardList[dragIndex];
      cardList.splice(dragIndex, 1);
      cardList.splice(hoverIndex, 0, dragCard);
      setcardList([...cardList]);
    },
    [cardList]
  );

  const addCard = useCallback(
    (hoverIndex, item) => {
      if (!cardList.find(card => card.id === item.id)) {
        cardList.splice(hoverIndex, 0, item);
        setcardList([...cardList]);
      }
    },
    [cardList]
  );

  const cardAlreadyExists = useCallback(
    (id) => {
      if (cardList.find(card => card.id === id)) {
        return true
      }

      return false
    },
    [cardList]
  )

  return (
    <div style={{ border: "2px solid black", margin: "40px", width: "500px" }}>
      {cardList.map((card, index) => (
        <SortableCard
          key={card ? card.id : undefined}
          id={card ? card.id : undefined}
          index={index}
          label={card ? card.label : ''}
          moveCard={moveCard}
          addCard={addCard}
          cardAlreadyExists={cardAlreadyExists}
        ></SortableCard>
      ))}
    </div>
  );
};

export default Slider;
