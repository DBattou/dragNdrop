import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

const SortableCard = ({ id, index, label, moveCard, addCard }) => {
  const ref = useRef(null);
  const [{ hovered }, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (item.cardFromSearch) {
        // if (!cardList.find(card => card.id === item.id)) {
        // if (cardAdded) {
        //   return;
        // }
        // }
        addCard(hoverIndex, item);
        item.cardFromSearch = false;
      } else {
        console.log("etape 1 : ", dragIndex, hoverIndex);
        // // Don't replace items with themselves
        // if (dragIndex === hoverIndex) {
        //   return;
        // }
        // // Determine rectangle on screen
        // const hoverBoundingRect = ref.current.getBoundingClientRect();
        // // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        // // Get pixels to the top
        // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // // Only perform the move when the mouse has crossed half of the items height
        // // When dragging downwards, only move when the cursor is below 50%
        // // When dragging upwards, only move when the cursor is above 50%
        // // Dragging downwards
        // if (
        //   dragIndex < hoverIndex &&
        //   hoverClientY < hoverBoundingRect.top &&
        //   hoverClientY > hoverBoundingRect.bot
        // ) {
        //   return;
        // }
        // // Dragging upwards
        // if (
        //   dragIndex > hoverIndex &&
        //   hoverClientY > hoverBoundingRect.top &&
        //   hoverClientY < hoverBoundingRect.bot
        // ) {
        //   return;
        // }
        // // Time to actually perform the action
        // moveCard(dragIndex, hoverIndex);
        // // Note: we're mutating the monitor item here!
        // // Generally it's better to avoid mutations,
        // // but it's good here for the sake of performance
        // // to avoid expensive index searches.
        // item.index = hoverIndex;
      }
    },
    collect: monitor => ({
      hovered: monitor.isOver()
    })
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", label, id, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  drop(drag(ref));

  return (
    <div
      ref={ref}
      id={id}
      index={index}
      label={label}
      style={{
        border: "solid 1px black",
        margin: "20px",
        height: "20px",
        width: "100px",
        opacity: isDragging ? "0" : "1",
        backgroundColor: hovered ? "blue" : "white"
      }}
    >
      {label}
    </div>
  );
};

export default SortableCard;
