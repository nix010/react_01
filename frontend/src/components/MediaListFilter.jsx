import React from "react";

export default function MediaListFilter(props) {
  const {onSubmit, onChangeValues, filters} = props;
  const {title, type} = filters;
  return (
    <form>
      <span>Title</span>
      <input
        type="text"
        placeholder="Input title of media"
        value={title}
        onChange={({target})=> onChangeValues({title: target.value})}
      />

      <span>Type</span>
      <select
        value={type}
        onChange={({target})=> onChangeValues({type: target.value})}
      >
        <option value="">--</option>
        <option value="video">Video</option>
        <option value="image">Image</option>
      </select>
      <input type="button" onClick={onSubmit} value="Filter" />
    </form>
  )
}