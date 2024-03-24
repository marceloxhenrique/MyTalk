const socket = io();
const button = document.querySelector("button");
const loginSection = document.querySelector("#login");
const signupSection = document.querySelector("#signup");

const signupLink = document.getElementById("signupLink");
signupLink.addEventListener("click", () => {
  loginSection.classList.toggle("dontShow");
  signupSection.classList.toggle("dontShow");
});

const loginLink = document.getElementById("loginLink");
loginLink.addEventListener("click", () => {
  loginSection.classList.toggle("dontShow");
  signupSection.classList.toggle("dontShow");
});

const handleSignUp = async (e) => {
  e.preventDefault();
  const email = document.querySelector("#signupEmail");
  const password = document.querySelector("#signupPassword");
  if (email.value.length > 1) {
    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    email.value = "";
    password.value = "";
  } else {
    alert("Provide an Email");
  }
};
document.querySelector("#signupForm").addEventListener("submit", handleSignUp);

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const inputEmail = document.querySelector("#emailLogin");
//   if (inputEmail.value) {
//     console.log(inputEmail.value);
//     const person = {
//       userName: "Marcelo",
//       email: inputEmail.value,
//       password: "1234",
//     };
//     socket.emit("room", person);
//     socket.emit("chat message", inputEmail.value);
//     inputEmail.value = "";
//   }
// });

// socket.on("chat message", (msg) => {
//   const item = document.createElement("p");
//   item.textContent = msg;
//   const message = document.getElementById("messages");
//   message.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });
