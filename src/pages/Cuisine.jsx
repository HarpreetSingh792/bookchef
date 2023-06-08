import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import bufferLogo from "../buffer.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Cuisine = () => {
  const [cuisinedata, setCuisineData] = useState([]);
  let { type } = useParams();
  const getData = async (name) => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=19&cuisine=${name}`
      );
      const data = await res.json();
      setCuisineData(data.results);
    } catch (err) {
      console.error("Unable to fetch, Internal Server Problem!!!");
      setCuisineData(undefined);
    }
  };
  useEffect(() => {
    getData(type);
    // console.log(cuisinedata);
  }, [type]);
  return (
    <>
      <Wrapper>
        {cuisinedata ? (
          cuisinedata.map((items) => {
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
                <Link to={"/recipes/" + items.id}>
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
    </>
  );
};
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  justify-self: center;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-grap: 3rem;
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
  & > a > img:hover {
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
export default Cuisine;
