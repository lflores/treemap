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

### Styles
You can pass these options to the initialize function to set a custom look and feel for the plugin.
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
        <td>Class applied using depth attribute, used by (tree layout)[https://github.com/d3/d3/wiki/Tree-Layout], start in 0 and ends with deepest level.</td>
        <td>Yes</td>
        <td>By default component shows level 1, you can play with css properties if you have more than one</td>
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