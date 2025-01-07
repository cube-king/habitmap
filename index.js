import CalHeatmap from 'cal-heatmap';

const cal = new CalHeatmap();
cal.paint({});
render(<div id="cal-heatmap"></div>);

var goals = 0;
var currentday = 0;

jQuery(function(){
    $('.starterbutton').on("click", function() {
        goals += 1;
        $('.habitlist').append('');
    })
    $('.deletebutton').on("click", function() {
        $(this).parent.remove();
    })
});

