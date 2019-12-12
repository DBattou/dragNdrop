import React from "react";
import { useDrop, useDrag } from "react-dnd";

const SortableCard = ({
  id,
  label,
  moveCard,
  addCard,
  findCard,
  deleteCard,
  cleanFakeCard,
  addFakeCard,
  isFake
}) => {
  const originalIndex = findCard(id).index;

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
      if (cardBeingDragged.cardFromSearch) {
        if (!findCard(cardBeingDragged.id)) {
          const { index: overIndex } = findCard(id);
          cardBeingDragged.originalIndex = overIndex;
          cardBeingDragged.cardFromSearch = false;
          cardBeingDragged.isStillBeingDragged = true;

          addCard(overIndex, cardBeingDragged);
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

  return (
    <div
      ref={node => drag(drop(node))}
      id={id}
      label={label}
      style={{
        border: "solid 1px black",
        margin: "20px",
        height: "20px",
        width: "100px",
        opacity: isDragging ? "0" : "1"
      }}
    >
      {label}
    </div>
  );
};

SortableCard.whyDidYouRender = false;

export default SortableCard;
