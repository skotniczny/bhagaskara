document.addEventListener("DOMContentLoaded", function() {
	var btn = document.querySelector("#fire");
	btn.addEventListener("click", function(e) {
		e.preventDefault();
		this.nextElementSibling.classList.toggle('active');
	});
});