import React from 'react'
import L from 'leaflet'
import 'leaflet-draw'

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

config.featureGroup = new L.FeatureGroup()
config.drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        rectangle: {
            icon: new L.DivIcon({
                iconSize: new L.Point(7, 7),
                className: 'point'
            })
        },
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false,
    },
    edit: false
})

export class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            map: null,
            layersControl: null,
            featureGroup: null,
            polygonLayer: null,
        }
        this._mapNode = React.createRef()
        this.initDrawEvents = this.initDrawEvents.bind(this)
    }

    componentDidMount() {
        // code to run just after the component "mounts" / DOM elements are created
        // we could make an AJAX request for the GeoJSON data here if it wasn't stored locally
        // this.getData();
        // create the Leaflet map object
        if (!this.state.map) this.init(this._mapNode.current);
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    componentWillUnmount() {
        // code to run just before unmounting the component
        // this destroys the Leaflet map object & related event listeners
        this.state.map.current.remove();
    }

    getData() {
        
    }

    initDrawEvents(map, featureGroup) {
        map.on(L.Draw.Event.CREATED, (event) => {
            let polygonLayer = event.layer

            L.Util.setOptions(polygonLayer, { interactive: true, fill: false })

            let { polygonLayer: currentLayer } = this.state
            console.log(this.state)
            if (currentLayer) {
                featureGroup.removeLayer(currentLayer)
                this.setState(() => ({ polygonLayer: null }))
            }

            featureGroup.addLayer(polygonLayer)
            this.setState(() => ({ polygonLayer }))
        })
    }

    init(id) {
        if (this.state.map) return
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map(id, config.params)
        // a TileLayer is used as the "basemap"
        let layersControl = L.control.layers(config.baseLayers, undefined, { position: 'topright', collapsed: false }).addTo(map)
        let featureGroup = config.featureGroup
        // add DrawControl to the map
        map.addControl(config.drawControl)
        // add featureGroup to the map
        featureGroup.addTo(map)

        // init draw create event
        this.initDrawEvents(map, featureGroup)

        // set our state
        this.setState({ map, layersControl, featureGroup })
    }

    render() {
        return (
            <div ref={this._mapNode} id="map" />
        )
    }
}

export default Map