var SIZE = 3;
var gNextNum = 1;
var gSecs = 0;
var gIsGameOn = false;
var gIntervalSecs;

function startGame() {

    if (gIsGameOn) return;

    gIsGameOn = true;

    var elBoard = document.querySelector('.board');
    var strHtml = '';

    var nums = prepareNumsArray(SIZE*SIZE);
    shuffle(nums);

    for (var i=0; i<SIZE; i++) {
        strHtml += '<tr>';
        for (var j=0; j<SIZE; j++) {

            var num = nums.pop();

            strHtml += '<td onclick="cellClicked(this,' + num + ')">' + num + '</td>';

        }
        strHtml += '</tr>';
    }
    elBoard.innerHTML = strHtml;
    gSecs = 0;
    var elSecs = document.querySelector('#secs');
    gIntervalSecs =     setInterval(function () {
        gSecs += 0.01;
        gSecs = parseFloat(gSecs.toFixed(2));
        elSecs.innerHTML = gSecs;
    }, 10);

}

function cellClicked(elCell, num) {

    if (num === gNextNum) {
        console.log('Ala Keifak');
        //elCell.style.backgroundColor = 'orange';
        elCell.classList.add('done');

        gNextNum++;

        if (gNextNum > SIZE*SIZE) {
            handleWin();

        } else {
            updateNextNum();
        }


    } else {
        console.log('No');
    }

}

function handleWin() {
    clearInterval(gIntervalSecs);
    alert('WIN! ' + gSecs);
    SIZE++;
    gIsGameOn = false;
    gNextNum = 1;
    updateNextNum();
    startGame();
}


function updateNextNum() {
    var elNextNum = document.querySelector('#nextNum');
    elNextNum.innerHTML = gNextNum;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function prepareNumsArray(size) {
    var nums= [];
    for (var i=1; i <= size; i++) {
        nums.push(i);
    }
    return nums;
}

