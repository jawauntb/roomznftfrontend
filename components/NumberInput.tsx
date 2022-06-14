import React from 'react'
import {
  useNumberInput,
  HStack,
  Image,
  Input,
  IconButton
} from '@chakra-ui/react'

type Props = {
  onChange: (value: number) => void
  isDisabled: boolean
}

export const InputNumber = ({ onChange, isDisabled }: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
      isDisabled,
      precision: 0,
      focusInputOnChange: false,
      onChange: (stringVal, numVal) => onChange(numVal)
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps({ readOnly: true })

  return (
    <div style={{borderRadius:'25px'}}>
    <HStack
      width="50%"
      maxWidth="186px"
      background="transparent"
      p="12px"
      style={{ borderRadius: 16 }}
    >
      <IconButton
        {...dec}
        aria-label="Decrement"
        bg="skyblue"
        _hover={{ bg: 'whiteAlpha.400' }}
        icon={
          <Image
            height="24px"
            width="24px"
            src="/icons/minus.svg"
            alt="Decrement"
          />
        }
      />
      <Input
        {...input}
        border={0}
        bg="transparent"
        fontWeight="bold"
        width="50%"
        color='white'
        margin="0px !important"
        textAlign="center"
        fontSize="28px"
      />
      <IconButton
        {...inc}
        bg="skyblue"
        aria-label="Increment"
        _hover={{ bg: 'whiteAlpha.400' }}
        icon={
          <Image
            display="block"
            height="24px"
            width="24px"
            src="/icons/plus.svg"
            alt="Increment"
          />
        }
      />
    </HStack>
    </div>
  )
}

export default InputNumber;