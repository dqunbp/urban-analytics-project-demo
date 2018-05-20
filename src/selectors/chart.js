import { getColor } from '../constants'

export default (state, filters) => {
    let { features } = state.area
    let agregated = features
        .filter(({ properties }) =>
            filters.features.indexOf(properties.type) === -1
        )
        .reduce((res, feature) => {
            let { type, population } = feature.properties
            let currentValue = ((res || {}).chart || {})[type]
            if (!currentValue) {
                res.chart[type] = 0
            }
            res.chart[type] += 1
            return res
        }, {
                chart: {},
            }
        )
    return {
        colors: toColors(agregated.chart),
        columns: toColumns(agregated.chart),
    }
}

const toColumns = (chartData) => (
    Object.keys(chartData).map(key => [
        key,
        chartData[key]
    ])
)

const toColors = (chartData) => (
    Object.keys(chartData).reduce((result, currentItem) => {
        result[currentItem] = getColor(currentItem)
        return result
    }, {})
)