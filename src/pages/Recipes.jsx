import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GiPaperArrow } from "react-icons/gi";
import { motion } from "framer-motion";
export const Recipes = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState([]);
  const [activeTab, setActiveTab] = useState("instruction");
  const getRecipeData = async (id) => {
    try {
      let fetchedData = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await fetchedData.json();
      console.log(data);
      setRecipeData(data);
    } catch (error) {
      console.error("Unable to fetch, Internal Server Problem!!!");
    }
  };
  useEffect(() => {
    getRecipeData(id);
    console.log(id);
  }, [id]);
  return (
    <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "linear",
            duration: 1,
          }}
          exit={{ opacity: 0 }}
        >
      <Wrapper>
          <div>
            <img src={recipeData.image} alt="item" />
            <p>{recipeData.title}</p>
          </div>
          <Grid>
            <ButtonWrapper>
              <Button
                onClick={() => {
                  setActiveTab("instruction");
                  console.log(activeTab);
                }}
                className={activeTab === "instruction" ? "active" : ""}
              >
                Instruction
              </Button>
              <Button
                onClick={() => {
                  setActiveTab("ingredient");
                  console.log(activeTab);
                }}
                className={activeTab === "ingredient" ? "active" : ""}
              >
                Ingredient
              </Button>
            </ButtonWrapper>
            {activeTab === "instruction" && (
              <div>
                <h4
                  dangerouslySetInnerHTML={{ __html: recipeData.instructions }}
                ></h4>
                <h3>Summary</h3>
                <h4
                  dangerouslySetInnerHTML={{ __html: recipeData.summary }}
                ></h4>
              </div>
            )}
            {activeTab === "ingredient" &&
              recipeData.extendedIngredients.map((item) => {
                return (
                  <ul key={item.id}>
                    <GiPaperArrow />
                    <li
                      dangerouslySetInnerHTML={{ __html: item.original }}
                    ></li>
                  </ul>
                );
              })}
          </Grid>
      </Wrapper>
        </motion.div>
    </>
  );
};
const Wrapper = styled.div`
  display: grid;
  padding: 1.5rem;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  // align-items: center;
  justify-self: center;
  gap: 5rem;

  img {
    margin-top: 10vw;
    width: 250px;
    height: 180px;
    border: 2px solid black;
    border-radius: 1rem;
  }

  p {
    font-family: "Fondamento", cursive, san-serif;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.3rem;
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 1.3px solid rgba(20, 20, 20, 0.7);
  border-radius: 2rem;
  font-family: "Time New Roman", cursive, san-serif;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0rem 0.2rem;
  width: 7rem;
  height: 2.5rem;
  box-shadow: 4px 4px 5px inset rgba(20, 20, 20, 0.7),
    2px 2px 5px rgba(20, 20, 20, 0.7);
  &:hover {
    transition: 0.5s;
    background: rgb(105, 105, 105);
    color: white;
  }
  &.active {
    background: rgb(50, 50, 50);
    color: white;
  }
`;
const Grid = styled.div`
  display: grid;
  width: 40rem;
  justify-content: center;
  margin: 1.2rem 0rem;
  border-radius: 1.1rem;
  padding: 1rem 1.2rem;
  background: rgb(251, 251, 251);
  border: 2px solid black;
  button {
    margin-bottom: 1.2rem;
  }

  div > h3 {
    margin-top: 15px;
    text-decoration: underline;
    font-weight: bold;
  }
  div > h4 {
    margin: 0rem 1.3rem;
    text-align: justify;
  }
  div > h4 > a {
    color: black;
  }

  a:hover {
    color: blue;
  }
  ul {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    svg {
      transform: rotate(-45deg);
    }
    li {
      text-align: start;
    }
  }
  @media (max-width: 1444px) {
    width: 45rem;
  }
  @media (max-width: 1300px) {
    align-items: center;
    width: 40rem;
  }
  @media (max-width: 768px) {
    align-items: center;
    width: 90vw;
  }
  @media (max-width: 400px) {
    align-items: center;
    width: 90vw;
    margin: 0rem;
  }
  @media (max-width: 300px) {
    h3 {
      font-size: 1rem;
    }
    h4 {
      font-size: 0.7rem;
    }
    margin: 0rem 1.8rem;
    width: 220px;
  }
`;
