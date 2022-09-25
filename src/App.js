import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.textColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default App;
