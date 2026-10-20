import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Главная</NavLink>
          </li>
          <li>
            <NavLink to="/about">О нас</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Контакты</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
