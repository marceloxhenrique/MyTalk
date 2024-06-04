import Toast from "./toast.js";
const socket = io("ws://localhost:3000");
const button = document.querySelector("button");
const loginSection = document.querySelector("#login");
const signupSection = document.querySelector("#signup");
const signupLink = document.getElementById("signupLink");

signupLink.addEventListener("click", () => {
  loginSection.classList.toggle("dont-show-signup");
  signupSection.classList.toggle("dont-show-signup");
});
const loginLink = document.getElementById("loginLink");
loginLink.addEventListener("click", () => {
  loginSection.classList.toggle("dont-show-signup");
  signupSection.classList.toggle("dont-show-signup");
});

const signUpInputEmail = document.querySelector("#signupEmail");
const signUpInputPassword = document.querySelector("#signupPassword");

const handleSignUp = async (e) => {
  e.preventDefault();
  if (!isValidEmail(signUpInputEmail.value) || !isValidPassword(signUpInputPassword.value)) {
    const toast = new Toast(
      "Error",
      "Use a valid email and a password with at least 6 characters."
    );
    return toast.addToastError();
  }
  try {
    const signResult = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signUpInputEmail.value,
        password: signUpInputPassword.value,
      }),
    });

    if (signResult.ok) {
      signUpInputEmail.value = "";
      signUpInputPassword.value = "";
      loginSection.classList.toggle("dont-show-signup");
      signupSection.classList.toggle("dont-show-signup");
      const toast = new Toast("Success", "You have signed up successfully!");
      toast.addToastSuccess();
    } else {
      const output = await signResult.json();
      const toast = new Toast("Error", output.message);
      toast.addToastError();
    }
  } catch (error) {
    console.error("Error", error);
    const toast = new Toast("Error", "Sign-up failed.");
    toast.addToastError();
  }
};
document.querySelector("#signup").addEventListener("submit", handleSignUp);

const loginInputEmail = document.querySelector("#emailLogin");
const loginInputPassword = document.querySelector("#passwordLogin");

const handleLogin = async (e) => {
  e.preventDefault();

  if (!isValidEmail(loginInputEmail.value) || !isValidPassword(loginInputPassword.value)) {
    const toast = new Toast(
      "Error",
      "Use a valid email and a password with at least 6 characters."
    );
    return toast.addToastError();
  }
  try {
    const loginResult = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginInputEmail.value,
        password: loginInputPassword.value,
      }),
      credentials: "include",
      sameSite: "strict",
    });
    if (loginResult.ok) {
      return (window.location.href = "./chat/chat.html");
    }
    const output = await loginResult.json();
    const toast = new Toast("Error", output.message);
    toast.addToastError();
  } catch (error) {
    const toast = new Toast("Error", "Login failed.");
    toast.addToastError();
    console.error("Error", error);
  }
};
document.querySelector("#login").addEventListener("submit", handleLogin);

const isValidEmail = (email) => {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validEmail.test(String(email).toLowerCase());
};

const isValidPassword = (password) => {
  const validPassword = /^.{6,}/;
  return validPassword.test(String(password));
};

// const list = document.getElementById("list");
// socket.on("message", (msg) => {
//   const newItem = document.createElement("li");
//   newItem.textContent = msg;
//   list?.appendChild(newItem);
// });
