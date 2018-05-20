import { getColor } from '../constants'

export default (state, filters) => {
    let { features } = state.area
    let agregated = features
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
        legend: toListOfObjects(agregated.chart, filters),
        isAreaSelected: !features.length > 0
    }
}

const toListOfObjects = (data, filters) => (
    Object.keys(data).reduce((result, currentItem) => {
        let [name, count] = [currentItem, data[currentItem]]
        let isActive = filters.features.indexOf(name) === -1
        result.push({ 
            name,
            count,
            isActive
        })
        return result
    }, [])
)