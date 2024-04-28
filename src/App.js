import Board from "./components/board";

function App() {
  return (
    <div className="App App-header">
      <header className="">
        <h1>Tic Tac Toe</h1>
      </header>
      <section>
        <div className="board">
          <Board />
        </div>
      </section>
    </div>
  );
}

export default App;
