let mobilenet;
let classifier;
let video;
let label = 'test';
let kittyButton;
let LukaButton;
let NehaButton;
let trainButton;

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  kittyButton = createButton('kitty');
  kittyButton.mousePressed(function() {
    classifier.addImage('kitty');
  });

  LukaButton = createButton('Luka');
  LukaButton.mousePressed(function() {
    classifier.addImage('Luka');
  });

  NehaButton = createButton('Neha');
  NehaButton.mousePressed(function() {
      classifier.addImage('Neha');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });


}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}