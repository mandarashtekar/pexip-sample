/*
*  Pexip Sample Personal
*
*  This is a simplified version of Pexip sample code
*/

'use strict';

/*window.onload = () => {
    console.log("inside index.js - onload");
}

$(document).ready(function(){
    console.log("inside index.js - document.ready");
});*/

$('input:radio[name="role"]').change(function() {
  console.log("Radio selected");
  if ($(this).val() == '2') {
    console.log("Host Role selected");
    pinentry.classList.remove("hidden");
  } else {
    console.log("Guest Role selected");
    pinentry.classList.add("hidden");
  }
});

$("#join-conf").on("click", function(){
  console.log("join-conf clicked");

  var alias = $("#id_alias").val();
  var name = $("#id_name").val();
  var bandwidth = "1280";
  var source = "Join+Conference";
  var id_guest = document.getElementById('id_guest');
  var pin = $("#id_pin").val();

  window.location.href = "videoconf.html?alias="+alias+"&name="+name+"&bandwidth="+bandwidth+"&source="+source+"&pin="+pin;

  // initialise("vve-tpmg-lab.kp.org", alias, bandwidth, name, "", source);
});

/*------------------- PERMISSIONS API - START -------------------*/
/*const permissionsToRequest = {
  permissions: ["bookmarks", "history"],
  origins: ["https://developer.mozilla.org/"]
}

function requestPermissions() {

  function onResponse(response) {
    if (response) {
      console.log("Permission was granted");
    } else {
      console.log("Permission was refused");
    }
    return browser.permissions.getAll();  
  }

  browser.permissions.request(permissionsToRequest)
    .then(onResponse)
    .then((currentPermissions) => {
    console.log(`Current permissions:`, currentPermissions);
  });
}

document.querySelector("#request").addEventListener("click", requestPermissions);*/

/*------------------- PERMISSIONS API - END -------------------*/

/*------------------- DetectRTC - START -------------------*/
/*if (DetectRTC.isWebRTCSupported === false) {
    console.log('Please use Chrome or Firefox.');
}

if (DetectRTC.hasWebcam === false) {
    console.log('Please install an external webcam device.');
}

if (DetectRTC.hasMicrophone === false) {
    console.log('Please install an external microphone device.');
}

if (DetectRTC.hasSpeakers === false && (DetectRTC.browser.name === 'Chrome' || DetectRTC.browser.name === 'Edge')) {
    console.log('Oops, your system can not play audios.');
}*/
/*------------------- DetectRTC - END -------------------*/

