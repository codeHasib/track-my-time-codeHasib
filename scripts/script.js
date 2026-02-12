let userInfo = {
  name: localStorage.getItem("name"),
  goal: localStorage.getItem("goal"),
};
let appState = JSON.parse(localStorage.getItem("appState")) || [];
const setName = () => localStorage.setItem("name", userInfo.name);
const setGoal = () => localStorage.setItem("goal", userInfo.goal);
const setAppState = () =>
  localStorage.setItem("appState", JSON.stringify(appState));
function getNewDate() {
  return new Date().toLocaleDateString().split("/").join("-");
}
getNewDate();
const newDate = getNewDate();
// Summarization Function
function newDaySummarize() {
  const filteredArr = [];
  if (appState.length > 0) {
    appState.forEach((obj) => {
      if (newDate === obj.date) {
        filteredArr.push(obj);
      }
    });
  }
  return filteredArr;
}
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
const addActivityDurationHours = document.querySelector(
  "#activity-duration-hours",
);
const addActivityDurationMinutes = document.querySelector(
  "#activity-duration-minutes",
);
const addActivitySubmitBtn = document.querySelector("#log-activity");
const addActivityPopUp = document.querySelector("#add-activity-popup");
const activityWarningMsg = document.querySelector(".activity-warning");
const activityAddedDone = document.querySelector(".activity-done");
const durationWarningMsg = document.querySelector(".duration-warning");
// Add Activity Functions
function getActivityData() {
  const activityObj = {
    date: "",
    activityName: "",
    category: "",
    timeInMinutes: 0,
  };
  const cleanedActivityInputValue = addActivityInput.value.trim();
  const activityCategoryValue = addActivityCategory.value;
  const durationHoursValue = parseInt(addActivityDurationHours.value) || 0;
  const durationMinutesValue = parseInt(addActivityDurationMinutes.value) || 0;
  const totalDurationMinutes = durationHoursValue * 60 + durationMinutesValue;
  activityWarningMsg.style.display = "none";
  durationWarningMsg.style.display = "none";
  activityAddedDone.style.display = "none";
  if (
    cleanedActivityInputValue.length > 0 &&
    totalDurationMinutes &&
    activityCategoryValue
  ) {
    if (totalDurationMinutes > 1440) {
      durationWarningMsg.style.display = "block";
    } else {
      addActivityInput.value = "";
      addActivityCategory.value = "default";
      addActivityDurationHours.value = "";
      addActivityDurationMinutes.value = "";
      durationWarningMsg.style.display = "none";
      activityAddedDone.style.display = "block";
      activityObj.date = newDate;
      activityObj.activityName = cleanedActivityInputValue;
      activityObj.category = activityCategoryValue;
      activityObj.timeInMinutes = totalDurationMinutes;
      appState.push(activityObj);
      setAppState();
    }
  } else {
    activityWarningMsg.style.display = "block";
  }
}
function showAddActivitySection() {
  addActivityDisplay.style.display = "flex";
  addActivityPopUp.classList.add("add-right-animation");
  activityAddedDone.style.display = "none";
  activityWarningMsg.style.display = "none";
}
function hideAddActivitySection() {
  addActivityDisplay.style.display = "none";
  addActivityPopUp.style.right = "400px";
}
addActivityBtn.addEventListener("click", () => {
  showAddActivitySection();
});
addActivityCloseBtn.addEventListener("click", () => {
  hideAddActivitySection();
  addActivityInput.value = "";
  addActivityCategory.value = "default";
  addActivityDurationHours.value = "";
  addActivityDurationMinutes.value = "";
});
addActivitySubmitBtn.addEventListener("click", () => {
  getActivityData();
  renderHistory(appState);
  renderSummaryHeaderUI(userInfo, newDaySummarize());
  renderSummaryAllCategoryTime(newDaySummarize());
  summarizeTime(newDaySummarize());
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
addButton.addEventListener("click", () => {});
// Activity History DOMS & Functions
const activityHistoryBtn = document.querySelector("#activity-history");
const historyDivParent = document.querySelector("#history-parent");
const historyDisplay = document.querySelector(".history-div");
const closeHistory = document.querySelector("#close-history");
const sortHistoryInput = document.querySelector("#sort-activity-history");
const sortDateInput = document.querySelector("#history-date");
activityHistoryBtn.addEventListener("click", () => {
  historyDivParent.classList.toggle("open");
  sortDateInput.value = "";
  sortHistoryInput.value = "default";
  renderHistory(appState);
});
function renderHistory(arr) {
  historyDisplay.innerHTML = "";
  if (arr.length > 0) {
    arr.forEach((activityObj) => {
      let div = document.createElement("div");
      let h2 = document.createElement("h2");
      h2.textContent = `Activity: ${activityObj.activityName}`;
      div.append(h2);
      let h3 = document.createElement("h3");
      h3.textContent = `Category: ${activityObj.category}`;
      div.append(h3);
      let hours = Math.trunc(activityObj.timeInMinutes / 60);
      let minutes = activityObj.timeInMinutes % 60;
      let h4 = document.createElement("h4");
      h4.textContent = `Duration: ${hours}hrs ${minutes}mins.`;
      div.append(h4);
      let p = document.createElement("h5");
      p.textContent = `Date: ${activityObj.date}`;
      div.append(p);
      historyDisplay.append(div);
    });
  } else {
    let h2 = document.createElement("h2");
    h2.textContent = "No activity history";
    h2.style.fontSize = "24px";
    h2.style.color = "black";
    h2.style.fontWeight = "bolder";
    h2.style.marginTop = "20px";
    h2.style.textAlign = "center";
    historyDisplay.append(h2);
  }
}
renderHistory(appState);
function sortHistory() {
  const filteredArr = [];
  const query = sortHistoryInput.value;
  if (query === "all") {
    appState.forEach((obj) => {
      filteredArr.push(obj);
    });
  }
  appState.forEach((obj) => {
    if (query === obj.category) {
      filteredArr.push(obj);
    }
  });
  renderHistory(filteredArr);
}
function sortHistoryByDate() {
  const dateInputValueArr = sortDateInput.value.split("-");
  const formatInputValue = dateInputValueArr.reverse().join("-");
  const filteredArr = [];

  if (formatInputValue.length > 0) {
    appState.forEach((obj) => {
      if (obj.date === formatInputValue) filteredArr.push(obj);
    });
    renderHistory(filteredArr);
  } else {
    renderHistory(appState);
  }
}
sortDateInput.addEventListener("change", () => {
  sortHistoryByDate();
});
sortHistoryInput.addEventListener("change", () => {
  sortHistory();
});
closeHistory.addEventListener("click", () => {
  historyDivParent.classList.remove("open");
  sortHistoryInput.value = "default";
});
// Summary DOMS & Functions
const summaryBtn = document.querySelector("#activity-summary");
const summaryDisplay = document.querySelector("#summary-parent");
const closeSummaryDisplay = document.querySelector("#close-summary");
const summaryDateInput = document.querySelector("#summary-date");
summaryBtn.addEventListener("click", () => {
  summaryDisplay.classList.toggle("open");
  summaryDateInput.value = "";
  renderSummaryHeaderUI(userInfo, newDaySummarize());
  renderSummaryAllCategoryTime(newDaySummarize());
  summarizeTime(newDaySummarize());
});
closeSummaryDisplay.addEventListener("click", () => {
  summaryDisplay.classList.remove("open");
  summaryDateInput.value = "";
  renderSummaryHeaderUI(userInfo, newDaySummarize());
  renderSummaryAllCategoryTime(newDaySummarize());
  summarizeTime(newDaySummarize());
});
const summaryGoalDisplay = document.querySelector("#summary-goal");
const summaryTotalTimeDisplay = document.querySelector("#summary-total-time");
function renderSummaryHeaderUI(obj, arr) {
  let totalMinutes = 0;
  if (obj.goal && arr.length > 0) {
    summaryGoalDisplay.textContent = obj.goal;
    arr.forEach((obj) => {
      totalMinutes += obj.timeInMinutes;
    });
    let totalHours = Math.trunc(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    summaryTotalTimeDisplay.textContent = `${totalHours}hrs ${minutes}mins`;
  } else {
    summaryTotalTimeDisplay.textContent = "0hrs.";
    summaryGoalDisplay.textContent = "No goal";
  }
}
renderSummaryHeaderUI(userInfo, newDaySummarize());
const productiveTimeDisplay = document.querySelector(
  "#summary-productive-time",
);
const studyTimeDisplay = document.querySelector("#summary-study-time");
const workTimeDisplay = document.querySelector("#summary-work-time");
const entertainmentDisplay = document.querySelector(
  "#summary-entertainment-time",
);
const restTimeDisplay = document.querySelector("#summary-rest-time");
const socialTimeDisplay = document.querySelector("#summary-social-time");
function renderSummaryAllCategoryTime(arr) {
  let productiveTime = 0;
  let studyTime = 0;
  let workTime = 0;
  let entertainmentTime = 0;
  let restTime = 0;
  let socialTime = 0;
  if (arr.length > 0) {
    arr.forEach((obj) => {
      if (obj.category === "Productivity") {
        productiveTime += obj.timeInMinutes;
      } else if (obj.category === "Study") {
        studyTime += obj.timeInMinutes;
      } else if (obj.category === "Work") {
        workTime += obj.timeInMinutes;
      } else if (obj.category === "Entertainment") {
        entertainmentTime += obj.timeInMinutes;
      } else if (obj.category === "Rest") {
        restTime += obj.timeInMinutes;
      } else if (obj.category === "Social Media") {
        socialTime += obj.timeInMinutes;
      }
    });
  }
  productiveTimeDisplay.textContent = `${hours(productiveTime)}hrs ${mins(productiveTime)}mins`;
  studyTimeDisplay.textContent = `${hours(studyTime)}hrs ${mins(studyTime)}mins`;
  workTimeDisplay.textContent = `${hours(workTime)}hrs ${mins(workTime)}mins`;
  entertainmentDisplay.textContent = `${hours(entertainmentTime)}hrs ${mins(entertainmentTime)}mins`;
  restTimeDisplay.textContent = `${hours(restTime)}hrs ${mins(restTime)}mins`;
  socialTimeDisplay.textContent = `${hours(socialTime)}hrs ${mins(socialTime)}mins`;
}
function hours(num) {
  let hours = Math.trunc(num / 60);
  return hours;
}
function mins(num) {
  let minutes = num % 60;
  return minutes;
}
renderSummaryAllCategoryTime(newDaySummarize());
const topTimeDisplay = document.querySelector("#summary-top");
const leastTimeDisplay = document.querySelector("#summary-least");
function summarizeTime(arr) {
  let productiveTime = 0;
  let studyTime = 0;
  let workTime = 0;
  let entertainmentTime = 0;
  let restTime = 0;
  let socialTime = 0;
  if (arr.length > 0) {
    arr.forEach((obj) => {
      if (obj.category === "Productivity") {
        productiveTime += obj.timeInMinutes;
      } else if (obj.category === "Study") {
        studyTime += obj.timeInMinutes;
      } else if (obj.category === "Work") {
        workTime += obj.timeInMinutes;
      } else if (obj.category === "Entertainment") {
        entertainmentTime += obj.timeInMinutes;
      } else if (obj.category === "Rest") {
        restTime += obj.timeInMinutes;
      } else if (obj.category === "Social Media") {
        socialTime += obj.timeInMinutes;
      }
    });
  }
  let allTimeArr = [
    productiveTime,
    studyTime,
    workTime,
    entertainmentTime,
    restTime,
    socialTime,
  ];
  let maxTime = Math.max(...allTimeArr);
  let minTime = Math.min(...allTimeArr);
  if (productiveTime === maxTime) topTimeDisplay.textContent = "Productivity";
  else if (studyTime === maxTime) topTimeDisplay.textContent = "Study";
  else if (workTime === maxTime) topTimeDisplay.textContent = "Work";
  else if (entertainmentTime === maxTime)
    topTimeDisplay.textContent = "Entertainment";
  else if (restTime === maxTime) topTimeDisplay.textContent = "Rest";
  else if (socialTime === maxTime) topTimeDisplay.textContent = "Social Media";

  if (productiveTime === minTime) leastTimeDisplay.textContent = "Productivity";
  else if (studyTime === minTime) leastTimeDisplay.textContent = "Study";
  else if (workTime === minTime) leastTimeDisplay.textContent = "Work";
  else if (entertainmentTime === minTime)
    leastTimeDisplay.textContent = "Entertainment";
  else if (restTime === minTime) leastTimeDisplay.textContent = "Rest";
  else if (socialTime === minTime)
    leastTimeDisplay.textContent = "Social Media";
}
summarizeTime(newDaySummarize());
function sortSummaryByDate() {
  const dateInputValueArr = summaryDateInput.value.split("-");
  const formatInputValue = dateInputValueArr.reverse().join("-");
  const filteredArr = [];

  if (formatInputValue.length > 0) {
    appState.forEach((obj) => {
      if (formatInputValue === obj.date) filteredArr.push(obj);
      console.log(formatInputValue);
    });
    renderSummaryAllCategoryTime(filteredArr);
    renderSummaryHeaderUI(userInfo, filteredArr);
    summarizeTime(filteredArr);
  } else {
    renderSummaryAllCategoryTime(appState);
    renderSummaryHeaderUI(userInfo, appState);
    summarizeTime(appState);
  }
}
summaryDateInput.addEventListener("change", () => {
  sortSummaryByDate();
});