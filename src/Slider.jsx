import React, { useState, useCallback, useEffect, useRef } from "react";
import SortableCard from "./SortableCard";
import { useDrop } from "react-dnd";

import "./Slider.css";

const ITEMS = [
  { id: "10", label: "Bonjour" },
  { id: "11", label: "Hello" },
  { id: "12", label: "Hi" },
  { id: "13", label: "Sayonara" }
];

const Slider = () => {
  const [cards, setcardList] = useState(ITEMS);

  // console.log("Cards : ", cards);

  const findCard = useCallback(
    id => {
      const card = cards.filter(c => `${c.id}` === id)[0];
      return card
        ? {
            card,
            index: cards.indexOf(card)
          }
        : null;
    },
    [cards]
  );

  const moveCard = useCallback(
    (id, atIndex) => {
      const cardFound = findCard(id);

      if (cardFound) {
        const { card, index } = cardFound;
        cards.splice(index, 1);
        cards.splice(atIndex, 0, card);

        setcardList([...cards]);
      }
    },
    [cards, findCard]
  );

  const addCard = useCallback(
    (atIndex, card) => {
      // if (!cards.find(card => card.id === item.id)) {
      cards.splice(atIndex, 0, card);
      setcardList([...cards]);
      // }
    },
    [cards]
  );

  const addFakeCard = useCallback(
    (atIndex, card) => {
      cards.splice(atIndex, 0, card);
      setcardList([...cards]);
    },
    [cards]
  );

  const cleanFakeCard = useCallback(() => {
    const resultTab = cards.filter(card => {
      return !card.isFake;
    });
    setcardList([...resultTab]);
  }, [cards]);

  const deleteCard = useCallback(
    atIndex => {
      cards.splice(atIndex, 1);
    },
    [cards]
  );

  const cardAlreadyExists = useCallback(
    id => {
      if (cards.find(card => card.id === id)) {
        return true;
      }

      return false;
    },
    [cards]
  );

  const [{ isOverSlider }, drop] = useDrop({
    accept: "card",
    collect: (monitor, item) => {
      // console.log("item : ", item);

      return {
        isOverSlider: monitor.isOver()
      };
    },
    drop(item) {
      const { card, index } = findCard(item.id);
      cards.splice(index, 1, { ...card, isDragging: false });
    }
  });

  const prevIsover = useRef(false);

  useEffect(() => {
    if (prevIsover.current === true && isOverSlider === false) {
      // console.log("Supprimer la carda joutée");
      const cardResult = cards.filter(card => {
        return !card.isDragging;
      });

      setcardList(cardResult);
    }

    prevIsover.current = isOverSlider;
  }, [isOverSlider, cards]);

  // console.log("isOverSlider :", isOverSlider);

  // console.log(cards);

  return (
    <div ref={drop} className={"Slider"}>
      {cards.map((card, index) => {
        return (
          <SortableCard
            key={card.id}
            id={card.id}
            index={index}
            label={card.label}
            moveCard={moveCard}
            addCard={addCard}
            cardAlreadyExists={cardAlreadyExists}
            findCard={findCard}
            deleteCard={deleteCard}
            cleanFakeCard={cleanFakeCard}
            addFakeCard={addFakeCard}
            isFake={card.isFake}
          ></SortableCard>
        );
      })}
    </div>
  );
};

export default Slider;
