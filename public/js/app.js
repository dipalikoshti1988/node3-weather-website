console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  //   console.log(location);
  messageOne.textContent = "Loading.....";
  if (!location) {
    alert("You must enter an address");
    messageOne.textContent = "";
    return false;
  }
  fetch(`http://127.0.0.1:3000/weather?address=${location}`).then(response => {
    //   console.log(response);
    response.json().then(data => {
      if (data.error) {
        // console.log(data.error);
        messageTwo.textContent = data.error;
        messageOne.textContent = "";
      } else {
        // console.log(data.location);
        // console.log(data.forecast);
        messageOne.textContent = data.location + ".\r\n" + data.forecast;
        messageTwo.textContent = "";
      }
    });
  });
});
