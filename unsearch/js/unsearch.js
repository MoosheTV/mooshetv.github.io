var letterTable = {
	'A': ['\u0391', '\u0410'],
	'B': ['\u0392', '\u0412'],
	'C': ['\u0421'],
	'E': ['\u0395', '\u0415'],
	'H': ['\u0397', '\u041D'],
	'I': ['\u0406', '\u04CF'],
	'J': ['\u0408'],
	'K': ['\u039A'],
	'M': ['\u041C'],
	'N': ['\u039D'],
	'O': ['\u039F', '\u041E'],
	'P': ['\u03A1', '\u0420'],
	'T': ['\u03A4', '\u0422'],
	'X': ['\u0425'],
	'Y': ['\u03A5'],
	'Z': ['\u0396'],
	'a': ['\u0430'],
	'c': ['\u0441'],
	'e': ['\u0435'],
	'i': ['\u0456'],
	'j': ['\u03F3'],
	'o': ['\u03BF'],
	'p': ['\u0440'],
	'x': ['\u0445']
};

$('#text-input').on("input", function() {
	var warn = $('#text-output-warning');
	var outText = $("#text-output");

	var text = $(this).val();
	var out = filter(text);

	if(out == text && out.length > 0) {
		warn.fadeIn();
		outText.addClass("warning");
		$(this).addClass("warning");
		outText.removeClass("success");
		$(this).removeClass("success");
	} else {
		if(warn.is(":visible")) {
			warn.fadeOut();
		}
		outText.removeClass("warning");
		$(this).removeClass("warning");
		if(out.length > 0) {
			outText.addClass("success");
			$(this).addClass("success");
		} else {
			outText.removeClass("success");
			$(this).removeClass("success");
		}
	}
	outText.text(out);
});
$('#text-output').on("click", function() {
	selectText("text-output");
});

function filter(txt, vary=false) {
	var text = "";
	var keys = Object.keys(letterTable);
	var len = txt.length;
	var count = 0;
	var hasReplaced = false;
	for(var c of txt) {
		// if c is replaceable, and vary is either disabled, or chance is >= 95%
		if(c in letterTable && (!hasReplaced || !vary || Math.random() > 0.05)) {
			var table = letterTable[c];
			c = table[Math.round(Math.random() * (table.length - 1))];
			hasReplaced = true;
		}
		text += c;
	}
	return text;
}

function selectText(node) {
    node = document.getElementById(node);
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
		return;
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
		return;
    }
}
