$(document).ready(function(){
    $('.candles').click(function(){
        console.log('run')
        $('.f-1').animate({"opacity":0}, "fast")
        $('.f-2').animate({"opacity":0}, "fast")
    })
})