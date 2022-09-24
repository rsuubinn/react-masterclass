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

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: tomato;
  width: 200px;
  height: 200px;
  animation: ${lotateAnimation} 1s linear infinite;
  ${Emoji} {
    font-size: 30px;
    &:hover {
      font-size: 96px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>🥸</Emoji>
      </Box>
      <Emoji>🔥</Emoji>
    </Wrapper>
  );
}

export default App;
