import styles from './Button.module.css';

export default function Button({ id, label, x, y, w, h, editMode }) {

  return (

    <button
      className={`${styles.button} ${editMode && styles.editMode} movable button`}
      id={id}
      style={{
        left: x + 'px',
        top: y + 'px',
        width: w + 'px',
        height: h + 'px'
      }}>
      {label}
    </button>
  )
}