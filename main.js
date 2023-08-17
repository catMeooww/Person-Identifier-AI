objects = [];
var Status = false;

function setup() {
    canvas = createCanvas(500, 380);
    video = createCapture(VIDEO);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}
function preload(){
    som = loadSound("alarm.mp3");
}
function draw() {
    image(video, 0, 0, 500, 380);
    som.setVolume(0.1);
    if (Status == true) {
        objectDetector.detect(video, gotResults);
        R = random(255);
        G = random(255);
        B = random(255);
        for (i = 0; i < objects.length; i++) {
            fill(R, G, B);
            noFill();
            stroke(R, G, B);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            text(objects[i].label, objects[i].x + 10, objects[i].y + 10);
            document.getElementById("status").innerHTML = "detectando objetos";
            if (objects[i].label == "person") {
                document.getElementById("objectsnumber").innerHTML = "pessoa identificada";
                som.stop();
            } else {
                document.getElementById("objectsnumber").innerHTML = "Não é possível identificar pessoas";
                som.play();
            }
        }
    }
}
function modelLoaded() {
    console.log("model loaded!");
    Status = true;
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}