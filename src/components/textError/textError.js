import React from 'react'

const TextError = (props) => {
  return (
    <div className='text-red-400'>
        {props.children}
    </div>
  )
}

export default TextError