'use strict';

function setCookie(name, value, expiration) {
    const date = new Date();
    date.setTime(date.getTime() + (expiration * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getBrowserName() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';

    if (userAgent.indexOf('Chrome') !== -1 || userAgent.indexOf('Chromium') !== -1) {
        browserName = 'Chrome';
    } else if (userAgent.indexOf('Firefox') !== -1) {
        browserName = 'Firefox';
    } else if (userAgent.indexOf('Safari') !== -1) {
        browserName = 'Safari';
    } else if (userAgent.indexOf('Opera') !== -1) {
        browserName = 'Opera';
    } else if (userAgent.indexOf('Edge') !== -1) {
        browserName = 'Edge'; 
    } else if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1) {
        browserName = 'Internet Explorer'; 
    }
    return browserName;
}

function getOSName() {
    const userAgent = window.navigator.userAgent;
    let os = "unknown OS";

    if (userAgent.indexOf("Windows NT 10.0") !== -1) os = "Windows 10";
    else if (userAgent.indexOf("Windows NT 6.2") !== -1) os = "Windows 8";
    else if (userAgent.indexOf("Windows NT 6.1") !== -1) os = "Windows 7";
    else if (userAgent.indexOf("Windows NT 6.0") !== -1) os = "Windows Vista";
    else if (userAgent.indexOf("Windows NT 5.1") !== -1) os = "Windows XP";
    else if (userAgent.indexOf("Mac") !== -1) os = "Mac OS";
    else if (userAgent.indexOf("X11") !== -1) os = "UNIX";
    else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    
    return os;
}

function showCookieModal() {
    document.querySelector(".cookieModal").style.display = "block";
}

function showSettingsModal() {
    document.querySelector(".settingsModal").style.display = "block";
}

function closeModal(modalclass) {
    document.querySelector(`.${modalclass}`).style.display = "none";
}

document.querySelector(".acceptAll").addEventListener("click", () => {
    setCookie("browser", getBrowserName(), 15);
    setCookie("os", getOSName(), 15);
    setCookie("screen", screen.width + "x" + screen.height, 15);
    console.log(document.cookie);
    setCookie("cookie_consent", "true", 15);
    closeModal("cookieModal");
});

document.querySelector(".cookieSettings").addEventListener("click", () => {
    showSettingsModal();
    closeModal("cookieModal");
});

document.querySelector(".saveSettings").addEventListener("click", () => {
    if (document.querySelector(".browserCookie").checked) {
        setCookie("browser", getBrowserName(), 15);
    } else {
        document.cookie = "browser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    if (document.querySelector(".osCookie").checked) {
        setCookie("os", getOSName(), 15);
    } else {
        document.cookie = "os=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    if (document.querySelector(".screenCookie").checked) {
        setCookie("screen", screen.width + "x" + screen.height, 15);
    } else {
        document.cookie = "screen=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    console.log(document.cookie);
    setCookie("cookie_consent", "true", 15);

    closeModal("settingsModal");
});

const closeBtns = document.querySelectorAll(".close");
closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        closeModal(btn.parentElement.parentElement.className.split(' ')[1]);
    });
});

if (!getCookie("cookie_consent")) {
    setTimeout(showCookieModal, 1000);
}
