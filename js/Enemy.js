export { Enemy };

class Enemy {


    constructor(velocity) {
        this.zone = document.createElement("div");
        this.zone.classList.add("enemy");
        this.setEnemy();
        this.zone.style.animationDuration = velocity + "s";
    }

    setEnemy() { //crea un enemigo aleatorio entre 3
        this.rng = Math.floor((Math.random() * 3) + 1);
        switch (this.rng) {
            case 1:
                this.zone.style.backgroundImage = "url(enemies/idlePlant.png)";
                break;
            case 2:
                this.zone.style.backgroundImage = "url(enemies/idleGolem.png)";
                break;
            case 3:
                this.zone.style.backgroundImage = "url(enemies/idleMage.png)";
                break;
        }
    }

    status() { //devuelve posicion actual del enemigo
        return this.zone.getBoundingClientRect();
    }

    clear(enemies) { //agrega un event listener para eliminarse del index y del arreglo en script
        this.zone.addEventListener("animationend", () => {
            enemies.splice(enemies.indexOf(this), 1);
            this.zone.remove();
        })
    }

    delete() { //se elimina del index
        this.zone.remove();
    }

    colision(hero) { //comprueba colision con el objeto brindado
        let enemy = this.status();
        const isInHorizontalBounds = hero.left + 50 < enemy.right - 30 && hero.right - 100 > enemy.left + 80;
        const isInVerticalBounds = hero.top < enemy.bottom && hero.bottom > enemy.top + 150;

        return (isInVerticalBounds && isInHorizontalBounds);
    }

    stop() { //pausa la animacion
        this.zone.style.animationPlayState = "paused";
    }
}