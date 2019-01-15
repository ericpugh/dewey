/** Model definition file for the Artwork Class **/

import store from '../store'

export default class Artwork {
    constructor (data = {}) {
        this.id = data.id;
        this.title = data.title;
        this.exhibition_label = data.exhibition_label;
        this.gallery_label = data.gallery_label;
        this.original_image_url = data.original_image_url;
        this.thumbnail_image_url = data.thumbnail_image_url;
        this.medium_image_url = data.medium_image_url;
    }
}
