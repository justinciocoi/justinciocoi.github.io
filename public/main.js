
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


document.addEventListener('DOMContentLoaded', function() {
    var cipherText = document.getElementById('name');
    var cipherText2 = document.getElementById('label1');
    var cipherText3 = document.getElementById('label2');
    var cipherText4 = document.getElementById('label3');
    
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
