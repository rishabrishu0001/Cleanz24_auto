import React from 'react';
import Header from '../../views/laundry/components/LaundryHeader';
import Footer from '../../views/laundry/components/LaundryFooter';
import '../../styles/laundry.css';

export default function BlogLayout({ children }) {
  return (
    <div className="laundry-app d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
