window.onload = () => {
	if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
          .then(function (registration){
            console.log('Service worker registered successfully on scope: ' +registration.scope);
          }).catch(function(e){
            console.error('Error during service worker registration:', e);
          });
    }

    Notification.requestPermission(result => {
        if (result === 'granted') {
          console.log("Thanks for giving me permissions");
        }
    });
}

var butInstall = document.getElementById('butInstall');

// Push Notifications for PWA
butInstall.addEventListener('click', () => {
  console.log("Button clicked");
  showNotification('So nice to have you here!', 'Hey there!');
});

function showNotification(title, message) {
  console.log("inside showNotification");
    if ('Notification' in window) {
      navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('This is a sample', {
            //body: 'Buzz! Buzz!',
            //tag: 'vibration-sample'
            body: message,
            tag: title
          });
      });
  }
}