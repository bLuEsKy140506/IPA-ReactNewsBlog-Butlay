import { NavLink, Link, Outlet } from "react-router-dom";
import { useState } from "react";
import logo from "./logo2.jpg";
import burgerNav from "./burgerNav.svg";
import Footer from "../pages/static/Footer";

import "./RouteLayout.css";

export default function RouteLayout() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive((current) => !current);
  };
  return (
    <div className="route-layout">
      <header>
        <nav className={isActive ? `header-nav mobile-overlay` : "header-nav"}>
          <div className="flex-row header-nav-logo">
            <Link to="/" className="logo">
              <img src={logo} alt="fictional-website-logo" className="logo" />
            </Link>
            <img
              src={burgerNav}
              alt="burger-nav"
              className="burger-nav"
              onClick={handleClick}
            />
          </div>

          <div
            className={isActive ? `header-nav-lvl2 show` : "header-nav-lvl2"}
            style={{
              zIndex: 2,
            }}
          >
            <div className="flex-row header-nav-link">
              <NavLink to="/" className="active-link">
                Blog
              </NavLink>
              <NavLink to="#">About us</NavLink>
              <NavLink to="#">Reviews</NavLink>
            </div>

            <div className="flex-row header-nav-signup">
              <a href="#" className="sign-up">
                Sign up
              </a>
              <a href="#" className="log-in">
                Log in
              </a>
            </div>
          </div>
        </nav>
      </header>
      {/* <Breadcrumbs /> */}

      <main className="post-display">
        {" "}
        <Outlet button={isActive} />{" "}
      </main>

      <Footer />
    </div>
  );
}
