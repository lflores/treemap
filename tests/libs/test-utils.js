/**
Utilities only for tests
*/
$.fn.container = function (id) {
    if (typeof id == 'undefined') {
        id = "gb-" + $("body").find("[id^='gb-']").length;
    }
    var $child = $("<div id=\"" + id + "\"></div>");
    $child.css("height", 300);
    $child.css("width", 600);
    $child.css("border", "1px gray solid");
    $child.css("border-radius", "5px");
    $("body").append($child);
    return $child[0];
};

$.fn.getRectangle = function (text) {
    var _node = $("tspan:contains('" + text + "')");
    var _rect = $(_node).parent().parent();
    return $(_rect).children("rect");
}

var totalLines;

function rollup(node) {
    node['size'] = node['children'].reduce(function (result, item) {
        return result + (item['children'] ? rollup(item) : item['size']);
    }, 0);
    return node['size'];
}

function perc(node) {
    node['perc'] = node['children'].reduce(function (result, item) {
        item['perc'] = (item['size'] / totalLines) * 100;
        return result + (item['children'] ? perc(item) : (item['size'] / totalLines) * 100);
    }, 0);
    //node['perc'] = node['children'] ? node['perc'] : (node['size'] / totalLines) * 100;
    return (node['size'] / totalLines) * 100;
}
