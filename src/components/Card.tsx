import Button from './Button';
import Field from './Field';
import './Card.css';

export default function Card({ elements, isBackground }) {

  return (

    <div id="card" className={isBackground ? 'background' : ''}>
      {elements.map((el: { id: number, type: "button" | "field", pos: [number, number, number, number] }) => {

        if (el.type === "button") {
          return (<Button
            key={el.id}
            id={el.id}
            label="New Button"
            x={el.pos[0]}
            y={el.pos[1]}
            w={el.pos[2]}
            h={el.pos[3]}
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
          />)
        }

      }

      )}

    </div>
  )
}