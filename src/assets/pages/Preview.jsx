import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBiodata } from '../context/BiodataContext'
import { FiEdit2, FiDownload, FiShare2, FiCheck, FiPrinter } from 'react-icons/fi'
import html2pdf from 'html2pdf.js'
import './Preview.css'

function Preview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getBiodataById, selectedTemplate, setSelectedTemplate } = useBiodata()
  const previewRef = useRef(null)
  
  const [biodata, setBiodata] = useState(null)
  const [activeTemplate, setActiveTemplate] = useState('classic')
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const data = getBiodataById(id)
    if (data) {
      setBiodata(data)
      setActiveTemplate(data.template || 'classic')
    } else {
      navigate('/dashboard')
    }
  }, [id])

  const handlePrint = () => {
    const printContent = document.querySelector('.biodata-preview')
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>${biodata.fullName || 'Biodata'}</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">
          <style>
            body { margin: 0; padding: 20px; font-family: 'Source Sans Pro', sans-serif; }
            .template.classic { font-family: 'Playfair Display', serif; }
            .template.modern { font-family: 'Source Sans Pro', sans-serif; }
            .template.elegant { font-family: 'Playfair Display', serif; }
            .biodata-preview { max-width: 800px; margin: 0 auto; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return
    
    setIsDownloading(true)
    const element = previewRef.current
    const opt = {
      margin: 10,
      filename: `${biodata.fullName || 'biodata'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    try {
      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!biodata) {
    return <div className="loading-screen">Loading...</div>
  }

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
    <div className="preview-page">
      <div className="preview-toolbar">
        <div className="container flex justify-between items-center">
          <div className="template-switcher">
            <button 
              className={`template-btn ${activeTemplate === 'classic' ? 'active' : ''}`}
              onClick={() => setActiveTemplate('classic')}
            >
              Classic
            </button>
            <button 
              className={`template-btn ${activeTemplate === 'modern' ? 'active' : ''}`}
              onClick={() => setActiveTemplate('modern')}
            >
              Modern
            </button>
            <button 
              className={`template-btn ${activeTemplate === 'elegant' ? 'active' : ''}`}
              onClick={() => setActiveTemplate('elegant')}
            >
              Elegant
            </button>
          </div>
          <div className="preview-actions">
            <button className="btn btn-secondary" onClick={handlePrint}>
              <FiPrinter /> Print
            </button>
            <button className="btn btn-primary" onClick={handleDownloadPDF} disabled={isDownloading}>
              <FiDownload /> {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/edit/${id}`)}>
              <FiEdit2 /> Edit
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
              <FiCheck /> Done
            </button>
          </div>
        </div>
      </div>

      <div className="preview-container">
        <div className="biodata-preview" ref={previewRef}>
          {activeTemplate === 'classic' && renderClassicTemplate()}
          {activeTemplate === 'modern' && renderModernTemplate()}
          {activeTemplate === 'elegant' && renderElegantTemplate()}
        </div>
      </div>
    </div>
  )
}

export default Preview
