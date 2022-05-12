import styled, {keyframes} from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const animation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0;
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;

  ${Emoji}:hover {
    font-size: 80px;
  }
  
`;

function App() {
    return (
        <Wrapper>
            <Box>
                <Emoji as={"p"}>😘</Emoji>
            </Box>
            <Emoji as={"p"}>👀</Emoji>
        </Wrapper>
    );
}

export default App;
