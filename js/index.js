const currentDayElement = $("#currentDay");
let currentTimeStamp = moment();

function displayCurrentDate() {
  currentDayElement.text(moment().format("dddd, MMMM Do"));
}

function createHourMarkup(hour) {
  const markup = `
  <li class="time-block">
    <div class="hour">${hour}</div>
    <textarea id="textarea" class="task" rows="4"></textarea>
    <button id="saveBtn" class="saveBtn">
      <i class="far fa-save"></i>
    </button>
  </li>`;
  return markup;
}

function createWorkDay(startTime, endTime) {
  for (let i = startTime; i <= endTime; i++) {
    let time = i < 12 ? i + "AM" : i - 12 + "PM";
    if (time === "0PM") time = "12PM";
    $("#task-list").append(createHourMarkup(time));
  }
}

createWorkDay(9, 17);
