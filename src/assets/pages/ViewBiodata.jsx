import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useBiodata } from '../context/BiodataContext'
import { FiHeart, FiHome } from 'react-icons/fi'
import './Preview.css'

function ViewBiodata() {
  const { id } = useParams()
  const { getBiodataById } = useBiodata()
  
  const [biodata, setBiodata] = useState(null)

  useEffect(() => {
    const data = getBiodataById(id)
    if (data) {
      setBiodata(data)
    }
  }, [id])

  if (!biodata) {
    return (
      <div className="view-biodata">
        <div className="container text-center">
          <h2>BioData not found</h2>
          <p>This biodata may have been removed or the link is invalid.</p>
          <Link to="/" className="btn btn-primary mt-lg">
            <FiHome /> Go to Home
          </Link>
        </div>
      </div>
    )
  }

  const template = biodata.template || 'classic'

  const renderClassicTemplate = () => (
    <div className="template classic">
      <div className="template-header">
        <div className="profile-section">
          {biodata.profilePhoto && (
            <div className="profile-image">
              <img src={biodata.profilePhoto} alt={biodata.fullName} />
            </div>
          )}
          <h1>{biodata.fullName || 'Your Name'}</h1>
          {biodata.age && <p className="age">{biodata.age} Years Old</p>}
        </div>
      </div>
      
      <div className="template-body">
        <div className="info-section">
          <h3>Personal Details</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Gender:</span>
              <span className="value">{biodata.gender || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Height:</span>
              <span className="value">{biodata.height || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Marital Status:</span>
              <span className="value">{biodata.maritalStatus?.replace('_', ' ') || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Date of Birth:</span>
              <span className="value">{biodata.dateOfBirth || '-'}</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>Contact Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Phone:</span>
              <span className="value">{biodata.contactNumber || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{biodata.email || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Address:</span>
              <span className="value">{biodata.currentAddress || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Native Place:</span>
              <span className="value">{biodata.nativePlace || '-'}</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>Education & Profession</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Education:</span>
              <span className="value">{biodata.highestEducation || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">College:</span>
              <span className="value">{biodata.collegeName || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Profession:</span>
              <span className="value">{biodata.profession || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Job Title:</span>
              <span className="value">{biodata.jobTitle || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Employer:</span>
              <span className="value">{biodata.employerName || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Income:</span>
              <span className="value">{biodata.annualIncome || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Work Location:</span>
              <span className="value">{biodata.workLocation || '-'}</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>Family Details</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Father:</span>
              <span className="value">{biodata.fatherName || '-'} ({biodata.fatherProfession || '-'})</span>
            </div>
            <div className="info-item">
              <span className="label">Mother:</span>
              <span className="value">{biodata.motherName || '-'} ({biodata.motherProfession || '-'})</span>
            </div>
            <div className="info-item">
              <span className="label">Siblings:</span>
              <span className="value">{biodata.siblings || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Family Type:</span>
              <span className="value">{biodata.familyType || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Family Status:</span>
              <span className="value">{biodata.familyStatus?.replace('_', ' ') || '-'}</span>
            </div>
            <div className="info-item">
              <span className="label">Family Values:</span>
              <span className="value">{biodata.familyValues || '-'}</span>
            </div>
          </div>
        </div>

        {(biodata.rashi || biodata.nakshatra || biodata.gotra) && (
          <div className="info-section">
            <h3>Horoscope Details</h3>
            <div className="info-grid">
              {biodata.timeOfBirth && (
                <div className="info-item">
                  <span className="label">Time of Birth:</span>
                  <span className="value">{biodata.timeOfBirth}</span>
                </div>
              )}
              {biodata.placeOfBirth && (
                <div className="info-item">
                  <span className="label">Place of Birth:</span>
                  <span className="value">{biodata.placeOfBirth}</span>
                </div>
              )}
              {biodata.rashi && (
                <div className="info-item">
                  <span className="label">Rashi:</span>
                  <span className="value">{biodata.rashi}</span>
                </div>
              )}
              {biodata.nakshatra && (
                <div className="info-item">
                  <span className="label">Nakshatra:</span>
                  <span className="value">{biodata.nakshatra}</span>
                </div>
              )}
              {biodata.mangalStatus && (
                <div className="info-item">
                  <span className="label">Mangal Status:</span>
                  <span className="value">{biodata.mangalStatus}</span>
                </div>
              )}
              {biodata.gotra && (
                <div className="info-item">
                  <span className="label">Gotra:</span>
                  <span className="value">{biodata.gotra}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {biodata.aboutMe && (
          <div className="about-section">
            <h3>About Me</h3>
            <p>{biodata.aboutMe}</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderModernTemplate = () => (
    <div className="template modern">
      <div className="modern-header">
        {biodata.profilePhoto && (
          <div className="modern-profile-image">
            <img src={biodata.profilePhoto} alt={biodata.fullName} />
          </div>
        )}
        <div className="modern-info">
          <h1>{biodata.fullName || 'Your Name'}</h1>
          <p className="modern-profession">{biodata.profession || 'Profession'}</p>
          <div className="modern-stats">
            {biodata.age && <span>{biodata.age} Years</span>}
            {biodata.height && <span>{biodata.height}</span>}
            {biodata.maritalStatus && <span>{biodata.maritalStatus.replace('_', ' ')}</span>}
          </div>
        </div>
      </div>

      <div className="modern-body">
        <div className="modern-section">
          <h3>📞 Contact</h3>
          <p>{biodata.contactNumber}</p>
          <p>{biodata.email}</p>
          <p>{biodata.currentAddress}</p>
        </div>

        <div className="modern-section">
          <h3>🎓 Education</h3>
          <p><strong>{biodata.highestEducation}</strong></p>
          <p>{biodata.collegeName}</p>
        </div>

        <div className="modern-section">
          <h3>💼 Work</h3>
          <p><strong>{biodata.jobTitle}</strong></p>
          <p>{biodata.employerName}</p>
          <p>{biodata.annualIncome}</p>
          <p>{biodata.workLocation}</p>
        </div>

        <div className="modern-section">
          <h3>👨‍👩‍👧 Family</h3>
          <p>Father: {biodata.fatherName} ({biodata.fatherProfession})</p>
          <p>Mother: {biodata.motherName} ({biodata.motherProfession})</p>
          <p>Siblings: {biodata.siblings}</p>
          <p>Family: {biodata.familyType} | {biodata.familyStatus?.replace('_', ' ')}</p>
        </div>

        {(biodata.rashi || biodata.nakshatra) && (
          <div className="modern-section">
            <h3>⭐ Horoscope</h3>
            {biodata.rashi && <p>Rashi: {biodata.rashi}</p>}
            {biodata.nakshatra && <p>Nakshatra: {biodata.nakshatra}</p>}
            {biodata.mangalStatus && <p>Mangal: {biodata.mangalStatus}</p>}
            {biodata.gotra && <p>Gotra: {biodata.gotra}</p>}
          </div>
        )}

        {biodata.aboutMe && (
          <div className="modern-section about">
            <h3>✍ About Me</h3>
            <p>{biodata.aboutMe}</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderElegantTemplate = () => (
    <div className="template elegant">
      <div className="elegant-header">
        <div className="elegant-border-top"></div>
        {biodata.profilePhoto && (
          <div className="elegant-profile">
            <img src={biodata.profilePhoto} alt={biodata.fullName} />
          </div>
        )}
        <h1>{biodata.fullName || 'Your Name'}</h1>
        <p className="elegant-profession">{biodata.profession}</p>
        <div className="elegant-details">
          {biodata.age && <span>{biodata.age} Yrs</span>}
          <span className="divider">|</span>
          {biodata.height && <span>{biodata.height}</span>}
          <span className="divider">|</span>
          {biodata.maritalStatus && <span>{biodata.maritalStatus.replace('_', ' ')}</span>}
        </div>
        <div className="elegant-border-bottom"></div>
      </div>

      <div className="elegant-body">
        <div className="elegant-section">
          <h3>Contact Details</h3>
          <ul>
            <li><strong>Phone:</strong> {biodata.contactNumber || '-'}</li>
            <li><strong>Email:</strong> {biodata.email || '-'}</li>
            <li><strong>Address:</strong> {biodata.currentAddress || '-'}</li>
            <li><strong>Native:</strong> {biodata.nativePlace || '-'}</li>
          </ul>
        </div>

        <div className="elegant-section">
          <h3>Education & Career</h3>
          <ul>
            <li><strong>Education:</strong> {biodata.highestEducation || '-'}</li>
            <li><strong>College:</strong> {biodata.collegeName || '-'}</li>
            <li><strong>Job:</strong> {biodata.jobTitle || '-'}</li>
            <li><strong>Company:</strong> {biodata.employerName || '-'}</li>
            <li><strong>Income:</strong> {biodata.annualIncome || '-'}</li>
            <li><strong>Location:</strong> {biodata.workLocation || '-'}</li>
          </ul>
        </div>

        <div className="elegant-section">
          <h3>Family Background</h3>
          <ul>
            <li><strong>Father:</strong> {biodata.fatherName} ({biodata.fatherProfession})</li>
            <li><strong>Mother:</strong> {biodata.motherName} ({biodata.motherProfession})</li>
            <li><strong>Siblings:</strong> {biodata.siblings || '-'}</li>
            <li><strong>Family Type:</strong> {biodata.familyType || '-'}</li>
            <li><strong>Status:</strong> {biodata.familyStatus?.replace('_', ' ') || '-'}</li>
          </ul>
        </div>

        {(biodata.rashi || biodata.nakshatra || biodata.gotra) && (
          <div className="elegant-section">
            <h3>Horoscope</h3>
            <ul>
              {biodata.rashi && <li><strong>Rashi:</strong> {biodata.rashi}</li>}
              {biodata.nakshatra && <li><strong>Nakshatra:</strong> {biodata.nakshatra}</li>}
              {biodata.mangalStatus && <li><strong>Mangal:</strong> {biodata.mangalStatus}</li>}
              {biodata.gotra && <li><strong>Gotra:</strong> {biodata.gotra}</li>}
            </ul>
          </div>
        )}

        {biodata.aboutMe && (
          <div className="elegant-section about">
            <h3>About Me</h3>
            <p>"{biodata.aboutMe}"</p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="view-biodata">
      <div className="view-header">
        <div className="container text-center">
          <Link to="/" className="view-logo">
            <FiHeart /> ShaadiBio
          </Link>
        </div>
      </div>

      <div className="view-container">
        <div className="biodata-preview">
          {template === 'classic' && renderClassicTemplate()}
          {template === 'modern' && renderModernTemplate()}
          {template === 'elegant' && renderElegantTemplate()}
        </div>
      </div>

      <div className="view-footer">
        <div className="container text-center">
          <p>Powered by <Link to="/">ShaadiBio</Link> - Marriage BioData Generator</p>
        </div>
      </div>
    </div>
  )
}

export default ViewBiodata
