import React from 'react'
import './landing.css'

function Landing() {
    return (
      <div className="App">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <img
              src="https://i.ibb.co/gZhRFvN/cloud-media-logo.png"
              alt="Cloud-Media Logo"
              className="hero-logo"
            />
            <h1>Welcome to Cloud-Media</h1>
            <p>Where your media gets smarter, safer, and simpler to manage.</p>
            <button className="cta-btn" onClick={()=> window.location.href = '/auth/login/'}>Get Started</button>
          </div>
        </section>
  
         {/* Features Section */}
         <section className="features">
          <h2>Our Features</h2>
          <div className="feature-card-container">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i> {/* Icon for Secure Storage */}
              </div>
              <h3>🛡️ Secure Storage</h3>
              <p>Store files with industry-leading encryption and safety protocols.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-lock"></i> {/* Icon for Authentication */}
              </div>
              <h3>🔒 Authentication</h3>
              <p>Log in securely with cutting-edge user authentication features.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-folder"></i> {/* Icon for Media Management */}
              </div>
              <h3>📂 Media Management</h3>
              <p>Organize, edit, and manage your files effortlessly in one place.</p>
            </div>
          </div>
        </section>

  
       {/* Get Premium Section */}
       <section className="get-premium">
          <h2>Upgrade to Premium</h2>
          <p>Unlock additional features, priority support, and much more by upgrading to our premium plan.</p>

          <div className="pricing-cards">
            {/* Basic Plan Card */}
            <div className="pricing-card">
              <h3>Basic Plan</h3>
              <p className="price">$5/month</p>
              <ul>
                <li>50 GB Storage</li>
                <li>Standard Support</li>
                <li>Basic Features</li>
              </ul>
              <button className="premium-btn">Get Basic</button>
            </div>

            {/* Standard Plan Card */}
            <div className="pricing-card">
              <h3>Standard Plan</h3>
              <p className="price">$15/month</p>
              <ul>
                <li>200 GB Storage</li>
                <li>Priority Support</li>
                <li>Advanced Features</li>
              </ul>
              <button className="premium-btn">Get Standard</button>
            </div>

            {/* Premium Plan Card */}
            <div className="pricing-card">
              <h3>Premium Plan</h3>
              <p className="price">$30/month</p>
              <ul>
                <li>500 GB Storage</li>
                <li>24/7 Support</li>
                <li>All Premium Features</li>
              </ul>
              <button className="premium-btn">Get Premium</button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact">
          <h2>Contact Us</h2>
          <p>Have questions or need support? Get in touch with our team!</p>
          <form className="contact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />
            
            <label for="message">Message:</label>
            <textarea id="message" name="message" placeholder="Your Message" required></textarea>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2024 Cloud-Media. All rights reserved.</p>
        </footer>
      </div>
    );
  };

export default Landing