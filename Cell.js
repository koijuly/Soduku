    //on cell click events
    function penPressed(){
        row = parseInt(this.id.substring(9, 10),17);
        col = parseInt(this.id.substring(14, 15),17);
        if(this.classList.contains('wrong')){
            checkClashes(row,col,false);
        }
        givenAnswers[row][col] = 0;
        findPossibilities (row, col);
        makeCell(row, col);
        this.classList.remove('answer');
    }
    function pencilPressed(){
        let cell = this.parentElement;
        let value = this.innerHTML
        switch (event.which){
        case 1:
            //lets check if it is 'invisible'
            if(this.classList.contains('nonAnswer')){
                this.classList.remove('nonAnswer');
            } else {
                //it was an option, so make it the answer
                cell.innerHTML = '<div id="answer' + cell.id + '" class="answer">' + value + '</div>';
                row = parseInt(cell.id.substring(3, 4),17);
                col = parseInt(cell.id.substring(8, 9),17);
                givenAnswers[row][col] = value;
                document.getElementById('answer' + cell.id).onmousedown = penPressed;
                checkClashes(row,col,true);
            }
            break;
        case 3:
            //make it inisible
            this.classList.add("nonAnswer");
            break;
        }
    }

    //cell maintenance
    function makeCell(row, col){
        var current = "row" + row.toString(17) + "_col" + col.toString(17);
        var currentcell = document.getElementById(current);
        var splitCell = "";
        findPossibilities(row,col);
        for( var i = 1; i  <= size ; i++){
            if(possibiies[row][col][i] != i){
                splitCell += '<div id = "' + current + "_" + i + '" class="nonAnswer innerCell ' + current + ' ">' + i + '</div>';
            } else {
                splitCell += '<div id = "' + current + "_" + i + '" class="innerCell ' + current + '">' + i + '</div>';
            }
        }
        currentcell.innerHTML = splitCell;
        for( var i = 1; i <= size ; i++){
            var temp = current + "_" + i
            document.getElementById(temp).onmousedown = pencilPressed;
        }
    }
    function markWrong(row,col){
        var conflict = false;
        //is this conflict cell a given answer or a begining number?
        if(beginingNumbers[row][col-1] == 0){
            //give answer
            conflict = document.getElementById('answerrow' + row.toString(17)  + '_col' + col.toString(17) );
        } else {
            //begining number
            conflict = document.getElementById('row' + row.toString(17)  + '_col' + col.toString(17) );
        }
        if(conflict){
            conflict.classList.add('wrong');
        } else {
            console.log('subcell? mark: ' + row + ', ' + col);
        }
    }
    function unmarkWrong(row,col){
        var conflict = false;
        var identity = 'row' + row.toString(17) + '_col' + col.toString(17);
        //is this conflict cell a given answer or a begining number?
        if(beginingNumbers[row][col-1] == 0){
            //give answer
            conflict = document.getElementById('answer' + identity);
        } else {
            //begining number
            conflict = document.getElementById(identity);
        }
        if(conflict){
            conflict.classList.remove('wrong');
        } else {
            console.log('subcell? unmark: ' + identity);
        }
    }