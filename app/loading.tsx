import { Box, Container, LoadingOverlay } from '@mantine/core';

export default function Loading() {
    return (
        <Container size="1600px" w="90%">
            <Box mt={100}>
                <LoadingOverlay visible />
            </Box>
        </Container>
    )
}