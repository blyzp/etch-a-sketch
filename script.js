/* Global */

const tileBorder = "1px solid #666";

// Choose tile background color
// Gray: 0 | Random: 1
const tileBgCol = 0;

// Choose tile change method
// Trail: 0 | Gradient: 1
const tileChange = 0;



/* Content */

const grid = document.querySelector("#grid");
const clear = document.querySelector("#clear");



/* Events */

this.addEventListener("load", () => {
    buildGrid(16);
    hoverGrid(tileChange);
});


clear.addEventListener("click", () => {
    grid.innerHTML = "";
    let size = prompt("Enter the size of the grid:");
    buildGrid(size);
    hoverGrid(tileChange);
});



/* Functions */

function buildGrid(size) {
    if (isNaN(size) == true) {
        return alert("Please choose a number.");
    } else if (size > 50) {
        return alert("Please choose a number up to 50.");
    } else {
        grid.style.cssText = `grid-template-columns: repeat(${size}, 20px); grid-template-rows: repeat(${size}, 20px);`;

        for (let i = 0; i < Math.pow(size, 2); i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");   
            grid.appendChild(tile);
        }
    }
}


function hoverGrid(type) {
    switch(type) {
        case 0:
            hoverGridTrail();
            break;

        case 1:
            hoverGridGradient();
            break;
    }
}


function hoverGridTrail() {
    grid.addEventListener("mouseover", e => {
        if (e.target.className == "tile") {
            e.target.style.border = tileBorder;
            e.target.style.backgroundColor = setColor(tileBgCol);
        }

        setTimeout(function () {
            e.target.style.border = "";
            e.target.style.backgroundColor = "";
        }, 500)
    });
}


function hoverGridGradient() {
    Array.from(grid.children).forEach(tile => {
        tile.addEventListener("mouseover", e => {         
            let opacity = +tile.style.opacity;   
            tile.style.border = tileBorder;
            tile.style.backgroundColor = setColor(tileBgCol);
            tile.style.opacity = opacity + 0.25;
        });
    });
}


function setColor(color) {
    switch(color) {
        case 0:
            return "#eee";

        case 1:
            return `rgb(${random(256)}, ${random(256)}, ${random(256)})`;
    }
}


function random(number) {
    return Math.floor(Math.random() * number);
}