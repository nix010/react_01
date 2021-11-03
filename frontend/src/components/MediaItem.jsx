import React from "react";

export default function MediaItem(props) {
  const {url, title, type} = props;
  return (
    <div>
      <h3>{title}</h3>
      {type === "image" ? (
        <img src={url} alt={title} height={200} />
      ) : (
        <video src={url} title={title} height={200} />
      )}
    </div>
  )
}