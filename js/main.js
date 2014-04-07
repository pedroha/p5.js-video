var pop,
editor,
sketch,
videoBase = {x: 0, y: 0};

$(document).ready( function () {

  $(window).resize( function () {
    videoBase.x = $(document).width()/2;
    videoBase.y = $(document).height();
  });

  $("#videoClip").bind("canplaythrough", function(e) {
    $("#begin").button('reset')

    videoBase.x = $(document).width()/2;
    videoBase.y = $(document).height();    

    seriouslyInit();
  });

  popcornInit();   

  // Ace setup
  
  editor = ace.edit("exampleEditor");

  // Buttons

  $("#showExample").click( function () {
    $("#example").fadeIn("fast");
    $("#showExample").fadeOut("fast");
    pop.pause();
  });

  $("#hideExample").click( function () {
    $("#example").fadeOut("fast");
    $("#showExample").fadeIn("fast");
    pop.play();
  });  

  $("#runExample").click( function () {
    var exampleCode = editor.getSession().getValue(); 
    $("#exampleFrame")[0].contentWindow.clear();
    $("#exampleFrame")[0].contentWindow.eval(exampleCode);
  });

  $("#begin").click( function() {
    $("#welcome").hide();
    $("#videoCanvas").fadeIn();    
    pop.play();
  });

  $("#begin").button('loading'); 

});

// Initialize Popcorn

function popcornInit() {

  pop = Popcorn.smart("#videoClip", "assets/video_short.mp4");
  pop.autoplay(false);

  pop.code({
    start: 3.3,
    onStart: function( options ) {
      sketch = new p5(rectangleSketch, "sketchCanvas");
      $("#mainControls").fadeIn();
    }
  });

  pop.code({
    start:  5.25,
    onStart: function( options ) {
      sketch.rectangleColor = sketch.color(0,0,255);
    }
  });
}

// Initialize Seriously

function seriouslyInit() {

  var seriously, 
  chroma,
  target; 

  seriously = new Seriously();
  target = seriously.target('#videoCanvas');
  chroma = seriously.effect('chroma');

  chroma.weight = 1.32;
  chroma.balance = 0;
  chroma.screen = 'rgb(77, 239, 41)';
  chroma.clipWhite = 0.85;
  chroma.clipBlack = 0.65;

  chroma.source = "#videoClip";
  target.source = chroma;

  seriously.go();
}