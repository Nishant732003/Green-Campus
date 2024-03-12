import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_TRAVEL = gql`
  mutation addTravel(
    $fourVheelersEmissions: Int!
    $publicTransitEmissions: Int!
    $twoVheelersEmissions: Int!
    $collegeBusEmissions: Int!
  ) {
    addTravel(
      fourVheelersEmissions: $fourVheelersEmissions
      publicTransitEmissions:$publicTransitEmissions
      twoVheelersEmissions:$twoVheelersEmissions
      collegeBusEmissions:$collegeBusEmissions
    ) {
      _id
      username
      email
      travelData {
        _id
        fourVheelersEmissions
      publicTransitEmissions
      twoVheelersEmissions
      collegeBusEmissions
      }
    }
  }
`;

export const ADD_HOME = gql`
  mutation addHome(
    $waterEmissions: Int!
    $electricityEmissions: Int!
    $naturalGasEmissions: Int!
    $fuelOilEmissions: Int!
  ) {
    addHome(
      waterEmissions: $waterEmissions
      electricityEmissions: $electricityEmissions
      naturalGasEmissions: $naturalGasEmissions
      fuelOilEmissions: $fuelOilEmissions
    ) {
      _id
      username
      email
      homeData {
        _id
        waterEmissions
        electricityEmissions
        naturalGasEmissions
      fuelOilEmissions
      }
    }
  }
`;

export const ADD_WASTE = gql`
  mutation addWaste(
    $messFoodEmissions: Int!
    $paperWasteEmissions: Int!
    $metalWasteEmissions: Int!
    $plasticWasteEmissions: Int!
  ) {
    addWaste(
      messFoodEmissions: $messFoodEmissions
      paperWasteEmissions: $paperWasteEmissions
      metalWasteEmissions: $metalWasteEmissions
      plasticWasteEmissions:$plasticWasteEmissions
    ) {
      _id
      username
      email
      wasteData {
        _id
        messFoodEmissions
      paperWasteEmissions
      metalWasteEmissions
      plasticWasteEmissions
      }
    }
  }
`;

export const ADD_PLEDGE = gql`
  mutation addPledge($pledgeData: [ID]) {
    addPledge(pledgeData: $pledgeData) {
      _id
      username
      email
      pledgeData {
        _id
      }
    }
  }
`;

export const REMOVE_PLEDGE = gql`
  mutation removePledge($pledgeData: ID) {
    removePledge(pledgeData: $pledgeData) {
      username
      email
      pledgeData {
        _id
      }
    }
  }
`;
