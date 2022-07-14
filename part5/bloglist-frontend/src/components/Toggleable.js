import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'

const Toggleable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }

  const show = { display: isVisible ? '' : 'none' }
  const hide = { display: isVisible ? 'none' : '' }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    }
  })

  return (
    <div>
      <div style={hide}>
        <button type='button' onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button type='button' onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable