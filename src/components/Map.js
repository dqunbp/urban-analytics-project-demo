import React from 'react'
import { connect } from 'react-redux'

import featuresSelector from '../selectors/features'
import { loadAreaData } from '../actions'
import { getColor, brighterColor } from '../constants'

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
            }),
            allowIntersection: false
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
        if (this.props.isFetching) {
            this._osmb.set()
        } else {
            this._osmb.set(
                this.featuresListToCollection(this.props.features)
            )
        }
    }

    componentWillUnmount() {
        // code to run just before unmounting the component
        // this destroys the Leaflet map object & related event listeners
        this.state.map.current.remove()
    }

    getData = (withInPolygon) => {
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

            // Add area polygon layer to the map
            L.Util.setOptions(polygonLayer, { interactive: true, fill: false })
            let { polygonLayer: currentLayer } = this.state
            if (currentLayer) {
                featureGroup.removeLayer(currentLayer)
                this.setState(() => ({ polygonLayer: null }))
            }
            featureGroup.addLayer(polygonLayer)
            this.setState(() => ({ polygonLayer }))

            // fetch within data
            try {
                this.getData(polygonLayer.toGeoJSON())
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

    findFeatureById = (id) => (
        this.props.features.find(feature => feature.id === id)
    )

    setOSMB = () => {
        this._osmb.each((feature) => {
            let { type, height, iou, population } = feature.properties
            if (type) {
                let color = getColor(type)
                let roofColor = brighterColor(color)
                Object.assign(feature, {
                    properties: {
                        type,
                        height,
                        iou,
                        population,
                        color,
                        roofColor
                    }
                })
            }
        })
        this._osmb.click((e) => {
            let json = this.findFeatureById(e.feature)
            let content = '<b>' + json.properties.type + '</b>'
            // content += '<br><em>Type</em> ' + json.properties.type
            content += '<br><em>Height</em> ' + json.properties.height
            content += '<br><em>IOU</em> ' + json.properties.iou
            L.popup({ maxHeight: 200, autoPanPaddingTopLeft: [50, 50] })
                .setLatLng(L.latLng(e.lat, e.lon))
                .setContent(content)
                .openOn(this.map)
        })
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
        
        this.setOSMB()

        // setTimeout(() => {

        //     this.props.loadAreaData([
        //         [
        //             [
        //                 37.74275779724121,
        //                 55.91337932481009
        //             ],
        //             [
        //                 37.769880294799805,
        //                 55.91337932481009
        //             ],
        //             [
        //                 37.769880294799805,
        //                 55.92607655155125
        //             ],
        //             [
        //                 37.74275779724121,
        //                 55.92607655155125
        //             ],
        //             [
        //                 37.74275779724121,
        //                 55.91337932481009
        //             ]
        //         ]
        //     ])
        // }, 500)
    }

    render() {
        return (
            <div ref={this._mapNode} id="map" />
        )
    }
}

const mapStateToProps = (state) => featuresSelector(state, state.filters)
export default connect(
    mapStateToProps,
    { loadAreaData }
)(Map)