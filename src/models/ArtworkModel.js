/**
 * Artwork model
 */

import store from '../store'
import _ from "lodash";
import Artist from './ArtistModel';

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
        this.artists = [];
        this.audio_ids = [];
        this.videos = [];
        this.default_image = {};
        this.setIncluded(included);

        // Custom (async) properties
        this.audio = [];
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
        // TODO: break this up into separate functions?
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
            let location_ids = _.map(this.relationships.locations.data, 'id');
            // The first item in array contains the "complete" location.
            // TODO: verify first item is _always_ the full location, and if not how to figure out which location (by name length?).
            let location_id = _.head(location_ids);
            let location = _.head(_.filter(included, include => include.id === location_id));
            if (location) {
                this.on_view_location = {
                    'id' : location_id,
                    'title' : location.attributes.title,
                }
            }
        }
        // Get the artists relationship data.
        if (_.has(this.relationships, 'artists.data')) {
            let artist_ids = _.map(this.relationships.artists.data, 'id');
            let results = [];
            _.each(artist_ids, function (artist_id) {
                let data = _.head(_.filter(included, include => include.id === artist_id));
                if (_.has(data, 'attributes')) {
                    // Attach the Artist ID and create a new artist.
                    data.attributes.id = artist_id;
                    let artist = new Artist(data.attributes);
                    results.push(artist);
                }
            })
            this.artists = results;
        }
        // Get the audio ids from relationship data.
        // Since audio requires additional included data, we'll have to fetch this async.
        if (_.has(this.relationships, 'audio.data')) {
            let audio_ids = _.map(this.relationships.audio.data, 'id');
            this.audio_ids = audio_ids || [];
        }
        // Get "remote video" relationship data
        if (_.has(this.relationships, 'videos.data')) {
            let video_ids = [];
            _.each(this.relationships.videos.data, function (item) {
                if (item.type === 'remote_videos') {
                    video_ids.push(item.id);
                }
            });
            let results = [];
            _.each(video_ids, function (video_id) {
                let data = _.head(_.filter(included, include => include.id === video_id));
                if (_.has(data, 'attributes')) {
                    // Add video attributes to artwork property list.
                    data.attributes.type = data.type;
                    data.attributes.id = data.id;
                    results.push(data.attributes);
                }
            })
            this.videos = results;
        }

    }

}
