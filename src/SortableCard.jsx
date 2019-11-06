import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

const SortableCard = ({ id, index, label, moveCard, addCard, cardAlreadyExists}) => {
  const ref = useRef(null);
  const [{hovered, item}, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      // If the dragged card is in the slider it has a dragIndex
      // If the card is coming from the search list it doesnt have a dragIndex
      const dragIndex = item.index;
      const hoverIndex = index;

      // If the card is coming from elsewhere
      if (item.cardFromSearch) {
        if(!cardAlreadyExists(item.id)) {
          // Add the new card
          addCard(hoverIndex, item)
          // The card is now in the slider : it receives an index and it's not coming from search
          item.index = hoverIndex;
          item.cardFromSearch = false;
        }
      } else {
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (
          dragIndex < hoverIndex &&
          hoverClientY < hoverBoundingRect.top &&
          hoverClientY > hoverBoundingRect.bot
        ) {
          return;
        }
        // Dragging upwards
        if (
          dragIndex > hoverIndex &&
          hoverClientY > hoverBoundingRect.top &&
          hoverClientY < hoverBoundingRect.bot
        ) {
          return;
        }
        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      }
    },
    collect: monitor => ({
      hovered: monitor.isOver(),
      item: monitor.getItem()
    }),
    drop: (item) => {
      if (item.cardFromSearch && cardAlreadyExists(item.id)) {
        alert("Le contenu est déjà présent")
      }
    }
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
        opacity: (isDragging || hovered) && (item && !item.cardFromSearch) ? "0" : "1",
      }}
    >
      {label}
    </div>
  );
};

export default SortableCard;
