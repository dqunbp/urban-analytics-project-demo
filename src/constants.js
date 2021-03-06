import { color } from 'd3-color'

export const colors = {
    orange: "rgb(255, 127, 14)",
    blue: "rgb(31, 119, 180)",
    green: "rgb(44, 160, 44)",
    red: "rgb(214, 39, 40)",
}

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