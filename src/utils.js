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
