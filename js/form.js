/*
*   MIT License
*
*   Copyright (c) 2019 Nikhil Nayak
*
*   Permission is hereby granted, free of charge, to any person obtaining a copy
*   of this software and associated documentation files (the "Software"), to deal
*   in the Software without restriction, including without limitation the rights
*   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*   copies of the Software, and to permit persons to whom the Software is
*   furnished to do so, subject to the following conditions:
*
*   The above copyright notice and this permission notice shall be included in all
*   copies or substantial portions of the Software.
*
*   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*   SOFTWARE.
*/

// firebase config vars
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

_NBSettings = {
    rejectedMessage: "Invalid Email!",
    apiKey: '<NEVERBOUNCE-API>'
};

var isValid;
var field = document.querySelector('#email');
field.addEventListener('nb:result', function(e) {
    if (e.detail.result.is(_nb.settings.getAcceptedStatusCodes())) {
	console.log("Good Email");
	isValid = true;
    }
    else {
	console.log("Bad Email");
	isValid = false;
    }
});

firebase.initializeApp(config);

function submitForm(e) {
    e.preventDefault();
    let email = getInputVal("email");
    // handle email for mailinglist
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

this.onunload = function() {
    nukeSession(this);
    return 0;
};

function nukeSesssion(win) {
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
    });
}

function saveMessage(email) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        email: email
    });
}