window.DownloadApi = {
	converter: {
		theme: (arg) => `https://raw.githubusercontent.com/gamerboytr/BetterDiscordAddons/master/Themes/${arg}/${arg}.theme.css`,
		url: (arg) => (arg = arg.startsWith("https://") || arg.startsWith("http://") ? arg : `https://raw.githubusercontent.com/gamerboytr/BetterDiscordAddons/master/${arg}`),
	},
	convert: (parameterString, error) => {
		if (typeof parameterString == "string")
			for (let parameter in window.DownloadApi.converter) {
				let arg = (parameterString.split(`?${parameter}=`)[1] || "").split("?")[0] || "";
				if (arg) {
					window.DownloadApi.download(window.DownloadApi.converter[parameter](arg), error);
					break;
				} else if (parameterString.endsWith(`?${parameter}`)) {
					window.DownloadApi.download(window.DownloadApi.converter[parameter](), error);
					break;
				}
			}
	},
	download: (url, error) => {
		if (!url) return error && error("No URL!");
		if (url.indexOf("raw.githubusercontent.com") == -1 && url.indexOf("github.io") == -1) return error && error(`<a href="${url}">${url}</a> bir Github Dosya URLsi Değil!!`);
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function () {
			if (this.status == 200) {
				const tempLink = document.createElement("a");
				tempLink.href = window.URL.createObjectURL(new Blob([this.response], { type: `text/${url.split(".").pop()}` }));
				tempLink.download = url.split("/").pop();
				tempLink.click();
			}
			if (this.status == 404) error && error(`<div align='center'><h1 style='font-size:40px'>Dostum <a style='font-size:30px' href="${url}">${url}</a> Bu URL <br><span style="color:red">Bozuk</span> :/</h1></div>`);
		};
		xhttp.onerror = function () {
			error && error(`GitHub File <a href="${url}">${url}</a> does not exist!`);
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	},
};
