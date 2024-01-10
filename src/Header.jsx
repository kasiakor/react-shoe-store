import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Spike Heels" src="/images/logo.jpg" />
            </Link>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "purple" : "orange",
              })}
              to="/shoes"
            >
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "purple" : "orange",
              })}
              to="/cart"
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
