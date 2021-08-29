"use strict"

let timer_element = document.getElementById("display");
let current_session = document.getElementById("session")
let current_round = document.getElementById("rounds_done")
let start_button = document.getElementById("button")
let learn_limit =document.getElementById("learn").value*60;
let rest_limit =document.getElementById("rest").value*60
let reps = document.getElementById("rounds");
let rounds = Number(reps.options[reps.selectedIndex].text);
let rounds_done =0;
let isTiming;


let learn_audio = new Audio("time_is_now.mp3")
let rest_audio = new Audio("accomplished.mp3")


let start;
let limit=0;
let sec =0;
let min = 0;


let learn_interval 
let rest_interval
let start_time 
let end_time

let ss

start_button.onclick = start_timer
reps.onchange = set_rounds_val

function start_timer(){
    if(start_button.innerText ==="Start"){
        start_button.innerText="Stop"
        reps.setAttribute('disabled','disabled')
        start_learn_timer()
    }else if(start_button.innerText ==="Stop"){
        console.log("Timer stopped")
        reps.removeAttribute('disabled')
        start_button.innerText="Start"
        timer_element.innerHTML="00:00"
        current_round.innerHTML=""
        current_session.innerHTML=""
        window.clearInterval(learn_interval)
        rounds_done=0;
        if(rest_interval!==null){
            window.clearInterval(rest_interval)
        }
    }
   
 
}
function start_learn_timer(){
    
        limit = learn_limit
        learn_audio.play()
        console.log("Learn Timer started")
        start_time = new Date()
        ss=new Date();
        learn_interval = window.setInterval(learn_timer,1000)
       
    
}

function start_rest_timer(){
        
        limit =rest_limit;
        rest_audio.play()
        console.log("Rest Timer started")
        end_time = new Date()
        console.log(end_time - start_time)
        ss=new Date();
        rest_interval =window.setInterval(rest_timer,1000)
    
    
}

function learn_timer(){
    start=Math.floor((new Date() - ss)/1000)
    sec = start%60
    min = Math.floor(start/60)
    current_session.innerHTML="Study Session"
    timer_element.innerHTML = `${pad(min)}:${pad(sec)}`
    current_round.innerHTML = `Round ${rounds_done+1}`
    if(start>=limit){
        window.clearInterval(learn_interval)
        if(rounds_done+1<rounds){
            start_rest_timer()
        } if(rounds_done+1 === rounds){
            rest_audio.play()
            rest_audio.play()
            reps.removeAttribute('disabled')
            start_button.innerText="Start"
            rounds_done =0
            console.log(`rounds done reset to ${rounds_done}`)
            current_session.innerHTML="Session Complete"
            timer_element.innerHTML = `00:00`
            current_round.innerHTML = `Congratulations!`
        }
        
        
    }
}

function rest_timer(){
    start=Math.floor((new Date() - ss)/1000)
    sec = start%60
    min = Math.floor(start/60)
    current_session.innerHTML="Short Break"
    timer_element.innerHTML = `${pad(min)}:${pad(sec)}`
    current_round.innerHTML = ""
    if(start>=limit){
        window.clearInterval(rest_interval)
        rounds_done++
        console.log(`round ${rounds_done} done, ${rounds-rounds_done} more to go`)
        if (rounds_done<rounds){
            start_learn_timer()
        }
        /*else if(rounds_done === rounds){
            reps.removeAttribute('disabled')
            start_button.innerText="Start"
            rounds_done =0
            console.log(`rounds done reset to ${rounds_done}`)
        }*/
        
    }
}

function set_rounds_val(event){
    let elem =event.target
    rounds=Number(elem.options[elem.selectedIndex].text)
    console.log(rounds)
}

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}