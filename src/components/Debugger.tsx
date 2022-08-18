import { useState } from 'react';
import './Debugger.css';
import { v4 as uuid } from 'uuid';

export default function Debugger({
  cardList,
  setCardList,
  elementList,
  setElementList,
  currentCardId,
  setCurrentCardId,
  backgroundMode,
  setBackgroundMode,
  currentBackgroundId,
  setCurrentBackgroundId
}) {

  // where to place new elements
  const startPosition = { x: 200, y: 100 };
  const [nextOffset, setNextOffset] = useState(startPosition);

  function addElement(type: "button" | "field", pos: [number, number, number, number] = [nextOffset.x, nextOffset.y, 120, 40]) {

    const cardId = backgroundMode ? currentBackgroundId : currentCardId;

    setElementList([...elementList, { id: uuid(), type: type, cardId: cardId, pos: pos }]);

    setNextOffset({ x: nextOffset.x + 8, y: nextOffset.y + 8 });

    if (nextOffset.x > 300) {
      setNextOffset(startPosition);
    }

  }

  function addCard() {
    const id = uuid();
    setCardList([...cardList, { id: id, backgroundId: currentBackgroundId }]);
    setCurrentCardId(id);
  }

  function getCardIndexById(id: string) {
    return cardList.findIndex(card => card.id === id);
  }

  function getCardIdByIndex(index: number) {
    return cardList[index].id || false;
  }


  function prevCard() {

    const allCards = cardList.filter(card => card.backgroundId != undefined);
    const currIndex = allCards.findIndex(card => card.id === currentCardId);

    console.log(currIndex);

    let prevId: number;

    if (currIndex !== 0) {
      prevId = allCards[currIndex - 1].id;
    } else {
      prevId = allCards[allCards.length - 1].id;
    }

    console.log(prevId);
    setCurrentCardId(prevId);
  }

  function nextCard() {
    const allCards = cardList.filter(card => card.backgroundId != undefined);
    const currIndex = allCards.findIndex(card => card.id === currentCardId);

    console.log(currIndex);

    let nextId: number;

    if (currIndex !== allCards.length - 1) {
      nextId = allCards[currIndex + 1].id;
    } else {
      nextId = allCards[0].id;
    }

    console.log(nextId);
    setCurrentCardId(nextId);
  }

  return (

    <div id="debuggerbar">
      <button onClick={addCard}>+ card</button>
      <button onClick={() => addElement("button")}>+ Button</button>
      <button onClick={() => addElement("field")}>+ Field</button>
      <button onClick={prevCard}>&lt; Prev</button>
      {currentCardId}
      <button onClick={nextCard}>Next &gt;</button>
      <button onClick={() => setBackgroundMode(!backgroundMode)}>BG Mode</button>
    </div>
  )
}
