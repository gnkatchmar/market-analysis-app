var chart;

function initializeChart() {
  var chartProperties = {
//    backgroundColor: "dimgrey",
//    legend: {fontColor: "97C30A"},
//    axisX: {labelFontColor: "97C30A"},
//    axisY: {labelFontColor: "97C30A"},
// colors didn't work as expected
    title: {text: "BusMall Product Results"},
    data: [{type: "column", dataPoints: imageOptions}]
  };
  
  chart = new CanvasJS.Chart("chart-container", chartProperties);
  chart.render();
}