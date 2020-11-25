    
    //validation checks
    function findPossibilities (row, col){
        let test = 0;
        let temp = [];
        for(let i = 1;i <= size;i++){
            temp[i] = i;
        }
        for(let i =  1; i <= size ; i++){
            test = givenAnswers[row][i];
            temp[test] = 0;
            test = givenAnswers[i][col];
            temp[test] = 0;
        }
        let rowStart = Math.floor((row-1)/Math.sqrt(size))*Math.sqrt(size)+1;
        let colStart = Math.floor((col-1)/Math.sqrt(size))*Math.sqrt(size)+1;
        let rowEnd = rowStart + Math.sqrt(size) -1;
        let colEnd = colStart + Math.sqrt(size) -1;
        for(let blockRow = rowStart; blockRow <= rowEnd; blockRow++){
            for(blockCol = colStart; blockCol <= colEnd; blockCol++){
                test = givenAnswers[blockRow][blockCol];
                temp[test] = 0;
            }
        }
        possibiies[row][col] = temp;
    }
    function checkValid(row,col){
        let number = givenAnswers[row][col];
        if(number == 0){
            return false;
        }
        givenAnswers[row][col] = 0;
        findPossibilities(row, col);
        let test = (possibiies[row][col][number] == number);
        givenAnswers[row][col] = number;
        return test;
    }
    function checkClashes(row,col,answerAdded){
        let number = givenAnswers[row][col];
        givenAnswers[row][col] = 0;
        let rowStart = Math.floor((row-1)/Math.sqrt(size))*Math.sqrt(size)+1;
        let colStart = Math.floor((col-1)/Math.sqrt(size))*Math.sqrt(size)+1;
        let rowEnd = rowStart + Math.sqrt(size) -1;
        let colEnd = colStart + Math.sqrt(size) -1;
        if(answerAdded){
            //Need to check it is valid and higlight any clashes
            findPossibilities(row, col);
            if(possibiies[row][col][number] != number){
                //mark things wrong.
                markWrong(row,col);
                //row and column checks
                for(let check = 1;check <= size;check++){
                    if(givenAnswers[row][check]==number){
                         markWrong(row,check);
                    }
                    if(givenAnswers[check][col]==number){
                         markWrong(check,col);
                    }
                }
                //block check
                for(let blockRow = rowStart; blockRow <= rowEnd; blockRow++){
                    for(blockCol = colStart; blockCol <= colEnd; blockCol++){
                        if(givenAnswers[blockRow][blockCol] == number){
                            markWrong(blockRow,blockCol);
                        }
                    }
                }
            }
            givenAnswers[row][col] = number;
        }
        else {
            //Need to remove unneeded 'wrong' tags
            unmarkWrong(row,col);
            for(let check = 1;check <= size;check++){
                if(checkValid(row,check)){
                     unmarkWrong(row,check);
                }
                if(checkValid(check,col)){
                     unmarkWrong(check,col);
                }
            }
            //block check
            for(let blockRow = rowStart; blockRow <= rowEnd; blockRow++){
                for(let blockCol = colStart; blockCol <= colEnd; blockCol++){
                    if(checkValid(blockRow,blockCol)){
                        unmarkWrong(blockRow,blockCol);
                    }
                }
            }
        }
    }
    function KnocksOutRowCol(){
        var wipesOutRowOrCol = false;
        for(var i = 1; i <= size; i++){
            if(beginingNumbers[row][i-1] == 0){
                if(numberPosibities(row,i) == 1 && givenAnswers[row][i] == givenAnswers[row][col]){
                    wipesOutRowOrCol = true;
                    break;
                }
            }
            if(beginingNumbers[i][col-1] == 0 && givenAnswers[i][col] == givenAnswers[row][col]){
                if(numberPosibities(i,col) == 1){
                    var wipesOutRowOrCol = true;
                    break;
                }
            }
        }
        return wipesOutRowOrCol;
    }

    //Solvers -- used to create grids
    function fillColmuns (row, colsToFill){
        var foundOne = false;
        for(var number = 1; number <= size; number++){
            var col = [];
            for(var testCol = 0; testCol < colsToFill.length; testCol++){
                findPossibilities (row, colsToFill[testCol]);
                if(possibiies[row][colsToFill[testCol]][number] == number){
                    col.push(colsToFill[testCol]);
                }
            }
            if(col[0] != undefined && col.length == 1){
                givenAnswers[row][col[0]] = number;
                colsToFill.splice(colsToFill.indexOf(col[0]),1);
                foundOne = true;
            }
        }
        return foundOne;
    }
    function fillBlock(row, col, colsToFill){
        var foundOne = false;
        rowStart = Math.floor((row-1)/Math.sqrt(size))*Math.sqrt(size)+1;
        colStart = Math.floor((col-1)/Math.sqrt(size))*Math.sqrt(size)+1;
        rowEnd = rowStart + Math.sqrt(size) -1;
        colEnd = colStart + Math.sqrt(size) -1;
        var count = 0;
        for(var blockRow = rowStart; blockRow <= rowEnd; blockRow++){
            for(var blockCol = colStart; blockCol <= colEnd; blockCol++){
                if(givenAnswers[blockRow][blockCol] == 0){
                    findPossibilities(blockRow,blockCol);
                    count = 0;
                    var temp = 0;
                    for(var number = 1;number <= size;number++){
                        if(possibiies[blockRow][blockCol][number]==number){
                            temp = number;
                            count++;
                        }
                    }
                    if(count==1){
                        if(row == blockRow){
                            colsToFill.splice(colsToFill.indexOf(temp),1);
                        }
                        givenAnswers[blockRow][blockCol] = temp;
                        foundOne = true;
                    }
                }
            }
        }
        return foundOne;
    }
    function fillRow(row,colsToFill){
        var foundOne = fillColmuns(row,colsToFill);
        for(var test = 1; test < size; test += Math.sqrt(size)){
            foundOne = foundOne || fillBlock(row,test,colsToFill);
        }
        if(foundOne){
            fillRow(row,colsToFill);
        }
    }
    function numberPosibities(row,col){
        findPossibilities(row,col);
        let count = 0;
        for(var i = 1;i <= size;i++){
            if(possibiies[row][col][i] != 0){
                count++;
            }
        }
        return count;
    }
    // in the square currently looking at; This is only used in random grids
    function leastOptions(){
        var temp = [];
        var index = [0,0];
        var number = size + 1;
        for ( var row = rowStart; row <= rowEnd; row ++){
            for ( var col = colStart; col <= colEnd; col ++){
                if(givenAnswers[row][col] == 0){
                    findPossibilities(row, col);
                    temp = [];
                    for(var i = 0; i <= size; i++){
                        if(possibiies[row][col][i] != 0){
                            temp.push(possibiies[row][col][i]);
                        }
                    }
                    if(temp.length == 1) {
                        //it's only got one option: There can be no fewer, so return it.
                        return [row, col, [temp]];
                    } else if(temp.length < number){
                        index = [row, col, temp];
                        number = temp.length;
                    }
                }
            }
        }
        return index;
    }
