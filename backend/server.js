require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require("./routes/postRoutes"); // Import post routes
const noticeRoutes = require("./routes/noticeRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

// Check if MONGO_URI is loaded correctly
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging

app.use("/api/posts", postRoutes);
app.use("/notices", noticeRoutes);


app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
