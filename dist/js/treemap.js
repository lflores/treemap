/**!
 * Treemap
 * This component, using d3js API, draw an animated treemap
 *
 * @license 
 * @author Triad <flores.leonardo@gmail.com> (http://github.com/lflores)
 * @version 0.3.2
 **/

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['TreeMap'] = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['TreeMap'] = factory();
  }
}(this, function () {

/**
jQuery extends replacemement
TODO: Resolve jQuery conflict
*/
//Object.prototype.extends = function (out) {
//    out = out || {};
//
//    for (var i = 0; i < arguments.length; i++) {
//        var obj = arguments[i];
//        if (!obj) {
//            continue;
//        }
//
//        for (var key in obj) {
//            if (obj.hasOwnProperty(key)) {
//                if (typeof obj[key] === 'object' && typeof this[key] != 'undefined')
//                    this[key].extends(obj[key]);
//                else
//                    this[key] = obj[key];
//            }
//        }
//    }
//    return this;
//};

/**
jQuery extend replacement
*/
var deepExtend = function (out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj) {
            continue;
        }

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object')
                    out[key] = deepExtend(out[key], obj[key]);
                else
                    out[key] = obj[key];
            }
        }
    }
    return out;
};

if (typeof String.replaceParams === 'undefined') {
    /**
    Retorna una string con los parametros reemplazados 
    Por ej. {0} será reemplazado por el primer valor de los parámetros
    */
    String.prototype.replaceParams = function (params) {
        if (typeof params === 'undefined') {
            return this;
        }
        //Si el parametro es un string lo hago array
        if (typeof params === 'string') {
            params = [params];
        }
        //Reviso todos 
        var _ret = this.replace(/^\s+|\s+$/g, "");
        for (var i = 0; i < params.length; i++) {
            _ret = _ret.replace("\{" + i + "\}", params[i]).replace("\{" + i + "\}", params[i]);
        }
        return _ret;
    };
}

/**
Text cutter, using char sequence
*/
String.prototype.splitMultiple = function (chars) {
    if (typeof chars === 'undefined') {
        chars = "\n-";
    }
    var _chars = chars.split("");
    var _lines = this.split(_chars[0]);
    _chars.splice(0, 1);
    if (_chars.length === 0) {
        return _lines.map(function (elem) {
            return elem.trim();
        });
    }
    var _newlines = [];
    for (var i = 0; i < _lines.length; i++) {
        var _line = _lines[i].splitMultiple(_chars.join(""));
        if (_line.length > 1) {
            _newlines = _newlines.concat(_line);
        } else {
            _newlines.push(_line[0]);
        }
    }
    return _newlines;
};

CustomTooltip = function (tooltipId, width) {
    if ($("#" + tooltipId).length === 0) {
        $("body").append("<div class=\"treemap-tooltip\" id=\"" + tooltipId + "\"></div>");
    }

    if (width) {
        $("#" + tooltipId).css("width", width);
    }

    hideTooltip();

    function showTooltip(content, event) {
        var parsed = content.splitMultiple();
        $("#" + tooltipId).html(parsed.join("<br>"));
        $("#" + tooltipId).show();

        updatePosition(event);
    }

    function hideTooltip() {
        $("#" + tooltipId).hide();
    }

    function updatePosition(event) {
        var ttid = "#" + tooltipId;
        var xOffset = 20;
        var yOffset = 10;

        var ttw = $(ttid).width();
        var tth = $(ttid).height();
        var wscrY = $(window).scrollTop();
        var wscrX = $(window).scrollLeft();
        var curX = (document.all) ? event.clientX + wscrX : event.pageX;
        var curY = (document.all) ? event.clientY + wscrY : event.pageY;
        var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > $(window).width()) ? curX - ttw - xOffset * 2 : curX + xOffset;
        if (ttleft < wscrX + xOffset) {
            ttleft = wscrX + xOffset;
        }
        var tttop = ((curY - wscrY + yOffset * 2 + tth) > $(window).height()) ? curY - tth - yOffset * 2 : curY + yOffset;
        if (tttop < wscrY + yOffset) {
            tttop = curY + yOffset;
        }
        $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
    }

    return {
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        updatePosition: updatePosition
    };
};

