import React from 'react';
 
const Missing = () => {
  return (
    <main className="missing-container">
      <h2 className="missing-title">Page Not Found</h2>
      <p className="missing-text">Sorry, the page you're looking for could not be found.</p>
      <p className="missing-text">
        Visit our <a href="/" className="home-link">Home Page</a>
      </p>
    </main>
  );
};

export default Missing;
