import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './RandomPhoto.scss';

RandomPhoto.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onImageUrlChange: PropTypes.func,
    onRandomButtonBlur: PropTypes.func
};
RandomPhoto.defaultProps = {
    name: '',
    imageUrl: '',
    onImageUrlChange: null,
    onRandomButtonBlur: null
};
const getRandomImageUrl = () => {
    const randomId = Math.trunc(Math.random() * 2000);
    return `https://picsum.photos/id/${randomId}/300/300`;
}


function RandomPhoto(props) {
    const { name, imageUrl, onImageUrlChange, onRandomButtonBlur } = props;
    const handleRandomPhotoClick = async () => {
        if (onImageUrlChange) {
            const randomImageUrl = getRandomImageUrl(); // khi image thay doi thi re-render 1 url moi
            onImageUrlChange(randomImageUrl);
        }
    }

    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <Button
                    outline
                    color="primary"

                    name={name}
                    onBlur={onRandomButtonBlur}
                    onClick={handleRandomPhotoClick}
                >Random a Photo</Button>
            </div>
            <div className="random-photo__photo">
                {imageUrl &&
                    <img
                        src={imageUrl}
                        alt="Oops Not Found ... Please Click Button One more time!!! "
                        onError={handleRandomPhotoClick}
                    />}
                <a href={imageUrl} target="_blank" >{imageUrl}</a>
            </div>
        </div>
    );
}

export default RandomPhoto;