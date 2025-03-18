let changeColor_ = document.getElementsByTagName("body")[0];
let inputColor = document.querySelector(".for-color input")

function changeColor() {
    changeColor_.style.backgroundColor = inputColor.value;
}

