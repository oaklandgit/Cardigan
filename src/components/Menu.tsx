import './Menu.css';

export default function Menu({ label, items }) {

  return (

    <div className="menuLabel">{label}

      {/*
      {items &&
      <ul className="menu">
        {items.map((item: { label: string }) => 
          <li>{item.label}</li>
        )}
      </ul>
      }
      */}

    </div>
  )
}