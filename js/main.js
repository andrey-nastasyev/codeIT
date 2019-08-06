"use strict";

function validation() {
    const userName = document.querySelectorAll(".name");
    const userSurname = document.querySelectorAll(".surname");
    const userEmail = document.querySelectorAll(".email");
    const userPassword = document.querySelectorAll(".password");
    const sendButton = document.querySelectorAll(".button");
    const userGender = document.querySelectorAll(".select");

    const checkUserName = () => {
        if(userName[0].value.length < 2) {
            return false;
        } else {
            return userName[0].value;
        }
    }
    const checkUserSurname = () => {
        if(userSurname[0].value.length < 2) {
            return false;
        } else {
            return userSurname[0].value;
        }
    }
    const checkUserEmail = () => {
        const correctEmail = "^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$";
        if(userEmail[0].value.match(correctEmail) && userEmail[0].value.length > 1) {
            return userEmail[0].value;
        } else {
            return false;
        }
    }
    const checkUserPassword = () => {
        if(userPassword[0].value.length < 9) {
            return false;
        } else {
            return userPassword[0].value;
        }
    }



    sendButton[0].addEventListener('click', () => {
        if(checkUserName() !==false && checkUserPassword() !==false && checkUserEmail() !==false && checkUserSurname() !==false) {
            const data = {
                name: checkUserName(),
                secondname: checkUserSurname(),
                email: checkUserEmail(),
                gender: userGender[0].value,
                pass: checkUserPassword()
            }
            fetch('http://codeit.ai/codeitCandidates/serverFrontendTest/user/registration', 
            {   method: "POST", 
                body: JSON.stringify(data),
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                if(myJson.status == "Form Error") {
                    document.location.href = "\pages/home.html";
                }
            })
            .catch(error => console.error('Ошибка:', error));
        }

    })
}

validation();
