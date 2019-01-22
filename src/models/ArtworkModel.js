/**
 * Artwork model
 */

import store from '../store'

export default class Artwork {
    constructor (data = {}, included = {}) {
        // Attributes
        this.id = '';
        this.relationships = {};
        this.object_number = '';
        this.title = '';
        this.long_title = '';
        this.path = '';
        this.copyright = '';
        this.credit_line = '';
        this.dated = '';
        this.dimensions = '';
        this.display_mediums = '';
        this.ontology = [];
        this.is_new_acquistion = '';
        this.is_on_view = '';
        this.exhibition_label = '';
        this.gallery_label = '';
        this.luce_center_label = '';
        this.luce_object_quote = '';
        this.new_acquisition_label = '';
        this.publication_label = '';
        this.setAttributes(data);

        // Includes
        this.on_view_location = {};
        this.default_image = {};
        this.setIncluded(included);

        // Custom properties
        this.nearby_artworks = [];
    }

    setAttributes(data) {
        this.id = data.id;
        this.relationships = data.relationships;
        this.object_number = data.attributes.object_number;
        this.title = data.attributes.title;
        this.long_title = data.attributes.long_title;
        this.path = data.attributes.path.alias;
        this.copyright = data.attributes.copyright;
        this.credit_line = data.attributes.credit_line;
        this.dated = data.attributes.dated;
        this.dimensions = data.attributes.dimensions;
        this.display_mediums = data.attributes.display_mediums;
        this.is_new_acquistion = data.attributes.is_new_acquistion;
        this.is_on_view = data.attributes.is_on_view;
        this.exhibition_label = data.attributes.exhibition_label ? data.attributes.exhibition_label.processed : '';
        this.gallery_label = data.attributes.gallery_label ? data.attributes.gallery_label.processed : '';
        this.luce_center_label = data.attributes.luce_center_label ? data.attributes.luce_center_label.processed : '',
        this.luce_object_quote = data.attributes.luce_object_quote ? data.attributes.luce_object_quote.processed : '',
        this.new_acquisition_label = data.attributes.new_acquisition_label ? data.attributes.new_acquisition_label.processed : '',
        this.publication_label = data.attributes.publication_label ? data.attributes.publication_label.processed : '';
        this.on_view_location = '';

        // Parse the Ontology array items for friendly output.
        if (data.attributes.ontology) {
            let parsed = [];
            let allowed_subjects = ['Subject Specific', 'Subject General', 'Patronage', 'Medium'];
            _.each(data.attributes.ontology, function (keyword) {
                // Check if allowed subject in keyword, and strip all values up to (and including) that subject.
                let words = _.split(keyword, '\\');
                _.each(allowed_subjects, function (subject) {
                    if (_.includes(words, subject)) {
                        let position = _.indexOf(words, subject);
                        let friendly = _.remove(words, function(value, index) {
                            return index > position;
                        });
                        parsed.push(friendly.join(' &mdash; '));
                    }
                })
            });
            this.ontology = parsed;
        }
    }

    setIncluded(included) {
        // Get the default image relationship data.
        if (_.has(this.relationships, 'default_image.data')) {
            let default_image_id = this.relationships.default_image.data.id || null;
            if (default_image_id) {
                let default_image = _.head(_.filter(included, include => include.id === default_image_id));
                if (default_image) {
                    this.default_image = {
                        'id' : default_image_id,
                        'filesize' : default_image.attributes.filesize,
                        'filemime' : default_image.attributes.filemime,
                        'filename' : default_image.attributes.filename,
                        'original_image_url' : default_image.attributes.uri.url,
                        'thumbnail_image_url' : default_image.attributes.uri.url.replace('/files/files/', '/files/styles/max_325x325/s3/files/'),
                        'medium_image_url' : default_image.attributes.uri.url.replace('/files/files/', '/files/styles/max_650x650/s3/files/')
                    };
                }
            }
        }
        // Get a single "on view location" relationship data.
        if (_.has(this.relationships, 'locations.data')) {
            // The first item in array contains the "complete" location.
            // TODO: verify first item is _always_ the full location.
            let location_id = _.head(this.relationships.locations.data).id;
            let location = _.head(_.filter(included, include => include.id === location_id));
            if (location) {
                this.on_view_location = {
                    'id' : location_id,
                    'title' : location.attributes.title,
                }
            }
        }

        // @TODO: get audio and videos fields!

    }

}
