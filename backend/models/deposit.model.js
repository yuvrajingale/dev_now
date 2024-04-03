// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const DepositSchema = new mongoose.Schema({
//   referenceCode: {
//     type: String,
//     required: [true, 'Reference code is required.']
//   },
//   asset: {
//     type: String,
//     required: [true, 'Asset is required.']
//   },
//   amount: {
//     type: Number,
//     required: [true, 'Amount is required.']
//   },
//   status: {
//     type: Number,
//     enum: {
//       values: [0, 1, 2],
//     },
//     default: 0
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'Deposit must belong to a user.']
//   },
//   accountName: {
//     type: String,
//     required: [true, 'Account name is required.']
//   },
//   createdAt: Date
// });

// const Deposit = mongoose.model('Deposit', DepositSchema);

// module.exports = Deposit;


// models/Deposit.js

// Import Sequelize and connection instance
const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgresql-db');

// Define the Deposit model
const Deposit = sequelize.define('Deposit', {
  referenceCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Reference code is required.'
      }
    }
  },
  asset: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Asset is required.'
      }
    }
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Amount is required.'
      }
    }
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    // validate: {
    //   isIn: {
    //     args: [[0, 1, 2]],
    //     msg: 'Status must be 0, 1, or 2.'
    //   }
    // }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    },
    validate: {
      notNull: {
        msg: 'Deposit must belong to a user.'
      }
    }
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Account name is required.'
      }
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Deposit;
