showNotification({
	top: 10,
	right: 10,
	html: "Hello!",
	className: "welcome"
});

function showNotification(options, duration = 1500) {
	if (document.readyState === "loading")
		document.addEventListener(
			"DOMContentLoaded",
			() => showNotificationImmediately(options, duration));
	else
		showNotificationImmediately(options, duration);

	function showNotificationImmediately({top = 0, right = 0, html, className}, duration) {
		const notification = document.createElement("div");

		notification.className = "notification";
		if (className)
			notification.classList.add(className);

		notification.innerHTML = html;
		notification.style.top = top + "px";
		notification.style.right = right + "px";

		document.body.prepend(notification);

		setTimeout(() => notification.remove(), duration)
	}
}
