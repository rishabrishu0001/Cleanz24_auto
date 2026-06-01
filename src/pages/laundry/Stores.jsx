import React from 'react';
import { Link } from 'react-router-dom';

const storeLocations = [
  { state: "Gujarat", cities: ["Nadiad"] },
  { state: "Kerala", cities: ["Kannur", "Ernakulam", "Panoor", "Kozhikode", "Kottayam", "Thalassery"] },
  { state: "Punjab", cities: ["Bhatinda", "Patiala", "Kharar", "Amritsar"] },
  { state: "Uttarakhand", cities: ["Chamoli", "Dehradun"] },
  { state: "Odisha", cities: ["Rasulgarh", "Berhampur", "Jeypore", "Barmunda", "Bomikhal", "Kharakhia", "Raghunathpur", "Chandrasekharpur", "Angul"] },
  { state: "Rajasthan", cities: ["Udaipur", "Bhilwara"] },
  { state: "Karnataka", cities: ["HSR Layout", "Jayanagar", "Varthur Hobli"] },
  { state: "Chhattisgarh", cities: ["Bhilai"] },
  { state: "Uttar Pradesh", cities: ["Ghaziabad", "Greater Noida", "Noida"] },
  { state: "West Bengal", cities: ["Siliguri"] },
  { state: "Maharashtra", cities: ["Pune", "Thane West"] },
  { state: "Telangana", cities: ["Kondapur", "Vanasthalipuram"] },
  { state: "Bihar", cities: ["Purnia"] },
  { state: "Haryana", cities: ["Panchkula", "Gurugram"] },
  { state: "Puducherry", cities: ["Mahe"] }
];

export default function Stores() {
  return (
    <div className="stores-page">
      {/* Page Header */}
      <section className="bg-light py-5 text-center" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container py-4">
          <h1 className="display-5 fw-bold text-dark mb-3">Our Stores</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-primary fw-semibold">Home</Link></li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Stores</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white text-center">
        <div className="container">
          <span className="section-subtitle">Find Cleanz24 Near You</span>
          <h2 className="section-title mt-2 mb-4">Your Trusted Partner for Premium Laundry and Dry-Cleaning Service</h2>
          <p className="text-muted lead mx-auto mb-5" style={{ maxWidth: '800px' }}>
            With over 70+ retail stores across 43+ cities in India, a premium Cleanz24 experience is always just around the corner. Find your nearest store below and drop off your garments or schedule a free pickup today!
          </p>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="pb-5 bg-white">
        <div className="container">
          <div className="row g-4">
            {storeLocations.map((loc, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="bg-light p-4 radius-lg h-100 border transition hover-shadow">
                  <h3 className="h4 fw-bold text-primary mb-4 border-bottom pb-2 border-primary border-opacity-25">
                    {loc.state}
                  </h3>
                  <ul className="list-unstyled mb-0 d-flex flex-wrap gap-2">
                    {loc.cities.map((city, cIdx) => (
                      <li key={cIdx} className="bg-white px-3 py-2 rounded-pill shadow-sm border border-light text-muted small fw-semibold">
                        📍 {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--global-primary)' }}>
        <div className="container text-center">
          <h2 className="text-white fw-bold mb-4">Can't Find a Store Near You?</h2>
          <p className="text-white-50 mx-auto mb-4" style={{ maxWidth: '600px' }}>
            Don't worry! We offer free doorstep pickup and delivery in many more locations. Get in touch with us to schedule your service.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-secondary-custom px-4 py-3">
              Schedule Free Pickup
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
