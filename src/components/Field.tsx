import styles from './Field.module.css';

export default function Field({ id, x, y, w, h }) {

  return (
    <textarea
      className={styles.field + ' movable'}
      id={id}
      style={{ left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` }}>
    </textarea>
  )
}