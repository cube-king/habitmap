const cal = new CalHeatmap();
cal.paint({});
render(<div id="cal-heatmap"></div>);

var goals = 0;

jQuery(function(){
    $('.starterbutton').on("click", function() {
        goals += 1;
        alert("Adding list");
    });
});

