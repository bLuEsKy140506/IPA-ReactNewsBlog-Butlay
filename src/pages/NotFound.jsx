import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Not Found</h2>
      <NavLink to="/">Go back to the HOME PAGE</NavLink>
    </div>
  );
}