TreeMap = function (config) {
    this.margin = {
        top: 3,
        right: 3,
        bottom: 3,
        left: 3
    };
    var _defaults = {
        sticky: false,
        height: 100,
        width: 100,
        //Colores originales de comercial
        //colors: ["#ff0000", "#ff9a00", "#ffeb00", "#d6ff00", "#08ff00"],
        //colors: ["#000", "#f20000", "#fbb400", "#ddff00", "#9fec00"],
        points: [0, 15, 20, 40, 100],
        colors: ["#d84b2a", "#beccae", "#7aa25c", "#7aa25c"],
        id: "treemap",
        colorById: "perc",
        sizeById: "size",
        showChild: false,
        labelFactor: 0.8,
        data: {
            label: {
                template: "{description}",
                formatter: d3.format(",.2f")
            },
            tooltip: "<b>{name} - {description}</b><br><b>GP %:</b>{gp_brl} <br><b>GTN %:</b> {gtn_brl}<br><b>NS:</b> {ns_brl}",
            onclick: function (d, i) {
                //alert("click en " + d);
            }
        }
    };
    this._config = $.extend(true, _defaults, config);
    this.tooltip = CustomTooltip("treemap_tooltip", 240);
    this.create();
};

TreeMap.prototype.create = function () {
    var that = this;

    this.colorScale = d3.scale.linear()
        .domain(this._config.points)
        .range(this._config.colors);

    this.fontColorScale = d3.scale.linear()
        .domain(this._config.points)
        .range(this._config.colors.reverse());

    this.container = d3.select("#" + this._config.id);
    this.container.style("overflow", "hidden");

    this.svg = this.container.append("svg")
        .attr("class", "treemap-container")
        .attr("width", this._config.width)
        .attr("height", this._config.height);

    this.treemap = d3.layout.treemap()
        .size([this._config.width, this._config.height])
        .sticky(this._config.sticky)
        .padding([this.margin.left, this.margin.right, this.margin.bottom, this.margin.top])
        .sort(function (a, b) {
            return Number(a[that._config.sizeById]) - Number(b[that._config.sizeById]);
        })
        .value(function (d) {
            return d.hasOwnProperty(that._config.sizeById) ? Number(d[that._config.sizeById]) : null;
        });
    this._selected = [];
};

TreeMap.prototype.data = function (data) {
    this._data = data;
    //Quizas se pueda mejorar, pero necesito desmarcar los seleccionados
    //en caso que se reciclen los tiles
    if (this.nodes) {
        this.nodes.classed("selected", false);
    }
    this._selected = [];
    this.refresh();
};

/**
Funcion que devuelve el valor de la propiedad del color by
*/
TreeMap.prototype.colorBy = function (d, that) {
    if (that._config.data && typeof that._config.data.color === "function") {
        return that._config.data.color.call(that, d);
    }
    return that.colorScale(Number(d[that._config.colorById]));
};

/**
Funcion que recibe el array de colores, para poder darle color a los nodos del treemap
*/
TreeMap.prototype.colors = function (colors) {
    this._config.colors = colors;
    var that = this;
    this.colorScale.range(this._config.colors);
    this.refresh();
};

TreeMap.prototype.points = function (points) {
    this._config.points = points;
    var that = this;
    this.colorScale.domain(this._config.points);
    this.refresh();
};

/**
This method return text to label.
@method _label_by
*/
TreeMap.prototype._label_by = function (d, that) {
    var _label = "";
    if (typeof that._config.data.label === "function") {
        _label = that._config.data.label.call(d, that);
        return that._data_replace(d, _text);
    } else if (typeof that._config.data.label === "object" && typeof that._config.data.label.template === "function") {
        _label = that._config.data.label.template.call(that, [d]);
        return that._data_replace(d, _label, that._config.data.label.formatter);
    } else if (typeof that._config.data.label === "object" && that._config.data.label.template) {
        _label = that._config.data.label.template;
        return that._data_replace(d, _label, that._config.data.label.formatter);
    }
    return _label;
};

