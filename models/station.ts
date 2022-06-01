import config from "../config/config.json";

const station = {
    getStations: async function getStations() {
        const response = await fetch(`${config.base_url}/stations`);
        const result = await response.json();
        return result.data;
    },
    nameToSig: async function nameToSig() {
        let nameToSig = {};
        let stations = await this.getStations()
        stations.forEach( (station) => {
            nameToSig[station.LocationSignature] = station.AdvertisedLocationName; 
        })
        return nameToSig;
    },
    getLocation: async function getLocation(name) {
        let stations = await this.getStations()
        let geo;
        let geoArr;
        let coordinates = {};
        stations.forEach( (station) => {
            if (station.AdvertisedLocationName === name) {
                geo = station.Geometry.WGS84;
                geoArr = geo.split(' ')
                coordinates["lat"] = parseFloat(geoArr[2].slice(0, -1));
                coordinates["lon"] = parseFloat(geoArr[1].substring(1));
            }
        })
        return coordinates;
    }
};

export default station;
