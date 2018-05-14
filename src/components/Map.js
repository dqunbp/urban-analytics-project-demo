import React from 'react'
import { connect } from 'react-redux'

import featuresSelector from '../selectors/features'
import { loadAreaData } from '../actions'

// Leaflet & osmb libs Moved to CDN

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
        rectangle: false,
        polygon: {
            icon: new L.DivIcon({
                iconSize: new L.Point(17, 17),
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

    state = {
        map: null,
        layersControl: null,
        featureGroup: null,
        polygonLayer: null,
    }

    _mapNode = React.createRef()
    _osmb = React.createRef()

    componentDidMount() {
        // code to run just after the component "mounts" / DOM elements are created
        // create the Leaflet map object
        if (!this.state.map) this.init(this._mapNode.current)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('current', this.props)
        console.log('next', prevProps)
        if (this.props.features.length > 0) {
            this._osmb.set(
                this.featuresListToCollection(this.props.features)
            )
        }
    }

    componentWillUnmount() {
        // code to run just before unmounting the component
        // this destroys the Leaflet map object & related event listeners
        this.state.map.current.remove();
    }

    getData = (layer) => {
        let withInPolygon = layer.toGeoJSON()
        let { geometry: { coordinates } } = withInPolygon
        this.props.loadAreaData(coordinates)
    }

    featuresListToCollection = (list) => ({
        "type": "FeatureCollection",
        "features": list
    })

    initDrawEvents = (map, featureGroup) => {
        map.on(L.Draw.Event.CREATED, (event) => {
            let polygonLayer = event.layer
            console.log(polygonLayer.toGeoJSON().geometry.coordinates)

            // Add area polygon layer to the map
            L.Util.setOptions(polygonLayer, { interactive: true, fill: false })
            let { polygonLayer: currentLayer } = this.state
            console.log(this.state)
            if (currentLayer) {
                featureGroup.removeLayer(currentLayer)
                this.setState(() => ({ polygonLayer: null }))
            }
            featureGroup.addLayer(polygonLayer)
            this.setState(() => ({ polygonLayer }))

            // fetch within data
            try {
                this.getData(polygonLayer)
            } catch (error) {
                console.log(error)
            }
        })
    }

    setMapBounds = () => {
        let polygon = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [37.684445, 55.878168],
                                [37.81569, 55.878168],
                                [37.81569, 55.964435],
                                [37.684445, 55.964435],
                                [37.684445, 55.878168]
                            ]
                        ]
                    }
                }
            ]
        }
        let leafletPolygon = L.geoJSON(polygon, {
            onEachFeature(feature, layer) {
                L.Util.setOptions(layer, {
                    interactive: true,
                    fill: false,
                    color: "#ffffff"
                })
            }
        })
        this.map.fitBounds(leafletPolygon.getBounds())
        leafletPolygon.addTo(this.map)

    }

    init(id) {
        if (this.state.map) return
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map(id, config.params)
        this.map = map

        // setup osmb
        this._osmb = new OSMBuildings(map)

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
        this.setMapBounds()
    }

    render() {
        return (
            <div ref={this._mapNode} id="map" />
        )
    }
}

const mapStateToProps = (state) => featuresSelector(state)
export default connect(
    mapStateToProps,
    { loadAreaData }
)(Map)