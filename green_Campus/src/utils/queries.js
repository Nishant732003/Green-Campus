import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      homeData {
        _id
        waterEmissions
        electricityEmissions
        naturalGasEmissions
        fuelOilEmissions
        createdAt
        updatedAt
      }
      travelData {
        _id
        fourVheelersEmissions
        publicTransitEmissions
        twoVheelersEmissions
        collegeBusEmissions
        createdAt
        updatedAt
      }
      wasteData {
        _id
        messFoodEmissions
        paperWasteEmissions
        metalWasteEmissions
        plasticWasteEmissions
        createdAt
        updatedAt
      }
      pledgeData {
        _id
        action
        description
        icon
        link
      }
    }
  }
`;

export const QUERY_PLEDGES = gql`
  {
    pledges {
      _id
      action
      description
      icon
      link
    }
  }
`;
