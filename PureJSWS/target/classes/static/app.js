var socket = null;

function setConnected(connected) {
	document.getElementById("connect").disabled = connected;
	document.getElementById("disconnect").disabled = !connected;
	if (connected) {
		document.getElementById("conversation").style.visibility = 'visible';
	} else {
		document.getElementById("conversation").style.visibility = 'hidden';
	}
	document.getElementById("chat").innerHTML = "";
}

function connect() {
	socket = new WebSocket('ws://localhost:8080/register-endpodint');
	socket.onmessage = function(event) {
		showMessage(event.data);
	}
	setConnected(true);
}

function disconnect() {
	if (socket != null) {
		socket.close();
	}
	setConnected(false);
}

function sendMessage() {
	socket.send(JSON.stringify({
		'content' : document.getElementById("message").value
	}));
}

function showMessage(message) {
	var tableRef = document.getElementById('conversation')
			.getElementsByTagName('tbody')[0];
	var newRow = tableRef.insertRow();
	var newCell = newRow.insertCell(0);
	var parsedData = JSON.parse(message);
	var newText = document.createTextNode(parsedData.message);
	newCell.appendChild(newText);
}

window.onload = function() {
	var formsCollection = document.getElementsByTagName("form");
	for (var i = 0; i < formsCollection.length; i++) {
		formsCollection[i].addEventListener("submit", function(e) {
			e.preventDefault()
		});
	}
	document.getElementById("connect").addEventListener("click", function() {
		connect();
	});
	document.getElementById("disconnect").addEventListener("click", function() {
		disconnect();
	});
	document.getElementById("send").addEventListener("click", function() {
		sendMessage();
	});
}