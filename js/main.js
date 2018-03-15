//Create a main container and 16 boxes inside of it
var $start = $("#startBtn")
var $timer = $('#timer')
var $restart = $ ('#restartBtn')
var player1Score = null
var player2Score = null
var currentPlayer = ""
var totalScore = 0;
var oopsyFart = new Audio('sounds/OopsyFart.mp3')
var fart = new Audio('sounds/fart.mp3')
var longFart = new Audio('sounds/longFart.mp3')

var $container = $("#container")
// $container.css({width:"820px", height:"600px", background:"wheat"})
for (var i=0; i<4; i++){
    $container.append(`<div class="row" id="row${i}"></div>`)
    var $row = $(`#row${i}`)
    for (var j=0; j<4; j++){
        $row.append('<div class="box"></div>')
    }
}
//put 16 pics into each boxes
function putPics(){
    var $boxes = $('.box')
    $('.box').empty()
    $boxes.each(function(index, box){
        console.log(index, box)
        var $b = $(box)
        $b.append('<img src="./imgs/fart2.png" class="fart" width="150" height="150"></img>')
    })
}
putPics()

//click start btn then 16 food pics replace the fart pic
var foodImgs = [{food:"apple", score:4, color:"#80c341"},
                {food:"banana", score:3, color:"#47c7ed"},
                {food:"beans", score:10, color:"#a7deec"}, 
                {food:"bread", score:5, color:"#10a0c6"}, 
                {food:"broccoli", score:3, color:"#faa526"},
                {food:"chicken", score:5, color:"#a54861"}, 
                {food:"candy", score:7, color:"#faa526"}, 
                {food:"donut", score:1, color:"#a7deec"},
                {food:"chips", score:10, color:"#7ac142"},
                {food:"fish", score:2, color:"#faa526"},
                {food:"fries", score:9, color:"#59c5c5"},
                {food:"pineapple", score:6, color:"#faed4f"},
                {food:"shrimp", score:2, color:"#a7deec"},
                {food:"soda", score:8, color:"#2caca4"},
                {food:"egg", score:8, color:"#a64861"},
                {food:"avocado", score:1, color:"#2caca4"}  


]

var imgPath = './imgs/'

function randomInt(myNumber){
  return Math.floor(Math.random() * myNumber)
}

function setPlayer() {
    //setting the variable in our memory
    if (currentPlayer === "player 2") {
        currentPlayer = "player 1"
    } else if (currentPlayer === "player 1") {
        currentPlayer = "player 2"
    } else if (currentPlayer === '') {
        currentPlayer = 'player 1'
    }

    //display on the screen
    $("#playerContainer").text(currentPlayer)
}

function startGame(){
    fart.play()
    setPlayer()

    // reset box opacity
    $('.box').css('opacity','1')

    // set the current player
    console.log(currentPlayer)

    // we'll use set interval because
    // initial time remaining
    var timeRemaining = 10

    // our interval that runs every second
    var $timer = setInterval(function() {

        // decrease remaining time
        timeRemaining = timeRemaining - 1

        // when timeRemaining reaches 0, stop the interval, and notify the user
        if(timeRemaining == 0) {
            clearInterval($timer)
            console.log("Time is up!")
            $("#timer").text("Time is up!")
        
            // here is where the code will be to deactivate boxes, and end the round...
            $('.box').off('click')
        
            if(currentPlayer == 'player 1') {
                //alert("Good job player 1! Now it's player 2's turn")
                // show message box
                
                $('#messageBox').css({
                    'opacity':'0.7', 
                    'display':'block'
                })
                oopsyFart.play()

                // show message
                $('#messageBox').find('#copy').text("Good job player 1! Now press START to start player 2")
                totalScore = 0
                
            } else if(currentPlayer == 'player 2') {
                //alert("Good job player 2! Let's see who won...")
                $('#messageBox').css({
                    'opacity':"0.7",
                    'display':'block'
                })
                $('#messageBox').find('#copy').text("Good job player 2! Let's see who fart big...")
                //announce who the winner is
                longFart.play()

                setTimeout(function(){
                    if (player1Score> player2Score){
                        //alert ("Player 1 is the Fart Master!")
                        $('#messageBox').find('#copy').text("Player 1 is the Fart Master!")
                    }else {
                        //alert("Player 2, Good job! Do you just fart? ")
                        $('#messageBox').find('#copy').text("Player 2, Good job! Do you just fart? ") 
                    }
                }, 3000)
            }
        
            return
        }

        // display updated decreased time
        $("#timer").text(timeRemaining)
    
        console.log(timeRemaining)
    }, 1000)

    randomizeImages()

    $('.box').one('click', getScore)
}

function getScore(){

    // change opacity after click
    $(this).css('opacity','0.5')

    // get food score
    var foodScore = parseInt($(this).find('img').attr('score'))

    // add food score to total score
    totalScore = totalScore + foodScore
    
    // update text to show new score
    updatePlayerScore(totalScore)
}

function updatePlayerScore(score) {
    // updates the span on the top
    Number($('#score').text(score))

    if(currentPlayer === 'player 1') { //update the scores for player 1
        player1Score = Number($('#score').text())
        $('#player1Container').html('Player 1 scores: <br />' + player1Score)
    } else if (currentPlayer === 'player 2') { //update the scores for player2
        player2Score = Number($('#score').text())
        $('#player2Container').html('Player 2 scores: <br />' + player2Score)
    }
}

function randomizeImages() {
    $('.box').each(function(index, theBox) {
        var randomFood = foodImgs[randomInt(foodImgs.length - 1)]
        $(theBox).css("background-color", randomFood['color'])
        $(theBox).html('<img score="'+randomFood['score']+'" src="' + imgPath + randomFood['food'] + '.png" class="' + randomFood['food'] + '">')
    })
}



function restartGame (){
    console.log('reset');
    location.reload();
}

$start.on('click', startGame)
$restart.on('click', restartGame)

$('#closeBtn').on('click', closeMessage)

function closeMessage(){
    $('#messageBox').css({
        'opacity':'0',
        'display':'none'
    })
}
