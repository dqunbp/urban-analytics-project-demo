import { getColor, brighterColor } from '../constants'

export default (state, filters) => {
    let { features } = state.area
    let agregated = features
        .reduce((result, feature) => {
            let { properties } = feature
            let { type, population } = properties
            if (filters.features.indexOf(properties.type) !== -1) {
                result[type] = 0
                return result
            }

            let currentValue = result[type]
            if (!currentValue) {
                result[type] = 0
            }
            result[type] += 1
            return result
        }, {})
    return {
        data: toChart(agregated)
    }
}

const toChart = (aggregatedData) => {
    let data = [];

    for (let label in aggregatedData) {
        let color = getColor(label)
        let highlight = brighterColor(color)
        let value = aggregatedData[label]
        data.push({
            value,
            color,
            highlight,
            label
        })
    }
    return data
}