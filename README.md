# treemap

> This component, using d3js API, draw an animated treemap

![Version](http://img.shields.io/version/0.3.2.png?color=green)


## Features
This is a visual component that draw a chart with centered gravity based on [d3](http://d3js.org/) API library.

Based on [Jim Vallandingham Blog Post](http://vallandingham.me/bubble_charts_in_d3.html), [Obama’s 2013 Budget Proposal](http://www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html?_r=0) and [Automobile Force](http://projects.delimited.io/experiments/force-bubbles/radial.html), Gravity Bubbles it's a component that draw a collection of bubbles, and allow the user to compare data attributes by color and size. 

The main characteristic is the "gravity" to center, and hence its name. 

![Gravity Bubbles Grouping](http://rawgit.com/lflores/gravity-bubbles/master/src/images/gravity-bubbles-grouping.gif)

Also the component include 3 views:
* "all" view with unique center in center of chart
* "color" view, that are bubbles grouped by color fences, as vertical bands.
* A free group that is a name of property of data that can be used to group data, (such as country, category, contact id, etc).

###Some features
* Tooltip templated configuration
* Label templated configuration
* Animated transitions
* Size comparizons
* Group data capability
* Easy color schema changes
* Adaptable data legend
* All items are visibles, including negatives and smallest data


## Examples
####Default:
![Treemap Default](http://rawgit.com/lflores/treemap/master/src/images/treemap-flare-example.gif)

####Flare Example
Based on common tree data "flare", and using D3js library, this example shows a treemap, with distinct sizes and colors, you can dive into data. hierarchy.
![Gravity Bubbles Flare Example](http://rawgit.com/lflores/treemap/master/src/images/treemap-flare-example.gif)


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
        <td>Indicates property to be used to radius of bubble</td>
    </tr>
    <tr>
        <td><strong>data\colorById</strong></td>
        <td>perc</td>
        <td>Indicates property to be used to colorize bubbles</td>
    </tr>
</table>

#### Styles
-Under construction-


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


## Testing (New)
Now project supports testing and run all tests under tests folder.
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
Copyright (c) 2016 triad, contributors. Released under the GPL-3.0 license 