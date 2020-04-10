const numDivs = 36;
const maxHits = 10;

let hits = 0;
let missHits = 0;
let firstHitTime = 0;

function round() {
  $('.target').removeClass('target');  // FIXME: надо бы убрать "target" прежде чем искать новый
  $('.miss').removeClass('miss'); 
 
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1) // TODO: помечать target текущим номером

  if (hits === maxHits) $(divSelector).text(1)

  if (hits === 1) { 
    firstHitTime = getTimestamp(); // FIXME: тут надо определять при первом клике firstHitTime
  } 

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $('div.game-field').hide();// FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $('#totalMissScores').text(missHits);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  let targetText = $(event.target)
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    targetText.text(''); // FIXME: убирать текст со старых таргетов. Кажется есть .text?
    round();
  } else {// TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  	missHits += 1
  	$(event.target).addClass('miss'); 
  } 
  
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    hits = 0;
    missHits = 0;
    firstHitTime = 0;
    $('.game-field').show();
    $('#win-message').addClass("d-none");   
  });
}

$(document).ready(init);
