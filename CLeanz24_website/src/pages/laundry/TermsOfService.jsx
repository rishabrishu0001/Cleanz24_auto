import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SEOMeta from '../../components/SEOMeta';

export default function TermsOfService() {
  const { isDarkMode } = useOutletContext() || {};
  const dark = !!isDarkMode;

  return (
    <div style={{ background: dark ? '#0a0f1d' : '#f8fafc', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
      <SEOMeta
        title="Terms and Conditions"
        description="Read Cleanz24's Terms and Conditions for using our premium laundry, dry cleaning, and car spa services across India."
        canonical="https://cleanz24.com/laundry/terms-and-conditions"
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

          <Section icon="📌" title="1. Acceptance of Terms" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              By accessing our website, placing an order, or using any service offered by <strong>Cleanz24</strong> ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
            </p>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              We reserve the right to update these terms at any time. Continued use of our services following any changes constitutes your acceptance of the revised terms.
            </p>
          </Section>

          <Section icon="🛎️" title="2. Services Offered" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>Cleanz24 provides the following services:</p>
            <SubList items={[
              'Wash &amp; Fold Laundry',
              'Dry Cleaning &amp; Steam Pressing',
              'Steam Ironing',
              'Shoe Laundry &amp; Cleaning',
              'Deep Home Cleaning',
              'Doorstep Pickup &amp; Delivery',
            ]} dark={dark} />
            <p style={{ color: dark ? '#cbd5e0' : '#444', marginTop: '16px' }}>
              Services are available at our franchise store locations across India. Availability may vary by location. We reserve the right to modify, suspend, or discontinue any service at any time.
            </p>
          </Section>

          <Section icon="📦" title="3. Pickup, Delivery & Order Processing" dark={dark}>
            <SubList items={[
              '<strong>Scheduling:</strong> Pickup and delivery timings are subject to availability in your area. We will make best efforts to adhere to scheduled slots.',
              '<strong>Order Confirmation:</strong> An order is confirmed upon receipt of your request and our acceptance via SMS/email/call.',
              '<strong>Turnaround Time:</strong> Standard processing times are communicated at the time of order. Express services may be available at additional charges.',
              '<strong>Unclaimed Orders:</strong> Items not collected within 30 days of notification may be subject to storage charges or disposal per our store policy.',
              '<strong>Access for Pickup:</strong> You must ensure a representative is available at the given address during the scheduled pickup window.',
            ]} dark={dark} />
          </Section>

          <Section icon="💳" title="4. Pricing & Payment" dark={dark}>
            <SubList items={[
              'Prices are listed on our website/app and at our stores. Prices are subject to change without prior notice.',
              'Payment is due upon delivery of cleaned items unless otherwise agreed.',
              'We accept cash, UPI, debit/credit cards, and other digital payment methods as displayed at checkout.',
              'Promotional offers, discounts, and coupons are subject to specific terms and expiry dates.',
              'All prices are inclusive of applicable taxes unless stated otherwise.',
            ]} dark={dark} />
          </Section>

          <Section icon="👕" title="5. Care of Garments & Liability" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              We take utmost care of your garments; however, by using our services you acknowledge and agree that:
            </p>
            <SubList items={[
              'Cleanz24 is not liable for pre-existing damage, colour fading of inherently unstable dyes, or shrinkage of garments that do not conform to standard care labels.',
              'Claims for damage or loss must be made within <strong>48 hours</strong> of delivery. Claims submitted after this period may not be entertained.',
              'Our maximum liability for a lost or damaged item is limited to <strong>10 times the cleaning charge</strong> for that item, not exceeding the item\'s fair market value.',
              'Highly valuable or irreplaceable items (e.g., designer wear, heirlooms) should be disclosed at the time of pickup for special handling consideration.',
              'We are not responsible for items left in pockets. Please remove all personal belongings before handing over garments.',
            ]} dark={dark} />
          </Section>

          <Section icon="🔄" title="6. Cancellations & Refunds" dark={dark}>
            <SubList items={[
              '<strong>Cancellation Before Pickup:</strong> Orders cancelled before pickup will receive a full refund of any advance payment.',
              '<strong>Cancellation After Pickup:</strong> If items have already been collected, a cancellation fee may apply to cover logistics costs.',
              '<strong>Service Dissatisfaction:</strong> If you are not satisfied with our cleaning quality, report within 48 hours of delivery. We will re-clean the items at no extra charge.',
              '<strong>Refunds:</strong> Eligible refunds are processed within 5–7 working days to the original payment method.',
              'We do not offer refunds for services already rendered in full and deemed satisfactory.',
            ]} dark={dark} />
          </Section>

          <Section icon="🤝" title="7. Franchise & Partner Stores" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              Cleanz24 operates through a franchise model. Individual store partners are responsible for service delivery in their respective areas while adhering to Cleanz24's brand standards. Any specific grievances related to a franchise store should be reported to us and we will facilitate resolution.
            </p>
          </Section>

          <Section icon="🚫" title="8. Prohibited Uses" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>You agree not to:</p>
            <SubList items={[
              'Use our services for any unlawful purpose or submit illegal items for cleaning.',
              'Provide false or misleading information when placing orders.',
              'Attempt to interfere with our website, systems, or services.',
              'Reproduce, distribute, or create derivative works from our content without written permission.',
            ]} dark={dark} />
          </Section>

          <Section icon="⚖️" title="9. Intellectual Property" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              All content on the Cleanz24 website — including logos, text, graphics, images, and software — is the property of Cleanz24 or its licensors and is protected by applicable intellectual property laws. Unauthorised use is strictly prohibited.
            </p>
          </Section>

          <Section icon="🛡️" title="10. Disclaimer of Warranties" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              Our services are provided on an "as-is" and "as-available" basis. We make no warranties, express or implied, regarding the reliability, accuracy, or fitness for a particular purpose of our services, except as explicitly stated herein.
            </p>
          </Section>

          <Section icon="⚠️" title="11. Limitation of Liability" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              To the maximum extent permitted by applicable law, Cleanz24 shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services, even if we have been advised of the possibility of such damages.
            </p>
          </Section>

          <Section icon="🏛️" title="12. Governing Law & Dispute Resolution" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>
              These Terms of Service are governed by the laws of India. Any disputes arising under these terms shall first be addressed through amicable negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts in <strong>New Delhi, India</strong>.
            </p>
          </Section>

          <Section icon="📞" title="13. Contact Us" dark={dark}>
            <p style={{ color: dark ? '#cbd5e0' : '#444' }}>If you have any questions about these Terms of Service, please contact us:</p>
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
