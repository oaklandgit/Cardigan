import { useState } from 'react';
import { menubarItems } from './menubarItems';
import { v4 as uuid } from 'uuid';
import Menu from './Menu';
import MenuItem from './MenuItem';
import styles from './Menubar.module.css';

export default function Menubar({
  mode,
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

  /* /////////// MENU STATE ///////////// */

  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);

  const toggleMenu = (index: number) => {
    if (selectedMenuIndex === index) {
      setSelectedMenuIndex(null);
      return;
    }
    setSelectedMenuIndex(index);
  }

  /* /////////// MENU ACTIONS ///////////// */

  // where to place new elements
  const startPosition = { x: 200, y: 100 };
  const [nextOffset, setNextOffset] = useState(startPosition);

  const addElement = (type: "button" | "field", pos: [number, number, number, number] = [nextOffset.x, nextOffset.y, 120, 40]) => {

    const cardId = backgroundMode ? currentBackgroundId : currentCardId;
    setElementList([...elementList, { id: uuid(), type: type, cardId: cardId, pos: pos }]);
    setNextOffset({ x: nextOffset.x + 8, y: nextOffset.y + 8 });

    if (nextOffset.x > 300) {
      setNextOffset(startPosition);
    }

  }

  const actions = {

    newButton: () => {
      addElement("button");
    },

    newField: () => {
      addElement("field");
    },

    newCard: () => {
      const id = uuid();
      setCardList([...cardList, { id: id, backgroundId: currentBackgroundId }]);
      setCurrentCardId(id);
    },

    prevCard: () => {
      const allCards = cardList.filter(card => card.backgroundId != undefined);
      const currIndex = allCards.findIndex(card => card.id === currentCardId);
      const prevId = currIndex !== 0 ? allCards[currIndex - 1].id : allCards[allCards.length - 1].id;
      setCurrentCardId(prevId);
    },

    nextCard: () => {
      const allCards = cardList.filter(card => card.backgroundId != undefined);
      const currIndex = allCards.findIndex(card => card.id === currentCardId);
      const nextId = currIndex !== allCards.length - 1 ? allCards[currIndex + 1].id : allCards[0].id;
      setCurrentCardId(nextId);
    },

    backgroundMode: () => {
      setBackgroundMode(!backgroundMode);
    }


  }

  const doAction = (action: string) => {
    actions[action]();
  }

  /* /////////// MENU COMPONENT ///////////// */

  return (

    <div className={`${styles.menubar} ${mode && styles.backgroundMode}`}>

      {menubarItems.map((menu, i) =>
      (
        <div
          key={i}
          onClick={() => toggleMenu(i)}
          onMouseLeave={() => setSelectedMenuIndex(null)}
        >
          <Menu
            title={menu.label}
            isActive={i === selectedMenuIndex}
          >
            {menu.items?.map((item, j) =>

              <div onMouseUp={() => doAction(item.action)}>
                <MenuItem
                  key={j}
                  title={item.label}
                  shortcut={item.shortcut}
                  section={item.section}
                />
              </div>
            )}
          </Menu>
        </div>
      )
      )}

    </div>
  )
}