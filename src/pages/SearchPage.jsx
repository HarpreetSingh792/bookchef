import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import bufferLogo from "../buffer.svg";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';
export const SearchPage = () => {
  let { search } = useParams();
  const [searchData, setSearchData] = useState([]);
  const getFetchedData = async (name) => {
    try {
      let fetchedData = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=20&query=${name}`
      );
      let data = await fetchedData.json();
      console.log(data.results);
      setSearchData(data.results);
    } catch (err) {
      console.error("Unable to fetch, Internal Server Problem!!!");
      setSearchData(undefined);
    }
  };
  useEffect(() => {
    getFetchedData(search);
  }, [search]);
  return (
    <>
      {searchData.length===0? (
        <h2 style={{"color":"red"}}>Sorry! Nothing Found for your taste! </h2>
      ) : (
        <Wrapper>
          {searchData ? (
            searchData.map((items) => {
              return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      ease: "linear",
                      duration: 1,
                    }}
                    exit={{opacity:0}}
                  >
                <Card key={items.id}>
                  <Link to={"/recipes/"+items.id}>
                  <img alt="" src={items.image} />
                  <p>{items.title.substring(0, 45)}...</p>
                  </Link>
                </Card>
          </motion.div>
              );
            })
          ) : (
            <img class="loading" src={bufferLogo} alt="loading" />
          )}
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  justify-self: center;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-grap: 3rem;
  padding: 0rem 10rem;
  margin: auto;
  .loading {
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
  }
`;
const Card = styled.div`
  width: 300px;
  height: 225px;
  position: relative;
  margin: 2rem 1.7rem;
  border-radius: 2rem;
  object-fit: cover;
  overflow: hidden;
  img {
    filter: brightness(0.45);
    border-radius: 2rem;
  }
  & >a> img:hover {
    cursor: pointer;
    transform: scale(2, 2);
    transition: 0.5s;
  }
  p {
    position: absolute;
    top: 78%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    width: 200px;
    font-family: "Fondamento", cursive, san-serif;
  }
`;
