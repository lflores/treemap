### jQuery

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