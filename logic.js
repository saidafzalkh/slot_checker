const bank_screen = document.getElementById("bank");
const winners_input = document.getElementById("winners");
const answers = document.getElementById("answers");

let bank = 8325000;
bank_screen.textContent = bank;

let slots = Array.from(Array(37)).map((e, i) => ({
  number: i,
  price: 1000,
  loop: 1,
  dead: false,
}));

function handlePlay() {
  let winners = winners_input.value
    .trim()
    .split(" ")
    .map((e) => Number(e));

  winners.forEach((win) => {
    slots.forEach((slot) => {
      if (slot.dead) return;
      if (win === slot.number) {
        bank = bank + slot.price * 35;
        slot.loop = 0;
        slot.price = 1000;
      } else {
        bank = bank - slot.price;
        if (slot.loop === 15) slot.price = slot.price * 2;
        else if (slot.loop === 30) slot.price = slot.price * 2;
        else if (slot.loop === 45) slot.price = slot.price * 2;
        else if (slot.loop === 60) slot.dead = true;
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
