import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Heading>The requested URL was not found on this server.</Heading>
      <Link to="/">Back to the home page</Link>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  font-size: 14px;
  background-color: #f6f6f6;
  color: #303030;

  a {
    font-size: 2vw;
    font-weight: 500;
    color: #00b;
    text-decoration: underline;

    &:hover,
    &:active {
      color: #303030;
    }

    @media screen and (max-width: 768px) {
      font-size: 4.5vw;
    }
  }
`;

const Heading = styled.h1`
  font-size: 3.33vw;
  padding: 0 4vw;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 6vw;
  }
`;

export default NotFound;
