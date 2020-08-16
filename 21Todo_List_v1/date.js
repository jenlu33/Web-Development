exports.getDate = () => {
  const today = new Date();

  // switch (today.getDay()) {
  //   case 0:
  //     day = "Sunday";
  //   case 1:
  //     day = "Monday";
  //   case 2:
  //     day = "Tuesday";
  //   case 3:
  //     day = "Wednesday";
  //   case 4:
  //     day = "Thursday";
  //   case 5:
  //     day = "Friday";
  //   case 6:
  //     day = "Saturday";
  //   default:
  //     break;
  // }

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options);
}