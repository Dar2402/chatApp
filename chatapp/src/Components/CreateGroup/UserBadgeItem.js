import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user, handleFunction}) => {
  return (
    <Box
        paddingX={2}
        // paddingRight='24px'
        paddingY={1}
        borderRadius='lg'
        margin={2}
        marginBottom={2}
        variant='solid'
        fontSize={12}
        backgroundColor='purple'
        color='white'
        cursor='pointer'
        onClick={handleFunction}
    >
    {user.name}
    <CloseIcon pl={1} />
    </Box>
  )
}

export default UserBadgeItem