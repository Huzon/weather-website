console.log("Client side js is loaded");

const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const responseDOM = document.querySelector("#response");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); //prevents default behavior of the form
    const value = searchText.value;
    if (!value) {
        return (responseDOM.textContent = "No value provided");
    }

    fetch(`/weather?address=${value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return (responseDOM.textContent = data.error);
            }
            responseDOM.textContent = `Temperature in ${data.location} is ${data.temperature}, it will feel like ${data.feelslike}`;
        });
    });
});