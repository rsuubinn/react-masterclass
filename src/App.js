import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  background-color: ${(props) => props.bgColor};
  color: white;
  border: 0;
  border-radius: 15px;
`;

function App() {
  return (
    <Father>
      <Btn bgColor="tomato">Login</Btn>
      <Btn as="a" bgColor="teal">
        Login
      </Btn>
    </Father>
  );
}

export default App;
