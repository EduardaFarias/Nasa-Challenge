import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    Text,
    Image,
    Stack,
    Flex,
    useDisclosure,
  } from "@chakra-ui/react";
  
  export default function Report() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        {/* Botão para abrir o modal */}
        <Button onClick={onOpen} colorScheme="teal">
          Ver Detalhes
        </Button>
  
        {/* Modal estilizado */}
        <Modal isOpen={isOpen} onClose={onClose} size="md">
          <ModalOverlay />
          <ModalContent borderRadius="lg" p={4}>
            <ModalCloseButton />
            
            {/* Imagem do produto */}
            <ModalBody>
              <Image
                src="assets/planta.jpeg" // Substitua pela URL da sua imagem
                alt="Caramel Frappuccino"
                borderRadius="md"
              />
  
              {/* Detalhes do produto */}
              <Box mt={4} textAlign="center">
                <Text fontWeight="bold" fontSize="2xl">
                  Caramel Frappuccino
                </Text>
                <Text fontWeight="bold" fontSize="xl" color="green.500">
                  $30.00
                </Text>
                <Text color="gray.500">Best Seller</Text>
  
                {/* Opções de tamanho */}
                <Stack direction="row" mt={4} justify="center" spacing={4}>
                  <Flex direction="column" align="center">
                    <Button variant="ghost">Tall</Button>
                    <Text fontSize="sm" color="gray.500">
                      12 fl oz
                    </Text>
                  </Flex>
                  <Flex direction="column" align="center">
                    <Button variant="ghost">Grande</Button>
                    <Text fontSize="sm" color="gray.500">
                      16 fl oz
                    </Text>
                  </Flex>
                  <Flex direction="column" align="center">
                    <Button variant="ghost">Venti</Button>
                    <Text fontSize="sm" color="gray.500">
                      24 fl oz
                    </Text>
                  </Flex>
                </Stack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
  