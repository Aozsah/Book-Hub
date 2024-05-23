import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <hr className="footer-seperator" />
      <section className="footer-social-media">
        <a href="https://www.linkedin.com/in/ahmet-ozkan-sahin/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </section>
      <section className="footer-info">
        <section className="footer-info-left">
          <section className="footer-info__name">
            Ahmet Özkan Şahin
          </section>
          <section className="footer-info__returns">
            BookHub
            <br />
          </section>
        </section>
        <section className="footer-info-center">
          <section className="footer-info__email">
            ahmet.ozkan.sahin@outlook.com
          </section>
          <section className="footer-info__terms">
            Terms and Conditions
            <br />
          </section>
        </section>
        <section className="footer-info-right">
          <section className="footer-info__number">
            +90 532 153 3014
          </section>
          <section className="footer-info__contact">
            Contact Us
            <br />
          </section>
        </section>
      </section>
    </footer>
  )
}

export default Footer;
