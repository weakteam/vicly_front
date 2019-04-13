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
        "Р": "#2ab49b",
        "А": "#d15c17",
        "И": "#9e72cf",
        "l": "rgb(116, 244, 170)",
        "t": "rgb(127, 162, 159)",
        "В": "rgb(49, 155, 185)"

    };
}

export default new AvatarColor()