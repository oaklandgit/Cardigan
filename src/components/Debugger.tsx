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

  function addCard() {
    const id = cardList[cardList.length - 1]?.id + 1 || 1;
    setCardList([...cardList, { id: id, backgroundId: currentBackgroundId }]);
    setCurrentCardId(id);
  }

  function addElement(type: "button" | "field", pos: [number, number, number, number] = [100, 100, 120, 40]) {
    const cardId = backgroundMode ? currentBackgroundId : currentCardId;
    const id: string = uuid();
    setElementList([...elementList, { id: id, type: type, cardId: cardId, pos: pos }]);
    // nextOffset();
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
