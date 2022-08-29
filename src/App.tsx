import { useState, useEffect } from 'react';
import Menubar from './components/Menubar';
import Card from './components/Card';
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

  interface Element {
    id: string;
    type: "button" | "field";
    cardId: string;
    pos: [number, number, number, number];
  }

  const newElementPosition = 100;

  // Data

  const testData = [

    {
      type: "string",
      content: "hello",
      cardId: "327626c9-3b37-44a0-ac0a-ff52c6523804",
      elementId: "212780a6-52fe-43e6-a5e3-805e7204fa18"
    }

  ];

  const [stackData, setStackData] = useState(() => {
    const saved = localStorage.getItem("stackData");
    const initialValue = JSON.parse(saved);
    return initialValue || testData;
  });

  interface Data {
    cardId: string;
    elementId: string;
    content: string;
    type: "string"
  }

  // other reactive components
  const [mode, setMode] = useState("browse");
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
    localStorage.setItem("stackData", JSON.stringify(stackData));
  }, [stackData]);

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
    // e.stopPropagation();

    const element = e.target as HTMLElement;

    // don't move non-movable elements
    if (!element.classList.contains('movable')) return;
    if (element.classList.contains('field') && mode !== "field") return;
    if (element.classList.contains('button') && mode !== "button") return;

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
      activeElement.style.left = x + 'px';
      activeElement.style.top = y + 'px';

    } else {

      const w = activeElement.offsetWidth + e.movementX;
      const h = activeElement.offsetHeight + e.movementY;
      activeElement.style.width = w + 'px';
      activeElement.style.height = h + 'px';

    }

  }

  const updateElementPosition = (id: string, x: number, y: number, w: number, h: number) => {
    const newElementList = elementList.map((row: Element) => {
      if (row.id === id) {
        return { ...row, pos: [x, y, w, h] };
      }
      return row;
    });
    setElementList(newElementList);
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

  const handleMount = ((ref, id) => {
    const record = stackData.filter(row => 
      row.elementId === id && row.cardId === currentCardId
    );
  
    ref.current.defaultValue = record[0]?.content;
  });

  const handleBlur = ((el, id) => {

    let exists = false;

    const newDataState = stackData.map((row: Data) => {
      if (row.elementId === id) {
        exists = true;
        return { ...row, content: el.target.value };
      }
      return row;
    });

    if (exists) {
      setStackData(newDataState);
    } else {
      const newRow = {
        type: "string",
        content: el.target.value,
        cardId: currentCardId,
        elementId: id
      }
      setStackData([...stackData, newRow]);
    }

  });

  /* //////////////// COMPONENT //////////////// */

  return (
    <>
      <div id="desktop"
        onMouseDown={e => grabElement(e)}
        onMouseMove={e => moveElement(e)}
        onMouseUp={e => releaseElement()}
      >
        <Menubar
          mode={mode}
          setMode={setMode}
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

        <div id="stack">
          {/* background */}
          <Card
            key={currentBackgroundId}
            elements={backgroundElements}
            isBackground={true}
            handleMount={handleMount}
            handleBlur={handleBlur}
            mode={mode}
          />

          {/* active card */}
          {!backgroundMode &&
            <Card
              key={currentCardId}
              elements={cardElements}
              isBackground={false}
              handleMount={handleMount}
              handleBlur={handleBlur}
              mode={mode}
            />
          }

        </div>

        <div style={{
          marginTop: '16px',
          fontSize: '12px',
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: 'white',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}>
          <div>Card Id: {currentCardId.split('-')[0]}</div>
          <div>Background Id: {currentBackgroundId.split('-')[0]}</div>
          <div>Mode: {mode}</div>
          <div>Background: {backgroundMode.toString()}</div>
        </div>
      </div>



    </>
  );
}

export default App;