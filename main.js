(() => {
  const startMyGame = {
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

    startGame: function (container, count) {
      let cardsNumberArray = this.shuffle(this.createRandomArray(count)),
          cardsArray = [],
          firstCard = null,
          secondCard = null;

      for (const cardsInt of cardsNumberArray) {
        cardsArray.push(
          new this.Card(container, cardsInt, flat)
        );
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

          startMyGame.startGame(container, count);
        }
      }
    },

    Card: function (container, number, action) {
      this.open = false;
      this.success = false;
      this.card = document.createElement("li");
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
  startMyGame.startGame(document.getElementById('game'), 8);
})();
