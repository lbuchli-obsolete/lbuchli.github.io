var currentEvent = 1;
var extendedShown = false;



window.onload = (function() {
    renderEvent(0);
    document.getElementById("more-button").addEventListener('click', moreEvent);
});

function renderEvent(change) {
    currentEvent += change;
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {

            var element;
            if (change == 0) {
                element = document.getElementById("current-event");
            } else {
                if (change < 0) {
                    element = document.getElementById("prev-event");
                } else {
                    element = document.getElementById("next-event");
                }
            }

            // This is nessessary because css grid doesn't allow for nested
            // elements to be part of the grid.
            element.innerHTML = document.getElementById("template-event").innerHTML;

            if (this.status == 200) {
                element.innerHTML += this.responseText;

                if (change < 0) {
                    slideRight();
                } else if (change > 0) {
                    slideLeft();
                }
            } else {
                // undo change
                currentEvent -= change;
            }

        }
    };

    request.open("GET", "/elektronikgeschichte/events/rendered/" + currentEvent.toString() + ".html", true);
    request.send();
}

function slideRight() {
    var current = document.getElementById("current-event");
    var prev = document.getElementById("prev-event");

    //current.classList.add("slide-right");
    //prev.classList.add("slide-right");

    current.innerHTML = prev.innerHTML;
}

function slideLeft() {
    var current = document.getElementById("current-event");
    var next = document.getElementById("next-event");

    //current.classList.add("slide-left");
    //next.classList.add("slide-left");

    current.innerHTML = next.innerHTML;
}

function prevEvent() {
    renderEvent(-1);
}

function nextEvent() {
    renderEvent(1);
}

function moreEvent() {
    if (extendedShown) {
        extendedShown = false;
        document.getElementById("more-button").style.transform = "rotate(0deg)";
    } else {
        extendedShown = true;
        document.getElementById("more-button").style.transform = "rotate(180deg)";
    }

    var elems = document.getElementsByClassName("extended");
    for (var i = 0; i < elems.length; i++) {
        if (extendedShown) {
            elems[i].style.display = "inherit";
        } else {
            elems[i].style.display = "none";
        }
    }
}
