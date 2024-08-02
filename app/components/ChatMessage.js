import { Box } from "@chakra-ui/react";

export function ChatMessage ({alignSelf, bg, text}) {
    return (
        <Box alignSelf={alignSelf || 'flex-start'} bg={bg || 'gray.800'} w='fit-content' minW='100px' rounded='md' p={3} color='white' my={3}>{text}</Box>
    )
}