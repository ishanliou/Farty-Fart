//Create a main container and 16 boxes inside of it
var $timer = $('#timer')
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
//push 16 pics into each boxes
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

function startGame(){

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
            
            // here is where the code will be to deactivate boxes, and end the round...
            // .............
            
         $('.box').off('click')

            return
        }

        // display updated decreased time
        $("#timer").text(timeRemaining)
    getPlayer1Score ()
        console.log(timeRemaining)
    }, 1000)

    $('.box').each(function(index, theBox) {
        var randomFood = foodImgs[randomInt(foodImgs.length - 1)]
        $(theBox).html('<img score="'+randomFood['score']+'" src="' + imgPath + randomFood['food'] + '.png" class="' + randomFood['food'] + '">')
    })

    $('.box').one('click', getScore)
}

function getScore(){

    // get food score
    var foodScore = parseInt($(this).find('img').attr('score'))

    // add food score to total score
    totalScore = totalScore + foodScore
    
    // update text to show new score
    $('#player1').text("Fart score:" + totalScore)

}

function getPlayer1Score(){

    
}
var $start = $("#startBtn")
$start.on('click', startGame)

//after player 1 finished the game, store the score 
//start player 2, finished the game, compared score
// annouce the winner

