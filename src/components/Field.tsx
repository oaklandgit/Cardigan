import { useEffect, useRef } from 'react';
import styles from './Field.module.css';

export default function Field({
  id,
  x, y,
  w, h,
  handleMount,
  handleBlur
}) {

  const ref = useRef(null);

  useEffect(() => {
    handleMount(ref, id);
  }, []);

  return (
    <textarea
      ref={ref}
      className={styles.field + ' movable'}
      id={id}
      style={{ left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` }}
      onBlur={(el) => handleBlur(el, id)}
    >
    </textarea>
  )
}