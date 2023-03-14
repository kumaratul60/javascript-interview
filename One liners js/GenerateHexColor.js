//  Generate a Hex color

const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]


function getCharacter(index) {
    return hexCharacters[index]
}

function generateJustOneColor() {

    let hexColorRep = "#"

    for (let position = 0; position < 6; position++) {
        //  hexColorRep += getCharacter( position )

        // random number
        const randomPosition = Math.floor(Math.random() * hexCharacters.length)
        hexColorRep += getCharacter(randomPosition)
    }

    return hexColorRep

}

console.log(generateJustOneColor())


// 
const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`

randomColor() // #9dae4f
randomColor() // #6ef10e


// 

const generateRandomHexColor = () =>
    `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

console.log(generateRandomHexColor());
