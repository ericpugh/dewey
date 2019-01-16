/** Model definition file for the Artwork Class **/

import store from '../store'

export default class Artwork {
    constructor (data = {}) {
        this.id = data.id;
        this.object_number = data.object_number;
        this.title = data.title;
        this.long_title = data.long_title;
        this.path = data.path;
        this.copyright = data.copyright;
        this.credit_line = data.credit_line;
        this.dated = data.dated;
        this.dimensions = data.dimensions;
        this.display_mediums = data.display_mediums;
        this.ontology = data.ontology;
        this.is_new_acquistion = data.is_new_acquistion;
        this.is_on_view = data.is_on_view;
        this.original_image_url = data.original_image_url;
        this.thumbnail_image_url = data.thumbnail_image_url;
        this.medium_image_url = data.medium_image_url;
        this.exhibition_label = data.exhibition_label;
        this.gallery_label = data.gallery_label;
        this.luce_center_label = data.luce_center_label;
        this.luce_object_quote = data.luce_object_quote;
        this.new_acquisition_label = data.new_acquisition_label;
        this.publication_label = data.publication_label;

    }
}
