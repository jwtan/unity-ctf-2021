function sendMessage(){
  var message = document.getElementById("message").value;
  var xhr = null;
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
          var resp = JSON.parse(xhr.responseText);
          addMyMessage(resp);
          document.getElementById("message").value = "";
      }
  };

  xhr.open("POST", window.location.pathname, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(
    {
      "message":outString
    }
  ))
}

var myOpeningDiv = '<div class="d-flex justify-content-start mb-4">'
var openingDiv = '<div class="d-flex justify-content-end mb-4">'
var imageDiv = '<div class="img_cont_msg"><img src="https://unity3d.com/profiles/unity3d/themes/unity/images/pages/branding_trademarks/unity-tab-square-black.png" class="rounded-circle user_img_msg"></div>';
var closingDiv = '</div>'

function getMyMessageDiv(message){
  return '<div class="msg_cotainer">' + message + '</div>';
}

function getMessageDiv(message){
  return '<div class="msg_cotainer_send">' + message + '</div>';
}

function addMessage(message){
  var out = document.getElementById("messages");
  // allow 1px inaccuracy by adding 1
  var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
  out.innerHTML += openingDiv + getMessageDiv(message['message']) + imageDiv + closingDiv;
  if (isScrolledToBottom) {
    out.scrollTop = out.scrollHeight - out.clientHeight;
  }
}

function addMyMessage(message){
  var out = document.getElementById("messages");
  // allow 1px inaccuracy by adding 1
  var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
  out.innerHTML += myOpeningDiv + imageDiv + getMyMessageDiv(message['message']) + closingDiv;
  if (isScrolledToBottom) {
    out.scrollTop = out.scrollHeight - out.clientHeight;
  }
}

function onUserClick(user_id){
  var xhr = null;
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        var resp = JSON.parse(xhr.responseText);
        location.pathname = '/conversation/' + resp.conversation_id;
      }
  };
  xhr.open("GET", "/user/" + user_id + '/conversation', true);
  xhr.send()
}

function getMessages(){
  var xhr = null;
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        var resp = JSON.parse(xhr.responseText);
        resp.messages.forEach(message => {
          if (resp['user_id'] == message['user_id']){
            addMyMessage(message);
          } else {
            addMessage(message);
          }

        });
      }
  };
  xhr.open("GET", window.location.pathname + "/messages", true);
  xhr.send()
}

function getNewMessages(){
  var xhr = null;
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        var resp = JSON.parse(xhr.responseText);
        resp.messages.forEach(message => {
          addMessage(message)
        });
      }
  };
  xhr.open("GET", window.location.pathname + "/messages/new", true);
  xhr.send()
}

$(document).ready(function(){
  $('#action_menu_btn').click(function(){
      $('.action_menu').toggle();
  });
});

function launchHeartBeat() {
  setInterval(function() {
      getNewMessages();
  }, 10000);
}

function logout(){
  var xhr = null;
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        location.pathname = "/login";
      }
  };
  xhr.open("POST", "/logout", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}

//getMessages();
launchHeartBeat();