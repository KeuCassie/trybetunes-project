import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super();
    const { checked } = props;
    this.state = {
      checked,
      isLoading: false,
    };
  }

  onInputChange = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }), this.addFavoriteSong);
  }

  addFavoriteSong = async () => {
    const { checked } = this.state;
    const { music } = this.props;
    if (checked === true) {
      this.setState({
        isLoading: true,
      });
      await addSong(music);
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { music } = this.props;
    const { checked, isLoading } = this.state;
    return (
      <div>
        {isLoading ? <Loading />
          : (
            <div>
              <p>{ music.trackName }</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor="checkbox-music">
                Favorita
                <input
                  data-testid={ `checkbox-music-${music.trackId}` }
                  type="checkbox"
                  onChange={ this.onInputChange }
                  checked={ checked }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
