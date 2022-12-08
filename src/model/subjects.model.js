const mongoose = require('./connectDB');

const SubjectSchema = mongoose.Schema({
  name: String,
  slug: String,
}, { collection: 'subject', timestamp: true });

const SubjectModel = mongoose.model("subject", SubjectSchema);

// SubjectModel.create({name: "maths", slug: "maths"});
// SubjectModel.create({name: "literature", slug: "literature"});
// SubjectModel.create({name: "foreign language", slug: "foreign-language"});
// SubjectModel.create({name: "chemistry", slug: "chemistry"});
// SubjectModel.create({name: "physics", slug: "physics"});
// SubjectModel.create({name: "biology", slug: "biology"});
// SubjectModel.create({name: "informatics", slug: "informatics"});
// SubjectModel.create({name: "civic education", slug: "civic-education"});
// SubjectModel.create({name: "history", slug: "history"});
// SubjectModel.create({name: "geography", slug: "geography"});
// SubjectModel.create({name: "physical education", slug: "physical-education"});
// SubjectModel.create({name: "national defense education", slug: "national-defense-education"});

module.exports = SubjectModel;