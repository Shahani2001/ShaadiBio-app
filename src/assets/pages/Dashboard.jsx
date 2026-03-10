import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBiodata } from '../context/BiodataContext'
import { FiPlus, FiEdit2, FiEye, FiDownload, FiTrash2, FiFileText, FiHeart } from 'react-icons/fi'
import './Dashboard.css'

function Dashboard() {
  const { user } = useAuth()
  const { biodatas, deleteBiodata } = useBiodata()
  const navigate = useNavigate()

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this biodata?')) {
      deleteBiodata(id)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Manage your biodata profiles</p>
          </div>
          <button onClick={() => navigate('/create')} className="btn btn-primary">
            <FiPlus /> Create New BioData
          </button>
        </div>

        {biodatas.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">
              <FiFileText />
            </div>
            <h3>No BioData Yet</h3>
            <p>Create your first biodata profile to get started</p>
            <button onClick={() => navigate('/create')} className="btn btn-primary">
              <FiPlus /> Create BioData
            </button>
          </div>
        ) : (
          <div className="biodata-grid">
            {biodatas.map((biodata) => (
              <div 
                key={biodata.id} 
                className="biodata-card card"
                onClick={() => navigate(`/preview/${biodata.id}`)}
              >
                <div className="biodata-card-header">
                  <div className="biodata-avatar">
                    {biodata.profilePhoto ? (
                      <img src={biodata.profilePhoto} alt={biodata.fullName} />
                    ) : (
                      <FiHeart />
                    )}
                  </div>
                  <div className="biodata-info">
                    <h3>{biodata.fullName || 'Unnamed'}</h3>
                    <p>{biodata.age ? `${biodata.age} years` : 'Age not set'}</p>
                  </div>
                </div>
                
                <div className="biodata-details">
                  <div className="detail-item">
                    <span>Profession:</span>
                    <span>{biodata.profession || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span>Education:</span>
                    <span>{biodata.highestEducation || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span>Location:</span>
                    <span>{biodata.currentAddress || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span>Template:</span>
                    <span className="template-badge">{biodata.template || 'classic'}</span>
                  </div>
                </div>

                <div className="biodata-card-footer">
                  <span className="date-text">Created {formatDate(biodata.createdAt)}</span>
                  <div className="biodata-actions">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/preview/${biodata.id}`)
                      }}
                      className="action-btn"
                      title="Preview"
                    >
                      <FiEye />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/edit/${biodata.id}`)
                      }}
                      className="action-btn"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(biodata.id, e)}
                      className="action-btn delete"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
