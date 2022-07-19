import React from "react";

function TrackDetails(props) {
  return (
    <div>
      <p>{`id: ${props.playlistId}`}</p>
      <p>{`name: ${props.trackName}`}</p>
      <p>{`artist: ${props.trackArtist}`}</p>
      <p>{`url: ${props.trackUrl}`}</p>
    </div>
  );
}

export default TrackDetails;
