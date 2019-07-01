import React from 'react';
import Square from './Square'
import * as utils from '../utils.js'




class Board extends React.Component {

		state = {
		squares: utils.Shuffle([
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

		for(let rowIndex = previousState.length-1; rowIndex >= 0; rowIndex--){
			for(let column in previousState[rowIndex]){
				if(previousState[rowIndex][column] === null){
					let found = utils.find_next_non_null(previousState,rowIndex,column)
					if(found === undefined){
						previousState[rowIndex][column] = utils.rando()
					}else{
						previousState[rowIndex][column] = previousState[found][column]
						previousState[found][column] = null
						
					}
				}
			}
		}
		this.setState({
			squares: previousState
		})
	}
	checkForMatch = (row,column) =>{
		//vertical check
		let squares = [...this.state.squares]
		// let row = this.state.selectedRow
		// let column = this.state.selectedColumn
		let toChange = []
		if(squares[row + 1] && squares[row + 2]){
			if(squares[row + 1][column] && squares[row + 2][column]){
				if (squares[row][column]=== squares[row + 1][column] && squares[row + 2][column]){
					toChange.push({row: row, column: column})
					toChange.push({row: row + 1, column:column})
					toChange.push({row: row + 2, column: column})
					//this.checkForMatch(row+1,column)
					//this.checkForMatch(row+2, column)
				}
			}
		}
		if(squares[row - 1] && squares[row - 2]){
			if(squares[row - 1][column] && squares[row - 2][column]){
				if (squares[row][column]=== squares[row - 1][column] && squares[row - 2][column]){
					toChange.push({row: row, column: column})
					toChange.push({row: row - 1, column:column})
					toChange.push({row: row - 2, column: column})
					//this.checkForMatch(row-1, column)
					//this.checkForMatch(row-2,column)
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
					//this.checkForMatch(row,column+1)
					//this.checkForMatch(row,column+2)
				}
			}
			if(squares[row][column -1] && squares[row ][column -2]){
				if(squares[row][column] === squares[row][column -1] && squares[row ][column -2]){
					toChange.push({row: row, column: column })
					toChange.push({row: row, column:column - 1})
					toChange.push({row: row, column: column - 2})
					//this.checkForMatch(row, column-1)
					//this.checkForMatch(row,column-2)
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
		if(this.state.selectedColumn !== null && this.state.selectedRow !== null){
			let previousState = [...this.state.squares]
			let previous = previousState[this.state.selectedRow][this.state.selectedColumn]
			previousState[this.state.selectedRow][this.state.selectedColumn] = previousState[rowIndex][index]
			previousState[rowIndex][index] = previous
			this.checkForMatch(rowIndex,index)
			let row = this.state.selectedRow
			let column = this.state.selectedColumn
			this.checkForMatch(row,column)
			this.setState({ squares: previousState, selectedRow: null, selectedRow: null })
		}else{

			this.setState({ selectedColumn: index } )
			this.setState({selectedRow: rowIndex})
		}
	}

	handleRefresh = ()=>{
		let prevBoard = [...this.state.squares]
		this.setState({
			squares: utils.Shuffle(prevBoard)
		})

	}

  render() {


    const board = this.state.squares.map((row, rowIndex)=>{

    	return(
			<div key={rowIndex} className="board-row">
				{row.map((square, index)=>{
				 return <Square onClick={ e => {
				 	this.handleSelect(index,rowIndex)
				 } } value={square}key={index}/>
				})}
			</div>
    	)
    })
    return(
    	<div>
    	{ board }
    	<button onClick={this.handleRefresh}>Refresh</button>
		</div>
    	
    ) 
  }

}

export default Board

