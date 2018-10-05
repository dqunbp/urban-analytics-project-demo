import { color } from 'd3-color'

// export const colors = {
//     orange: "#FBD685",
//     blue: "#7A5D7E",
//     green: "#63AEBB",
//     red: "rgb(214, 39, 40)",
// }

export const colors = {
    orange: "#FFCE56",
    blue: "#36A2EB",
    green: "#4BC0C0",
    red: "#FF6384",
}

// export const colors = {
//     orange: "#E39012",
//     blue: "#1B63FF",
//     green: "#22A111",
//     red: "#A11171",
// }

export const itemsColors = {
    apartments: 'orange',
    house: 'green',
    other: 'blue',
    unknown: 'red'
}

export const brighterColor = (itemColor, k = 1) => color(itemColor).brighter([k]).toString()

export const getColor = (itemType) => (
    colors[
    itemsColors[itemType]
    ]
)