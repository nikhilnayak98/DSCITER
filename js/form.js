/*
*   MIT License
*
*   Copyright (c) 2019 DSC Institute Of Technical Education & Research (ITER)
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

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
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


function submitForm(e) {
    e.preventDefault();
    let email = getInputVal("email");
    if(isValid) {
        messagesRef.orderByChild("email").equalTo(email).once("value", snapshot => {
            let userData = snapshot.val();
            if (userData) {
                console.log("Email already exists.");
                document.getElementById("erroralert").style.display = "block";
                setTimeout(function() {
                    document.getElementById("erroralert").style.display = "none";
                }, 5000);
                document.getElementById("mailform").reset();
            } else {
                saveMessage(email);
                console.log("Done!");
                document.getElementById("successalert").style.display = "block";
                setTimeout(function() {
                    document.getElementById("successalert").style.display = "none";
                }, 5000);
                document.getElementById("mailform").reset();
            }
        });
    }
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
