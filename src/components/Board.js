import React from 'react';
import Square from './Square'


function Shuffle(array) {
    for (var k = 0; k < array.length; k++) {
        var i = array[k].length;
        if (i === 0)
            return false;
        else {
            while (--i) {
                var j = Math.floor(Math.random() * (i + 1));
                var tempi = array[k][i];
                var tempj = array[k][j];
                array[k][i] = tempj;
                array[k][j] = tempi;
            }
        }
    }
    return array
}

class Board extends React.Component {

		state = {
		squares: Shuffle([
		  ['green', 'orange', 'red', 'green', 'yellow', 'blue', 'white', 'blue'],
		  ['purple', 'orange', 'red', 'green', 'yellow', 'blue', 'white', 'blue'],
		  ['purple', 'orange', 'red', 'green', 'yellow', 'blue', 'white', 'blue'],
		  ['orange', 'red', 'green', 'yellow', 'blue', 'white', 'blue','purple'],
		  ['purple', 'orange', 'red', 'green', 'yellow', 'blue', 'white', 'blue'],
		  ['purple', 'orange', 'red', 'green', 'yellow', 'blue', 'white', 'blue'],
		  ['purple', 'orange', 'red', 'green', 'yellow', 'blue', 'white', 'blue'],
		  ['purple', 'orange', 'red', 'green', 'yellow', 'blue', 'white', 'blue']
		]),

		selectedColumn: null,
		selectedRow: null
		}

	
	fillBoard = () => {
		//shift nulls 
		let previousState = [...this.state.squares]

		for(let row = previousState.length-1; row > 0; row--){
			for(let column in previousState[row]){
				if(previousState[row][column] === null){
					let i = 1
					if(previousState[row-i]){
						previousState[row][column] = previousState[row-i][column]
						i -= 3
					}else{
						 let randColumn = previousState[Math.floor(Math.random()*previousState.length)]
						 let randRow = previousState[Math.floor(Math.random()*previousState.length)]
						 previousState[row][column]= previousState[randRow][randColumn]
					}
					
				}
			}
		}
		this.setState({
			squares: previousState
		})
	}
	checkForMatch = () =>{
		//vertical check
		let squares = [...this.state.squares]
		let row = this.state.selectedRow
		let column = this.state.selectedColumn
		let toChange = []
		if(squares[row + 1] && squares[row + 2]){
			if(squares[row + 1][column] && squares[row + 2][column]){
				if (squares[row][column]=== squares[row + 1][column] && squares[row + 2][column]){
					toChange.push({row: row, column: column})
					toChange.push({row: row + 1, column:column})
					toChange.push({row: row + 2, column: column})
				}
			}
		}
		if(squares[row - 1] && squares[row - 2]){
			if(squares[row - 1][column] && squares[row - 2][column]){
				if (squares[row][column]=== squares[row - 1][column] && squares[row - 2][column]){
					toChange.push({row: row, column: column})
					toChange.push({row: row - 1, column:column})
					toChange.push({row: row - 2, column: column})
				}
			}
		}
		//horizontal check
		if(squares[row]){
			if(squares[row][column +1] && squares[row ][column +2]){
				if(squares[row][column] === squares[row][column +1] && squares[row ][column +2]){
					toChange.push({row: row, column: column })
					toChange.push({row: row, column:column + 1})
					toChange.push({row: row, column: column + 2})
				}
			}
			if(squares[row][column -1] && squares[row ][column -2]){
				if(squares[row][column] === squares[row][column -1] && squares[row ][column -2]){
					toChange.push({row: row, column: column })
					toChange.push({row: row, column:column - 1})
					toChange.push({row: row, column: column - 2})
				}
			}
		}
		
		for(let i=0; i < toChange.length; i++){
			let pair = toChange[i]
			let row = pair.row
			let column = pair.column

			squares[row][column] = null
		}

		this.setState({ squares: squares })
		this.fillBoard()
	}

	handleSelect =(index, rowIndex) =>{
		if(this.state.selectedColumn && this.state.selectedRow){
			let previousState = [...this.state.squares]
			let previous = previousState[this.state.selectedRow][this.state.selectedColumn]
			previousState[this.state.selectedRow][this.state.selectedColumn] = previousState[rowIndex][index]
			previousState[rowIndex][index] = previous
			this.checkForMatch()
			this.setState({ squares: previousState, selectedRow: null, selectedRow: null })
		}else{
			this.setState({ selectedColumn: index } )
			this.setState({selectedRow: rowIndex})
		}
	}

  render() {


    const board = this.state.squares.map((row, rowIndex)=>{

    	return(
			<div key={rowIndex} className="board-row">
				{row.map((square, index)=>{
				 return <Square onClick={ e => {
				 	console.log('this is row', rowIndex)
				 	console.log('this is column', index)
				 	this.handleSelect(index,rowIndex)
				 } } value={square}key={index}/>
				})}
			</div>

    	)
    })
    return(

    	board
    ) 
  }

}

export default Board

