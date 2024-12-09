// 自定义配置rem基数（UI设计稿为735px时，<html></html>的font-size为100px）

(function (doc, win) {
    var docEl = doc.documentElement,
        widthPoint = 375,
        resizeEvt =
            "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= widthPoint) {
                docEl.style.fontSize = 100 * (clientWidth / widthPoint) + "px";
            } else {
                docEl.style.fontSize = 100 * (clientWidth / widthPoint) + "px";
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);

    docEl.addEventListener(
        "touchstart",
        function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        },
        false
    );
})(document, window);
