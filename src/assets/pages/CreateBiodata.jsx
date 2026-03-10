import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBiodata } from '../context/BiodataContext'
import { FiUpload, FiCheck, FiUser, FiUsers, FiBriefcase, FiStar } from 'react-icons/fi'
import './CreateBiodata.css'

const formSections = [
  { id: 'personal', icon: <FiUser />, label: 'Personal Details' },
  { id: 'family', icon: <FiUsers />, label: 'Family Details' },
  { id: 'education', icon: <FiBriefcase />, label: 'Education & Profession' },
  { id: 'horoscope', icon: <FiStar />, label: 'Horoscope (Optional)' }
]

const heightOptions = [
  '4\'0"', '4\'1"', '4\'2"', '4\'3"', '4\'4"', '4\'5"', '4\'6"', '4\'7"', 
  '4\'8"', '4\'9"', '4\'10"', '4\'11"', '5\'0"', '5\'1"', '5\'2"', '5\'3"', 
  '5\'4"', '5\'5"', '5\'6"', '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"',
  '6\'0"', '6\'1"', '6\'2"', '6\'3"', '6\'4"', '6\'5"', '6\'6"'
]

const educationOptions = [
  'High School', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 
  'PhD/Doctorate', 'Professional Degree', 'Other'
]

const professionOptions = [
  'Software Engineer', 'Doctor', 'Engineer', 'Teacher', 'Business Owner',
  'Manager', 'Accountant', 'Lawyer', 'Architect', 'Designer', 'Nurse',
  'Consultant', 'Government Employee', 'Entrepreneur', 'Chef', 'Pilot',
  'Other'
]

const incomeRanges = [
  'Below 1 Lakh', '1-3 Lakh', '3-5 Lakh', '5-10 Lakh', 
  '10-20 Lakh', '20-50 Lakh', '50 Lakh - 1 Crore', 'Above 1 Crore'
]

