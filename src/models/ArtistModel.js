/**
 * Artist model
 */

import store from '../store'

export default class Artist {
    constructor (data = {}, included = {}) {
        this.id = '';
        this.relationships = {};
        this.title = '';
        this.path = '';
        this.aka_names = [];
        this.alphabetical_name = '';
        this.artist_biography = '';
        this.luce_artist_biography = '';
        this.associated_places = [];
        this.birth_place = '';
        this.birth_year = '';
        this.date_of_birth = '';
        this.date_of_death = '';
        this.death_place = '';
        this.death_year = '';
        this.display_date = '';
        this.name_prefix = '';
        this.firstname = '';
        this.lastname = '';
        this.name_suffix = '';
        this.name_title = '';
        this.gender = '';
        this.last_known_place = '';
        this.library_of_congress_id = '';
        this.ulan_id = '';
        this.viaf_id = '';
        this.wikidata_id = '';
        this.setAttributes(data);
    }

    setAttributes(data) {
        this.id = data.id;
        this.relationships = data.relationships;
        this.title = data.title;
        this.path = data.path.alias;
        this.aka_names = data.aka_names;
        this.alphabetical_name = data.alphabetical_name;
        this.artist_biography = data.artist_biography ? data.artist_biography.processed : '';
        this.luce_artist_biography = data.luce_artist_biography ? data.luce_artist_biography.processed : '';
        this.associated_places = data.associated_places;
        this.birth_place = data.birth_place;
        this.birth_year = data.birth_year;
        this.date_of_birth = data.date_of_birth;
        this.date_of_death = data.date_of_death;
        this.death_place = data.death_place;
        this.death_year = data.death_year;
        this.display_date = data.display_date;
        this.name_prefix = data.name_prefix;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.name_suffix = data.name_suffix;
        this.name_title = data.name_title;
        this.gender = data.gender;
        this.last_known_place = data.last_known_place;
        this.library_of_congress_id = data.library_of_congress_id;
        this.ulan_id = data.ulan_id;
        this.viaf_id = data.viaf_id;
        this.wikidata_id = data.wikidata_id;
    }

    setIncluded(included) {
        // TODO: get the bio_image relationship data (would require a separate request for the full artist record with included?)
    }
}
