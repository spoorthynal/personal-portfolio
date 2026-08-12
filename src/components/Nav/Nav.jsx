import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { cx } from "../../utils/cx";
import acaiBowl from "../../assets/acai-bowl.png";

const ITEMS = [
  { to: "/", label: "home", end: true },
  { to: "/about", label: "about" },
  { to: "/projects", label: "projects" },
  { to: "/contact", label: "contact" },
];

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <span className={styles.brand}>
        <img src={acaiBowl} alt="" className={styles.brandIcon} />
        spoorthy
      </span>
      <ul className={styles.menu}>
        {ITEMS.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) => cx(styles.navbtn, isActive && styles.navOn)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
