import React from 'react';
import PropTypes from 'prop-types';


function MovieCard({ imageUrl, title, releaseDate, rating }) {
    return (
        <div>
            <img src={imageUrl} alt="" />
            <h2>{title}</h2>
            <span>{releaseDate}</span>
            <span>{rating}</span>
        </div>
    );
}

MovieCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    rating: PropTypes.number,
};

export default MovieCard;
