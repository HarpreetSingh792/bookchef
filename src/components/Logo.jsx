import BookChef from "../Book Chef.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
export const Logo = () => {
  return (
    <Link to={"/"}>
      <Log>
        <img src={BookChef} alt="logo" />
      </Log>
    </Link>
  );
};
const Log = styled.div`
display:block;
position:absolute;
top:-5px;
left:2vw;
  width: 10vw;
  height: 45px;
  img {
    width:16vw;
    height: 45px;
  }
  &:hover {
    cursor: pointer;
  }
`;
