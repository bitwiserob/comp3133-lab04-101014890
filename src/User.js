const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  suite: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^[a-zA-Z\s]+$/.test(value);
      },
      message: "City name must contain only characters and spaces."
    }
  },
  zipcode: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^\d{5}-\d{4}$/.test(value);
      },
      message: "Zip code format must be DDDDD-DDDD."
    }
  },
  geo: {
    lat: {
      type: String,
      required: true
    },
    lng: {
      type: String,
      required: true
    }
  }
});

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  catchPhrase: {
    type: String,
    required: true
  },
  bs: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value.length >= 4;
      },
      message: "Username must have at least 4 characters."
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Invalid email address."
    }
  },
  address: {
    type: addressSchema,
    required: true
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^\d{1}-\d{3}-\d{3}-\d{4}$/.test(value);
      },
      message: "Invalid phone format. Valid format is D-DDD-DDD-DDDD."
    }
  },website: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value);
      },
      message: "Invalid website URL."
    }
  },
});



const User = mongoose.model("User", userSchema);
module.exports = User;