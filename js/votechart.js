var chart;

function initializeChart() {
  var chartProperties = {
    title: {text: chartTitle},
    data: [{type: "column", dataPoints: imageOptions}]
  };
  
  chart = new CanvasJS.Chart("chart-container", chartProperties);
  chart.render();
}