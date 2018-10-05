import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import featuresSelector from '../selectors/features'
import { loadAreaData, setUserMessage, clearData } from '../actions'
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
    attributionControl: false,
    zoomControl: false
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
    edit: false,
    position: 'topright'
})

// const AVIABLE_AREA = [ [ [ 1.442096947472926, 43.63383794331183 ],
// [ 1.503059317599129, 43.63383794331183 ],
// [ 1.503059317599129, 43.67427002540336 ],
// [ 1.442096947472926, 43.67427002540336 ],
// [ 1.442096947472926, 43.63383794331183 ] ] ]

const MYTISHI_COORDS = [[
    [37.684445, 55.878168],
    [37.81569, 55.878168],
    [37.81569, 55.964435],
    [37.684445, 55.964435],
    [37.684445, 55.878168]]]

const KIROV_BOUNDS = new L.LatLngBounds([[58.67986899986801, 49.70018801727667], [58.53993923926524, 49.49997393709766]])
const KIROV_LATLNGS = [
    KIROV_BOUNDS.getSouthWest(),
    KIROV_BOUNDS.getNorthWest(),
    KIROV_BOUNDS.getNorthEast(),
    KIROV_BOUNDS.getSouthEast()
];
const KIROV_COORDS = L.GeoJSON.latLngsToCoords(
    KIROV_LATLNGS
)

L.Mask = L.Polygon.extend({
    options: {
        stroke: false,
        color: '#000000',
        fillOpacity: 0.5,
        clickable: false,
        interactive: false,

        outerBounds: new L.LatLngBounds([-90, -180], [90, 180])
    },

    initialize: function (latLngs, options) {

        var outerBoundsLatLngs = [
            this.options.outerBounds.getSouthWest(),
            this.options.outerBounds.getNorthWest(),
            this.options.outerBounds.getNorthEast(),
            this.options.outerBounds.getSouthEast()
        ];
        L.Polygon.prototype.initialize.call(this, [outerBoundsLatLngs, latLngs], options);
    },

});
L.mask = function (latLngs, options) {
    return new L.Mask(latLngs, options);
};

const customStyles = {
    container: () => ({
        position: 'absolute',
        zIndex: 10000,
        minWidth: '200px',
        margin: '10px'
    }),
}
export class Map extends React.Component {

    state = {
        map: null,
        layersControl: null,
        featureGroup: null,
        polygonLayer: null,
        currentLocation: { label: 'Russia, Mytishi', value: MYTISHI_COORDS },
        aviable_locations: [
            { label: 'Russia, Mytishi', value: MYTISHI_COORDS },
            { label: 'Russia, Kirov', value: [KIROV_COORDS] }
        ],
        mask: false
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

            // Check if polygon in aviable area
            if (!this.state.aviableAreaBounds.intersects(
                polygonLayer.getBounds()
            )) {
                this.props.setUserMessage('No data found for selected area, please select polygon in the white rectangle area')
            } else {

                // fetch within data
                try {
                    this.getData(polygonLayer.toGeoJSON())
                } catch (error) {
                    console.log(error)
                }

                // Zoom map to the target
                map.flyTo(
                    polygonLayer.getCenter(),
                    15
                )
            }

        })
    }

    setMapBounds = (AVIABLE_AREA) => {
        let leafletPolygon = L.polygon(
            L.GeoJSON.coordsToLatLngs(
                AVIABLE_AREA[0]
            )
        )
        let aviableLatLngs = leafletPolygon.getLatLngs()
        let aviableAreaBounds = leafletPolygon.getBounds()
        this.setState(() => ({ aviableAreaBounds }))

        this.map.fitBounds(aviableAreaBounds)
        this.map.setMaxBounds(aviableAreaBounds.pad(0.1))
        this.map.setMinZoom(11)
        
        // Hide all except aviable area
        if(this.state.mask) {
            this.state.mask.remove()
        }
        let mask = L.mask(aviableLatLngs).addTo(this.map)
        this.setState(() => ({ mask }))

        this.props.clearData()
        if(this.state.polygonLayer) {
            this.state.polygonLayer.remove()
        }

        // this.map.once('moveend', () => {
        //     console.log(this.map.getZoom())
        //     // this.map.setMaxBounds(this.map.getBounds());
        //     // this.map.setMinZoom(this.map.getZoom())
        // });

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

    init = (id) => {
        if (this.state.map) return
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map(id, config.params)
        this.map = map

        // setup osmb
        this._osmb = new OSMBuildings(map)

        // a TileLayer is used as the "basemap"

        let layersControl = L.control.layers(config.baseLayers, undefined, { position: 'topright', collapsed: false }).addTo(map)
        let featureGroup = config.featureGroup

        // add zoom control
        L.control.zoom({ position: 'topright' }).addTo(map)

        // add DrawControl to the map
        map.addControl(config.drawControl)

        // add featureGroup to the map
        featureGroup.addTo(map)

        // init draw create event
        this.initDrawEvents(map, featureGroup)

        // set our state
        this.setState({ map, layersControl, featureGroup })

        this.setMapBounds(this.state.currentLocation.value)

        // map.once('moveend', () => {
        //     this.map.setMaxBounds(this.map.getBounds());
        //     this.map.setMinZoom(this.map.getZoom())
        // });


        this.setOSMB()

        // let area = [
        //     [
        //         [
        //             37.705421447753906,
        //             55.891125103412406
        //         ],
        //         [
        //             37.72305965423584,
        //             55.891125103412406
        //         ],
        //         [
        //             37.72305965423584,
        //             55.89815159889918
        //         ],
        //         [
        //             37.705421447753906,
        //             55.89815159889918
        //         ],
        //         [
        //             37.705421447753906,
        //             55.891125103412406
        //         ]
        //     ]
        // ]

        let area = [[
            [
                37.74275779724121,
                55.91337932481009
            ],
            [
                37.769880294799805,
                55.91337932481009
            ],
            [
                37.769880294799805,
                55.92607655155125
            ],
            [
                37.74275779724121,
                55.92607655155125
            ],
            [
                37.74275779724121,
                55.91337932481009
            ]
        ]]

        // setTimeout(() => {
        //     this.props.loadAreaData(area)
        // }, 500)

        // L.mask(
        //     L.GeoJSON.coordsToLatLngs(area[0])
        // ).addTo(map)
    }

    onSelectChange = ({ value }) => {
        this.setMapBounds(value)
    }

    render() {
        return (
            <React.Fragment>
                <Select
                    onChange={this.onSelectChange}
                    defaultValue={this.state.aviable_locations[0]}
                    options={this.state.aviable_locations}
                    styles={customStyles}
                />
                <div ref={this._mapNode} id="map" />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => featuresSelector(state, state.filters)
export default connect(
    mapStateToProps,
    { loadAreaData, setUserMessage, clearData }
)(Map)