/**
This method receive a object data and a template.
Data are each data property to be rendered.
This methods recognize wildcards such as {description}, so try to replace
this wildcard with d.description value. If property is not found, will be replaced by "" (void string)
@method _data_replace
*/
TreeMap.prototype._data_replace = function (d, template, formatter) {
    var self = this;
    if (!template) {
        template = this._config.template;
    } else {
        template = template.slice(0);
    }
    if (typeof formatter === 'undefined') {
        formatter = d3.format(",.2f");
    }
    var matched = template.match(/{(\w+)}/g);
    if (matched) {
        $.each(matched, function (i, match) {
            var property = /{(\w+)}/g.exec(match);
            var _value = "";
            //Toda propiedad que no sea id, description, verifica si es un numero.
            //Si lo es, lo formatea sino lo reemplaza por el valor
            if (d.hasOwnProperty(property[1]) && property[1] != "id" && property[1] != "name" && property[1] != "description") {
                _value = isNaN(Number(d[property[1]])) ? d[property[1]] : formatter(d[property[1]], property[1]);
                //Si existe la propiedad, se fija si el valor es un número
                //para el caso en que los codigos tengan ceros a la izq como el SKU
            } else if (d.hasOwnProperty(property[1])) {
                _value = isNaN(Number(d[property[1]])) ? d[property[1]] : "" + Number(d[property[1]]);
            }
            template = template.replace(match, _value);
        });
    }
    return template;
};

TreeMap.prototype.colorById = function (colorById) {
    var that = this;
    this._config.colorById = colorById;
    this.refresh();
};

TreeMap.prototype.sizeById = function (sizeById) {
    var that = this;
    this._config.sizeById = sizeById;
    this.refresh();
};

/**
Update all graphics items, rectangles and texts
*/
TreeMap.prototype.refresh = function () {
    var _this = this;
    this.rectangles = this.svg.datum(this._data).selectAll("g")
        .data(this.treemap.nodes);

    this.rectangles.enter()
        .append("g")
        .on("mouseover", function (d, i) {
            return _this.show_details(d, i, _this);
        })
        .on("mouseout", function (d, i) {
            return _this.hide_details(d, i, _this);
        })
        .on("click", function (d, i) {
            _this.hide_details(d, i, _this);
            d3.select(this).selectAll(".node").classed("selected", function (d, i) {
                return !d3.select(this).classed("selected");
            });
            d3.select(this).selectAll(".label").classed("selected", function (d, i) {
                return !d3.select(this).classed("selected");
            });
            _this._config.data.onclick.call(_this, d, this, i);
            _this._toggle_selected(d);
        })
        .on("mouseenter", function (d, i) {
            var _color = _this.colorBy(d, _this);
            d3.select(this).selectAll(".node").style("fill", d3.rgb(_color).brighter());
        })
        .on("mouseleave", function (d, i) {
            d3.select(this).select(".node").style("fill", d3.rgb(_this.colorBy(d, _this)));
        })
        .append("rect")
        .attr("class", function (d) {
            if (_this.isSelected(d)) {
                return "node level-" + d.depth + " selected";
            }
            return "node level-" + d.depth;
        })
        .call(_this._position)
        .style("fill", function (d) {
            return _this.colorBy(d, _this);
        })
        .select(function () {
            return this.parentNode;
        })
        .append("text")
        .attr("class", function (d) {
            return "label level-" + d.depth;
        })
        .call(this._draw_text, this)
        .call(this._text_position, this);

    this.rects = this.svg.selectAll(".node").data(this.treemap.nodes);

    this.texts = this.svg.selectAll(".label").data(this.treemap.nodes);

    //Rectangles update
    this.rects
        .transition()
        .attr("class", function (d) {
            if (_this.isSelected(d)) {
                return "node level-" + d.depth + " selected";
            }
            return "node level-" + d.depth;
        })
        .call(this._position, this)
        .style("fill-opacity", 1)
        .style("fill", function (d) {
            return _this.colorBy(d, _this);
        });

    //Text Update
    this.texts
        //.transition()
        .attr("class", function (d) {
            return "label level-" + d.depth;
        })
        .call(this._draw_text, this)
        .call(this._text_position, this);

    //Rect remove
    this.rects.exit().remove();
    //Texts remove
    this.texts.exit().remove();
    //Clean void groups
    this.rectangles.exit().remove();
};

