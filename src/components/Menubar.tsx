import { menubarItems } from './menubarItems';
import Menu from './Menu';
import './Menubar.css';

export default function Menubar({ mode }) {

  return (

    <div id="menubar" className={mode ? 'backgroundMode' : ''}>

      <ul className="label">
        {menubarItems.map((item) => (
          <li key={item.id}>
            <Menu label={item.label} items={item.items} />
          </li>
        ))}
      </ul>


    </div>
  )
}