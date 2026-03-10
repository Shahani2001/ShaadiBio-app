import { Link } from 'react-router-dom'
import { FiHeart, FiEdit3, FiImage, FiDownload, FiUsers, FiCheckCircle, FiArrowRight } from 'react-icons/fi'
import './Landing.css'

function Landing() {
  const features = [
    {
      icon: <FiEdit3 />,
      title: 'Easy Form Builder',
      description: 'Fill in your details with our intuitive form builder. Auto-calculate age from date of birth.'
    },
    {
      icon: <FiImage />,
      title: 'Photo Upload',
      description: 'Upload your profile photo with instant preview. Make your biodata stand out.'
    },
    {
      icon: <FiUsers />,
      title: 'Multiple Templates',
      description: 'Choose from beautifully designed templates - Classic, Modern, and Elegant.'
    },
    {
      icon: <FiDownload />,
      description: 'Download your biodata as a PDF document. Ready to share with family and friends.',
      title: 'PDF Export'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'Created my biodata in just 10 minutes! The templates are beautiful.',
      role: 'Software Engineer'
    },
    {
      name: 'Rahul Verma',
      text: 'Very easy to use. The Classic template looks so elegant.',
      role: 'Business Owner'
    },
    {
      name: 'Anjali Patel',
      text: 'Loved the multiple templates option. Highly recommended!',
      role: 'Doctor'
    }
  ]

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content container">
          <div className="hero-text fade-in">
            <h1>Create Beautiful Marriage <span className="highlight">BioData</span> in Minutes</h1>
            <p>
              Craft elegant, professional biodata profiles that showcase your unique story. 
              Choose from stunning templates and share with confidence.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started <FiArrowRight />
              </Link>
              <Link to="/create" className="btn btn-secondary btn-lg">
                Create BioData
              </Link>
            </div>
            
          </div>
          <div className="hero-visual fade-in">
            <div className="hero-card">
              <div className="biodata-preview">
                <div className="preview-header">
                  <div className="preview-avatar"></div>
                  <div className="preview-info">
                    <h3>Your Name</h3>
                    <p>Age: 25</p>
                  </div>
                </div>
                <div className="preview-content">
                  <div className="preview-section">
                    <span>📍</span> Location
                  </div>
                  <div className="preview-section">
                    <span>🎓</span> Education
                  </div>
                  <div className="preview-section">
                    <span>💼</span> Profession
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Choose ShaadiBio?</h2>
            <p>Everything you need to create the perfect marriage biodata</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="templates-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Beautiful Templates</h2>
            <p>Choose from our professionally designed templates</p>
          </div>
          <div className="templates-grid">
            <div className="template-preview template-classic">
              <div className="template-card">
                <h4>Classic</h4>
                <p>Traditional & Elegant</p>
              </div>
            </div>
            <div className="template-preview template-modern">
              <div className="template-card">
                <h4>Modern</h4>
                <p>Clean & Contemporary</p>
              </div>
            </div>
            <div className="template-preview template-elegant">
              <div className="template-card">
                <h4>Elegant</h4>
                <p>Royal & Sophisticated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header text-center">
            <h2>What Our Users Say</h2>
            <p>Join thousands of happy users</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card card">
                <FiHeart className="quote-icon" />
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Create Your BioData?</h2>
          <p>Start creating your beautiful biodata today. It's free!</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started Now <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Landing
