export default (state, filters) => ({
    features: state.area.features.filter(({ properties }) => 
        filters.features.indexOf(properties.type) === -1
    )
})