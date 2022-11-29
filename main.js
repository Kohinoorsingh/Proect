var prediction = ""

Webcam.set({

    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

  camera = document.getElementById("camera");

Webcam.attach('#camera');  

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img  id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/MpniZN-JF/model.json',Model_Loaded)

function Model_Loaded()
{
    console.log("Pictures Have Been Loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is "+prediction;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
     captured = document.getElementById("captured_image");
    classifier.classify(captured, get_result);
}

function get_result(error, results)
{
 if(error)
 {
 console.log(error);
 }
 else 
 {
 console.log(results);
 document.getElementById("gesture_name1").innerHTML = results[0].label;
 prediction  = results[0].label;

 speak();

 if (results[0].label == "Perfect")
 {
    document.getElementById("update_emoji").innerHTML = "&#128076;";

 }
 if (results[0].label == "Thumbs Up")
 {
    document.getElementById("update_emoji").innerHTML = "&#128077;";
 }
 if (results[0].label == "Thumbs Down")
 {
    document.getElementById("update_emoji").innerHTML = "&#128078;";
 }
 if (results[0].label == "Victory")
 {
    document.getElementById("update_emoji").innerHTML = "&#9996;";
 
 }
}
}