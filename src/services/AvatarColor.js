import React from 'react';

class AvatarColor {

    getColor = (letter) => {
        let col = this.colorMap[letter];
        if (col) {
            return col;
        } else {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

    };

    colorMap = {
        "А": "#d15c17",
        "A": "#d1ceb9",
        "Б": "rgb(144, 13, 74)",
        "В": "rgb(49, 155, 185)",
        "Г": "rgb(134,185,114)",
        "Д": "rgb(91,185,32)",
        "Е": "rgb(182,185,31)",
        "Ё": "rgb(185,111,18)",
        "Ж": "rgb(185,76,51)",
        "З": "rgb(185,64,78)",
        "И": "rgb(185,101,129)",
        "К": "rgb(185,103,178)",
        "Л": "rgb(156,91,185)",
        "М": "rgb(120,91,185)",
        "Н": "rgb(90,75,185)",
        "О": "rgb(57,175,185)",
        "П": "rgb(49, 155, 185)",
        "Р": "rgb(142,185,178)",
        "С": "rgb(47,185,158)",
        "Т": "rgb(160,21,185)",
        "т": "rgb(162,142,185)",
        "У": "rgb(185,130,114)",
        "Ф": "rgb(185,43,33)",
        "Х": "rgb(162,185,129)",
        "Ц": "rgb(185,165,157)",
        "Ч": "rgb(165,117,185)",
        "Щ": "rgb(139,185,138)",
        "Э": "rgb(37,185,144)",
        "Ю": "rgb(98,185,88)",
        "Я": "rgb(159,185,43)",
        "l": "rgb(116, 244, 170)",
        "t": "rgb(138,162,100)",
        "q": "rgb(185,109,71)",
        "U": "rgb(185,112,9)",


    };
    // rgb(144, 13, 74)
}

export default new AvatarColor()