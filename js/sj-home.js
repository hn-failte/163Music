var home = (function () {
    return {
        sendAjax(param) {
            var promise = new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        resolve(JSON.parse(this.responseText));
                    }
                }
                if (param.method == 'get' && param.data) {
                    xhr.open(param.mathod, param.url + '?' + param.data, true);
                } else {
                    xhr.open(param.method, param.url, true);
                }
                if (param.method == 'post') {
                    xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
                    xhr.send(param.data || '');
                } else {
                    xhr.send(null);
                }
            })
            return promise;
        }
    }
}())