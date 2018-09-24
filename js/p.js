(function () {
    var gameBg = getElementsByClassName('game'),
        explainBg = getElementsByClassName('explain'),
        len = gameBg.length,
        exLen = explainBg.length;
    if (len < 1||exLen<1) return;
    var gameoffsetWidth = gameBg[0].offsetWidth,//获取game容器的宽度
        exoffsetWidth = explainBg[0].offsetWidth; //获取explain容器的宽度
    gameBg[0].style.cssText = 'margin-left:-' + gameoffsetWidth / 2 + 'px'; //game居中显示
    explainBg[0].style.cssText = 'margin-left:-' + exoffsetWidth / 2 + 'px'; //explain居中显示
})();
function $(id){
    return (typeof id=='string')?document.getElementById(id):id;
}
function getElementsByClassName(className, context) {
    context = context || document;
    if (context.getElementsByClassName) {
        return context.getElementsByClassName(className);
    }

    var nodes = context.getElementsByTagName('*');
    var rets = [];
    for (var i = 0; i < nodes.length; i++) {
        if (hasClass(className, nodes[i])) {
            rets.push(nodes[i]);
        }
    }
    return rets;
}