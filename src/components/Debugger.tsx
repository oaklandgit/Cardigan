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
    const id: string = uuid();
    setElementList([...elementList, { id: id, type: type, cardId: cardId, pos: pos }]);

    setNextOffset({ x: nextOffset.x + 8, y: nextOffset.y + 8 });

    if (nextOffset.x > 300) {
      setNextOffset(startPosition);
    }

  }

  function addCard() {
    //const id = cardList[cardList.length - 1]?.id + 1 || 1;
    const id = uuid();
    setCardList([...cardList, { id: id, backgroundId: currentBackgroundId }]);
    setCurrentCardId(id);
  }

  function prevCard() {
    console.log('prev card');
  }

  function nextCard() {
    console.log('next card');
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
