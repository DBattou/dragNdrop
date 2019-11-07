import React, { useRef, useEffect } from "react";
import { useDrop, useDrag } from "react-dnd";
import defer from 'lodash.defer'
import {useTraceUpdate} from './useTraceUpdate'
import { usePrevious } from "./usePrevious";

const SortableCard = (props) => {
  // console.log(props)
  useTraceUpdate(props)

  const { id, index, label, moveCard, addCard, cardAlreadyExists} = props
  // const previousProps = usePrevious(props)
  // useEffect(() => {
  //   if(previousProps.id !== id){
  //     console.log('id a changé')
  //   }
  //   if(previousProps.index !== index){
  //     console.log('index a changé')
  //   }
  //   if(previousProps.label !== label){
  //     console.log('label a changé')
  //   }
  //   if(previousProps.moveCard !== moveCard){
  //     console.log('moveCard a changé')
  //   }
  //   if(previousProps.addCard !== addCard){
  //     console.log('addCard a changé')
  //   }
  //   if(previousProps.cardAlreadyExists !== cardAlreadyExists){
  //     console.log('cardAlreadyExists a changé')
  //   }
  // }, [id, index, label, moveCard, addCard, cardAlreadyExists])



  useEffect(() => {
    if (id === 11) {
      console.log("je suis 11 et je rerender : ", { id, index, label, moveCard, addCard, cardAlreadyExists})
    }
  })
  // useEffect(() => defer(console.log(`Je suis suis ${id} et je RERENDER`)))
  
  const ref = useRef(null);
  const [{hovered, item}, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      // if (id ===  11) {
      //   defer(() => console.log(`hovered dans le la fonction hover`))
      // }

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
    collect: monitor => {
      // if (monitor.isOver() && id ===  11) {
      //   defer(() => console.log(`hovered dans le collecteur`))
      // }

      return {
        hovered: monitor.isOver(),
        item: monitor.getItem()
      }
    },
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
 
  // console.log('--------------------------------------------------------------')
  // console.log(`id : ${id}, isDragging : ${isDragging}, isHovered : ${hovered}`)
  
  // if (hovered && id === 11) {
  //   defer(() => console.log(`Hovered dans la fonciton principale`))
  // } else if (id === 11) {
  //   // console.log(`11 is NOT HOVERED`)
  //   defer(() => console.log(`Not Hovered`))
  // }

  // console.log(id, ' => Hovered ', hovered ? true : false)
  
  
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
        // opacity: (isDragging || hovered) && (item && !item.cardFromSearch) ? "0" : "1",
        opacity: isDragging || hovered ? "0" : "1",
      }}
    >
      {label}
    </div>
  );
};

SortableCard.whyDidYouRender = false;

export default SortableCard;
