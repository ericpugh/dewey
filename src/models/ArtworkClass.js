/** Model definition file for the Artwork Class **/

import store from '../store'

export default class Artwork {
    constructor (rawData = {}) {
        this.id = rawData.id;
        this.title = rawData.attributes.title;
        this.exhibition_label = rawData.attributes.exhibition_label ?  rawData.attributes.exhibition_label.processed : '';
        this.gallery_label = rawData.attributes.gallery_label ?  rawData.attributes.gallery_label.processed : '';
        this.default_image_id = rawData.relationships.default_image ? rawData.relationships.default_image.data.id : '';
        //@TODO: get included
    }
}
