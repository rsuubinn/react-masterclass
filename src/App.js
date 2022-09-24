import { keyframes } from "styled-components";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const lotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: tomato;
  width: 200px;
  height: 200px;
  animation: ${lotateAnimation} 1s linear infinite;
  span {
    font-size: 30px;
    &:hover {
      display: none;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>🥸</span>
      </Box>
    </Wrapper>
  );
}

export default App;
