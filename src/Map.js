import React from "react";
import * as ol from 'openlayers';
import { applyStyle } from 'ol-mapbox-style';
require('openlayers/css/ol.css');

export default class Map extends React.Component {

  componentDidMount(props) {
    const map = this.olMap();
    this.addVectorTileLayer(map);
  }

  vectorTileLayer() {
    const tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 22});
    return new ol.layer.VectorTile({
      source: new ol.source.VectorTile({
        attributions: '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
          '© <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap contributors</a>',
        format: new ol.format.MVT(),
        tileGrid: tilegrid,
        tilePixelRatio: 8,
        url: 'https://free-0.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=tXiQqN3lIgskyDErJCeY'
      })
    });
  }

  olMap() {
    const center_wgs84 = [8.5389, 47.3870];
    const view = new ol.View({
      center: ol.proj.fromLonLat(center_wgs84),
      resolution: 2445,
      maxResolution: 156543,
    });

    return new ol.Map({
      target: 'map',
      view: view
    });
  }

  addVectorTileLayer(map) {
    const json_style = 'https://rawgit.com/openmaptiles/positron-gl-style/master/style.json';
    const layer = this.vectorTileLayer();
    fetch(json_style).then(function(response) {
      response.json().then(function(glStyle) {
        applyStyle(layer, glStyle, 'openmaptiles').then(function() {
          map.addLayer(layer);
        }).catch(function(error) {
          console.error(error);
        });
      });
    });
  }

  addRasterLayer(map) {
    const layer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    map.addLayer(layer);
  }

  render() {
    return <div id="map" className="Map"/>;
  }
}
