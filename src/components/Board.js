import React from 'react';
import Square from './Square'


function Shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

class Board extends React.Component {
	constructor(props){
		super(props)
		this.state = {
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

		selected: []
		}

	}

	handleSubmit = event =>{
		let random = Shuffle(this.state.squares)
		this.setState({
			squares: random
		})
	}

	handleClick = event =>{
		alert('click')
	}
  render() {


    const board = this.state.squares.map((row, index)=>{
    	return(
			<div key={index} className="board-row">
				{row.map((square, index)=>{
				 return <Square onClick={this.handleClick} value={square}key={index}/>
				})}
			</div>

    	)
    })
    return(
    	<form type="submit" onSubmit={this.handleRefresh}>
    	{board}
    	<button>Refresh</button>
    	</form>
    ) 
  }
}

export default Board

