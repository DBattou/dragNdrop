import React, { useState, useCallback } from 'react'
import SortableCard from './SortableCard'
import { useDrop } from 'react-dnd'

const ITEMS = [
  { id: '10', label: 'Bonjour' },
  { id: '11', label: 'Hello' },
  { id: '12', label: 'Hi' },
  { id: '13', label: 'Sayonara' }
]

const Slider = () => {
  const [cards, setcardList] = useState(ITEMS)

  const findCard = useCallback(
    id => {
      const card = cards.filter(c => `${c.id}` === id)[0]
      return card
        ? {
            card,
            index: cards.indexOf(card)
          }
        : null
    },
    [cards]
  )

  const moveCard = useCallback(
    (id, atIndex) => {
      const cardFound = findCard(id)

      if (cardFound) {
        const { card, index } = cardFound
        cards.splice(index, 1)
        cards.splice(atIndex, 0, card)

        setcardList([...cards])
      }
    },
    [cards, findCard]
  )

  const addCard = useCallback(
    (atIndex, card) => {
      // if (!cards.find(card => card.id === item.id)) {
      cards.splice(atIndex, 0, card)
      setcardList([...cards])
      // }
    },
    [cards]
  )

  const deleteCard = useCallback(
    atIndex => {
      cards.splice(atIndex, 1)
    },
    [cards]
  )

  const cardAlreadyExists = useCallback(
    id => {
      if (cards.find(card => card.id === id)) {
        return true
      }

      return false
    },
    [cards]
  )

  const [, drop] = useDrop({ accept: 'card' })

  console.log(cards)

  return (
    <div ref={drop} style={{ border: '2px solid black', margin: '40px', width: '500px' }}>
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
          ></SortableCard>
        )
      })}
    </div>
  )
}

export default Slider
