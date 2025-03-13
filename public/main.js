
window.addEventListener('resize', () => {
    const skillContainers = document.querySelectorAll('.skillContainer');
    
    // Restart the animation by resetting the style and triggering reflow
    skillContainers.forEach((container) => {
        container.style.animation = 'none'; // Pause animation
        void container.offsetWidth; // Trigger a reflow to restart the animation
        container.style.animation = ''; // Restore the animation
    });
});


window.addEventListener('DOMContentLoaded', () => {
    const skillContainers = document.querySelectorAll('.skillContainer');
    
    // Restart the animation by resetting the style and triggering reflow
    skillContainers.forEach((container) => {
        container.style.animation = 'none'; // Pause animation
        void container.offsetWidth; // Trigger a reflow to restart the animation
        container.style.animation = ''; // Restore the animation
    });
})

const resumeBox = document.getElementById('resumeFlex')

resumeBox.addEventListener('mouseover', () => {
    document.getElementById('resumeImageChange').src = "img/icons/resume.png"
})

resumeBox.addEventListener('mouseout', () => {
    document.getElementById('resumeImageChange').src = "img/icons/resumeblue.png"
})


document.addEventListener('DOMContentLoaded', function() {
    var cipherText = document.getElementById('name');
    var cipherText2 = document.getElementById('label1');
    var cipherText3 = document.getElementById('label2');
    var cipherText4 = document.getElementById('label3');

    //drawPolarFunction(tanPolarFunction,  (window.scrollY / 800) + 2, ctx, { strokeStyle: 'rgb(0, 210, 247)', lineWidth: 15});
    //drawPolarFunction(sinPolarFunction,  (window.scrollY / 800) + 2, ctx, { strokeStyle: 'rgb(0, 210, 247))', lineWidth: 25});
    
    const characters = [..."~`!@#$%^&*_+=<>;:'[]{}()/?|1234567890"];
    
    const randomArrayElement = (arr) => {
        return arr[(arr.length * Math.random()) | 0];
    };

    window.onload = function() {
        scrambleText(cipherText);
        scrambleText(cipherText2, 350, 20, 100);
        scrambleText(cipherText3);
        scrambleText(cipherText4);
    }

    function scrambleText(element, solveMilliseconds=700, characterSelectionMilliseconds=40, delayMilliseconds=200) {

        


        if (!element.classList.contains("active")) {
            let delay = 0;
            const elementText = element.innerText;
            const elementCharacters = [...elementText];
            const lockMilliseconds =
                delayMilliseconds * elementCharacters.length + solveMilliseconds;

            element.classList.add("active");

            setTimeout(() => {
                element.classList.remove("active");
            }, lockMilliseconds);

            elementCharacters.forEach((character, index) => {
                setTimeout(
                    () => {
                        let intervalId = setInterval(() => {
                            const randomCharacter = randomArrayElement(characters);
                            element.innerText = replaceCharacter(
                                element.innerText,
                                index,
                                randomCharacter
                            );

                            setTimeout(() => {
                                clearInterval(intervalId);
                                element.innerText = replaceCharacter(
                                    element.innerText,
                                    index,
                                    elementCharacters[index]
                                );
                            }, solveMilliseconds);
                        }, characterSelectionMilliseconds);
                    },
                    delay === 0 ? (delay += 1) : (delay += delayMilliseconds)
                );
            });
        }
    }
    function replaceCharacter(str, index, chr) {
        return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
    }
})


const skillsFlex = document.getElementById('skillsFlex');
const skillContainers = document.querySelectorAll('.skillContainer');

// Pause animations on hover over skillsFlex




// Scroll-based control for animations
/*skillsFlex.addEventListener('scroll', () => {
    const maxScroll = skillsFlex.scrollWidth - skillsFlex.clientWidth;
    const scrollPercentage = skillsFlex.scrollRight / maxScroll;

    // Adjust animation progress dynamically based on scroll
    let x = 1.5;
    skillContainers.forEach((skill) => {
        const animationDuration = 18; // Duration matches CSS animation
        const animationProgress = ((scrollPercentage * animationDuration)/10 + x) % 100;

        skill.style.animationPlayState = 'paused'; // Pause animation to adjust progress
        skill.style.animationDelay = `-${animationProgress}s`; // Set progress dynamically
        x += 1.5;
    });
    skillContainers.forEach(skill => skill.style.animationPlayState = 'running');
});*/



const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

const height = canvas.height;
const width = canvas.width;

const centerY = height/2;
const centerX = width/2;


// Convert polar coordinates (r, theta) to Cartesian (x, y)
function polarToCartesian(centerX, centerY, r, theta) {
    return {
        x: centerX + r * Math.cos(theta),
        y: centerY - r * Math.sin(theta)
    };
}

// Draw the polar function (with customizable stroke styles)
function drawPolarFunction(polarFunc, n, ctx, options = {}, thetaStep = 0.01) {
    const { strokeStyle = 'rgb(0, 210, 247)', lineWidth = 2} = options;

    ctx.beginPath();
    for (let theta = 0; theta <= 2 * Math.PI; theta += thetaStep) {
        const r = polarFunc(theta, n);
        if (!isFinite(r)) continue; // Skip discontinuities in the function
        const { x, y } = polarToCartesian(centerX, centerY, r * 400, theta);

        if (theta === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

// Polar functions
function tanPolarFunction(theta, n) {
    return Math.tan(n * theta);
}

function sinPolarFunction(theta, n) {
    return 2*Math.sin (n);
}


// Update both graphs on scroll
/*window.addEventListener('scroll', () => {
    const n = (window.scrollY / 800) + 2;

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, width, height);

    // Draw both graphs with different styles
    drawPolarFunction(tanPolarFunction, n, ctx, { strokeStyle: 'rgb(0, 210, 247)', lineWidth: 5});
    drawPolarFunction(sinPolarFunction, n, ctx, { strokeStyle: 'rgb(0, 210, 247)', lineWidth: 15});
});*/

let bgCounter = 3;

setInterval(() => {
    bgCounter+= 0.0003;
    let n = 10*Math.sin(bgCounter)+1;
    ctx.clearRect(0, 0, width, height);
    

    drawPolarFunction(tanPolarFunction, n, ctx, { strokeStyle: 'rgb(0, 210, 247)', lineWidth: 15});
    drawPolarFunction(sinPolarFunction, n, ctx, { strokeStyle: 'rgb(0, 210, 247)', lineWidth: 25});

}, 10)



