chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    var url = info.url || tab.url;
	var pat = /^https:\/\/www\.reddit\.com\/r\/.*\/comments\/(.*)\/.*\/(.*)$/;
    if(url && pat.exec(url)) {
        chrome.pageAction.show(tabId);
    } else {
        chrome.pageAction.hide(tabId);
	}
});

document.addEventListener('DOMContentLoaded', function() {
	var shorturl = document.getElementById('shorturl');
	var copied = document.getElementById('copied');
	
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
		var pat = /^https:\/\/www\.reddit\.com\/r\/.*\/comments\/(.*)\/.*\/(.*)$/;
		var matches = pat.exec(tabs[0].url);
		shorturl.value = 'https://redd.it/'+matches[1];
	});
	
	shorturl.addEventListener('click', function() {
		this.select();
		document.execCommand('copy');
		copied.style.display="block";
		setTimeout(function(){
			copied.style.display="none";
		}, 2000);
	});
}, false);

