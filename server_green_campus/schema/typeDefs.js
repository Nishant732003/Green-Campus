const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar DateTime
  type Home {
    _id: ID
    waterEmissions: Int
    electricityEmissions: Int
    naturalGasEmissions: Int
    fuelOilEmissions: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Travel {
    _id: ID
    fourVheelersEmissions: Int
    publicTransitEmissions: Int
    twoVheelersEmissions: Int
    collegeBusEmissions: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Waste {
    _id: ID
    messFoodEmissions: Int
    paperWasteEmissions: Int
    metalWasteEmissions: Int
    plasticWasteEmissions: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Pledge {
    _id: ID
    action: String
    description: String
    icon: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    homeData: [Home]
    travelData: [Travel]
    wasteData: [Waste]
    pledgeData: [Pledge]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    pledges: [Pledge]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTravel(
      fourVheelersEmissions: Int!
      publicTransitEmissions: Int!
      twoVheelersEmissions: Int!
      collegeBusEmissions: Int!
      createdAt: DateTime
    updatedAt: DateTime
    ): User
    addHome(
      waterEmissions: Int!
      electricityEmissions: Int!
      naturalGasEmissions: Int!
      fuelOilEmissions: Int!
      createdAt: DateTime
    updatedAt: DateTime
    ): User
    addWaste(
      messFoodEmissions: Int!
      paperWasteEmissions: Int!
      metalWasteEmissions: Int!
      plasticWasteEmissions: Int!
      createdAt: DateTime
    updatedAt: DateTime
    ): User
    addPledge(pledgeData: [ID]): User
    removePledge(pledgeData: ID): User
  }
`;

module.exports = typeDefs;