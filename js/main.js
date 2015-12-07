document.addEventListener("DOMContentLoaded", function() {
	var menu = document.querySelector(".main-menu");
	menu.classList.add('hidden');

	var btn = document.querySelector("#hamburger");
	btn.addEventListener("click", function(e) {
		e.preventDefault();
		console.log(this.parent);
		this.parentElement.nextElementSibling.classList.toggle('hidden');
	});
});