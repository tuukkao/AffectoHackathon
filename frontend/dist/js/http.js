var busData;

$.ajax({
  url: "http://tuukkao.net:4000/stops",
  type: "GET",
  success: function(data){
	busData = data;
	lineChart.setData(data);
  },
  error: function() {
  	alert( "Loading data failed." );
  } 
});