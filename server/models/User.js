const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  githubLink: String,
  imageUrl: String,
  aboutMe: String,
  skills: [String],
  education: [
    {
      degree: String,
      institution: String,
      year: String,
      percentage: String
    }
  ],
  email: String,
  resumeUrl: String,
  leetcodeLink: String,
  linkedinLink: String,
  age: Number,
  from: String,
  availability: String,
  experience: String,
  internships: [
    {
      title: String,
      company: String,
      date: String,
      description: String
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      icon: String
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);