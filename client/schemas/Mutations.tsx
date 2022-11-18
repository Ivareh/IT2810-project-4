import {gql} from "@apollo/client";

export const ADD_REVIEW = gql`
    mutation Mutation($where: ShowWhere, $update: ShowUpdateInput) {
        updateShows(where: $where, update: $update) {
            shows {
                show_id
                rating
                note
            }
        }
    }
`;