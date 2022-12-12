const convertString = (text: string): string => {    
    
    // char => A/B/C/D/E/F
    let color: string = ""
    text.split("").map((char, index) => {
        const charASCII = char.charCodeAt(0)
        const newChar: string = String.fromCharCode(charASCII % 6 + 65)
        color += newChar.toLowerCase()
    })
    
    // new color in hexadecimal notation
    while (color.length <= 6) {
        color = color + color
    }
    color = color.substring(0, 6)

    return "#" + color;
};

export default convertString;
