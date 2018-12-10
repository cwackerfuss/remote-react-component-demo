import React from 'react';

export default function SharedComponent(props) {
  return (
    <div>SharedComponent, called from {props.location}</div>
  )
}