const {gql} = require("apollo-server");
const typeDefs = gql`
    type Show {
        show_id: String!
        type: String
        title: String!
        director: String
        cast: String
        country: String
        date_added: String
        release_year: Int
        rating: Int
        show_rating: String
        duration: String
        listed_in: String
        show_description: String
    }
`;
module.exports = typeDefs;