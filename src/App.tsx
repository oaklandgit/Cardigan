import { useState, useEffect } from 'react';
import Menubar from './components/Menubar';
import Card from './components/Card';
import { v4 as uuid } from 'uuid';
import './App.css';

function App() {

  // Load cards and background
  const defaultCardId = '327626c9-3b37-44a0-ac0a-ff52c6523804';
  const defaultBackgroundId = '08540ed8-7065-4183-a371-2c9119389529';

  const emptyStack = [
    { id: defaultBackgroundId }, // a background card, because there's no background id
    { id: defaultCardId, backgroundId: defaultBackgroundId }
  ];

  const [cardList, setCardList] = useState(() => {
    const saved = localStorage.getItem("cardList");
    const initialValue = JSON.parse(saved);
    return initialValue || emptyStack;
  });

  const [currentCardId, setCurrentCardId] = useState(() => {
    const saved = localStorage.getItem("currentCardId");
    const initialValue = saved;
    return initialValue || defaultCardId;
  });

  // Load elements 
  const [elementList, setElementList] = useState(() => {
    const saved = localStorage.getItem("elementList");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const newElementPosition = 100;

  // other reactive components
  const [currentBackgroundId, setCurrentBackgroundId] = useState(0);
  const [cardElements, setCardElements] = useState([]);
  const [backgroundElements, setBackgroundElements] = useState([]);
  const [newOffset, setNewOffset] = useState(newElementPosition);
  const [backgroundMode, setBackgroundMode] = useState(false);

  //helper
  const cardIndexById = (id: string) => {
    return cardList.findIndex(item => item.id === id);
  }

  const prevCard = () => {

    const prevCards = cardList.filter((card) => {
      return card.backgroundId && card.id != currentCardId;
    });

    const prevCardId = prevCards[prevCards.length - 1].id;
    console.log(prevCards, prevCardId);

    setCurrentCardId(prevCardId);
  }


  // const currIndex = cardIndexById(currentCardId);
  // //  previous card is the nearest one that has a background defined
  // let prevIndex: number | false = cardList.map(card => card.backgroundId !== null).lastIndexOf(true, currIndex - 1);

  // if (!prevIndex && prevIndex !== 0) {
  //   prevIndex = cardList.map(card => card.backgroundId !== null).lastIndexOf(true, cardList.length - 1);
  // }

  // setCurrentCardId(cardList[prevIndex].id);

  // setCurrentCardId(currentCardId > 1 ? currentCardId - 1 : 1);

  const nextCard = () => {
    setCurrentCardId(currentCardId < cardList.length ? currentCardId + 1 : cardList.length);
  }

  const addCard = () => {
    const id = cardList[cardList.length - 1]?.id + 1 || 1;
    setCardList([...cardList, { id: id, backgroundId: currentBackgroundId }]);
    setCurrentCardId(id);
  }

  const nextOffset = () => {
    const setTo = newOffset < 200 ? newOffset + 10 : newElementPosition;
    setNewOffset(setTo);
  }

  const addElement = (
    type: "button" | "field",
    pos: [number, number, number, number] = [newOffset, newOffset, 120, 40]) => {

    const cardId = backgroundMode ? currentBackgroundId : currentCardId;
    const id: string = uuid();
    setElementList([...elementList, { id: id, type: type, cardId: cardId, pos: pos }]);
    nextOffset();

  }

  useEffect(() => {
    localStorage.setItem("elementList", JSON.stringify(elementList));
  }, [elementList]);

  useEffect(() => {
    localStorage.setItem("cardList", JSON.stringify(cardList));
  }, [cardList]);

  useEffect(() => {
    localStorage.setItem("currentCardId", currentCardId);
  }, [currentCardId]);

  useEffect(() => {
    setCardElements(elementList.filter((el) => el.cardId === currentCardId))
  }, [currentCardId, elementList])

  useEffect(() => {
    setBackgroundElements(elementList.filter((el) => el.cardId === currentBackgroundId))
  }, [currentBackgroundId, elementList])


  let activeElement = null;
  let activeElementAction = null;

  const grabElement = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    if (!element.classList.contains('movable')) return;

    activeElement = element;

    const rect = activeElement.getBoundingClientRect();

    activeElementAction = (Math.abs(e.clientX - rect.right) < 20 && Math.abs(e.clientY - rect.bottom) < 20) ? "resize" : "drag";


  }

  const moveElement = (e) => {
    if (!activeElement) return;

    const x = activeElement.offsetLeft + e.movementX;
    const y = activeElement.offsetTop + e.movementY;

    if (x < 0 || x + activeElement.offsetWidth > 512) return;
    if (y < 0 || y + activeElement.offsetHeight > 342) return;

    if (activeElementAction === "drag") {

      activeElement.style.left = `${x}px`;
      activeElement.style.top = `${y}px`;
    } else {

      const w = activeElement.offsetWidth + e.movementX;
      const h = activeElement.offsetHeight + e.movementY;

      activeElement.style.width = `${w}px`;
      activeElement.style.height = `${h}px`;

    }

  }

  const updateElementPosition = (id: string, x: number, y: number, w: number, h: number) => {
    const otherElements = elementList.filter(el => el.id !== id);
    const updatedElement = elementList.filter(el => el.id === id)[0];
    updatedElement.pos = [x, y, w, h];
    setElementList([updatedElement, ...otherElements]);
  }

  const releaseElement = () => {
    if (activeElement) {
      updateElementPosition(
        activeElement.id,
        activeElement.offsetLeft,
        activeElement.offsetTop,
        activeElement.offsetWidth,
        activeElement.offsetHeight
      );
      activeElement = null;
      activeElementAction = null;
    }
  }

  return (
    <>
      <div id="desktop"
        onMouseDown={e => grabElement(e)}
        onMouseMove={e => moveElement(e)}
        onMouseUp={e => releaseElement()}
      >
        <Menubar mode={backgroundMode} />

        <div id="stack">
          {/* background */}
          <Card
            key={currentBackgroundId}
            elements={backgroundElements}
            isBackground={true}
          />

          {/* active card */}
          {!backgroundMode &&
            <Card
              key={currentCardId}
              elements={cardElements}
              isBackground={false}
            />
          }

        </div>

        <div id="debuggerbar">
          <button onClick={addCard}>+ card</button>
          <button onClick={() => addElement("button")}>+ Button</button>
          <button onClick={() => addElement("field")}>+ Field</button>
          <button onClick={prevCard}>&lt; Prev</button>
          {currentCardId}
          Idx: {cardIndexById(currentCardId)}{' '}
          Id: {currentCardId.split("-")[0]}
          <button onClick={nextCard}>Next &gt;</button>
          <button onClick={() => setBackgroundMode(!backgroundMode)}>BG Mode</button>
        </div>

      </div>



    </>
  );
}

export default App;