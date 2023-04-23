import React, { useState } from "react";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const valuess = ["Welcome to your SideWalk"];

function Header() {
  const [burgerStatus, setBurgerStatus] = useState(false);

  return (
    <Container>
      <a href="/landingPage" style={{ color: "black" }}>
        <img
          src="https://api.logo.com/api/v2/images?logo=logo_81dadc42-d4ed-45fc-8ff6-a0647ab2c24e&format=webp&margins=0&quality=60&width=500&background=transparent&u=1681658180"
          alt="Tesla Logo"
          style={{ width: "10rem", color: "black" }}
        />
      </a>
      <Menu>
        {valuess.map((car, index) => (
          <a href="/landingPage" key={index}>
            {car}
          </a>
        ))}
      </Menu>
      <RightMenu>
        <a href="/book" style={{ textDecoration: "none", color: "white" }}>
          Book 
        </a>
        <a href="/bookings" style={{ textDecoration: "none", color: "white" }}>
          Bookings
        </a>
        <CustomMenu
          onClick={() => {
            setBurgerStatus(true);
          }}
        />
      </RightMenu>
      <BurgerNav show={burgerStatus}>
        <CustomClose
          onClick={() => {
            setBurgerStatus(false);
          }}
        />
        {valuess.map((car, index) => (
          <li key={index}>
            <a href="/" key={index}>
              {car}
            </a>
          </li>
        ))}
        <li>
          <a href="/">Existing Inventory</a>
        </li>
        <li>
          <a href="/">Used Inventory</a>
        </li>
        <li>
          <a href="/">Services</a>
        </li>
        <li>
          <a href="/">Contact Us</a>
        </li>
      </BurgerNav>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  a {
    font-weight: 600;
    padding: 0 10px;
    flex-wrap: nowrap;
    border-radius: 10%;
    text-decoration: none;
    color: white;
  }

  a:hover {
    background-color: #62b6b7;
    transition: all 0.6s;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  a {
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 10px;
  }
`;

const CustomMenu = styled(MenuIcon)`
  cursor: pointer;
`;

const BurgerNav = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: white;
  width: 300px;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    a {
      font-weight: 600;
    }
  }
  z-index: 10;
`;

const CustomClose = styled(CloseIcon)`
  align-self: end;
  cursor: pointer;
  margin-right: 10px;
`;

export default Header;
