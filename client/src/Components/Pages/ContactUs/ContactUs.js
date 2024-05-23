import React from "react";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-main-div">
      <h1 className="contact-h1-title">Meet Our Team</h1>
      <div className="contact-grid">
        <div className="contact-card">
          <img
            className="contact-img"
            src={require("../../../assets/images/ahmetÖzkanSahin.jpeg")}
            alt="Ahmet Özkan Şahin"
          />
          <h2 className="contact-name">Ahmet Özkan Şahin</h2>
          <h4 className="contact-title">Full-Stack Developer</h4>
          <p className="contact-bio">
            Ahmet Özkan is a software engineering student at Istinye University.
            He is a dedicated and innovative developer with a knack for creating
            efficient and scalable solutions. With a solid background in web
            development, Ahmet continuously seeks to refine and enhance his
            projects. He is currently enhancing his skills and knowledge,
            preparing to make significant contributions to the tech industry.
          </p>
          <div className="contact-social">
            <a
              href="https://www.linkedin.com/in/ahmet-ozkan-sahin/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn<i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/Aozsah"
              target="_blank"
              rel="noreferrer"
            >
              GitHub<i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      {/* <div className="contact-form">
        <h2 className="contact-form-title">Get in Touch</h2>
        <form>
          <div className="contact-form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="contact-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="contact-form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button className="contact-form-button" type="submit">
            Send
          </button>
        </form>
      </div> */}

      <div className="contact-map">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.265336183781!2d28.985855054862665!3d41.10536768177898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDEuMTA1MzY3NiwgMjguOTg1ODU1MA!5e0!3m2!1sen!2str!4v1621422649060!5m2!1sen!2str&z=15&output=embed`}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
