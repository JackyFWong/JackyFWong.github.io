window.onscroll = function() {stickNav()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    }
    else {
        navbar.classList.remove("sticky");
    }
}