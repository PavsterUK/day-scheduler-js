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
    <textarea id=${"textarea" + time24} class="task" rows="4"></textarea>
    <button id="save-btn" class="saveBtn">
      <i class="far fa-save"></i>
    </button>
  </li>`;
  return markup;
}

//
function createDay(startTime, endTime) {
  for (let i = startTime; i <= endTime; i++) {
    blockList.append(createTimeblockMarkup(i));
  }
}

//Changes background color of timeblocks.
//Past = grey, Current = red, Future = green.
//+ sign before variable turns it into number from string.
function colorTimeblocks() {
  const CurrentTime = +moment().format("H");
  $("#block-list li").each(function (index, timeblock) {
    const timeBlockTime24 = +timeblock.dataset.time24;
    //Color past hours
    if (timeBlockTime24 < CurrentTime) {
      timeblock.children[1].className = "task past";
      //Color present hour
    } else if (timeBlockTime24 === CurrentTime) {
      timeblock.children[1].className = "task present";
      //Color future hours
    } else if (timeBlockTime24 > CurrentTime) {
      timeblock.children[1].className = "task future";
    }
  });
}

function syncWithLocalStorage() {
  console.log($('#textarea9').val());
}

$("#block-list").delegate("li button", "click", function (e) {
  console.log(e)
  // syncWithLocalStorage();
});

createDay(9, 22);
colorTimeblocks();
