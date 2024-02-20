const pwInput = document.getElementById("password");

const iconEye = document.getElementById("iconEyeSm");

const iconEyeOff = document.getElementById("iconEyeOffSm");

iconEye.addEventListener("click", () => {
  hidePassword();
});

iconEyeOff.addEventListener("click", () => {
  showPassword();
});

const showPassword = () => {
  pwInput.setAttribute("type", "text");
  iconEye.style = "display: block;";
  iconEyeOff.style = "display: none;";
};

const hidePassword = () => {
  pwInput.setAttribute("type", "password");
  iconEye.style = "display: none;";
  iconEyeOff.style = "display: block;";
};
