

function createBackground() {
  const container = document.getElementById("backgroundDiv")
  const slices = 30;
  const angle = 360 / slices
  for(let i = 0; i < slices; i++) {
    const slice = document.createElement("div")
    slice.classList.add("backgroundImage")
    slice.style.transform = `rotate(${i * angle}deg) translate(100px)`;

    // Add to container
    container.appendChild(slice);
  }
}

createBackground()


let angle = 0;

function rotateBackground() {
  angle += 0.03; // increment angle by 10 degrees each call
  const div = document.getElementById("backgroundDiv");
  div.style.transform = `rotate(${angle}deg)`;
}

setInterval(rotateBackground, 1);