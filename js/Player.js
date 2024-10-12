export { Player };

class Player {

    constructor() {
        this.player = document.querySelector(".player");
        this.lives = 3;
        this.actual_lives = this.lives;
        this.damaged = false;
    }

    status() {
        return this.player.getBoundingClientRect();
    }

    run() {
        if (this.actual_lives > 0) {
            this.clean();
            this.player.classList.add("run");
        }
    }

    jump() {
        if (this.player.classList.contains("run")) {
            this.clean();
            this.player.classList.add("jump");
            this.player.addEventListener("animationend", () => {
                this.run();
            });
        }
    }

    hurt() {
        if (this.player.classList.contains("run") || this.player.classList.contains("jump")) {
            this.clean();
            this.player.classList.add("hurt");
            this.player.addEventListener("animationend", () => {
                this.run();
            })
        }
    }

    dead() {
        this.clean();
        this.player.classList.add("dead");
    }

    clean() {
        this.player.classList.remove("dead");
        this.player.classList.remove("run");
        this.player.classList.remove("jump");
        this.player.classList.remove("fall");
        this.player.classList.remove("hurt");
        this.player.removeEventListener("animationend", () => { });
    }

    colision(entidad) {

    }

    stop() {
        this.player.style.animationPlayState = "paused";
    }

    damage() { //no permite que el heroe sea dañado multiples veces en una misma instancia
        if (!this.damaged && this.actual_lives > 0) {
            this.hurt();
            this.actual_lives--;
            this.damaged = true;
            setTimeout(() => { this.damaged = false; }, 2000)
        }
    }

    restart() { //reinicia los valores del heroe
        this.actual_lives = this.lives;
        this.player.style.animationPlayState = "running";
        this.damaged = false;
        this.run();
    }

    increaseLives() {
        this.actual_lives++;
    }

    getLives() {
        return this.actual_lives;
    }

    getDamaged() {
        return this.damaged;
    }
}