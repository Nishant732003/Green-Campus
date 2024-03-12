// const { User, Pledge } = require('../models');
// const { AuthenticationError } = require('apollo-server-express');
// const { signToken } = require('../utils/auth');

// const resolvers = {
//   Query: {
//     // get all data on a user
//     me: async (parent, args, context) => {
//       if (context.user) {
//         const userData = await User.findOne({ _id: context.user._id })
//           .select('-__v -password')
//           .populate('homeData')
//           .populate('travelData')
//           .populate('pledgeData');

//         return userData;
//       }

//       throw new AuthenticationError('Not logged in');
//     },

//     // get all pledges
//     pledges: async () => {
//       return Pledge.find().select('-__v');
//     },
//   },

//   Mutation: {
//     // add a user
//     addUser: async (parent, args) => {
//       const user = await User.create(args);
//       const token = signToken(user);

//       return { token, user };
//     },

//     // login as a user
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError('Incorrect credentials');
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError('Incorrect credentials');
//       }
//       const token = signToken(user);
//       return { token, user };
//     },

//     addTravel: async (
//       parent,
//       { vehicleEmissions, publicTransitEmissions, planeEmissions },
//       context
//     ) => {
//       if (context.user) {
//         const user = await User.findOne({ _id: context.user._id });

//   // Push the new travel data to the existing array
//   user.travelData.push({
//     vehicleEmissions,
//     publicTransitEmissions,
//     planeEmissions,
//   });
//          const updatedUser = await user.save();

//          return updatedUser;
//       }

//       throw new AuthenticationError('Not logged in');
//     },

//     addHome: async (
//       parent,
//       { waterEmissions, electricityEmissions, heatEmissions },
//       context
//     ) => {
//       if (context.user) {
//         const user = await User.findOne({ _id: context.user._id });

//   // Push the new travel data to the existing array
//   user.homeData.push({
//     waterEmissions, electricityEmissions, heatEmissions 
//   });
//          const updatedUser = await user.save();

//          return updatedUser;
//       }

//       throw new AuthenticationError('Not logged in');
//     },

//     // save a pledge to a user
//     addPledge: async (parent, args, context) => {
//       if (context.user) {
//         return await User.findByIdAndUpdate(
//           context.user._id,
//           { $addToSet: args },
//           { new: true }
//         );
//       }
//       throw new AuthenticationError('Not logged in');
//     },

//     // remove a pledge
//     removePledge: async (parent, args, context) => {
//       if (context.user) {
//         let updatedUser = await User.findByIdAndUpdate(
//           { _id: context.user._id },
//           { $pull: args },
//           { new: true }
//         );

//         return updatedUser;
//       }

//       throw new AuthenticationError('Not logged in');
//     },
//   },
// };

// module.exports = resolvers;


const { User, Pledge } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get all data on a user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('homeData')
          .populate('travelData')
          .populate('wasteData')
          .populate('pledgeData');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    // get all pledges
    pledges: async () => {
      return Pledge.find().select('-__v');
    },
  },

  Mutation: {
    // add a user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // login as a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    addTravel: async (
      parent,
      { fourVheelersEmissions, publicTransitEmissions, twoVheelersEmissions,collegeBusEmissions },
      context
    ) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });

  // Push the new travel data to the existing array
  user.travelData.push({
    fourVheelersEmissions, publicTransitEmissions, twoVheelersEmissions,collegeBusEmissions
  });
         const updatedUser = await user.save();

         return updatedUser;
      }

      throw new AuthenticationError('Not logged in');
    },

    addHome: async (
      parent,
      { waterEmissions, electricityEmissions, naturalGasEmissions, fuelOilEmissions },
      context
    ) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
  // Push the new travel data to the existing array
  user.homeData.push({
    waterEmissions, electricityEmissions, naturalGasEmissions, fuelOilEmissions 
  });
         const updatedUser = await user.save();

         return updatedUser;
      }

      throw new AuthenticationError('Not logged in');
    },

    addWaste: async (
      parent,
      { messFoodEmissions, paperWasteEmissions, metalWasteEmissions, plasticWasteEmissions },
      context
    ) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });

  // Push the new travel data to the existing array
  user.wasteData.push({
    messFoodEmissions, paperWasteEmissions, metalWasteEmissions, plasticWasteEmissions 
  });
         const updatedUser = await user.save();

         return updatedUser;
      }

      throw new AuthenticationError('Not logged in');
    },

    // save a pledge to a user
    addPledge: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: args },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in');
    },

    // remove a pledge
    removePledge: async (parent, args, context) => {
      if (context.user) {
        let updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: args },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
