/**
 * @function getAllCookie
 * @description get all cookie store to an object
 * @returns {Cookie}
 */
function getAllCookie() {
    var ck = document.cookie;
    if (!ck) return;
    ck = ck.split("; ");
    var ckobj = new Object();
    for (var i = 0; i < ck.length; i++) {
        ck[i] = ck[i].split("=");
        ckobj[ck[i][0]] = ck[i][1];
    }
    return ckobj;
}

/**
 * @function getCookie
 * @description get cookie value according to cookie key
 * @param {String} key
 * @returns {Object}
 */
function getCookie(key) {
    var obj = getAllCookie();
    return obj[key];
}

/**
 * @function setCookie
 * @description set an cookie, it contains add and update
 * @param {String} key
 * @param {String} value
 * @param {Number} [day]
 */
function setCookie(key, value, day) {
    if (arguments.length == 2) {
        document.cookie = key + "=" + value;
    }
    if (arguments.length == 3) {
        var date = new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + value + ";expires=" + date;
    }
}

/**
 * @function deleteCookie
 * @description delete a cookie map
 * @param {String} key
 */
function deleteCookie(key) {
    setCookie(key, "", -1);
}

/**
 * @function deleteAllCookie
 * @description delete all cookie map
 */
function deleteAllCookie() {
    var obj = getAllCookie();
    for (var key in obj) {
        deleteCookie(key);
    }
}