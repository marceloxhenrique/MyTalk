const socket = io();
const button = document.querySelector("button");
const message = document.getElementById("messages");

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  if (input.value) {
    const person = {
      userName: "Marcelo",
      email: "teste",
      password: "1234",
    };
    socket.emit("room", person);
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const item = document.createElement("p");
  item.textContent = msg;
  message.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
