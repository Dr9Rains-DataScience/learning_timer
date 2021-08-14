"use strict"

let timer_element = document.getElementById("test");
let start_button = document.getElementById("button")
let learn_limit =document.getElementById("learn").value*60;
let rest_limit =document.getElementById("rest").value*60

let learn_audio = new Audio("time_is_now.mp3")
let rest_audio = new Audio("accomplished.mp3")


let start=0;
let limit = learn_limit;
let sec =0;
let min = 0;


let learn_interval 
let rest_interval

start_button.onclick = start_learn_timer

function start_learn_timer(){
    learn_audio.play()
    console.log("Learn Timer started")
    learn_interval = window.setInterval(learn_timer,1000)
}

function start_rest_timer(){
        start=0;
        limit =rest_limit;
        rest_audio.play()
        console.log("Rest Timer started")
        rest_interval =window.setInterval(rest_timer,1000)
    
    
}

function learn_timer(){
    start+=1
    sec = start%60
    min = Math.floor(start/60)
    timer_element.innerHTML = `learn <br>${pad(min)}:${pad(sec)}`
    if(start>=limit){
        window.clearInterval(learn_interval)
        start_rest_timer()
        
    }
}

function rest_timer(){
    start+=1
    sec = start%60
    min = Math.floor(start/60)
    timer_element.innerHTML = `rest <br>${pad(min)}:${pad(sec)}`
    if(start>=limit){
        window.clearInterval(rest_interval)
        
    }
}

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}