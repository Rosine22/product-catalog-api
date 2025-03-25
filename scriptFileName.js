const mongoose = require('mongoose');
const User = require('./src/models/userModel.js'); // Adjust path based on your project structure

const deleteUser = async () => {
  try {
    // Connect to the database
    await mongoose.connect('mongodb+srv://rosine:R8xoDNENb1E37x6p@cluster0.lrirs2v.mongodb.net/product-catalog?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

    // Delete user with the specified email
    const result = await User.deleteOne({ email: 'umwali@gmail.com' });

    if (result.deletedCount === 1) {
      console.log('User deleted successfully!');
    } else {
      console.log('No user found with that email.');
    }

    // Close the database connection
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

deleteUser();
