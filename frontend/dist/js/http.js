var busData;

function doPoll() {
	$.ajax({
	  url: "http://tuukkao.net:4000/stops",
	  type: "GET",
	  success: function(data, status){

		busData = data;
		lineChart.setData(data);

		setTimeout(doPoll, 5000)
	  },
	  error: function() {
	  	setTimeout(doPoll, 5000)
	  }
	});
}

doPoll();