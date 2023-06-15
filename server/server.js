const express = require('express')
const cors = require('cors')
require('dotenv').config();
const destination_routes = require('./routes/destination')

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 5500

app.use('/api/destination', destination_routes)

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})