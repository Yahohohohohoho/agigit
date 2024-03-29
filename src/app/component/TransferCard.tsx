import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Code,
  Button
} from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dottedArrow from '/public/imgs/dottedArrow.png'

export default function TransferCard (props: any) {
  const { type, relayHash } = props
  // const time = dayjs(CreatedAt).format("MMM DD, YYYY, HH:mm");
  const time = 'Jan 19, 2024, 14:22'
  const extraData = {
    from: '1J93t4tZ76hX9i3Qd7aR4yY3F4iGqG6z8z7gPN8oQe',
    to: '3A3gYZFopmTK1bSVLwsMQDntWQTZARfNXq',
    gas: '233',
    toName: 'Test'
  }
  const formatAddress = (s: string) => {
    if (s) {
      const head = s.slice(0, 4)
      const tail = s.slice(s.length - 4, s.length)
      return head + '...' + tail
    }
    return '...'
  }
  return (
    <>
      <Card className='mx-5 mb-5 h-fit rounded-[20px] bg-[#404040]'>
        <CardHeader className='relative'>
          <div className='text-[18px] text-[#c6cad6] pl-3 mt-2'>{time}</div>
        </CardHeader>
        <CardBody className='px-3 py-0'>
          <div className='p-5 flex flex-row text-center border-b-1 border-[#405aab]'>
            <div className='basis-1/3'>
              <div className='text-[28px] font-bold mb-3'>You</div>
              <Code>{formatAddress(extraData.from)}</Code>
            </div>
            <div className='basis-1/3'>
              <div className='text-[18px] text-[#4faaeb]'>
                {extraData.gas} USDT{' '}
              </div>
              <div className='text-[28px] m-2 h-[27px]'>
                <Image className='m-auto' src={dottedArrow} alt='dottedArrow' />
              </div>
              <div className='text-[18px] text-[#819df5]'>Gas</div>
            </div>
            <div className='basis-1/3'>
              <div className='text-[28px] font-bold mb-3'>
                {relayHash || 'Not Connected'}
              </div>
              <Code>{formatAddress(extraData.to)}</Code>
            </div>
          </div>
        </CardBody>
        <CardFooter className='gap-3'>
          <div className='flex w-full'>
            <div className='flex-1 flex-grow flex justify-center'>
              <Button
                radius='md'
                size='lg'
                className='bg-[#4662b6] text-white shadow-lg w-4/5'
              >
                Next
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
