import { getColor } from '../constants'

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
    let labels = [],
        data = [],
        backgroundColor = [],
        hoverBackgroundColor = [];

    for (let feature in aggregatedData) {
        labels.push(feature)
        data.push(aggregatedData[feature])
        backgroundColor.push(getColor(feature))
        hoverBackgroundColor.push(getColor(feature))
    }

    return {
        labels,
        datasets: [{
            data,
            backgroundColor,
            hoverBackgroundColor
        }]
    }
}

const toColors = (chartData) => (
    Object.keys(chartData).reduce((result, currentItem) => {
        result[currentItem] = getColor(currentItem)
        return result
    }, {})
)