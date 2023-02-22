const btnColors = ["red", "blue", "green", "yellow"];
let pattern = [];
let userPattern = [];
let level = 1;
let start = false;
let button;

// $(document).on("keydown", (e) => {
//   if (!start) {
//     if (e.which == 13) {
//       events();
//     }
//   }
// });

if (!start) {
  $(".start").on("click", () => {
    events();
  });
}


function events() {
  $(".start").css("visibility", "hidden");
  restart();
  start = true;
  setTimeout(() => {
    sequence();
  }, 1000);
}

// pattern sequence
function sequence() {
  userPattern = [];
  $(".levNum").text(level++);
  const randNum = Math.floor(Math.random() * 4);
  const randColor = btnColors[randNum];
  pattern.push(randColor);

  setTimeout(() => {
    for (let i in pattern) {
      if (pattern[i]) {
        setTimeout(() => {
          press(pattern[i]);
        }, i * 800);
      }
    }
  }, 800);
}

// colors on click
$(".console__colors").on("click", (event) => {
  let className = event.target.className.split(" ");
  let colorClass = className[2];
  userPattern.push(colorClass);
  press(colorClass);
  compare(userPattern.length - 1);
});

// $(document).on("keydown", (evt) => {
//   var charStr = String.fromCharCode(evt.which);
//   if (charStr == "W") {
//     button = "green";
//   } else if (charStr == "A") {
//     button = "yellow";
//   } else if (charStr == "D") {
//     button = "red";
//   } else if (charStr == "S") {
//     button = "blue";
//   }
//   userPattern.push(button);
//   press(button);
//   compare(userPattern.length - 1);
// });


// compare pattern
function compare(a) {
  if (userPattern[a] === pattern[a]) {
    if (userPattern.length === pattern.length) {
      setTimeout(() => {
        sequence();
      }, 1000);
    }
  } else {
    $(".alert").css("visibility", "visible");
    $("body").css("background-color", "#e55b5b")
    choose();
  }
}

// press animation
function press(color) {
  $(`.${color}`).addClass("pressed");
  playSound(color);
  setTimeout(() => {
    $(`.${color}`).removeClass("pressed");
  }, 250);
}
// play sound
function playSound(color) {
  let sound = new Audio(`assets/audio/${color}.mp3`);
  sound.play();
}

// try again or quit
function choose() {
  $(".alert__btn").on("click", (e) => {
    let getBtn = e.target.className.split(" ");
    if (getBtn[1] == "try") {
      $(".start").css("visibility", "visible");
      $(".alert").css("visibility", "hidden");
      $("body").css("background-color", "antiquewhite");
    } else {
      $(".alert").html(
        `GOODBYE :) <br>
        <span class="wave">👋</span>
        `);
      $(".alert").css({ top: "100px", height: "300px" });
    }
  });
}

function restart() {
  level = 1;
  pattern = [];
}
