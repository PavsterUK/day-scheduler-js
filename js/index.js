const currentDayElement = $("#currentDay");
const blockList = $("#block-list");

//Get current date in format like: "Friday, December 13th".
function getCurrentDate() {
  return moment().format("dddd, MMMM Do");
}

//Creates markup for one hour timeblock.
function createTimeblockMarkup(time24) {
  let time12 = time24 < 12 ? time24 + "AM" : time24 - 12 + "PM";
  if (time12 === "0PM") time12 = "12PM";
  const markup = `
  <li class="time-block" data-time24=${time24}>
    <div class="hour">${time12}</div>
    <textarea id="textarea" class="task" rows="4"></textarea>
    <button id="saveBtn" class="saveBtn">
      <i class="far fa-save"></i>
    </button>
  </li>`;
  return markup;
}

//
function renderWorkDay(startTime, endTime) {
  for (let i = startTime; i <= endTime; i++) {
    blockList.append(createTimeblockMarkup(i));
  }
}

//Changes background color of timeblocks.
//Past = grey, Current = red, Future = green.
function colorCodeTimeblocks() {
  const CurrentDateAndTime = moment().format('H');

  $("#block-list li").each(function (index, timeblock) {
    if (timeblock.dataset.time24 < CurrentDateAndTime) {
      timeblock.children(1).removeClass().addClass('task past')
    }
  });
}

renderWorkDay(9, 17);
colorCodeTimeblocks();
