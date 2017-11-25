import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme';

const PlaceholderContainer = styled.div`
    height: 0;
    width: 100%;
    padding-bottom: calc(150%);
    position: relative;
    background: ${theme.gray};
    overflow: hidden;
`;

const StyledImage = styled.img`
    position: absolute;
    min-width: 100%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
`;

function PosterImage({ images, altText }) {
    if (!images) {
        return <PlaceholderContainer />;
    }

    let largestImage = images[0];

    images.forEach((image) => {
        if (image.width > largestImage.width) {
            largestImage = image;
        }
    });

    const srcSet = images.reduce((string, image) => `${string}${image.url} ${Math.ceil(image.width / 2)}w, `, '');

    return (
        <PlaceholderContainer>
            <StyledImage src={largestImage.url} alt={altText} srcSet={srcSet} sizes="25vw" />
        </PlaceholderContainer>
    );
}

PosterImage.propTypes = {
    images: PropTypes.array,
    altText: PropTypes.string,
};

export default PosterImage;
