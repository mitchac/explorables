// using d3 for convenience
var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var chart = graphic.select('.chart');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');
// initialize the scrollama
var scroller = scrollama();
// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepHeight = Math.floor(window.innerHeight * 0.75);
    step.style('height', stepHeight + 'px');
    // 2. update width/height of graphic element
    var bodyWidth = d3.select('body').node().offsetWidth;
    graphic
        .style('width', bodyWidth + 'px')
        .style('height', window.innerHeight + 'px');
    var chartMargin = 32;
    var textWidth = text.node().offsetWidth;
    var chartWidth = graphic.node().offsetWidth - textWidth - chartMargin;
    chart
        .style('width', chartWidth + 'px')
        .style('height', Math.floor(window.innerHeight / 2) + 'px');
    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}
// scrollama event handlers
function handleStepEnter(response) {
    stepContent = steptextcode[response.index];
    console.log(stepContent);
    if ('code' in stepContent) {
        console.log('hascode');
        stepContent.code();
    }
    getData();
}
function handleContainerEnter(response) {
    // response = { direction }
    // sticky the graphic (old school)
    graphic.classed('is-fixed', true);
    graphic.classed('is-bottom', false);

}
function handleContainerExit(response) {
    // response = { direction }
    // un-sticky the graphic, and pin to top/bottom of container
    graphic.classed('is-fixed', false);
    graphic.classed('is-bottom', response.direction === 'down');
}

//document.getElementById('myItemList').appendChild(ul);
st = document.getElementsByClassName("scroll__text")[0];
//var div = document.createElement('div');
//st.appendChild(div);


steptextcode.forEach(function (item, index) {
    console.log(item);
    console.log(index);
    var div = document.createElement('div');
    div.className = "step";
    st.appendChild(div);
    var p = document.createElement('p');
    div.appendChild(p);
    p.innerHTML += item.text;
});


function init() {
    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();
    // 2. setup the scroller passing options
    // this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        //debug: true,
        //offset: 0.6
    })
        .onStepEnter(handleStepEnter)
        .onContainerEnter(handleContainerEnter)
        .onContainerExit(handleContainerExit);
    // setup resize event
    window.addEventListener('resize', handleResize);
}
// kick things off
init();
