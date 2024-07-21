let tooltipContainerElement = document.querySelector('.tooltip-container');
let tooltipElement = document.querySelector(".tooltip-container .tooltip");
let interval;

let tooltipElements = document.querySelectorAll('.tooltip-container');

for (let element of tooltipElements) {
    element.addEventListener("mouseenter", () => {
        interval = setTimeout(() => {
            element.querySelector('.tooltip').classList.add('open');
        }, 500);
    
    })
    
    element.addEventListener('mouseleave', () => {
        clearTimeout(interval);
        element.querySelector('.tooltip').classList.remove('open');
    })
}

// console.log(document.querySelector('.options .set-options .btn:'))
// console.log(document.querySelector('.options .set-options .btn:last-child'))