/**
Update position of rectangle
*/
TreeMap.prototype._position = function () {
    this.attr("x", function (d) {
        return d.x;
    }).attr("y", function (d) {
        return d.y;
    }).attr("width", function (d) {
        return d.dx < 0 ? 0 : d.dx;
    }).attr("height", function (d) {
        return d.dy < 0 ? 0 : d.dy;
    });
};

/**
Add/Remove a selected data
*/
TreeMap.prototype._toggle_selected = function (d) {
    if (this._selected.indexOf(d) > -1) {
        this._selected.splice(this._selected.indexOf(d), 1);
    } else {
        this._selected.push(d);
    }
};

/**
Return a boolean that indicates if data is selected
*/
TreeMap.prototype.isSelected = function (d) {
    return this._selected.indexOf(d) > -1;
};

TreeMap.prototype._zoomIn = function (d) {
    var that = this;
    //Escondo todos excepto el que seleccioné
    //y hago fade
    that.svg.selectAll(".node").filter(function (o) {
            if (o.code != d.code) {
                return true;
            }
            return false;
        })
        .transition()
        .duration(500)
        .style("opacity", 0)
        .style("width", 0)
        .style("height", 0)
        .attr("transform", "translate(-10,-10)");

    that.scaleX.range(0, d.dx);
    that.scaleY.range(0, d.dy);

    that.node = that.svg.data([d]).selectAll(".node")
        .classed("zoomed", function (o) {
            if (o.code != d.code) {
                return false;
            }
            return true;
        })
        .style("left", function (o) {
            if (o.code != d.code) {
                return that.scaleX(o.x) + "px";
            }
            return "0px";
        })

    .style("top", function (o) {
            if (o.code != d.code) {
                return that.scaleY(o.y) + "px";
            }
            return "0px";
        })
        .style("width", function (o) {
            if (o.code != d.code) {
                return "0px";
            }
            return that._config.width + "px";
        })
        .style("height", function (o) {
            if (o.code != d.code) {
                return "0px";
            }
            return that._config.height + "px";
        })
        .style("background", function (o) {
            if (o.code != d.code) {
                return "";
            }
            return "white";
        });
};

TreeMap.prototype._draw_text = function (text, that) {
    text.each(function (d) {
        d3.select(this).text(null);
        var _text = that._label_by(d, that);
        var text = d3.select(this),
            lines = _text.split(/\n+/).reverse(),
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = d.dy - 4,
            data = text.data(0);

        //tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", "1.1em")
        line = lines.pop();
        do {
            tspan = text
                .append("tspan")
                .attr("x", 0)
                .attr("y", y)
                .attr("dy", lineHeight + "em")
                .text(line);

            var loop = 0;
            while (tspan.node().getComputedTextLength() > d.dx && loop++ < 5) {
                _text = tspan.text();
                _splited = _text.split("-");
                if (_splited.length === 1) {
                    _splited = _text.split(" ");
                } //Agrego el primer resultado
                tspan.text(_splited[0].trim());
                if (_splited.length > 1) {
                    tspan = text
                        .append("tspan")
                        .attr("x", 0)
                        .attr("y", y)
                        .attr("dy", lineHeight + "em")
                        .text(_splited[1].trim());
                }
            }
            line = lines.pop();
        } while (line);
    });
};

