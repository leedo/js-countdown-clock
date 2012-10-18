function Countdown(elem) {
  var MIN = 60;
  var HOUR = MIN * 60;
  var DAY = HOUR * 24;

  var start_date = new Date(elem.innerHTML);
  var start_formatted = format_date(start_date);

  var timer = setInterval(tick, 1000);

  function format_date(date) {
    var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                  "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    var hour = date.getHours();
    if (hour > 12) hour -= 12;
    var min = date.getMinutes();
    if (min < 10) min = "0" + String(min);
    var ampm = date.getHours() > 11 ? "pm" : "am";

    return hour + ":" + min + ampm + " \u2014 "
         + days[date.getDay()]
         + " " + months[date.getMonth()]
         + " " + date.getDate();
  };

  function tick() {
    var now = new Date();
    var s = Math.max(Math.floor((start_date.getTime() - now.getTime()) / 1000), 0);
    if (s == 0) clearInterval(timer);

    var units = ["days", "hours", "minutes", "seconds"];
    var durations = [];

    durations.push(Math.floor(s / DAY));
    s = s % DAY;
    durations.push(Math.floor(s / HOUR));
    s = s % HOUR;
    durations.push(Math.floor(s / MIN));
    durations.push(s % MIN);

    var table = '<table cellspacing="0">';
    table += '<tr class="start"><td colspan="4">';
    table += start_formatted;
    table += '</td></tr>';
    table += '<tr class="durations"><td>';
    table += durations.join("</td><td>");
    table += '</td></tr>';
    table += '<tr class="units"><td>';
    table += units.join("</td><td>");
    table += '</td></tr>';
    table += '</table>';

    elem.innerHTML = table;
  };
};
