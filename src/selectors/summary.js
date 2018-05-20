export default (state, filters) => {
    let { features } = state.area
    let agregated = features
        .filter(({ properties }) =>
            filters.features.indexOf(properties.type) === -1
        )
        .reduce((res, feature) => {
            let { type, population } = feature.properties
            res.summary.buildings += 1
            res.summary.citizens += ~~parseFloat(population)
            return res
        }, {
                summary: {
                    buildings: 0,
                    citizens: 0
                }
            }
        )
    return {
        summary: toListOfObjects(agregated.summary),
    }
}

const toListOfObjects = (data) => (
    Object.keys(data).reduce((result, currentItem) => {
        let [name, count] = [currentItem, data[currentItem]]
        result.push({ name, count })
        return result
    }, [])
)