import React, { useEffect, useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import "./SortableCard.css";

const SortableCard = ({
  id,
  label,
  moveCard,
  addCard,
  findCard,
  deleteCard,
  cleanFakeCard,
  addFakeCard,
  isFake,
  index
}) => {
  const originalIndex = findCard(id).index;
  const [hideCard, setHideCard] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id, originalIndex, cardFromSearch: false, isFake },
    collect: monitor => {
      const isItemBeingDragged =
        monitor.getItem() && monitor.getItem().id === id;
      const isStillBeingDragged = !!(
        monitor.getItem() && monitor.getItem().isStillBeingDragged
      );

      return isStillBeingDragged
        ? {
            isDragging: isItemBeingDragged
          }
        : {
            isDragging: monitor.isDragging()
          };
    },
    end: (item, monitor) => {
      const itemDropped = monitor.didDrop();
      if (item && item.isStillBeingDragged) {
        // deleteCard()
      } else if (item && !itemDropped) {
        moveCard(item.id, item.originalIndex);
      }
    }
  });

  const [, drop] = useDrop({
    accept: "card",
    canDrop: () => false,
    hover: cardBeingDragged => {
      console.log("Card being dragged : ", cardBeingDragged);

      if (cardBeingDragged.cardFromSearch) {
        if (!findCard(cardBeingDragged.id)) {
          const { index: overIndex } = findCard(id);
          cardBeingDragged.originalIndex = overIndex;
          cardBeingDragged.cardFromSearch = false;
          cardBeingDragged.isStillBeingDragged = true;

          addCard(overIndex, { ...cardBeingDragged, isDragging: true });
          // addFakeCard(overIndex, { id: "-1", isFake: true });
        }
      } else {
        if (cardBeingDragged.id !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(cardBeingDragged.id, overIndex);
        }
      }
    }
  });

  useEffect(() => {
    console.log("IDRAGGING A CHANGE, isDragging => ", isDragging);
    setHideCard(isDragging);
  }, [isDragging]);

  console.log("isDragging : ", isDragging);
  return (
    <div
      className={`SortableCard SortableCard-${index}`}
      ref={node => drag(drop(node))}
      id={index}
      label={label}
      style={{ opacity: hideCard ? "0" : "1" }}
    >
      {label}
    </div>
  );
};

SortableCard.whyDidYouRender = false;

export default SortableCard;
