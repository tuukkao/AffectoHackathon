var busData;

$.ajax({
  url: "http://tuukkao.net:4000/stops",
  type: "GET",
  dataType: "application/json",
  crossDomain: true,
  success: function(data){
	busData = data;
	console.log(data);
  },
  error: function() {
  	alert( "Loading data failed." );
  } 
});