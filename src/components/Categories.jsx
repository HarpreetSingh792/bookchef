import React from "react";
import { GiIndianPalace, GiChopsticks, GiHamburger } from "react-icons/gi";
import { FaPizzaSlice } from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Categories = () => {
  return (
    <>
      <List>
        <NavList to={"/cuisine/Indian"}>
          <div>
            <GiIndianPalace />
          </div>
          <p>Indian</p>
        </NavList>

        <NavList to={"/cuisine/Chinese"}>
          <div>
            <GiChopsticks />
          </div>
          <p>Chinese</p>
        </NavList>
        <NavList to={"/cuisine/American"}>
          <div>
            <GiHamburger />
          </div>
          <p>American</p>
        </NavList>
        <NavList to={"/cuisine/Italian"}>
          <div>
            <FaPizzaSlice />
          </div>
          <p>Italian</p>
        </NavList>
      </List>
    </>
  );
};
const List = styled.div`
  margin: 2rem 0rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const NavList = styled(NavLink)`
  text-decoration: none;
  svg {
    font-size: 30px;
    color: white;
  }
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: grid;
    background: linear-gradient(98deg, darkorange, yellow);
    filter: brightness(0.7);
  }
  p {
    margin: 0.2rem 0rem;
    font-family: "Fondamento", cursive, san-serif;
    font-weight: 700;
    color: grey;
  }
  &:hover > p {
    transition: 0.4s;
    color: black;
  }
  &:hover > div>svg {
    transition: 0.4s;
    color: black;
    filter: brightness(1);
  }
  &:hover > div{
    transition: 0.1s;
    color: black;
    filter: brightness(1);
  }
  &.active > div {
    color: black;
    filter: brightness(1);
  }
  &.active > div > svg {
    color: black;
    filter: brightness(1);
  }
  &.active > p {
    color: black;
  }
`;
export default Categories;
