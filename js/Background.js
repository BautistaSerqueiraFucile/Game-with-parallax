export { Background };

class Background {

    constructor() {
        this.mountain = document.querySelector(".mountain");
        this.floor = document.querySelector(".floor");
        this.sky = document.querySelector(".sky");
        this.game_over = document.querySelector(".game-over");
        this.instructions = document.querySelector(".instructions");
    }

    stop(){
        this.mountain.style.animationPlayState = "paused";
        this.floor.style.animationPlayState = "paused";
        this.sky.style.animationPlayState = "paused";
    }

    gameOver(){
        this.stop();
        this.game_over.style.display = "flex";
    }

    restart(){
        this.mountain.style.animationPlayState = "running";
        this.floor.style.animationPlayState = "running";
        this.sky.style.animationPlayState = "running";
        this.game_over.style.display = "none";
        this.instructions.style.display = "none";
    }
}