/*
*
* URL Utils
*
* */

var getURLParameter = function(name, defaultvalue) {
    var value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').
            exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;

    return (value != null ? value : defaultvalue);
}
