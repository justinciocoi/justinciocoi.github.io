
document.addEventListener('DOMContentLoaded', function() {
    var cipherText = document.getElementById('name');
    var cipherText2 = document.getElementById('description');
    var cipherText3 = document.getElementById('description2');
    var cipherText4 = document.getElementById('description3');
    
    const characters = [..."/@$#&*%^()!?{}[]-+=_|~"];
    const solveMilliseconds = 500;
    const characterSelectionMilliseconds = 40;
    const delayMilliseconds = 200;
    const fastSolveMilliseconds = 150;
    const fastDelayMilliseconds = 75;

    const randomArrayElement = (arr) => {
        return arr[(arr.length * Math.random()) | 0];
    };

    window.onload = function() {
        scrambleText(cipherText);
        scrambleText(cipherText3);
        scrambleText(cipherText4);
        scrambleTextFast(cipherText2);
    }

    function scrambleText(element) {
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

    function scrambleTextFast(element) {
    if (!element.classList.contains("active")) {
        let delay = 0;
        const elementText = element.innerText;
        const elementCharacters = [...elementText];
        const lockMilliseconds =
            fastDelayMilliseconds * elementCharacters.length + fastSolveMilliseconds;

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
                        }, fastSolveMilliseconds);
                    }, characterSelectionMilliseconds);
                },
                delay === 0 ? (delay += 1) : (delay += fastDelayMilliseconds)
            );
        });
    }
    }

    function replaceCharacter(str, index, chr) {
        return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
    }
  });