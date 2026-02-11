let userInfo = {
  name: localStorage.getItem("name"),
  goal: localStorage.getItem("goal"),
};
let appState = [] || JSON.parse(localStorage.getItem("appState"));
const setName = () => localStorage.setItem("name", userInfo.name);
const setGoal = () => localStorage.setItem("goal", userInfo.goal);
const setAppState = () => localStorage.setItem("appState", JSON.stringify(appState));
// User Info DOMS
const userInfoPage = document.querySelector("#user-info");
const userNameInput = document.querySelector("#username");
const nameWarningMsg = document.querySelector(".name-warning");
const userGoalSelect = document.querySelector("#goal-select");
const goalSelectWarningMsg = document.querySelector(".option-warning");
const userInfoBtn = document.querySelector("#user-btn");
// Main App DOMS
const mainApp = document.querySelectorAll(".app");
const userNameDisplay = document.querySelector(".name-display");
// Add Activity DOMS
const addActivityBtn = document.querySelector("#add-activity");
const addActivityDisplay = document.querySelector("#add-inputs");
const addActivityCloseBtn = document.querySelector("#add-activity-close");
const addActivityInput = document.querySelector("#activity-input");
const addActivityCategory = document.querySelector("#activity-category");
const addActivityDurationHours = document.querySelector("#activity-duration-hours");
const addActivityDurationMinutes = document.querySelector("#activity-duration-minutes");
const addActivitySubmitBtn = document.querySelector("#log-activity");
const addActivityPopUp = document.querySelector("#add-activity-popup");
const activityWarningMsg = document.querySelector(".activity-warning");
const durationWarningMsg = document.querySelector(".duration-warning");
// Add Activity Functions
function getActivityData() {
  const activityObj = {
    id: 0,
    activityName: "",
    category: "",
    timeInMinutes: 0,
  };
  const cleanedActivityInputValue = addActivityInput.value.trim();
  const activityCategoryValue = addActivityCategory.value;
  const durationHoursValue = parseInt(addActivityDurationHours.value) || 0;
  const durationMinutesValue = parseInt(addActivityDurationMinutes.value) || 0;
  const totalDurationMinutes = (durationHoursValue * 60) + durationMinutesValue;
  activityWarningMsg.style.display = "none";
  durationWarningMsg.style.display = "none";
  if(cleanedActivityInputValue.length > 3 && totalDurationMinutes && activityCategoryValue) {
    if(totalDurationMinutes > 1440) {
      durationWarningMsg.style.display = "block";
    } else {
      addActivityInput.value = "";
      addActivityCategory.value = "default";
      addActivityDurationHours.value = "";
      addActivityDurationMinutes.value = "";
      durationWarningMsg.style.display = "none";
      activityObj.id++;
      activityObj.activityName = cleanedActivityInputValue;
      activityObj.category = activityCategoryValue;
      activityObj.timeInMinutes = totalDurationMinutes;
      setAppState();
      appState.push(activityObj);
    }
  } else {
    activityWarningMsg.style.display = "block";
  }
};
function showAddActivitySection() {
  addActivityDisplay.style.display = "flex";
  addActivityPopUp.classList.add("add-right-animation");
};
function hideAddActivitySection() {
  addActivityDisplay.style.display = "none";
  addActivityPopUp.style.right = "400px";
}
addActivityBtn.addEventListener("click", ()=> {
  showAddActivitySection();
});
addActivityCloseBtn.addEventListener("click", ()=> {
  hideAddActivitySection();
});
addActivitySubmitBtn.addEventListener("click", ()=> {
  getActivityData();
});
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
    showApp();
    renderUI(userInfo);
  } else if (nameValue.length <= 3) {
    nameWarningMsg.style.display = "block";
  } else if (selectedGoalValue === "default") {
    goalSelectWarningMsg.style.display = "block";
  }
}
function authenticateUserInfoPage() {
  if (userInfo.name && userInfo.goal) {
    userInfoPage.style.display = "none";
    showApp();
    renderUI(userInfo);
  } else {
    userInfoPage.style.display = "flex";
  }
}
userInfoBtn.addEventListener("click", () => {
  getData();
  authenticateUserInfoPage();
});
authenticateUserInfoPage();
// Main App Functions
function showApp() {
  mainApp.forEach((section) => {
    section.style.display = "block";
  });
}
function renderUI(obj) {
  userNameDisplay.textContent = obj.name;
}
const addButton = document.querySelector("#add-activity");
const inputs = document.querySelector("#add-inputs");
addButton.addEventListener("click", ()=> {
});