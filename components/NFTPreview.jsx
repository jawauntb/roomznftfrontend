import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react'

export const NFTPreview = ({previewImgSrc, collectionName, priceInEth}) => {
  return (
    <Box rounded="3xl" bg="white" overflow={'hidden'} className="shadow-2xl">
      <AspectRatio ratio={1 / 1}>
        <Image src={previewImgSrc} alt="Preview of NFT" objectFit="cover" />
      </AspectRatio>
      <Flex
        justifyContent={'space-between'}
        p="4"
        className="space-x-2 text-xs xs:text-lg sm:text-xl"
      >
        <Text textColor="black" fontWeight="bold" fontSize={['xs', 'sm', 'lg']}>
          {collectionName}
        </Text>
        <Flex
          alignItems="center"
          className="space-x-1"
          textColor="black"
          fontWeight="semibold"
          fontSize={['xs', '0.82rem', 'md']}
        >
          <Text>{priceInEth}</Text>
          <Image src="/eth.svg" height={5} width={5} alt="" />
          <Text>each</Text>
        </Flex>
      </Flex>
    </Box>
  )
}