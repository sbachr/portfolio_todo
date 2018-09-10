const idApp = '548038762266220'


function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {

  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

window.fbAsyncInit = function () {
  FB.init({
    appId: idApp,
    cookie: true,  // enable cookies to allow the server to access 
    // the session
    xfbml: true,  // parse social plugins on this page
    version: 'v3.1' // use graph api version 2.8
  });

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });

};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function (response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

function logout() {
  alert('sure ??')
  if (localStorage.getItem("fbToken")) {
    FB.logout(function (response) {
      localStorage.removeItem("token")
      localStorage.removeItem("fbToken")
      window.location = "/index.html"
    });
  } else {
    localStorage.removeItem("regToken")
    window.location = "/index.html"
  }
}


