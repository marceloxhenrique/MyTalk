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
    const res = await fetch("http://localhost:3000/register", {
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
    console.log("Answer from backend", res);
  } else {
    alert("Provide an Email");
  }
};
document.querySelector("#signupForm").addEventListener("submit", handleSignUp);