TreeMap.prototype._text_position = function (d, _this) {
    var text = d3.select(this);
    this
        .style("visibility", function (d) {
            var box = this.getBBox();
            if (_this._config.data.label && _this._config.data.label.hasOwnProperty("autofit") && _this._config.data.label.autofit) {
                return "visible";
            }
            if (box.width !== 0 && box.height !== 0 && box.width < d.dx && box.height < d.dy) {
                return "visible";
            }
            return "hidden";
        })
        .transition()
        .attr("transform", function (d) {
            var box = this.getBBox();
            d.cx = d.x + d.dx / 2;
            d.cy = d.y + d.dy / 2;
            //Si la etiqueta es autofit calculo la escala para mostrarla 
            //y calculo el alto y ancho para moverlo
            if (_this._config.data.label && _this._config.data.label.hasOwnProperty("autofit") && _this._config.data.label.autofit) {
                var _scale = (d.dx / box.width);
                _scale = d.dx === 0 || box.width === 0 ? 1 : _scale;

                var tx = d.x + ((box.width * _scale) / 2);
                var ty = d.cy - ((box.height * _scale) / 2);
                var _trans = "translate({0},{1}),scale({2},{2})";
                return _trans.replaceParams([tx, ty, _scale * 0.8]);
            }
            var x = d.x + (d.dx / 2) - (box.width / 2) + (box.width / 2);
            var y = d.y + (d.dy - box.height) / 2;
            return "translate(" + x + "," + y + ")";
        });
};

TreeMap.prototype.update_details = function (data, i, event) {
    return this.tooltip.updatePosition(event);
};

TreeMap.prototype.show_details = function (data, i, element) {
    var content = "";
    if (typeof element._config.data.tooltip === "string") {
        content = element._data_replace(data, element._config.data.tooltip);
    } else if (typeof element._config.data.tooltip === "function") {
        content = element._config.data.tooltip.call(element, data);
        //El String que devuelve los uso para reemplazar en caso que el resultado tenga wildcards
        content = element._data_replace(data, content);
    } else if (typeof element._config.data.tooltip === "object" && typeof element._config.data.tooltip.template === "function") {
        //El String que devuelve los uso para reemplazar en caso que el resultado tenga wildcards
        var _tooltip = element._config.data.tooltip.template.call(element, data);
        content = element._data_replace(data, _tooltip, element._config.data.tooltip.formatter);
    } else if (typeof element._config.data.tooltip === "object" && typeof element._config.data.tooltip.template === "string") {
        //El String que devuelve los uso para reemplazar en caso que el resultado tenga wildcards
        content = element._data_replace(data, element._config.data.tooltip.template,
            element._config.data.tooltip.formatter);
    }
    return this.tooltip.showTooltip(content, d3.event);
};

TreeMap.prototype.hide_details = function (data, i, element) {
    //d3.select(element).attr("stroke", (function (_this) {
    //    return function (d) {
    //        return "#0f0";
    //    };
    //})(this));
    return this.tooltip.hideTooltip();
};

TreeMap.prototype.config = function (config) {
    var that = this;
    if (config === undefined) {
        return config;
    }
    this._config = $.extend(true, this._config, config);
    d3.select("#" + this._config.id)
        .transition()
        .style("width", this._config.width)
        .style("height", this._config.height);

    this.treemap.size([this._config.width, this._config.height]);

    this.colorScale.domain(this._config.points);
    this.colorScale.range(this._config.colors);

    d3.select("#" + this._config.id)
        .selectAll("svg")
        .transition()
        .style("width", this._config.width + "px")
        .style("height", this._config.height + "px");
};

TreeMap.prototype.resize = function () {
    //Toma el tamaño del padre
    this.config({
        width: parseInt(this.container.style("width")),
        height: parseInt(this.container.style("height"))
    });
    var that = this;
    if (this._data) {
        this.refresh();
    }
};

return TreeMap;

}));
