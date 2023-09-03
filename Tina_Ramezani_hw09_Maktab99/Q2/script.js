const breakfast = "7:00 a.m";
const lunch = "12:00 p.m";
const dinner = "7:00 p.m";

function convertTo24(time) {
  let [initialTime, abbreviation] = time.split(" ");
  let [hours, minutes] = initialTime.split(":").map((ele) => parseInt(ele));
  if (abbreviation == "p.m" && hours != 12) {
    hours += 12;
  }
  if (abbreviation == "a.m" && hours == 12) {
    hours = 0;
  }

  let newTime = new Date();
  newTime.setHours(hours);
  newTime.setMinutes(minutes);
  newTime.setSeconds("0");
  return newTime;
}

function findDifference(nextTime, givenTime) {
  let milisecondDifference = givenTime - nextTime;
  let differenceHours = milisecondDifference / (1000 * 60 * 60);
  let remainingHours = Math.floor(Math.abs(differenceHours));
  let remainingMinutes = Math.round((Math.abs(differenceHours) * 60) % 60);
  if (remainingMinutes >= 60) {
    remainingHours += Math.floor(remainingMinutes / 60);
    remainingMinutes %= 60;
  }
  return `${remainingHours} Hours and ${remainingMinutes} Minutes`;
}

function tomorrow() {
  const current = new Date();
  let tomorrow = new Date(current);

  tomorrow.setDate(current.getDate() + 1);
  tomorrow.setHours(7, 0, 0, 0);

  return tomorrow;
}

function nextMeal(time) {
  let userTime = convertTo24(time);
  let userHour = userTime.getHours();
  let userMinutes = userTime.getMinutes();

  if (userHour === 7 && userMinutes === 0) {
    console.log("Breakfast Time!");
  } else if (userHour === 12 && userMinutes === 0) {
    console.log("Lunch Time!");
  } else if (userHour === 19 && userMinutes == 0) {
    console.log("Dinner Time!");
  } else if (userHour >= 12 && userHour < 19) {
    console.log(
      `${findDifference(convertTo24(dinner), userTime)}, Next Meal is Dinner!`
    );
  } else if (userHour >= 7 && userHour < 12) {
    console.log(
      `${findDifference(convertTo24(lunch), userTime)}, Next Meal is Lunch!`
    );
  } else if (userHour > 19) {
    console.log(
      `${findDifference(tomorrow(), userTime)}, Next Meal is Breakfast!`
    );
  } else if (userHour < 7) {
    console.log(
      `${findDifference(
        convertTo24(breakfast),
        userTime
      )}, Next Meal is Breakfast!`
    );
  }
}

nextMeal("10:00 p.m");
nextMeal("5:50 a.m");
nextMeal("2:00 p.m");
nextMeal("12:00 p.m");
