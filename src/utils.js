export const Shuffle = (array) =>{
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

export const rando = () =>{
        const colors = ['purple', 'orange', 'red', 'green', 'yellow', 'blue', 'white', 'blue']
        let randomColor = colors[Math.floor(Math.random()*colors.length)];
        return randomColor
     }


export const find_next_non_null = (previousState,rowIndex, column) =>{
        for(let i=rowIndex-1; i >= 0; i--){
            if(previousState[i][column] !==null){
                return i
            }
        }
    }

export const findMatches = (inputSquares) => {
    //vertical check
    let squares = [...inputSquares]
    let toChange = []
    for(let row = squares.length-1; row >= 0 ; row--) {
        for(let column = 0; column < squares[row].length; column++) {
            console.log(squares[row][column])
            if(squares[row + 1] && squares[row + 2]){
                if(squares[row + 1][column] && squares[row + 2][column]){
                    if (squares[row][column]=== squares[row + 1][column] && squares[row][column]===squares[row + 2][column]){
                        toChange.push({row: row, column: column})
                        toChange.push({row: row + 1, column:column})
                        toChange.push({row: row + 2, column: column})
                    }
                }
            }

            if(squares[row - 1] && squares[row - 2]){
                if(squares[row - 1][column] && squares[row - 2][column]){
                    if (squares[row][column]=== squares[row - 1][column] && squares[row][column]===squares[row - 2][column]){
                        toChange.push({row: row, column: column})
                        toChange.push({row: row - 1, column:column})
                        toChange.push({row: row - 2, column: column})
                    }
                }
            }

                //horizontal check
                if(squares[row][column +1] && squares[row ][column +2]){
                    if(squares[row][column] === squares[row][column +1] && squares[row][column]===squares[row ][column +2]){
                        toChange.push({row: row, column: column })
                        toChange.push({row: row, column:column + 1})
                        toChange.push({row: row, column: column + 2})
                    }
                }

                if(squares[row][column -1] && squares[row ][column -2]){
                    if(squares[row][column] === squares[row][column -1] && squares[row][column]===squares[row ][column -2]){
                        toChange.push({row: row, column: column })
                        toChange.push({row: row, column:column - 1})
                        toChange.push({row: row, column: column - 2})
                    }
                }
        }
    }

    if(toChange.length ===0){
        return null
    }
    
    squares = null_matches(squares, toChange)

        return squares       
}



export const null_matches =(squares, toChange)=>{
        for(let i=0; i < toChange.length; i++){
        let pair = toChange[i]
        let row = pair.row
        let column = pair.column

        squares[row][column] = null
    }
    return squares
}

