const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Swagger options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for Categories, Products, and Users with authentication',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        server: ['http://localhost:3000/api']
      },
    },
    apis: ['./src/controllers/productController.js', './src/controllers/categoryController.js' ,'./src/controllers/userController.js'], // Adjust this path to your route files
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  
  // Serve swagger API docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const MONGO_URI = "mongodb+srv://rosine:R8xoDNENb1E37x6p@cluster0.lrirs2v.mongodb.net/product-catalog?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

// Import Routes
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Product Catalog API is Running...');
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});