export { Colectable };

class Colectable {


    constructor() {
        this.area = document.createElement("div");
        this.setType();
    }

    setType() { // elige o un bonus de corazon o un bonus de reloj el reloj tiene mas chances al estar repetido
        this.rng = Math.floor((Math.random() * 3) + 1);
        switch (this.rng) {
            case 1:
                this.area.classList.add("bonus-heart");
                break;
            case 2:
                this.area.classList.add("bonus-time");
                break;
            case 3:
                this.area.classList.add("bonus-time");
                break;
        }
    }

    status() { // devuelve la posicion actual del reloj
        return this.area.getBoundingClientRect();
    }

    clear(colectables) { //agrega un event listener para eliminarse del index y del arreglo en script
        this.area.addEventListener("animationend", () => {
            colectables.splice(colectables.indexOf(this), 1);
            this.area.remove();
        })
    }

    colision(hero) { //comprueba colision con el objeto brindado
        let colectable = this.status();
        const isInHorizontalBounds = hero.left + 50 < colectable.right && hero.right - 100 > colectable.left;
        const isInVerticalBounds = hero.top < colectable.bottom && hero.bottom > colectable.top;

        return (isInVerticalBounds && isInHorizontalBounds);
    }

    stop() { //detiene la animacion 
        this.area.style.animationPlayState = "paused";
    }

    delete() { //elimina el objeto del index
        this.area.remove();
    }

    getType() { //devuelve el tipo de objeto determinado por el rng
        return this.rng;
    }
}