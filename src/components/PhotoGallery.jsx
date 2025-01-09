import React, { useState, useEffect } from 'react';
import unsplash from '../api/unsplash';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../components/PhotoGallery.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRandomPhotos(); // Load initial random photos on mount
  }, []);

  const loadRandomPhotos = () => {
    setError(null); // Clear previous errors
    unsplash.photos.getRandom({ count: 9 }) // Fetch exactly 9 photos
      .then(result => {
        if (result.errors) {
          console.log('Error occurred: ', result.errors[0]);
          setError('Failed to fetch photos. Please try again.');
        } else {
          setPhotos(result.response); // Random photos are directly in `response`
        }
      })
      .catch(err => {
        console.error('Unexpected error: ', err);
        setError('Unexpected error occurred. Please try again.');
      });
  };

  return (
    <div className="photo-gallery">
      {/* Display error message if any */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Image grid */}
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img
              src={photo.urls.small}
              alt={photo.alt_description || 'Une photo offerte par Unsplash'}
              className="photo-image"
            />
            <div className="photo-overlay"></div>
            <div className="photo-details">
              <div className="photo-title">{photo.user.name}</div>
              <div className="photo-description">
                {photo.description || 'Pas de description disponible.'}
              </div>
              <div className="photo-buttons">
                <a
                  href={photo.user.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="photo-button"
                >
                  le_photographe.unsplash? 👨🏻‍✈️
                </a>
                <a
                  href={photo.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="photo-button"
                >
                  l'image_sur_unsplash.com? 🚁
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reload button centered below the grid */}
      <div className="reload-button-container text-center mt-4">
        <button
          className="btn reload-button"
          onClick={loadRandomPhotos}
        >
          magic... ? <i className="fa-solid fa-wand-magic-sparkles"></i>
        </button>
      </div>
    </div>
  );
};

export default PhotoGallery;
