const express = require('express')
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb+srv://rosine:R8xoDNENb1E37x6p@cluster0.h6gybf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit if connection fails
});

// Import Routes
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Product Catalog API is Running...');
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start Server (Hardcoded Port)
const PORT = 3000; // Change if needed
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
