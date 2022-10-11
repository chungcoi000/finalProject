const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
// mongoose.connect('mongodb+srv://chungcoi000:kanekiken113@cluster0.quvmg.mongodb.net/final_project?retryWrites=true&w=majority');

module.exports = mongoose;