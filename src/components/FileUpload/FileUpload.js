import {
    AspectRatio,
    Box,
    Container,
    Heading,
    Input,
    Stack,
    Text,
    Flex
  } from "@chakra-ui/react";
//   import { motion, useAnimation } from "framer-motion";
  
  
export default function FileUpload({ handleChange }) {
    // const controls = useAnimation();
    // const startAnimation = () => controls.start("hover");
    // const stopAnimation = () => controls.stop();
    return (
      <Container>
        <AspectRatio width="128" ratio={10.1}>
          <Box
            borderColor="gray.300"
            borderStyle="dashed"
            borderWidth="2px"
            rounded="md"
            shadow="sm"
            role="group"
            transition="all 150ms ease-in-out"
            _hover={{
              shadow: "md"
            }}
            // as={motion.div}
            initial="rest"
            animate="rest"
            // whileHover="hover"
          >
            <Box position="relative" height="100%" width="100%">
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width="100%"
                display="flex"
                flexDirection="column"
              >
                <Stack
                  height="100%"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justify="center"
                  spacing="4"
                >
                    <Flex p="8" textAlign="center" spacing="1">
                        <Heading fontSize="lg" color="gray.700" fontWeight="bold" mr={10}>
                            Drop images here
                        </Heading>
                        <Text fontWeight="light">or click to upload</Text>
                    </Flex>
                </Stack>
              </Box>
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept="image/*"
                onChange={handleChange}
                // onDragEnter={startAnimation}
                // onDragLeave={stopAnimation}
              />
            </Box>
          </Box>
        </AspectRatio>
      </Container>
    );
}
  