function CreateBiodata() {
  const navigate = useNavigate()
  const { currentBiodata, setCurrentBiodata, saveBiodata, calculateAge, resetCurrentBiodata, selectedTemplate, setSelectedTemplate } = useBiodata()
  
  const [activeSection, setActiveSection] = useState('personal')
  const [formData, setFormData] = useState(currentBiodata)
  const [photoPreview, setPhotoPreview] = useState(formData.profilePhoto || '')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    resetCurrentBiodata()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-calculate age when DOB changes
    if (name === 'dateOfBirth') {
      const age = calculateAge(value)
      setFormData(prev => ({ ...prev, age }))
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
        setFormData(prev => ({ ...prev, profilePhoto: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    
    const biodata = {
      ...formData,
      template: selectedTemplate
    }
    
    saveBiodata(biodata)
    setSaving(false)
    navigate('/dashboard')
  }

  const renderPersonalDetails = () => (
    <div className="form-section">
      <h3>Personal Details</h3>
      
      <div className="photo-upload-section">
        <div className="photo-preview">
          {photoPreview ? (
            <img src={photoPreview} alt="Profile" />
          ) : (
            <div className="photo-placeholder">
              <FiUpload />
              <span>Upload Photo</span>
            </div>
          )}
        </div>
        <label className="btn btn-secondary">
          <FiUpload /> Upload Photo
          <input 
            type="file" 
            accept="image/*" 
            onChange={handlePhotoUpload}
            hidden
          />
        </label>
        <p className="help-text">Upload a clear, recent photo (max 5MB)</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="fullName"
            className="form-input"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            className="form-input"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Age</label>
          <input
            type="text"
            className="form-input"
            value={formData.age ? `${formData.age} years` : ''}
            readOnly
            placeholder="Auto-calculated"
          />
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Gender *</label>
          <select
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Height</label>
          <select
            name="height"
            className="form-select"
            value={formData.height}
            onChange={handleChange}
          >
            <option value="">Select Height</option>
            {heightOptions.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Marital Status</label>
          <select
            name="maritalStatus"
            className="form-select"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="never_married">Never Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Contact Number *</label>
          <input
            type="tel"
            name="contactNumber"
            className="form-input"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Current Address</label>
        <textarea
          name="currentAddress"
          className="form-textarea"
          value={formData.currentAddress}
          onChange={handleChange}
          placeholder="Enter your current address"
          rows={2}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Native Place</label>
        <input
          type="text"
          name="nativePlace"
          className="form-input"
          value={formData.nativePlace}
          onChange={handleChange}
          placeholder="Enter native place"
        />
      </div>

      <div className="form-group">
        <label className="form-label">About Me</label>
        <textarea
          name="aboutMe"
          className="form-textarea"
          value={formData.aboutMe}
          onChange={handleChange}
          placeholder="Tell something about yourself..."
          rows={4}
        />
      </div>
    </div>
  )

  const renderFamilyDetails = () => (
    <div className="form-section">
      <h3>Family Details</h3>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            className="form-input"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="Enter father's name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Father's Profession</label>
          <input
            type="text"
            name="fatherProfession"
            className="form-input"
            value={formData.fatherProfession}
            onChange={handleChange}
            placeholder="e.g., Business, Doctor, Engineer"
          />
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            className="form-input"
            value={formData.motherName}
            onChange={handleChange}
            placeholder="Enter mother's name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mother's Profession</label>
          <input
            type="text"
            name="motherProfession"
            className="form-input"
            value={formData.motherProfession}
            onChange={handleChange}
            placeholder="e.g., Homemaker, Teacher, Doctor"
          />
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Siblings</label>
          <input
            type="text"
            name="siblings"
            className="form-input"
            value={formData.siblings}
            onChange={handleChange}
            placeholder="e.g., 1 Brother, 1 Sister"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Family Type</label>
          <select
            name="familyType"
            className="form-select"
            value={formData.familyType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="nuclear">Nuclear Family</option>
            <option value="joint">Joint Family</option>
          </select>
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Family Status</label>
          <select
            name="familyStatus"
            className="form-select"
            value={formData.familyStatus}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="middle_class">Middle Class</option>
            <option value="upper_middle">Upper Middle Class</option>
            <option value="affluent">Affluent</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Family Values</label>
          <select
            name="familyValues"
            className="form-select"
            value={formData.familyValues}
            onChange={handleChange}
          >
            <option value="">Select Values</option>
            <option value="traditional">Traditional</option>
            <option value="moderate">Moderate</option>
            <option value="liberal">Liberal</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderEducationDetails = () => (
    <div className="form-section">
      <h3>Education & Profession</h3>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Highest Education</label>
          <select
            name="highestEducation"
            className="form-select"
            value={formData.highestEducation}
            onChange={handleChange}
          >
            <option value="">Select Education</option>
            {educationOptions.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">College/University</label>
          <input
            type="text"
            name="collegeName"
            className="form-input"
            value={formData.collegeName}
            onChange={handleChange}
            placeholder="Enter college/university name"
          />
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Profession</label>
          <select
            name="profession"
            className="form-select"
            value={formData.profession}
            onChange={handleChange}
          >
            <option value="">Select Profession</option>
            {professionOptions.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            className="form-input"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g., Senior Software Engineer"
          />
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Employer Name</label>
          <input
            type="text"
            name="employerName"
            className="form-input"
            value={formData.employerName}
            onChange={handleChange}
            placeholder="Enter company/organization name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Annual Income</label>
          <select
            name="annualIncome"
            className="form-select"
            value={formData.annualIncome}
            onChange={handleChange}
          >
            <option value="">Select Income Range</option>
            {incomeRanges.map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Work Location</label>
        <input
          type="text"
          name="workLocation"
          className="form-input"
          value={formData.workLocation}
          onChange={handleChange}
          placeholder="City, Country"
        />
      </div>
    </div>
  )

  const renderHoroscopeDetails = () => (
    <div className="form-section">
      <h3>Horoscope Details (Optional)</h3>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Time of Birth</label>
          <input
            type="time"
            name="timeOfBirth"
            className="form-input"
            value={formData.timeOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Place of Birth</label>
          <input
            type="text"
            name="placeOfBirth"
            className="form-input"
            value={formData.placeOfBirth}
            onChange={handleChange}
            placeholder="City, State, Country"
          />
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Rashi (Zodiac Sign)</label>
          <input
            type="text"
            name="rashi"
            className="form-input"
            value={formData.rashi}
            onChange={handleChange}
            placeholder="e.g., Mesh, Vrishabh, Mithun"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Nakshatra</label>
          <input
            type="text"
            name="nakshatra"
            className="form-input"
            value={formData.nakshatra}
            onChange={handleChange}
            placeholder="e.g., Ashwini, Bharani, Krittika"
          />
        </div>
      </div>

      <div className="form-row grid-2">
        <div className="form-group">
          <label className="form-label">Mangal Status</label>
          <select
            name="mangalStatus"
            className="form-select"
            value={formData.mangalStatus}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes (Mangalik)</option>
            <option value="no">No (Non-Mangalik)</option>
            <option value="partial">Partial</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Gotra</label>
          <input
            type="text"
            name="gotra"
            className="form-input"
            value={formData.gotra}
            onChange={handleChange}
            placeholder="Enter gotra"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="create-biodata">
      <div className="container">
        <div className="create-header">
          <h1>Create Your BioData</h1>
          <p>Fill in your details to create a beautiful biodata profile</p>
        </div>

        <div className="create-layout">
          {/* Sidebar Navigation */}
          <div className="form-sidebar">
            <div className="template-selector">
              <label className="form-label">Select Template</label>
              <div className="template-options">
                <button 
                  className={`template-option ${selectedTemplate === 'classic' ? 'active' : ''}`}
                  onClick={() => setSelectedTemplate('classic')}
                >
                  Classic
                </button>
                <button 
                  className={`template-option ${selectedTemplate === 'modern' ? 'active' : ''}`}
                  onClick={() => setSelectedTemplate('modern')}
                >
                  Modern
                </button>
                <button 
                  className={`template-option ${selectedTemplate === 'elegant' ? 'active' : ''}`}
                  onClick={() => setSelectedTemplate('elegant')}
                >
                  Elegant
                </button>
              </div>
            </div>

            <nav className="section-nav">
              {formSections.map(section => (
                <button
                  key={section.id}
                  className={`section-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Form Content */}
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              {activeSection === 'personal' && renderPersonalDetails()}
              {activeSection === 'family' && renderFamilyDetails()}
              {activeSection === 'education' && renderEducationDetails()}
              {activeSection === 'horoscope' && renderHoroscopeDetails()}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    const currentIndex = formSections.findIndex(s => s.id === activeSection)
                    if (currentIndex > 0) {
                      setActiveSection(formSections[currentIndex - 1].id)
                    }
                  }}
                  disabled={activeSection === 'personal'}
                >
                  Previous
                </button>
                
                {activeSection !== 'horoscope' ? (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      const currentIndex = formSections.findIndex(s => s.id === activeSection)
                      if (currentIndex < formSections.length - 1) {
                        setActiveSection(formSections[currentIndex + 1].id)
                      }
                    }}
                  >
                    Next
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Save BioData'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBiodata
