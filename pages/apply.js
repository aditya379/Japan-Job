const backButton = document.getElementById("back");
const submitButton = document.getElementById("submit");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const pincode = document.getElementById("pincode");
const file = document.getElementById("file");


submitButton.addEventListener("click", () => {
    if(name.value == "" || email.value == "" || phone.value == "" || address.value == "" || city.value == "" || state.value == "" || pincode.value == "" || file.value == "") {
        alert("Please fill all the fields");
        return;
    }
    else{
        document.querySelector(".afterapply").style.display = "flex";
        document.querySelector(".div").style.display = "none";
    }

})

backButton.addEventListener("click", () => {
    window.history.back();
})