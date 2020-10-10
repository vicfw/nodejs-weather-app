const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", e => {
  e.preventDefault();
  const value = input.value;
  const msg1 = document.querySelector("#msg-1");
  const msg2 = document.querySelector("#msg-2");
  msg1.innerText = "Loading ...";
  fetch("http://localhost:3000/weather?address=" + value).then(response => {
    response.json().then(data => {
      if (data.error) {
        msg1.innerText = data.error;
      } else {
        msg1.innerText = data.temp;
      }
    });
  });
});
