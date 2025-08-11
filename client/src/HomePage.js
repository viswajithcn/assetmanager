import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#f9f9f9', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
    <h1 style={{ color: '#2c3e50' }}>Hardware Asset Manager</h1>
    <p style={{ fontSize: 18 }}>
      Welcome to the Hardware Asset Manager!<br />
      This application helps you track, assign, and manage your organization's hardware assets efficiently.
    </p>
    <ul style={{ fontSize: 16, marginTop: 32 }}>
      <li>View all assets in a searchable table</li>
      <li>Add new hardware assets</li>
      <li>Check out assets to users and check them back in</li>
      <li>View asset details and audit history</li>
    </ul>
    <div style={{ marginTop: 40 }}>
      <Link to="/assets" style={{ padding: '10px 24px', background: '#3498db', color: '#fff', borderRadius: 4, textDecoration: 'none', fontWeight: 'bold' }}>
        View Assets
      </Link>
      <Link to="/add-asset" style={{ marginLeft: 16, padding: '10px 24px', background: '#2ecc71', color: '#fff', borderRadius: 4, textDecoration: 'none', fontWeight: 'bold' }}>
        Add Asset
      </Link>
    </div>
  </div>
);

export default HomePage;
