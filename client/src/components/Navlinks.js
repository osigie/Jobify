
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const Navlinks = (props) => {
  return (
    <div className="nav-links">
    {links.map(({ icon, text, id, path }) => {
      return (
        <NavLink
          to={path}
          key={id}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={props.toggleSideBarFunc}
        >
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      );
    })}
  </div>
  )
}

export default Navlinks