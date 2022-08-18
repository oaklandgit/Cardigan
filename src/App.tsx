import { useState, useEffect } from 'react';
import Menubar from './components/Menubar';
import Card from './components/Card';
import Debugger from './components/Debugger';
import { getMaxZIndex } from './lib/helpers';
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
  const [currentBackgroundId, setCurrentBackgroundId] = useState(defaultBackgroundId);
  const [cardElements, setCardElements] = useState([]);
  const [backgroundElements, setBackgroundElements] = useState([]);
  const [newOffset, setNewOffset] = useState(newElementPosition);
  const [backgroundMode, setBackgroundMode] = useState(false);

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

    // move to top
    activeElement.style.zIndex = getMaxZIndex('.movable') + 1;

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
    setElementList([...otherElements, updatedElement]);
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

        <Debugger
          cardList={cardList}
          setCardList={setCardList}
          elementList={elementList}
          setElementList={setElementList}
          currentCardId={currentCardId}
          setCurrentCardId={setCurrentCardId}
          backgroundMode={backgroundMode}
          setBackgroundMode={setBackgroundMode}
          currentBackgroundId={currentBackgroundId}
          setCurrentBackgroundId={setCurrentBackgroundId}
        />

      </div>

    </>
  );
}

export default App;