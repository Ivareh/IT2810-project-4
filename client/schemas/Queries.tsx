import {gql} from "@apollo/client"

export const FEED_SORT_TABLE_SHOWS = gql`
    query Shows($offset: Int, $limit: Int, $where: ShowWhere, $sortReleaseYear: SortDirection) {
        showsAggregate(where: $where) {
            count
        }
        shows(options: { sort: {release_year: $sortReleaseYear}, offset: $offset, limit: $limit}, where: $where) {
            show_id
            type
            title
            release_year
            director
            rating
        }
    }
`;

export const LOAD_SINGLE_SHOW = gql`
    query Shows($where: ShowWhere) {
        shows(where: $where) {
            show_id
            title
            duration
            director
            show_description
            show_rating
            rating
            country
            type
        }
    }`


