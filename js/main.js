console.log('script loaded!')
var $container = $("#container")
$container.css({width:"820px", height:"820px", background:"yellow"})
for (var i=0; i<4; i++){
    $container.append(`<div class="row" id="row${i}"></div>`)
    var $row = $(`#row${i}`)
    for (var j=0; j<4; j++){
        $row.append('<div class="box"></div>')
    }
}

function putPics(){
    var $boxes =$('.box')
    $boxes.each(function(index, box){
        console.log(index, box)
        var $b = $(box)
        $b.append('<img src="fart.png" class="fart"></img>')

    })
}
putPics()

var foodImgs =['apple','avocado', 'banana', 'beans', 'bread', 'broccoli', 'cabbage','candy','celery', 'chips','fish', 'onion', 'pineapple', 'shrimp', 'soda']
var imgPath = './imgs/'

function randomInt(myNumber){
  return Math.floor(Math.random() * myNumber)
}

function putRandomImgsToBox(){
    $('.box').each(function(index, theBox) {
        var randomFood = foodImgs[randomInt(foodImgs.length - 1)]
        $(theBox).html('<img src="' + imgPath + randomFood + '.png" class="' + randomFood + '">')
    })
}
var $start = $("#startBtn")
$start.on('click', putRandomImgsToBox)