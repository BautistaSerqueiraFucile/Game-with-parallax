import { Player } from "./Player.js";
import { Enemy } from "./Enemy.js";
import { Background } from "./Background.js";
import { Colectable } from "./Colectable.js";

document.addEventListener('DOMContentLoaded', () => {
    //inicializo valores necesarios para el inicio del juego
    const song = document.querySelector("#music");
    let points = 0;
    let time = 60;
    let time_survived = 0;
    let player = new Player();
    let background = new Background();
    let enemyGeneration = null;
    let gameState = null;
    let pointState = null;
    let TimeState = null;
    let bonusGeneration = null;

    //inicializo valores para el bonus
    let bonuses = [];

    //inicializo el primer enemigo para evitar errores    
    let enemies = [];
    let default_velocity = 5.0;
    let actual_velocity = 5.0;

    //guardo valores de texto para actualizar
    let lives_text = document.querySelector(".lives");
    let points_text = document.querySelector(".points");
    let timer_text = document.querySelector(".timer");

    //guardo valores pantalla endgame
    let timer_end = document.querySelector("#time-end");
    let points_end = document.querySelector("#points-end");
    let restart = document.querySelector("#restart");
    let start = document.querySelector("#start");
    restart.addEventListener("click", startGame);

    //boton para iniciar juego
    start.addEventListener("click", startGame);

    //event listener para saltar
    document.addEventListener('keydown', () => {
        player.jump();
    });

    
    // Chequear estado del runner, de los enemigos y bonus
     
    function gameLoop() {
        comprobarGolpe();
        comprobarBonus()
    }


    function generateEnemy() {  // genera enemigo con velocidad preestablecida
        let enemy = new Enemy(actual_velocity);
        enemies.push(enemy);
        document.querySelector(".container").appendChild(enemy.zone);
        enemy.clear(enemies);
    }

    function generateBonus  () {  // genera un bonus
        let bonus = new Colectable();
        bonuses.push(bonus);
        document.querySelector(".container").appendChild(bonus.area);
        bonus.clear(bonuses);
    }

    function comprobarGolpe() {  //comprueba si el jugador fue golpeado
        if (enemies.length != 0) {
            let current_enemy = enemies[0];
            if (current_enemy.colision(player.status())) {
                player.damage();
                lives_text.innerText = "Lives: " + player.getLives();
                if (player.getLives() == 0) {
                    player.dead();
                    endGame();
                }
            }
        }
    }

    function comprobarBonus(){ //comprueba que bonus agarro el jugador y hace cosas en base al tipo de bonus
        if(bonuses.length != 0){
            let currrent_bonus = bonuses[0];
            if(currrent_bonus.colision(player.status())){
                switch(currrent_bonus.getType()){
                    case 1:
                        currrent_bonus.delete();
                        bonuses = []
                        player.increaseLives();
                        lives_text.innerText = "Lives: " + player.getLives();
                    break;
                    case 2:
                        currrent_bonus.delete();
                        bonuses = []
                        time += 15;
                        timer_text.innerHTML = "Time: " + time;
                    break;
                    case 3:
                        currrent_bonus.delete();
                        bonuses = []
                        time += 15;
                        timer_text.innerHTML = "Time: " + time;
                    break;
                }
            }
        }
    }

    function updatePoints() { //actualiza el contador de puntos
        points++;
        points_text.innerHTML = "Points: " + points;
        if (points % 250 == 0) {
            if ((default_velocity - points * 0.1 / 100) > 0)
                actual_velocity = default_velocity - points * 0.1 / 100;
        }
    }

    function updateTime() { // actualiza el timer
        time--;
        time_survived++;
        timer_text.innerHTML = "Time: " + time;
        if (time == 0) {
            endGame();
        }
    }

    function clearIntervals() { //detengo intervals
        clearInterval(gameState);
        clearInterval(pointState);
        clearInterval(enemyGeneration);
        clearInterval(TimeState);
        clearInterval(bonusGeneration);
    }

    function startGame() { //reiniciar todo para empezar de cero
        startMusic();
        if(enemies.length != 0){
            enemies.forEach(enemy =>{
                enemy.delete();
            })
            actual_velocity = 5;
            enemies = [];
        }
        if(bonuses.length != 0){
            bonuses.forEach(bonus =>{
                bonus.delete();
            })
            bonuses = [];
        }
        background.restart();
        player.restart();
        time = 60;
        time_survived = 0;
        updateTime();
        TimeState = setInterval(updateTime, 1000);

        points = 0;
        //cada 35 milisegundos actualizo los puntos obtenidos y modifica la dificultad si se alcanzo x cantidad de puntos
        pointState = setInterval(updatePoints, 35);

        lives_text.innerText = "Lives: " + player.getLives();
        generateEnemy();
 
        // cada 3 segundos genera un enemigo 
        enemyGeneration = setInterval(generateEnemy, 3000);

        // cada 5.7 segundos genera un bonus
        bonusGeneration = setInterval(generateBonus, 5700);

        // cada 16.67 milisegundos verifica estado del juego
        gameState = setInterval(gameLoop, 16.67);   
    }

    function endGame() { //detengo animaciones
        stopMusic();
        clearIntervals();
        enemies.forEach(enemy => {
            enemy.stop();
        });
        if(bonuses.length > 0){
            bonuses.forEach(bonus=> {
                bonus.stop();
            })
        }
        background.gameOver(time, points);
        if (time == 0) {
            player.stop();
        }
        timer_end.innerHTML = "Time survived: " + time_survived;
        points_end.innerHTML = "Points: " + points;
    }

    function startMusic() {
        song.volume = 0.25;
        song.play();
    }

    function stopMusic() {
        song.pause();
        song.currentTime = 0;
    }
})