// Based off the script found here https://pastebin.com/bfi7cw81

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function applyCss(v) {
  var children = $(v).find('g').children();
    $.each(children, function(kchild, vchild) {
        var classList = vchild.classList;
        for(var i = 0; i < classList.length; i++) {
            var className = classList[i];
            if (className && classes[className]) {
                $(vchild)
                    .attr('style', classes[className])
                    .removeAttr('class');
            }
        }
    })
}

var css = $('.MsPortalImpl\\/Base\\/Base\\.Images\\.css')[0].sheet.cssRules
var classes = {};

for(var i = 0; i < css.length; i++) {
    var style = css[i];
    var selectortext = style.selectorText;
    if (selectortext && selectortext.split(/[\s.>]/).length === 2) {
        var selectorClass = selectortext.split(/[\s.>]/)[1];
        var csstext = style.style.cssText;
        classes[selectorClass] = csstext;
    }
}


var icons = $("#FxSymbolContainer > svg > defs")
var files = [];

$.each(icons, function(k, v) {
	applyCss(v);    
	var html = v.innerHTML.replace("<symbol", "<svg").replace("</symbol>", "</svg>")
    
	console.log($(v));
	var id = $(v).find("symbol")[0].id;
	files.push({fileName: 'Azure Icon - ' + id + '.svg', html: html});
})

queuedFileDownload = function(i, files) {
    if (i < files.length) {
        i++;
        download(files[i].fileName, files[i].html);
        setTimeout(function(){
            queuedFileDownload(i, files);
        }, 500);
    }
}
queuedFileDownload(0, files);