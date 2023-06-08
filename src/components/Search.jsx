import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const Search = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const getSearch = (e) => {
    let data = e.target.value;
    setSearchData(data);
    console.log(searchData);
  };
  return (
    <>
      <FormSearch
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/searched/${searchData}`);
        }}
      >
        <input
          type="text"
          onChange={getSearch}
          placeholder="Search for your taste...🍔"
        />
        <FaSearch />
      </FormSearch>
    </>
  );
};
const FormSearch = styled.form`
  margin: 2rem auto;
  height: 35px;
  width: 50vw;
  position: relative;
  input {
    font-family: "Fondamento", cursive, san-serif;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    color: white;
    height: 35px;
    width: 50vw;
    outline: none;
    border: none;
    border-radius: 2rem;
    background: rgba(20, 20, 20, 0.7);
    padding: 0rem 1.9rem;
  }
  & > svg {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    font-size: 1rem;
    color: whitesmoke;
  }
  & > input::placeholder {
    color: white;
  }
`;
