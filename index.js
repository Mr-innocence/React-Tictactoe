function Square (props){
    return (
        <button 
            className="square" 
            onClick={() => { props.onClick() }}
        >
          {props.value}
        </button>
      );

}
  
  class Board extends React.Component {
    handleClick(i){
        const squares = this.props.squares.slice();
        if(calculateWinner(calculateWinner(squares)) || squares[i] ){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    renderSquare(i) {
    return <Square 
        value={this.state.squares[i]} 
        onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history:[{
                squares: Array(9).fill(null),

            }],
           
            xIsNext: true,
        };
    }

    render() {
        const history = this.state.history;
        const current = this.state.history[history.length-1];
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner){
            status = 'winner is ' + winner;

        }else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>status</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares){
      const winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < winLines.length; i++){
          const [a,b,c] = winLines[i];
          if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
              return squares[a];
          }
      }
      return null;
  }
  