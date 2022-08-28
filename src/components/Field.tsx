import { useEffect } from 'react';
import styles from './Field.module.css';

export default function Field({
  id,
  x, y,
  w, h,
  handleMount,
  handleBlur
}) {

  let content = "loading…"

  useEffect(() => {
    handleMount(id);
  }, []);

  return (
    <textarea
      className={styles.field + ' movable'}
      id={id}
      style={{ left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` }}
      defaultValue={content}
      onBlur={(el) => handleBlur(el, id)}
    >
    </textarea>
  )
}