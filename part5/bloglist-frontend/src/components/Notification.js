import React from 'react'

const Notification = ({ message, className }) => {
  if (message === -1) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification
