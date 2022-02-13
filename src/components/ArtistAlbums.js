import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArtistAlbums extends Component {
  render() {
    const { albums } = this.props;
    return (
      <div>
        {albums.map(({ artistName, collectionName, artworkUrl100, collectionId }) => (
          <div key={ collectionId }>
            <img src={ artworkUrl100 } alt={ artistName } />
            <p>{ collectionName }</p>
            <p>{ artistName }</p>
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              Album
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

ArtistAlbums.propTypes = {
  albums: PropTypes.arrayOf.isRequired,
};

export default ArtistAlbums;
