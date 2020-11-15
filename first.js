window.onload = () => {
    'use strict';

    var e, debug;
    // var sendNotBtn = document.getElementById('sendNotBtn');

    /* *************** User Agent details - START *************** */
    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
            
            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;
            
            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };
    
    e = module.init(),
        debug = '';
    
    debug += 'os.name = ' + e.os.name + '<br/>';
    debug += 'os.version = ' + e.os.version + '<br/>';
    debug += 'browser.name = ' + e.browser.name + '<br/>';
    debug += 'browser.version = ' + e.browser.version + '<br/>';
    
    debug += '<br/>';
    debug += 'navigator.userAgent = ' + navigator.userAgent + '<br/>';
    debug += 'navigator.appVersion = ' + navigator.appVersion + '<br/>';
    debug += 'navigator.platform = ' + navigator.platform + '<br/>';
    debug += 'navigator.vendor = ' + navigator.vendor + '<br/>';
    
    // document.getElementById('log').innerHTML = debug;
    console.log("Details: " +debug);

    /* *************** User Agent details - END *************** */

    /* *************** SERVICE WORKER - START *************** */
  	if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
          .then(function (registration){
            console.log('Service worker registered successfully on scope: ' +registration.scope);
          }).catch(function(e){
            console.error('Error during service worker registration:', e);
          });
    }
    self.addEventListener('install', function(event) {
        console.log('Installed sw.js', event);
    });

    self.addEventListener('activate', function(event) {
        console.log('Activated sw.js', event);
    });
    self.addEventListener('fetch', function(event){
        console.log("Fetch - Requested event: " +event.request);
    });
    /* *************** SERVICE WORKER - END *************** */

    /* *************** NOTIFICATION REQUEST - START *************** */
    if (navigator.platform.indexOf('iPhone') != true) {
        console.log("Navigator.platform: ", navigator.platform);
        console.log("Not an iPhone, calling Notification");

        Notification.requestPermission(result => {
            if (result === 'granted') {
                console.log("Thanks for the Notification permissions");
            }
        });
    } else{
        console.log("It's an iPhone, not calling Notification");
        // $("#sendNotBtn").hide();
    }
    /* *************** NOTIFICATION REQUEST - END *************** */
};

/* *************** Push Notification - START *************** */
var sendNotBtn = document.getElementById('sendNotBtn');

sendNotBtn.addEventListener('click', () => {
  console.log("Button clicked");
  showNotification('So nice to have you here!', 'Hey there!');
});

function showNotification(title, message) {
    console.log("inside showNotification");
    var options = {
        body: message,
        tag: title,
        icon: 'images/hello-icon-128.png'
    }
    if ('Notification' in window) {
        console.log("inside notification-if");
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('Visit available to join!', options);
            /*registration.showNotification('This is a sample', {
                //body: 'Buzz! Buzz!',
                //tag: 'vibration-sample'
                body: message,
                tag: title
            });*/
        });
    }
}

setInterval (function(){
    console.log("Inside setInterval");
    showNotification('setInterval - Notification!', 'Automatic Notification!');
}, 15000);
/* *************** Push Notification - END *************** */