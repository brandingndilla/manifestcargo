import React from 'react';
import { useCompany } from '../../hooks/useCompany';

export default function Footer() {
  const companyName = useCompany();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {year} {companyName}. All rights reserved.</p>
      </div>
    </footer>
  );
}