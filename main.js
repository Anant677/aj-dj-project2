song1 = "";
song2 = "";
scoreright = 0;
rightwristx = 0;
rightwristy = 0;
scoreleft = 0;
leftwristx = 0;
leftwristy = 0;
function preload(){
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}
function setup(){
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(400,400);
    canvas.center();

    poseNet = ml5.poseNet(video,modeLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,400,400);

    
    status_song1 = song_song1.isPlaying();
    status_song2 = song_song2.isPlaying();

    fill("red");
    stroke("red");

    if(scoreleft > 0.2){
        circle(leftwristx,leftwristy,20);
        song_song1.stop();

        if(song2 == false){
            song.play(song2);
            document.getElementById("btn").innerHTML = "Playing Song 1";
        }
    }

    if(scoreright >0.2 ){
    circle(rightwristx,rightwristy,20);
    song_song2.stop();

    if(song1 == false){
        song2.play();
        document.getElementById("btn").innerHTML = "Playing Song 2";
    }
    }
}
function Play_music(){
    song.play();
    song.setVolume(2);
    song.rate(1);
}
function gotPoses(results){
    console.log("done");
if(results.length>0){
    console.log(results);
    scoreright = results[0].pose.keypoints[10].score;
    rightwristx = results[0].pose.rightWrist.x;
    rightwristy = results[0].pose.rightWrist.y;

    scoreleft = results[0].pose.keypoints[10].score;
    leftwristx = results[0].pose.leftWrist.x;
    leftwristy = results[0].pose.leftWrist.y;
}
}
function modeLoaded(){
    console.log("PoseNet is Initialised");
}