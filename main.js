(() => {
  let currTimer;
  const startMyGame = {
    createTimer: function (container, currTimer) {
      if (currTimer != undefined) {
        clearInterval(currTimer);
      }

      let timer = document.querySelector(".timer__value");
      let timerValue = 60;

      let timerInterval = setInterval(() => {
        if (timerValue < 0) {
          alert('У вас закончилось время');
          container.innerHTML = "";
          cardsNumberArray = [];
          cardsArray = [];
          firstCard = null;
          secondCard = null;
          timer.remove();

          startMyGame.gameCreate("Игра окончена, введите новое количество карточек", false, true);
          clearInterval(timerInterval);
        }
        timer.innerHTML = String(`У вас время - <span class="timer__number">${timerValue}c</span>`);
        timerValue--;
      }, 1000);

      return timerInterval;
    },
    gameCreate: function (title, classTitle = false) {
      let input = document.createElement("input");
      let button = document.createElement("button");
      let h3 = document.createElement("h3");
      let spanTimer = document.createElement('span');
      input.classList.add("number__cards");
      input.setAttribute("placeholder", "От 2 до 10");
      button.classList.add("btn__start");
      h3.classList.add("title__text");
      spanTimer.classList.add('timer__value');

      if (classTitle == true) {
        h3.classList.add("end");
      }

      h3.textContent = title;
      button.textContent = "Начать игру";

      button.addEventListener("click", (e) => {
        e.preventDefault();
        countCard = parseInt(input.value);
        if (countCard % 2 === 0) {
          input.remove();
          button.remove();
          h3.remove();
        } else {
          alert('Введите четное число. Число по умолчанию = 4');
          countCard = 4;
          input.remove();
          button.remove();
          h3.remove();
        }

        countCard *= countCard;
        this.startGame(document.getElementById("game"), true, countCard);
      });

      document.querySelector(".block__action").append(input);
      document.querySelector(".block__action").append(spanTimer);
      document.querySelector(".number__cards").before(h3);
      document.querySelector(".number__cards").after(button);
    },
    createRandomArray: function (countEl) {
      let cardsNumber = [];

      for (let i = 1; i <= countEl / 2; i++) {
        cardsNumber.push(i);
        cardsNumber.push(i);
      }

      return cardsNumber;
    },

    shuffle: function (arr) {
      let sortArray = arr.sort(() => Math.random() - 0.5);

      return sortArray;
    },

    startGame: function (container, timer = false, count) {
      let cardsNumberArray = this.shuffle(this.createRandomArray(count)),
          cardsArray = [],
          firstCard = null,
          secondCard = null;

      if (timer === true) {
        currTimer = this.createTimer(container, currTimer);
      }

      for (const cardsInt of cardsNumberArray) {
        cardsArray.push(new this.Card(container, cardsInt, flat));
      }

      function flat(card) {
        if (firstCard !== null && secondCard !== null) {
          if (firstCard.number != secondCard.number) {
            firstCard.open = false;
            secondCard.open = false;
            firstCard = null;
            secondCard = null;
          }
        }

        if (firstCard == null) {
          firstCard = card;
        } else {
          if (secondCard == null) {
            secondCard = card;
          }
        }

        if (firstCard !== null && secondCard !== null) {
          if (firstCard.number == secondCard.number) {
            firstCard.success = true;
            secondCard.success = true;
            firstCard = null;
            secondCard = null;
          }
        }

        for (let i = 0; i < cardsArray.length; i++) {
          if (cardsArray[i].open == true) {
            cardsArray[i].card.classList.add("open");
          } else {
            cardsArray[i].card.classList.remove("open");
          }

          if (cardsArray[i].success == true) {
            cardsArray[i].card.classList.add("success");
          } else {
            cardsArray[i].card.classList.remove("success");
          }
        }
        if (
          document.querySelectorAll(".game__item.success").length ==
          cardsNumberArray.length
        ) {
          // сброс
          alert("Победа!");
          container.innerHTML = "";
          cardsNumberArray = [];
          cardsArray = [];
          firstCard = null;
          secondCard = null;
          document.querySelector('.timer__value').remove();

          startMyGame.gameCreate("Игра окончена, введите новое количество карточек", true, true);
        }
      }
    },

    Card: function (container, number, action) {
      this.open = false;
      this.success = false;
      this.card = document.createElement("div");
      this.card.classList.add("game__item");
      this.card.textContent = number;
      this.number = number;
      this.card.addEventListener("click", () => {
        if (this.open == false && this.success == false) {
          this.open = true;
          action(this);
        }
      });
      container.append(this.card);
    },
  };
  startMyGame.gameCreate("Введите количество карточек", false);
})();
