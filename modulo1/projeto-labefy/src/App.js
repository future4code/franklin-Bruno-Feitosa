import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [playlists, setPlaylistsState] = useState([]);
  const [inputPlaylist, setInputPlaylist] = useState("");
  const [inputMusicName, setInputMusicName] = useState("");
  const [inputArtist, setInputArtist] = useState("");
  const [inputMusicUrl, setInputMusicUrl] = useState("");

  const handleInputPlaylist = (e) => {
    setInputPlaylist(e.target.value);
  };
  const handleInputMusicName = (e) => {
    setInputMusicName(e.target.value);
  };
  const handleInputArtist = (e) => {
    setInputArtist(e.target.value);
  };
  const handleInputMusicUrl = (e) => {
    setInputMusicUrl(e.target.value);
  };

  const getAllPlaylists = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        {
          headers: {
            Authorization: "bruno-feitosa-franklin",
          },
        }
      )
      .then((response) => {
        setPlaylistsState(response.data.result.list);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(getAllPlaylists, []);

  const createPlaylist = () => {
    const body = {
      name: inputPlaylist,
    };

    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        body,
        {
          headers: {
            Authorization: "bruno-feitosa-franklin",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getAllPlaylists();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTrackToPlaylist = (playlistId) => {
    const body = {
      name: inputMusicName,
      artist: inputArtist,
      url: inputMusicUrl,
    };

    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistId}/tracks`,
        body,
        {
          headers: {
            Authorization: "bruno-feitosa-franklin",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        getAllPlaylists();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <input value={inputMusicName} onChange={handleInputMusicName}></input>
        <input value={inputArtist} onChange={handleInputArtist}></input>
        <input value={inputMusicUrl} onChange={handleInputMusicUrl}></input>
      </div>
      <input value={inputPlaylist} onChange={handleInputPlaylist}></input>
      <button onClick={createPlaylist}>Criar Playlist</button>

      {playlists.map((playlist, index) => {
        return (
          <div key={index}>
            <p>{playlist.name}</p>
            <button
              onClick={() => {
                addTrackToPlaylist(playlist.id);
                setInputMusicName("");
                setInputArtist("");
                setInputMusicUrl("");
              }}
            >
              Adicionar Track
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
