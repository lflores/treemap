# Treemap

> This component, using d3js API, draw an animated treemap

![Version](http://img.shields.io/version/0.5.0.png?color=green) [![Build Status](https://travis-ci.org/lflores/treemap.svg?branch=master)](https://travis-ci.org/lflores/treemap)


## Features
This is a visual component that draw a treemap chart, based on [d3](http://d3js.org/) API library.
A treemap it's a method to show hierarchical data using nested rectangles.
[What is...?](https://en.wikipedia.org/wiki/Treemapping)

A component like this is useful for statistical charts to measure volumes, basing the size of rectangles by distinct points of interest and properties.

![Treemap Features](http://rawgit.com/lflores/treemap/master/src/images/treemap-features.gif)

###Some features
* Tooltip templated configuration
* Label templated configuration
* Animated transitions
* Size comparizons
* Easy color schema changes
* Adaptable data legend
* All items are visibles, including negatives and smallest data


## Examples
####Default:
![Treemap Default](http://rawgit.com/lflores/treemap/master/src/images/treemap-flare.gif)

####[Flare Example]()
Based on common tree data "flare", and using D3js library, this example shows a treemap, with distinct sizes and colors, you can dive into data. hierarchy.

[I want to see it in action...](http://lflores.github.io/flaremap/)

![Treemap Flare Example](http://rawgit.com/lflores/treemap/master/src/images/treemap-flaremap.gif)


## Get started
In folder examples you have and example called flare, that shows functionalities of component.


## Options
You can pass these options to the initialize function to set a custom look and feel for the plugin.

<table>
    <tr>
        <th>Property (Type)</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><strong>width</strong></td>
        <td>Calculated container width</td>
        <td>It's the external width of component. Doesn't include left and right margins</td>
    </tr>
  <tr>
        <td><strong>height</strong></td>
        <td>40</td>
        <td>It's the external height of component. Doesn't include top and bottom margins</td>
    </tr>
    <tr>
        <td><strong>points</strong></td>
        <td>[0, 25, 50, 75, 100]</td>
        <td>They are thresholds of color changes</td>
    </tr>
    <tr>
        <td><strong>colors</strong></td>
        <td>["#ff0000", "#ffa300", "#ffe100", "#fffa00", "#1f6f02"]</td>
        <td>They are the distinct colors that change on the thresholds</td>
    </tr>
     <tr>
        <td><strong>data</strong></td>
        <td></td>
        <td>This node is an object that receives parameter exclusive for data</td>
    </tr>
    <tr>
        <td><strong>data\label</strong></td>
        <td>none</td>
        <td>It has three optional parameter, they are template,formatter and autofit.
        <ul>
        <li>template: It's an string that show label values using wildcards such as {name}, that try to lockup a property called name</li>
        <li>formatter: It's waiting a function to format numbers, 00.00 or 00. Tested with <a href="https://github.com/mbostock/d3/wiki/Formatting">d3js formatter</a></li>
        <li>Autofit: This property make the label as scalable label, and if the bubble space is not enough, scale it, to do it visible. </li>
        </ul>
        </td>
    </tr>
    <tr>
        <td><strong>data\tooltip</strong></td>
        <td>none</td>
        <td>It has two optional parameter, they are template and formatter</td>
    </tr>
    <tr>
        <td><strong>data\sizeById</strong></td>
        <td>size</td>
        <td>Indicates property to be used to size of rectangles</td>
    </tr>
    <tr>
        <td><strong>data\colorById</strong></td>
        <td>perc</td>
        <td>Indicates property to be used to give colors to rectangles</td>
    </tr>
</table>

#### Styles
You can use this classes to change the look and feel of component, such as font, border colors, and so on.
<table>
    <tr>
        <th>Selector</th>
        <th>Description</th>
        <th>Is in use?</th>
        <th>Observations</th>
    </tr>
    <tr>
        <td><strong>.treemap-container</strong></td>
        <td>Class to add style of container</td>
        <td>Yes</td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td><strong>treemap-container .node</strong></td>
        <td>Class to add style to rectangle node</td>
        <td>Yes</td>
        <td>&nbsp;</td>
    </tr>
     <tr>
        <td><strong>.treemap-container g:hover .node</strong></td>
        <td>Class used to style hover over rectangle</td>
        <td>Yes</td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td><strong>.treemap-container .level-*</strong></td>
        <td>Class applied using depth attribute, used by <a href="https://github.com/d3/d3/wiki/Tree-Layout">tree layout</a>, start in 0 and ends with deepest level.</td>
        <td>Yes</td>
        <td>By default component shows level 1, you can play with css properties if you have more than one at same time</td>
    </tr>
    <tr>
        <td><strong>.treemap-container .node.selected</strong></td>
        <td>Class to rectangle when node has been selected</td>
        <td>Yes</td>
        <td>&nbsp;</td>
    </tr>
     <tr>
        <td><strong>.treemap-container .label</strong></td>
        <td>Style to format label text</td>
        <td>Yes</td>
        <td>Also receive .level-* class to show/hide level items</td>
    </tr>
    <tr>
    <td><strong>.treemap-container g:hover .label</strong></td>
    <td>Style to format label text</td>
        <td>Yes</td>
        <td>Also receive .level-* class to show/hide level items</td>
        </tr>
    <tr>
    <td><strong>.treemap-container .label tspan</strong></td>
    <td>Each label, can be splited into text lines, using \n or special chars. This class controls styles for all lines of text.</td>
        <td>Yes</td>
        <td>&nbsp;</td>
        </tr>
    <tr>
    <td><strong>.treemap-container .label tspan.head</strong></td>
    <td>First line of text applies this style, to control as mor important part of text</td>
        <td>Yes</td>
        <td>By default has uppercase applied to text</td>
        </tr>
    <tr>
        <td><strong>.treemap-tooltip </strong></td>
        <td>Style to format tooltip</td>
        <td>Yes</td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td><strong>.treemap-tooltip .title</strong></td>
        <td>Style to format tooltip title</td>
        <td>Yes</td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td><strong>.treemap-tooltip .name</strong></td>
        <td>Style to format tooltip name</td>
        <td>Yes</td>
        <td>&nbsp;</td>
    </tr>
</table>


## Callbacks
When the user click on rectangle, a <strong>click</strong> is fired to comunicate that values have been clicked. It can be used to do a drilldown, such as flare example, in examples folder
<table>
    <tr>
        <th>Event</th>
        <th>Property</th>
        <th>Value</th>
    </tr>
    <tr>
        <td><strong>click</strong></td>
        <td>d</td>
        <td>Data Clicked</td>
    </tr>
</table>


## Plugin api
#### jQuery

```javascript
$(function() {
    //instantiate the plugin
    
        chart = new TreeMap({
            id: "vis",
            width: 600,
            height: 300,
            sizeById: "size",
            colorById: "perc",
            data: {
                tooltip: function (d) {
                    return "<b>Name:</b>{name}<br><b>Size:</b> {size}<br><b>Size of Total:</b> {perc}%";
                },
                label: {
                    template: "{name}\n{perc}%",
                    autofit: false
                },
                onclick: function (d, node) {
                    //you code here to clickable data
                }
            }
        });
});
```


## Testing
Project supports testing and run all tests under tests folder.
Solving dependencies with karma and jasmine you can run tests with.
```
grunt test
```


## Browser Support
Native support

* Chrome
* Safari
* FireFox
* Opera
* Internet Explorer 9+

Support for Internet Explorer 9.


## Copyright
Copyright (c) 2016 Triad, contributors. Released under the GPL-3.0 license 

## Donate
This code and all of this job is open source and don't have restrictions, as you can see in open source licence. 

All of this code I do it as hobby, for the pleasure of coding, and to give back, that open source gave me.

But If you have saved programming hours, using this code, please think of time that I have dedicated, doing this tool.

[![paypal](https://www.paypalobjects.com/webstatic/en_US/btn/btn_donate_pp_142x27.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EA4X3R9HR3UJ2)
