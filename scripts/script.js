let userInfo = {
  name: localStorage.getItem("name"),
  goal: localStorage.getItem("goal")
};
const setName = () => localStorage.setItem("name", userInfo.name);
const setGoal = () => localStorage.setItem("goal", userInfo.goal);
// User Info DOMS
const userInfoPage = document.querySelector("#user-info");
const userNameInput = document.querySelector("#username");
const nameWarningMsg = document.querySelector(".name-warning");
const userGoalSelect = document.querySelector("#goal-select");
const goalSelectWarningMsg = document.querySelector(".option-warning");
const userInfoBtn = document.querySelector("#user-btn");
// User Info Validation And Store Data
function getData() {
  nameWarningMsg.style.display = "none";
  goalSelectWarningMsg.style.display = "none";
  const nameValue = userNameInput.value.trim();
  const cleanedName = nameValue
    .split(" ")
    .map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
    .join(" ");
  const selectedGoalValue = userGoalSelect.value;
  if (nameValue.length > 3 && selectedGoalValue !== "default") {
    const userGoal =
      userGoalSelect.options[userGoalSelect.selectedIndex].textContent.trim();
    userInfo.name = cleanedName;
    userInfo.goal = userGoal;
    setName();
    setGoal();
  } else if (nameValue.length <= 3) {
    nameWarningMsg.style.display = "block";
  } else if (selectedGoalValue === "default") {
    goalSelectWarningMsg.style.display = "block";
  }
}
function authenticateUserInfoPage() {
    if(userInfo.name && userInfo.goal) {
        userInfoPage.style.display = "none";
    } else {
        userInfoPage.style.display = "flex";
    }
}
userInfoBtn.addEventListener("click", () => {
  getData();
  authenticateUserInfoPage();
});
authenticateUserInfoPage();