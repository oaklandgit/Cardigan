import Button from './Button';
import Field from './Field';
import styles from './Card.module.css';

export default function Card({ elements, isBackground, handleMount, handleBlur, mode }) {

  return (

    <div className={`${styles.card} ${isBackground && styles.background}`}>

      <canvas className={styles.canvas}></canvas>
      
      {elements.map((el) => {

        if (el.type === "button") {
          return (<Button
            key={el.id}
            id={el.id}
            label="New Button"
            x={el.pos[0]}
            y={el.pos[1]}
            w={el.pos[2]}
            h={el.pos[3]}
            editMode={mode === 'button'}
          />)
        } else if (el.type === "field") {
          return (<Field
            key={el.id}
            id={el.id}
            label="New Field"
            x={el.pos[0]}
            y={el.pos[1]}
            w={el.pos[2]}
            h={el.pos[3]}
            handleMount={handleMount}
            handleBlur={handleBlur}
            editMode={mode === 'field'}
          />)
        }

      }

      )}

    </div>
  )
}