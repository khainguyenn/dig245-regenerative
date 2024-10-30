const holidays = [
  { name: "new-year", date: new Date(new Date().getFullYear(), 0, 1) },
  { name: "Independence Day", date: new Date(new Date().getFullYear(), 6, 4) },
  { name: "Thanksgiving", date: getThanksgivingDate(new Date().getFullYear()) },
  { name: "Christmas", date: new Date(new Date().getFullYear(), 11, 25) }
];

function getThanksgivingDate(year) {
  const november = new Date(year, 10, 1);
  const firstThursday = (11 - november.getDay() + 7) % 7;
  return new Date(year, 10, firstThursday + 21);
}

function findClosestHoliday(selectedDate) {
  let closest = holidays[0];
  let minDiff = Math.abs(selectedDate - closest.date);

  holidays.forEach(holiday => {
    const diff = Math.abs(selectedDate - holiday.date);
    if (diff < minDiff) {
      closest = holiday;
      minDiff = diff;
    }
  });

  return closest;
}

document.getElementById("pick-date").addEventListener("click", () => {
  const userDateInput = document.getElementById("user-date").value;
  if (userDateInput) {
    const userDate = new Date(userDateInput);
    const closestHoliday = findClosestHoliday(userDate);
    redirectToHolidayPage(closestHoliday);
  } else {
    alert("Please select a date.");
  }
});

document.getElementById("find-holiday").addEventListener("click", () => {
  const today = new Date();
  const closestHoliday = findClosestHoliday(today);
  redirectToHolidayPage(closestHoliday);
});

function redirectToHolidayPage(holiday) {
  const holidayName = holiday.name;
  const holidayDate = holiday.date.toDateString();
  window.location.href = `holiday.html?name=${holidayName}&date=${encodeURIComponent(holidayDate)}`;
}
