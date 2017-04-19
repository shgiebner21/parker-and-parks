import React from 'react'

const ChildButton = (props) => {
  return(
    <a className="pa2 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-green"
      onClick={props.onClick} >{props.label}</a>
  )
}

export default ChildButton
