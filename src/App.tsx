import {DragDropContext, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {toDoState} from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;


function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onDragEnd = (info: DropResult) => {
        console.log(info);
        const {destination, draggableId, source} = info;
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            // same board movement.
            setToDos((allBoard) => {
                const boardCopy = [...allBoard[source.droppableId]]
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, draggableId);
                return {
                    ...allBoard,
                    [source.droppableId]: boardCopy
                };
            })
        }
        if (destination?.droppableId !== source.droppableId) {
            // cross board movement.
            setToDos((allBoard) => {
                const sourceBoard = [...allBoard[source.droppableId]];
                const destinationBoard = [...allBoard[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination.index, 0, draggableId);

                return {
                    ...allBoard,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard
                };
            });

        }

    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {
                        Object.keys(toDos).map(boardId => <Board key={boardId} toDos={toDos[boardId]}
                                                                 boardId={boardId}/>)
                    }
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;