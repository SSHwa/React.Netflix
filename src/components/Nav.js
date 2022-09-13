import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        console.log(window.scrollY);
        if (window.scrollY > 50) {
          handleShow(true);
        } else {
          handleShow(false);
        }
        return () => {
          window.removeEventListener("scroll", () => {});
        };
      },
      []
    );
  });
  const handleChange = (e) => {
    var txt = e.target.value;
    setSearchValue(txt);
    if (txt === "") {
      navigate(`/`);
    } else {
      navigate(`/search?q=${txt}`);
    }
  };

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/300px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색하세요"
      />
      <img
        alt="User logo"
        src="data:image/jpeg;base64,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"
        className="nav__avata"
        onClick={() => window.location.reload()}
      />
    </nav>
  );
}

export default Nav;
