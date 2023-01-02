const blockList = $("#block-list");

//Render current date in format : "Friday, December 13th".
function renderCurrentDate(ElementID) {
  $(ElementID).text(moment().format("dddd, MMMM Do"));
}

//Creates markup for one hour timeblock.
function createTimeblockMarkup(time24) {
  let time12 = time24 < 12 ? time24 + "AM" : time24 - 12 + "PM";
  if (time12 === "0PM") time12 = "12PM";
  return `
  <li class="time-block" data-time24=${time24}>
    <div class="hour">${time12}</div>
    <textarea id=${"textarea" + time24} class="task" rows="4"></textarea>
    <button id=${"save-btn" + time24} class="save-btn" data-time24=${time24}>
      <i class="far fa-save" data-time24=${time24}></i>
    </button>
  </li>`;
}

//Create timeblock list with start and end times.
//Arguments must be in 24Hr format.
function createDay(startTime, endTime) {
  for (let i = startTime; i <= endTime; i++) {
    blockList.append(createTimeblockMarkup(i));
  }
}

//Changes background color of timeblocks.
//Past = grey, Current = red, Future = green.
//+ sign before variable converts it into number from string.
function colorTimeblocks() {
  const currentTime = +moment().format("H");
  $("#block-list li").each(function (index, timeblock) {
    const timeBlockTime24 = +timeblock.dataset.time24;
    //Color past hours
    if (timeBlockTime24 < currentTime) {
      timeblock.children[1].className = "task past";
      //Color present hour
    } else if (timeBlockTime24 === currentTime) {
      timeblock.children[1].className = "task present";
      //Color future hours
    } else if (timeBlockTime24 > currentTime) {
      timeblock.children[1].className = "task future";
    }
  });
}

function renderFromLocalStorage() {
  if (localStorage.getItem("daySchedule")) {
    const daySchedule = JSON.parse(localStorage.getItem("daySchedule"));
    for (const time24 in daySchedule) {
      const textarea = $(`#textarea${time24}`);
      textarea.text(daySchedule[time24]);
    }
  }
}

function confirmLocalStorageSave() {
  const saveConfDiv = $("#localstorage-confirmation");
  saveConfDiv.removeClass("hide");
  setTimeout(function () {
    saveConfDiv.addClass("hide");
  }, 4000);
}

function syncWithLocalStorage(hour24, text) {
  if (!localStorage.getItem("daySchedule")) {
    localStorage.setItem("daySchedule", "{}");
  }
  let daySchedule = JSON.parse(localStorage.getItem("daySchedule"));
  daySchedule[hour24] = text;
  localStorage.setItem("daySchedule", JSON.stringify(daySchedule));
  renderFromLocalStorage();
}

function saveButtonEventListerAndHandler() {
  $("#block-list").delegate("li button", "click", function (e) {
    const clickedHour24 = e.target.dataset.time24;
    const text = $("#textarea" + clickedHour24).val();
    syncWithLocalStorage(clickedHour24, text);
    confirmLocalStorageSave();
  });
}

function init() {
  renderCurrentDate("#currentDate");
  createDay(9, 17);
  colorTimeblocks();
  renderFromLocalStorage();
  saveButtonEventListerAndHandler();
  setInterval(function () {
    colorTimeblocks();
  }, 60 * 1000);
}

init();
