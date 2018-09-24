import styled from "styled-components";

const fontSize = size => {
  switch (size) {
    case "huge":
      return "6rem";
    case "large":
      return "4rem";
    case "medium":
      return "3rem";
    case "small":
      return "1rem";
    default:
      return "2rem";
  }
};

export default styled.h1`
  color: black !important;
  text-align: center;
  font-size: ${props => fontSize(props.fSize)} !important;
`;
