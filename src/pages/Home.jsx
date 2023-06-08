import React, { useEffect, useState } from "react";
import Popular from "../components/Popular";
import NonVegie from "../components/NonVegie";
import Vegie from "../components/Vegie";
import styled from "styled-components";
import bufferLogo from "../buffer.svg";
import { motion } from "framer-motion";
function Home() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const localData = localStorage.getItem("popular");
    try {
      if (localData) {
        setData(JSON.parse(localData));
        console.log(data);
      } else {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=10&query=all`
        );
        const data = await res.json();
        console.log(data.results);
        localStorage.setItem("popular", JSON.stringify(data.results));
        setData(data.results);
        console.log(data);
      }
    } catch (err) {
      <img src={bufferLogo} alt="loading" />;
    }
  };
  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, []);
  return (
    <Wrapper>
      {localStorage.getItem("popular") ? (
        <Wrapper>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease: "linear",
              duration: 1,
            }}
            exit={{opacity:0}}
          >
            <Popular />
            <NonVegie />
            <Vegie />
          </motion.div>
        </Wrapper>
      ) : (
        <img src={bufferLogo} alt="loading" />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  padding: 0.7rem 1rem;
  align-items: center;
`;

export default Home;
