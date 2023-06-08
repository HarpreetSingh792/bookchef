import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import "@splidejs/react-splide/css";
import styled from "styled-components";
const Popular = () => {
  const [popularData, setPopularData] = useState([]);
  const getData = async () => {
    const localData = localStorage.getItem("popular");
    if (localData) {
      setPopularData(JSON.parse(localData));
      console.log(popularData);
    } else {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=19&query=all`
      );
      const data = await res.json();
      console.log(data.results);
      localStorage.setItem("popular", JSON.stringify(data.results));
      setPopularData(data.results);
      console.log(popularData);
    }
  };
  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, []);
  return (
    <Wrapper>
      <h2>Popular Stuff</h2>
      <Splide
        options={{
          rewind: true,
          gap: "1rem",
          perPage: 4,
          breakpoints: {
            1024: {
              perPage: 4,
             
            },
            767: {
              perPage: 3,
          
            },
            640: {
              perPage: 2,
              
            },
            400:{
              perPage: 1,
            },
          },
          width: "90vw",
          perMove: 2,
          rewindByDrag: true,
          pagination: false,
          arrows: false,
          autoplay: true,
          interval: 3000,
        }}
      >
        {popularData.map((items) => {
          return (
            <SplideSlide key={items.id}>
              <Card>
                <Link to={"/recipes/" + items.id}>
                  <img alt="" src={items.image} />
                  <p>{items.title.substring(0, 45)}</p>
                </Link>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  justify-self: center;
  margin: 2rem 0rem;
  height: 47vh;
  width: 95vw;
  h2 {
    background: -webkit-linear-gradient(
      98deg,
      red,
      yellow,
      orange,
      yellow,
      red,
      darkorange,
      orange
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Fondamento", cursive;
    fonr-weight: 400;
    font-size: 2rem;
    text-align: start;
    margin-left: 2rem;
  }
  @media (max-width:550px){
    p{
      display:none;
    }
    h2 {
      margin-left: -0.72rem;
      background: -webkit-linear-gradient(
        258deg,
        red,
        red,
        darkorange,
        orange
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }
`;
const Card = styled.div`
  position: relative;
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
export default Popular;
