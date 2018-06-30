var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

function r(array){
    return array[Math.floor(Math.random()*array.length)];
  }


var insertX = ["Willy the Goblin","Big Daddy","Father Christmas"];

var insertY = ["the soup kitchen",
    "Disneyland",
    "the White House"];

    var insertZ = ["spontaneously combusted",
    "melted into a puddle on the sidewalk",
    "turned into a slug and crawled away"];

randomize.addEventListener('click', result);

function result() {
    var name = "Bob";
    var w="300 pounds";
  if(customName.value != '') {
    name = customName.value;
  }

  if(document.getElementById("uk").checked) {
    w = Math.round(300/14)+" stones";
  }

  story.textContent = "It was 94 farenheit outside, so "+r(insertX)+" went for a walk. When they got to "+r(insertY)+", they stared in horror for a few moments, then "+r(insertZ)+". "+name+" saw the whole thing, but "+name+" was not surprised — "+r(insertX)+" weighs "+w+", and it was a hot day.";
  story.style.visibility = 'visible';
}