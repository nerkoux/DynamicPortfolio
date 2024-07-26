import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    githubLink: '',
    profileImage: null,
    aboutMe: '',
    skills: '',
    education: [{ degree: '', institution: '', year: '', percentage: '' }],
    email: '',
    resumeUrl: '',
    leetcodeLink: '',
    linkedinLink: '',
    age: '',
    from: '',
    availability: '',
    experience: '',
    internships: [{ title: '', company: '', date: '', description: '' }],
    projects: [{ title: '', description: '', icon: '' }]
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, subfield, value) => {
    const newArray = [...formData[field]];
    newArray[index][subfield] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], field === 'education' ? { degree: '', institution: '', year: '', percentage: '' } :
                                    field === 'internships' ? { title: '', company: '', date: '', description: '' } :
                                    { title: '', description: '', icon: '' }]
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadingImage(true);

    const submitFormData = new FormData();
    for (const key in formData) {
      if (key === 'profileImage') {
        submitFormData.append('profileImage', formData.profileImage);
      } else if (key === 'skills') {
        submitFormData.append('skills', JSON.stringify(formData.skills.split(',').map(skill => skill.trim())));
      } else if (Array.isArray(formData[key])) {
        submitFormData.append(key, JSON.stringify(formData[key]));
      } else {
        submitFormData.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('https://<YOUR-API-URL>/api/register', submitFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate(`/portfolio/${response.data._id}`);
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="registration-form">
      <h2>Create Your Portfolio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>GitHub Link:</label>
          <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Profile Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
          {uploadingImage && <p>Uploading image...</p>}
        </div>

        <div className="form-group">
          <label>About Me:</label>
          <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Skills (comma-separated):</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Resume URL:</label>
          <input type="url" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>LeetCode Link:</label>
          <input type="url" name="leetcodeLink" value={formData.leetcodeLink} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>LinkedIn Link:</label>
          <input type="url" name="linkedinLink" value={formData.linkedinLink} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>From:</label>
          <input type="text" name="from" value={formData.from} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Availability:</label>
          <input type="text" name="availability" value={formData.availability} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Experience:</label>
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} required />
        </div>

        <h3>Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="education-item">
            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange(index, 'education', 'degree', e.target.value)} required />
            <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayChange(index, 'education', 'institution', e.target.value)} required />
            <input type="text" placeholder="Year" value={edu.year} onChange={(e) => handleArrayChange(index, 'education', 'year', e.target.value)} required />
            <input type="text" placeholder="Percentage" value={edu.percentage} onChange={(e) => handleArrayChange(index, 'education', 'percentage', e.target.value)} required />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('education')}>Add Education</button>

        <h3>Internships</h3>
        {formData.internships.map((internship, index) => (
          <div key={index} className="internship-item">
            <input type="text" placeholder="Title" value={internship.title} onChange={(e) => handleArrayChange(index, 'internships', 'title', e.target.value)} required />
            <input type="text" placeholder="Company" value={internship.company} onChange={(e) => handleArrayChange(index, 'internships', 'company', e.target.value)} required />
            <input type="text" placeholder="Date" value={internship.date} onChange={(e) => handleArrayChange(index, 'internships', 'date', e.target.value)} required />
            <textarea placeholder="Description" value={internship.description} onChange={(e) => handleArrayChange(index, 'internships', 'description', e.target.value)} required />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('internships')}>Add Internship</button>

        <h3>Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="project-item">
            <input type="text" placeholder="Title" value={project.title} onChange={(e) => handleArrayChange(index, 'projects', 'title', e.target.value)} required />
            <textarea placeholder="Description" value={project.description} onChange={(e) => handleArrayChange(index, 'projects', 'description', e.target.value)} required />
            <input type="text" placeholder="Icon (Font Awesome class)" value={project.icon} onChange={(e) => handleArrayChange(index, 'projects', 'icon', e.target.value)} required />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('projects')}>Add Project</button>

        <button type="submit" className="submit-btn">Create Portfolio</button>
      </form>
    </div>
  );
}

export default RegistrationForm;