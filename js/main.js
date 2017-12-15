//Create a main container and 16 boxes inside of it
var $start = $("#startBtn")
var $timer = $('#timer')
var $restart = $ ('#restartBtn')
var player1Score = null
var player2Score = null
var currentPlayer = ""
var totalScore = 0;

var $container = $("#container")
$container.css({width:"820px", height:"820px", background:"yellow"})
for (var i=0; i<4; i++){
    $container.append(`<div class="row" id="row${i}"></div>`)
    var $row = $(`#row${i}`)
    for (var j=0; j<4; j++){
        $row.append('<div class="box"></div>')
    }
}
//put 16 pics into each boxes
function putPics(){
    var $boxes =$('.box')
    $boxes.each(function(index, box){
        console.log(index, box)
        var $b = $(box)
        $b.append('<img src="fart.png" class="fart"></img>')

    })
}
putPics()

//click start btn then 16 food pics replace the fart pic
//var foodImgs =['apple','avocado', 'banana', 'beans', 'bread', 'broccoli', 'cabbage','candy','celery', 'chips','fish', 'onion', 'pineapple', 'shrimp', 'soda']
var foodImgs = [{food:"apple", score:4},
                {food:"banana", score:3},
                {food:"beans", score:10}, 
                {food:"bread", score:5}, 
                {food:"broccoli", score:3},
                {food:"cabbage", score:5}, 
                {food:"candy", score:7}, 
                {food:"celery", score:1},
                {food:"chips", score:10},
                {food:"fish", score:2},
                {food:"onion", score:9},
                {food:"pineapple", score:6},
                {food:"shrimp", score:2},
                {food:"soda", score:8}          
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
    $("#currentPlayer").text(currentPlayer)
}

function startGame(){
    setPlayer()
    // set the current player
    console.log(currentPlayer)

    // we'll use set interval because
    // initial time remaining
    var timeRemaining = 5

    // our interval that runs every second
    var $timer = setInterval(function() {

        // decrease remaining time
        timeRemaining = timeRemaining - 1

        // when timeRemaining reaches 0, stop the interval, and notify the user
        if(timeRemaining == 0) {
            clearInterval($timer)
            console.log("Time is up!")
            $("#timer").text("Time is up!")
            
            
         $('.box').off('click')
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
        $('#player1').text('Player 1 scores: ' + player1Score)
    } else if (currentPlayer === 'player 2') { //update the scores for player2
        player2Score = Number($('#score').text())
        $('#player2').text('Player 2 scores:' + player2Score)
    }
}

function clearScore(){
    totalScore = 0
    $('#player1').text("Fart score:" + totalScore)
}
var $start = $("#startBtn")
$start.on('click', startGame)
$start.on('click', clearScore)
function randomizeImages() {
    $('.box').each(function(index, theBox) {
        var randomFood = foodImgs[randomInt(foodImgs.length - 1)]
        $(theBox).html('<img score="'+randomFood['score']+'" src="' + imgPath + randomFood['food'] + '.png" class="' + randomFood['food'] + '">')
    })
}

function restartPics() {
putPics().html("")
putPics()
}

function restartGame (){
    randomizeImages()
    $timer.empty()
    player1Score = 0
    $('#player1').text('Player 1 scores: ' + player1Score)
    player2Score = 0
    $('#player2').text('Player 2 scores:' + player2Score)
    totalScore = 0
    $('#score').text(totalScore)
    currentPlayer === ''
    $("#currentPlayer").text(currentPlayer)
}

$start.on('click', startGame)
$restart.on('click', restartGame)
