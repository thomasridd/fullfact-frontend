$(function() {
	var searchField = $('#query');
	var icon = $('#search-btn');

	// Focus Event Handler
	$(searchField).on('focus', function() {
		$(this).animate({
			width:'100%'
		}, 400);
		$(icon).animate({
			right: '10px'
		}, 400);
	});

	// Blur Event Handler
		// Focus Event Handler
	$(searchField).on('blur', function() {
		if(searchField.val() == ''){
			$(searchField).animate({
				width:'45%'
			}, 400, function() {})
			$(icon).animate({
				right:'360px'
			}, 400, function() {})
			
		}
	});

	$('#search-form').submit(function(e){
		e.preventDefault();
	});
})

function search() {
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');

	// Get Form Input
	q = $('#query').val();
	inputDocument = {
			"id": "1",
			"fields": {"field": q}
		};

	// Run POST Request on API
	$.ajax({
		url: "http://localhost:8080/match",
		type: "POST",
		data: JSON.stringify(inputDocument),
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		success: function(data) {
			console.log("success");
			console.log(data);
			if(data.matches.length > 0) {
				// display results
				$('#results').append(getGood(data.matches[0]));
			} 
		},
		failure: function(data) {
			console.log("failure");
		}
	});
}

function getGood(item) {

	var output = '<li>' + 
	'<div class="list-left">' +
	'<img src="img/not_found.png">' + 
	'</div>' + 
	'<div class="list-right">' +
	'<h3> Hurrah - we have found a match and it\'s id is ' + item.id + '</h3>'

	return output;
}
