import React from 'react'
import L from 'leaflet'

let google = L.tileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga', { id: 1 }),
    osm = L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', { id: 2 })

let config = {}
config.params = {
    center: [55.87835875564509, 37.7050219952363],
    zoom: 16,
    layers: [google],
    scrollwheel: false,
    legends: true,
    infoControl: false,
    attributionControl: false
}
config.baseLayers = {
    "Google": google,
    "OSM": osm
}

export class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            map: null,
            layersControl: null,
        }
        this._mapNode = React.createRef()
    }

    componentDidMount() {
        // code to run just after the component "mounts" / DOM elements are created
        // we could make an AJAX request for the GeoJSON data here if it wasn't stored locally
        // this.getData();
        // create the Leaflet map object
        if (!this.state.map) this.init(this._mapNode.current);
    }

    componentDidUpdate(prevProps, prevState) {
        // code to run when the component receives new props or state
        // check to see if geojson is stored, map is created, and geojson overlay needs to be added
        // if (this.state.geojson && this.state.map && !this.state.geojsonLayer) {
        //     // add the geojson overlay
        //     this.addGeoJSONLayer(this.state.geojson);
        // }

        // // check to see if the subway lines filter has changed
        // if (this.state.subwayLinesFilter !== prevState.subwayLinesFilter) {
        //     // filter / re-render the geojson overlay
        //     this.filterGeoJSONLayer();
        // }
    }

    componentWillUnmount() {
        // code to run just before unmounting the component
        // this destroys the Leaflet map object & related event listeners
        this.state.map.current.remove();
    }

    getData() {
        // could also be an AJAX request that results in setting state with the geojson data
        // for simplicity sake we are just importing the geojson data using webpack's json loader
        // this.setState({
        //     numEntrances: geojson.features.length,
        //     geojson
        // });
    }

    init(id) {
        if (this.state.map) return
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map(id, config.params)

        // a TileLayer is used as the "basemap"
        const layersControl = L.control.layers(config.baseLayers, undefined, { position: 'topright', collapsed: false }).addTo(map)

        // set our state to include the tile layer
        this.setState({ map, layersControl })
    }

    render() {
        return (
            <div ref={this._mapNode} id="map" />
        )
    }
}

export default Map