function call(url, id)
{
	var hash = document.getElementById("hash").value;
	callAPIblock(url + hash, id);
}

// tester avec : 0000000000000000189bba3564a63772107b5673c940c16f12662b3e8546b412
function callAPIblock(url, id)
{
	$.get(url)
	.then(function(d) {output(d,id);});
}

function output(inp, id) 
{
	$(id).html("<h3>Resultat de la requete</h3>" + syntaxHighlight(inp));
}

function syntaxHighlight(json) 
{
	if (typeof json != 'string') {
		json = JSON.stringify(json, undefined, 2);
	}
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		var cls = 'number';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if (/true|false/.test(match)) {
			cls = 'boolean';
		} else if (/null/.test(match)) {
			cls = 'null';
		}
		return '<span class="' + cls + '">' + match + '</span>';
	});
}

function homePageLoading() 
{
	url = "https://api.blockcypher.com/v1/btc/main";
	elementID = "#JSONdisplay";
	$.get(url).then(function(d){output(d, elementID);});
}