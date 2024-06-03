export default class Toast {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
  addToastSuccess() {
    const toast = document.querySelector("#toast-box");
    toast.innerHTML = `
    <span id="toast-success">
      <span id="icon-toast" class="material-symbols-outlined">check_circle</span>
      <div id="toast-message">
        <span id="toast-title">${this.title}</span>
        ${this.text}
      </div>
      </span>
    `;
    setTimeout(() => {
      toast.innerHTML = "";
    }, 3000);
  }

  addToastError() {
    const toast = document.querySelector("#toast-box");
    toast.innerHTML = `
    <span id="toast-error">
      <span id="icon-toast" class="material-symbols-outlined">cancel</span>
      <div id="toast-message">
        <span id="toast-title">${this.title}</span>
        ${this.text}
      </div>
    </span>
    `;
    setTimeout(() => {
      toast.innerHTML = "";
    }, 3000);
  }
}
