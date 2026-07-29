import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SEOMeta from '../../components/SEOMeta';

export default function PrivacyPolicy() {
  const { isDarkMode } = useOutletContext() || {};
  const dark = !!isDarkMode;

  return (
    <div style={{ background: dark ? '#0a0f1d' : '#f8fafc', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
      <SEOMeta
        title="Privacy Policy"
        description="Read Cleanz24's Privacy Policy to understand how we collect, use, and protect your personal information for our laundry and car spa services."
        canonical="https://cleanz24.com/laundry/privacy-policy"
      />

      {/* Content */}
      <div className="container" style={{ maxWidth: '860px', padding: '60px 20px 80px' }}>
        <div style={{
          background: dark ? '#111a2e' : '#fff',
          borderRadius: '20px',
          boxShadow: dark ? '0 10px 40px rgba(0,0,0,0.4)' : '0 4px 32px rgba(0,0,0,0.08)',
          padding: 'clamp(28px, 5vw, 56px)',
          border: dark ? '1px solid #1b3252' : '1px solid rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
        }}>

          <Section icon="ℹ️" title="1. Introduction" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              Welcome to <strong>Cleanz24</strong> ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our laundry, dry cleaning, and related services.
            </p>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of our services.
            </p>
          </Section>

          <Section icon="📋" title="2. Information We Collect" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>We may collect the following types of information:</p>
            <SubList items={[
              '<strong>Personal Identification Information:</strong> Name, email address, phone number, delivery address, and other contact details you provide when registering or placing an order.',
              '<strong>Order & Transaction Data:</strong> Details about the services you request, payment information (processed securely via third-party gateways — we do not store card details), and order history.',
              '<strong>Location Data:</strong> Your area or pin code to identify nearby stores and facilitate pickup/delivery. We do not track your precise GPS location without explicit consent.',
              '<strong>Usage Data:</strong> Browser type, pages visited, time spent, referring URL, and device information collected automatically via cookies and analytics tools.',
              '<strong>Communications:</strong> Messages, feedback, or support queries you send us.',
            ]} dark={dark} />
          </Section>

          <Section icon="🎯" title="3. How We Use Your Information" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>We use the collected information to:</p>
            <SubList items={[
              'Process and fulfil your laundry, dry cleaning, and home cleaning orders.',
              'Communicate order status, pickup/delivery schedules, and service updates.',
              'Personalise your experience and suggest relevant services or offers.',
              'Improve our website, app, and service quality through analytics.',
              'Respond to your customer service requests and resolve disputes.',
              'Send promotional communications (you may opt out at any time).',
              'Comply with legal obligations and prevent fraudulent activity.',
            ]} dark={dark} />
          </Section>

          <Section icon="🔗" title="4. Sharing Your Information" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>We do <strong>not sell</strong> your personal data to third parties. We may share information with:</p>
            <SubList items={[
              '<strong>Service Partners:</strong> Franchise store partners who process your orders under our brand standards and confidentiality agreements.',
              '<strong>Logistics Partners:</strong> Delivery/pickup agents engaged to complete your order.',
              '<strong>Payment Processors:</strong> Secure, PCI-DSS compliant payment gateways (e.g., Razorpay, PayU) that process transactions on our behalf.',
              '<strong>Analytics Providers:</strong> Tools like Google Analytics to help us understand usage patterns (data is aggregated/anonymised).',
              '<strong>Legal Authorities:</strong> When required by law, court order, or to protect the rights and safety of Cleanz24, our users, or the public.',
            ]} dark={dark} />
          </Section>

          <Section icon="🍪" title="5. Cookies & Tracking Technologies" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyse website traffic. You can control cookie settings through your browser; however, disabling cookies may affect certain features of our website.
            </p>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              Types of cookies we use: <strong>Essential</strong> (site functionality), <strong>Analytics</strong> (usage insights), and <strong>Marketing</strong> (personalised offers, opt-out available).
            </p>
          </Section>

          <Section icon="🔒" title="6. Data Security" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              We implement industry-standard security measures including SSL/TLS encryption, access controls, and regular security audits to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              We retain your data only as long as necessary to fulfil the purposes outlined in this policy or as required by law.
            </p>
          </Section>

          <Section icon="✅" title="7. Your Rights" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>You have the right to:</p>
            <SubList items={[
              '<strong>Access:</strong> Request a copy of the personal data we hold about you.',
              '<strong>Correction:</strong> Ask us to correct inaccurate or incomplete data.',
              '<strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations).',
              '<strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time via the link in our emails or by contacting us.',
              '<strong>Data Portability:</strong> Request your data in a structured, commonly used format.',
            ]} dark={dark} />
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>To exercise these rights, contact us at <a href="mailto:happy2helpu@cleanz24.com" style={{ color: dark ? '#90CDF4' : 'var(--global-primary, #0f4c82)', fontWeight: 600 }}>happy2helpu@cleanz24.com</a>.</p>
          </Section>

          <Section icon="🌐" title="8. Third-Party Links" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              Our website may contain links to third-party websites (e.g., social media, payment gateways). We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies independently.
            </p>
          </Section>

          <Section icon="👶" title="9. Children's Privacy" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.
            </p>
          </Section>

          <Section icon="🔄" title="10. Changes to This Policy" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes by updating the "Last Updated" date at the top of this page. Continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section icon="📞" title="11. Contact Us" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>If you have questions, concerns, or requests regarding this Privacy Policy, please reach out to us:</p>
            <div style={{
              background: dark ? 'linear-gradient(135deg, #12253f, #0f1c30)' : 'linear-gradient(135deg, #f0f7ff, #e8f4fd)',
              borderRadius: '12px',
              padding: '24px',
              marginTop: '16px',
              border: dark ? '1px solid #1b3252' : '1px solid #c3dff7',
              transition: 'all 0.3s ease',
            }}>
              <p style={{ margin: '0 0 8px', fontWeight: 700, color: dark ? '#90CDF4' : '#0f4c82' }}>Cleanz24 — Customer Support</p>
              <p style={{ margin: '0 0 6px', color: dark ? '#cbd5e0' : '#444' }}>📧 <a href="mailto:happy2helpu@cleanz24.com" style={{ color: dark ? '#90CDF4' : '#0f4c82' }}>happy2helpu@cleanz24.com</a></p>
              <p style={{ margin: '0 0 6px', color: dark ? '#cbd5e0' : '#444' }}>📞 <a href="tel:+919138004800" style={{ color: dark ? '#90CDF4' : '#0f4c82' }}>+91 91380 04800</a></p>
              <p style={{ margin: 0, color: dark ? '#cbd5e0' : '#555' }}>India's Fast Growing Laundry &amp; Dry Cleaning Franchise Chain</p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children, dark }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{
        fontSize: '1.2rem', fontWeight: 700, color: dark ? '#90CDF4' : '#0f4c82',
        marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px',
        paddingBottom: '10px', borderBottom: dark ? '2px solid #1b3252' : '2px solid #e8f0fb',
        fontFamily: "'Poppins', sans-serif",
        transition: 'all 0.3s ease'
      }}>
        <span style={{ fontSize: '1.2rem' }}>{icon}</span> {title}
      </h2>
      <div style={{ color: dark ? '#cbd5e0' : '#444', lineHeight: 1.8, fontSize: '0.95rem', transition: 'all 0.3s ease' }}>
        {children}
      </div>
    </div>
  );
}

function SubList({ items, dark }) {
  return (
    <ul style={{ paddingLeft: '20px', marginTop: '10px', color: dark ? '#cbd5e0' : '#444' }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: '10px' }} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  );
}
