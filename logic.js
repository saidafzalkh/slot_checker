const bank_screen = document.getElementById("bank");
const winners_input = document.getElementById("winners");
const answers = document.getElementById("answers");

let bank = 3885000;
bank_screen.textContent = bank;

let slots = Array.from(Array(37)).map((_, i) => ({
  number: i,
  price: 1000,
  loop: 1,
  dead: false,
}));

function handlePlay() {
  let game_loop = 1;

  let winners = winners_input.value
    .trim()
    .split(" ")
    .map((e) => Number(e));

  winners.forEach((win) => {
    game_loop++;
    slots.forEach((slot) => {
      if (slot.dead) return;
      if (win === slot.number) {
        console.log(game_loop);
        if (game_loop > 30) slot.dead = true;
        bank = bank + slot.price * 35;
        slot.loop = 0;
        slot.price = 1000;
      } else {
        bank = bank - slot.price;
        if (slot.loop === 15) slot.price = slot.price * 2;
        else if (slot.loop === 30) slot.dead = true;
      }
      slot.loop++;
    });
    bank_screen.textContent = bank;
  });

  slots.forEach(
    (slot) =>
      (answers.innerHTML += `
  <tr>
    <td>${slot.number}</td>
    <td>${slot.price}</td>
    <td>${slot.loop}</td>
    <td>${slot.dead}</td>
  </tr>
`)
  );
}

// 7535000
