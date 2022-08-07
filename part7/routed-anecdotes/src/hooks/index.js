import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')
    console.log('re-render...')

    // Not sure if that's a good solution.
    const onChange = (event) => {
      if(!event) {
        setValue('')
        return
      }
      setValue(event.target.value)
    }

    return {
      type,
      value,
      onChange,
    }
  }
