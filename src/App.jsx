import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Menubar from './components/Menubar';
import './App.css';

const newElementPosition = 100;

function App() {

  const backgrounds = [
    { id: 1 }
  ];

  const cards = [
    { id: 1, title: "hello", backgroundId: 1 },
  ];

  const elements = [
    { id: 1, cardId: 1, type: "button", pos: [5, 40] },
  ];

  const [cardList, setCardList] = useState(cards);
  const [elementList, setElementList] = useState(elements);
  const [currentCardId, setCurrentCardId] = useState(1);
  const [cardElements, setCardElements] = useState([]);
  const [newOffset, setNewOffset] = useState(newElementPosition);
  const [backgroundMode, setBackgroundMode] = useState(false);

  const prevCard = () => {
    setCurrentCardId(currentCardId > 1 ? currentCardId - 1 : 1);
  }

  const nextCard = () => {
    setCurrentCardId(currentCardId < cardList.length ? currentCardId + 1 : cardList.length);
  }

  const addCard = () => {
    const id = cardList[cardList.length - 1].id + 1;
    setCardList([...cardList, { id: id, title: "Untitled" }]);
    setCurrentCardId(id);
  }

  const nextOffset = () => {
    const setTo = newOffset < 200 ? newOffset + 10 : newElementPosition;
    setNewOffset(setTo);
  }

  const addElement = (type, pos = [newOffset, newOffset]) => {
    const id = elementList[elementList.length - 1].id + 1;
    setElementList([...elementList, { id: id, type: type, cardId: currentCardId, pos: pos }]);
    nextOffset();
  }

  useEffect(() => {
    setCardElements(elementList.filter((el) => el.cardId === currentCardId))
  }, [currentCardId, elementList])

  return (
    <>
      <div id="stack">
        <Menubar />
        <Card
          id={currentCardId}
          title={cardList.filter((c) => c.id === currentCardId)[0].title}
          elements={cardElements}
        />
      </div>
      <button onClick={addCard}>+ Add card</button>
      <button onClick={() => addElement("button")}>+ Button</button>
      <button onClick={() => addElement("field")}>+ Field</button>
      <button onClick={prevCard}>&lt; Previous card</button>
      ## {currentCardId} ##
      <button onClick={nextCard}>Next card &gt;</button>
     
    </>
  );
}

export default App;