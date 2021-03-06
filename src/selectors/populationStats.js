import { getColor } from '../constants'

export default (state) => {
    let { features } = state.area
    let agregated = features.reduce((res, feature) => {
        let { type, population } = feature.properties
        let currentValue = ((res || {}).chart || {})[type]
        if (!currentValue) {
            res.chart[type] = 0
        }
        res.chart[type] += 1
        res.summary.buildings += 1
        res.summary.citizens += ~~parseFloat(population)
        return res
    }, {
            chart: {},
            summary: {
                buildings: 0,
                citizens: 0
            }
        }
    )
    return {
        colors: toColors(agregated.chart),
        columns: toColumns(agregated.chart),
        summary: toListOfObjects(agregated.summary),
        legend: toListOfObjects(agregated.chart),
        isAreaSelected: !features.length > 0
    }
}

const toListOfObjects = (data) => (
    Object.keys(data).reduce((result, currentItem) => {
        let [name, count] = [currentItem, data[currentItem]]
        result.push({ name, count })
        return result
    }, [])
)

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