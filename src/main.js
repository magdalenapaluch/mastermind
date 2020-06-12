$(document).ready(function () {
    class Pin {
        constructor(pin) {
            this.pin = $(pin);
            this.chosen = document.querySelector('.gameboard__pin--selected');
        }
        initEvents() {
            this.pin.on('click', event => this.selectColor(event));
        }
        selectColor(event) {
            let color = $(event.target).data('color');
            this.chosen.setAttribute('data-color', color);
        }
    }

    const ordinaryPin = new Pin('.gameboard__pin');

    ordinaryPin.initEvents();

    class Slot {
        constructor(slot) {
            this.slot = $(slot);
            this.chosen = document.querySelector('.gameboard__pin--selected').getAttribute('data-color');
        }
        initEvents() {
            this.slot.on('click', event => this.addColor(event));
        }
        addColor(event) {
            this.chosen = document.querySelector('.gameboard__pin--selected').getAttribute('data-color');
            setTimeout(() => {
                if (this.chosen) {
                    event.target.setAttribute("data-color", this.chosen);
                }
            }, 1)
        }
    }

    const ordinarySlot = new Slot('.active .gameboard__user-config-slot');

    ordinarySlot.initEvents();

    class checkButton {
        constructor(button) {
            this.button = $(button);
        }
        initEvents(){
            this.button.on('click', event => this.checkSlots(event));
        }
        checkSlots(){
            console.log(this.button.parent());
        }
    }

    const ordinaryButton = new Slot('.active.gameboard__check ');

    ordinaryButton.initEvents();

    (() => {
        const colors = [];
        const configurationPins = document.querySelectorAll('.gameboard__configuration-slot');
        document.querySelectorAll('.gameboard__pin:not(.gameboard__pin--selected)').forEach(pin => {
            colors.push(pin.getAttribute("data-color"));
        });

        configurationPins.forEach(pin => {
            pin.setAttribute("data-color", getRandomColor(0, colors.length - 1));
        })

        function getRandomColor(min, max) {
            return colors[Math.floor(Math.random() * (max - min + 1)) + min];
        }
    })()
});