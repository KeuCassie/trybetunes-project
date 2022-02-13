import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super();
    this.state = {
      albumId: props.match.params.id,
      musicList: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { albumId } = this.state;
    const musics = await getMusics(albumId);
    const { artistName, collectionName } = musics[0];
    this.setState({
      artistName,
      collectionName,
      musicList: musics.slice(1),
      isLoading: false,
    });
  }

  render() {
    const { artistName, collectionName, musicList, isLoading } = this.state;
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
