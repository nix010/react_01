import React from "react";
import MediaItem from "./MediaItem";

export default function MediaList(props) {
  const {mediaList, onChangePage} = props;
  const {data, dataCount, itemPerPage} = mediaList;
  const pageTotal = Math.ceil(dataCount/itemPerPage) || 1;

  return (
    <div>
      <h4>Got total {dataCount || 0} item(s)</h4>
      {Array.from(Array(pageTotal), (e, i) => <button onClick={()=>onChangePage(i+1)} key={i+1}>{i + 1}</button>)}

      {(data || []).map(({url, title, type}) => <MediaItem url={url} title={title} type={type}/>)}
    </div>
  )
}