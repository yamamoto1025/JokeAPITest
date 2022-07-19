var curjoke = {};
var isShowPunchLine = false;

$(document).ready(() => {
  start();
});

$("#btn_genRandomJoke").click(() => {
  start();
});

$("#btn_controlPunchline").click(() => {
  if (!isShowPunchLine) {
    isShowPunchLine = true;
    $("#div_punchline").show();
    $("#btn_controlPunchline").html("Hide Punchline");
  } else {
    isShowPunchLine = false;
    $("#div_punchline").hide();
    $("#btn_controlPunchline").html("Show Punchline");
  }
});

const setLoading = () => {
  isLoading = true;
  isShowPunchLine = false;
  $("#loading").show();
  $("#main").hide();
  $("#error").hide();
};

const setUnLoading = () => {
  isLoading = false;
  $("#loading").hide();
  if (curjoke.success) {
    $("#main").show();
    $("#div_punchline").hide();
    $("#text_joke").text(curjoke.setup);
    $("#text_punchline").text(curjoke.punchline);
    $("#btn_control").val("Show Punchline");
  } else {
    $("#error").show();
  }
};

const start = async () => {
  setLoading();
  await fetchJoke();
  setUnLoading();
};

const fetchJoke = async () => {
  await fetch("https://karljoke.herokuapp.com/jokes/random", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((joke) => {
      curjoke = joke;
      curjoke.success = true;
    })
    .catch((err) => {
      curjoke.success = false;
      console.error(err);
    });
};
