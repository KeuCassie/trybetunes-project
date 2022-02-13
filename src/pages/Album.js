import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super();
    this.state = {
      albumId: props.match.params.id,
      musicList: [],
      isLoading: true,
      favorite: [],
    };
  }

  async componentDidMount() {
    const { albumId } = this.state;
    const musics = await getMusics(albumId);
    const { artistName, collectionName } = musics[0];
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      artistName,
      collectionName,
      musicList: musics.slice(1),
      isLoading: false,
      favorite: favoriteSongs,
    });
  }

  render() {
    const { artistName, collectionName, musicList, isLoading, favorite } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading />
          : (
            <div>
              <p data-testid="artist-name">{artistName}</p>
              <p data-testid="album-name">{collectionName}</p>
            </div>
          )}
        {musicList.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            checked={ favorite.some((song) => song.trackId === music.trackId) }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
