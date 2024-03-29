'use client'

import { Input } from '@nextui-org/react'
import { useState } from 'react'

export default function CommandLine (props: any) {
  const [value, setValue] = useState('')
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      props.onKeyDown(value)
      event.preventDefault()
    }
  }
  return (
    <>
      <Input
        className='my-5 px-6'
        value={value}
        onValueChange={setValue}
        onKeyDown={handleKeyDown}
      />
    </>
  )
}
