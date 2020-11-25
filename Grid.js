
    function markFinal(){
        //prepare for render
        let identity = '';
        let conflict = '';
        let errors = false;
        for(row = 1; row <= size; row++){
            for(col = 1; col  <= size; col++){
                identity = 'answer' + 'row' + row.toString(17) + '_col' + col.toString(17);
                conflict = document.getElementById(identity);
                if(conflict && conflict.classList.contains('wrong') == false){
                    //this was one of the original numbers
                    beginingNumbers[row][col-1] = givenAnswers[row][col];
                } else {
                    if(conflict && conflict.classList.contains('wrong') == true){
                        //this was a user inputted number
                        errors = true;
                    }
                }
            }
        }
        if(errors){
            alert('Some entries had clashes. They will be erased');
        }
        //finally render the answer
        resetGrid();
    }

    //Grid set-up
    function buildGrid(){
        document.getElementById('puzzle4').innerHTML = '';
        document.getElementById('puzzle9').innerHTML = '';
        document.getElementById('puzzle16').innerHTML = '';
        var puzzle = document.getElementById('puzzle' + size);
        var html = '';
        for(var row = 1; row <= size; row++){
            html += '<div class="row ' + ' row' + row + '">';
            for(var col = 1; col <= size; col++){
                html+= '<div class ="cell' + ' col' + col + '" id="row' + row.toString(17) + '_col' + col.toString(17) + '"></div>';
            }
            html += '</div>';
        }
        puzzle.innerHTML = html;
    }
    function demoGridNumber(){
        if(size==16){
            beginingNumbers[1]=[0xe,0xc,0,0xd,6,0xb,3,0,4,0,9,0x10,0,0,2,0];
            beginingNumbers[2]=[9,0xa,0,0,0,0,0xc,0,8,0,0,0xb,0xd,0,1,0];
            beginingNumbers[3]=[3,0x10,8,0,0xd,0,0,0,0,0xc,2,0xf,0,9,0xb,0];
            beginingNumbers[4]=[0,6,2,0,0,0,0,0,0,0,0xd,0xe,0xc,0x10,0,8];
            beginingNumbers[5]=[0xc,0,0,0xe,8,6,0,0x10,0,4,0xf,0,0xa,0,0xd,0xb];
            beginingNumbers[6]=[0xa,0,3,7,2,0,1,0xe,0,6,0xb,0,8,0,0xf,0x10];
            beginingNumbers[7]=[5,4,0,0,7,0,9,0,3,0,0,0,0,6,0,1];
            beginingNumbers[8]=[0,2,0,0x10,0,0,0,0xa,0,8,0xe,0,5,0,4,9];
            beginingNumbers[9]=[0,0,4,5,0x10,0,0xd,0,2,0,0,0,0,0,0,0];
            beginingNumbers[10]=[1,3,0xc,2,0,8,4,0,0x10,0xe,0,0,0,0,0xa,0xd];
            beginingNumbers[11]=[0,0,0,6,0,0xa,2,7,0,0xd,0,0,0,0xb,0x10,0];
            beginingNumbers[12]=[0xd,8,0,0,5,9,0,0,0xb,0,1,4,3,0,6,7];
            beginingNumbers[13]=[8,7,0,0,0,0xe,0xf,0,0xc,0,0,0,0x10,1,0,2];
            beginingNumbers[14]=[0,0,1,9,4,2,0,0,0,3,0,0,0xb,0xd,7,0];
            beginingNumbers[15]=[2,0,0,0,0xb,0xc,0,1,0,0,0,7,0,0,0,0xa];
            beginingNumbers[16]=[0,0,6,0xc,0xa,0,0x10,0xd,1,0,0,9,0,0xe,0,3];
        } else if(size==9){
            beginingNumbers[1]=[0,0,6,4,9,0,3,5,2];
            beginingNumbers[2]=[0,9,0,0,5,0,1,0,6];
            beginingNumbers[3]=[5,3,0,0,8,1,0,0,7];
            beginingNumbers[4]=[0,0,0,0,0,3,0,0,0];
            beginingNumbers[5]=[8,0,0,0,2,0,0,0,3];
            beginingNumbers[6]=[0,0,0,7,0,0,0,0,0];
            beginingNumbers[7]=[6,0,0,5,7,0,0,4,1];
            beginingNumbers[8]=[9,0,8,0,3,0,0,7,0];
            beginingNumbers[9]=[4,5,7,0,6,8,2,0,0];
        } else if(size==4){
            beginingNumbers[1]=[1,0,3,0];
            beginingNumbers[2]=[0,0,0,2];
            beginingNumbers[3]=[0,3,0,0];
            beginingNumbers[4]=[2,0,0,0];
        }
        document.getElementById('seed').innerHTML = '';
    }
    function setUpGrid(){
        initialisePossibilies();
        demoGridNumber();
        fillGridPen();
        fillPencil();
    }
    function resetGrid(){
        fillGridPen();
        fillPencil();
    }
    function generateEmptyGrid(){
        initialisePossibilies();
        for(var i = 1; i <= size;i++){
            for(var j = 0; j <size; j++){
                beginingNumbers[i][j] = 0;
            }
        }
        fillGridPen();
        fillPencil();
    }
    function createNewGrid(tries){
        createFullGrid();
        if(size == 4){
            for(var i = 0; i < tries; i++){
                createHoles();
            }
        } else if(size == 9){
            for(var i = 0; i < tries*2; i++){
                createHoles();
            }
        } else if(size == 16){
            for(var i = 0; i < tries*3; i++){
                createHoles();
            }
        }
        //Render
        makePenFromPencil();
    }
    function importGrid(){
        test = document.getElementById('seed').innerHTML;
        test = test.split('h');
        if(isNaN(parseInt(test[0],17))){
            alert('Can\'t build without a seed');
        } else {
            size = test[0].charAt(0)
            generateEmptyGrid();
            for(var position = 1; position < test[0].length; position +=3){
                row = test[0].charAt(position);
                col = test[0].charAt(position + 1);
                value = test[0].charAt(position + 2);
                givenAnswers[row][col] = value;
            }
            createHoles(test[1]);
            //render grid
            makePenFromPencil();
        }
    }
    function createFullGrid(){
        addToSeed = true;
        var tries = 0;
        var maxTries = 2;
        var tryAgain = false;
        do{
            try{
                atemptCreateFullGrid();
                tryAgain = false;
            }
            catch(err){
                console.log(err);
                tries ++;
                if (tries < maxTries){
                    tryAgain = true;
                }
            }
        }
        while (tryAgain);
        if(maxTries == tries){
            alert('did not randomise a base grid, feel free to try again');
        }
    }
    function atemptCreateFullGrid(){
        //initalise
        seed = size.toString(17);
        initialisePossibilies();
        let numbers = [];
        let order = [];
        let tempNumbers = [];
        /*
        * Argh, nothing respects the other two zones reliably
        * when you hit the last row of squares need to change it so that you're not taking the last options from a cell
        */
        var squaresPerRowOrCol = Math.sqrt(size); // This assumes square squares
        //for rectanguar subdivisions will have to floor/ceil
        var fillCell = [0,0]; //this is which gridspace we're looking at
        var cell = 0; // for seed
        for( var square = 1; square <= (size - squaresPerRowOrCol); square ++){
            defineSquare(square);//for least posibilites
            fillCells(size);
        }
        //really need to improve this...
        //Treat the last row of squares as one large box for least posibilites
        colStart = 1;
        colEnd = size;
        rowEnd = size;
        rowStart = size - squaresPerRowOrCol + 1;
        fillCells(colEnd * squaresPerRowOrCol);
        seed += 'h';
        document.getElementById('seed').innerHTML = seed;
    }

    //Helper functions
    function defineSquare(square){
        var cellsPerRowOrCol = Math.sqrt(size);
        //find the bounding box of this square
        rowEnd = Math.ceil(square / cellsPerRowOrCol) * cellsPerRowOrCol;
        rowStart = rowEnd - cellsPerRowOrCol + 1;
        
        //this is wrong...
        var squareCol = (square + cellsPerRowOrCol - 1) % cellsPerRowOrCol + 1;
        colEnd = squareCol * cellsPerRowOrCol;
        colStart = colEnd - cellsPerRowOrCol + 1;
    }
    function fillCells(totalCells){
        for ( var i = 0; i < totalCells; i++){
            fillCell = leastOptions();
            var row = fillCell[0];
            var col = fillCell[1];
            var cellPossibilities = fillCell[2];
            if(cellPossibilities.length == 1){
                givenAnswers[row][col] = cellPossibilities[0];
                cell = cellPossibilities[0];
            } else {
                var tempNumber = Math.floor((Math.random() * cellPossibilities.length));
                givenAnswers[row][col] = cellPossibilities[tempNumber];
                cell = cellPossibilities[tempNumber];
            }
            seed += row.toString(17) + col.toString(17) + cell.toString(17);
        }
    }

    //grid maintenance
    function initialisePossibilies(){
        buildGrid();
        var col = 1;
        var row = 1;
        possibiies = [];
        givenAnswers =[];
        for(var i =  1; i <= size ; i++){
            possibiies[i] = [];
            givenAnswers[i] = [];
            for (var j = 1; j <= size ; j++){
                possibiies[i][j] = [];
                givenAnswers[i][j] = 0;
            }
        }
    }
    function fillGridPen(){
        var current = "";
        var currentcell;
        for (var row = 1; row <= size; row++){
            for (var col = 1; col <= size; col++) {
                current = "row" + row.toString(17) + "_col" + col.toString(17);
                currentcell = document.getElementById(current);
                currentcell.classList.remove('wrong');
                var test = beginingNumbers[row][col-1];
                if (test > 0){
                    currentcell.innerHTML = beginingNumbers[row][col-1];
                    givenAnswers[row][col] = beginingNumbers[row][col-1];
                } else {
                    givenAnswers[row][col] = 0;
                }
            }
        }
    }
    function fillPencil(){
        for (var row = 1; row <= size; row++){
            for (var col = 1; col <= size; col++) {
                var test = givenAnswers[row][col];
                if (test == 0) {
                    makeCell(row, col);
                }
            }
        }
    }
    function gridSize(newSize){
        size = newSize;
        setUpGrid();
    }
    function createHoles(fromSeed = ''){
        let col = 0;
        let row = 0;
        let times = 0;
        if(fromSeed){
            for(times = 0; times < fromSeed.length ; times++){
                row = parseInt(fromSeed.substring(times,times+1),17);
                times++;
                col = parseInt(fromSeed.substring(times,times+1),17);
                givenAnswers[row][col] = 0;
            }
        } else {
            if(addToSeed){
                seed = document.getElementById('seed').innerHTML;
            }
            for(row = 1; row  <= size;row++){
                for(times = 0; times <= (size/2); times++){
                    col = Math.ceil((Math.random() * size));
                    temp = givenAnswers[row][col];
                    givenAnswers[row][col] = 0;
                    if(numberPosibities(row,col) != 1){
                        givenAnswers[row][col] = temp;
                    } else if(temp != 0) {
                        if(addToSeed){
                            seed += row.toString(17) + col.toString(17);
                        }
                    }
                }
            }
        }
        if(addToSeed){
            document.getElementById('seed').innerHTML = seed;
        }
    }
    function makePenFromPencil(who = 'me'){
        if(who == 'me'){
            //prepare for render
            for(row = 1; row <= size; row++){
                for(col = 1; col  <= size; col++){
                    beginingNumbers[row][col-1] = givenAnswers[row][col];
                }
            }
        }
        if(who =='user'){
            for(row = 1; row <= size; row++){
                for(col = 1; col  <= size; col++){
                    if(beginingNumbers[row][col-1] == 0){
                        var CellIdentity = 'row' + row.toString(17) + '_col' + col.toString(17);
                        cell = document.getElementById('answer' + CellIdentity);
                        if(cell != null){
                            if(cell.classList.contains('wrong') == false){
                                //Check for wiping out options for another cell in row/col
                                if(KnocksOutRowCol() == false){
                                    beginingNumbers[row][col-1] = givenAnswers[row][col];
                                }
                            }
                        }
                    }
                }
            }
            addToSeed = false;
        }
        //finally render the answer
        resetGrid();
    }
