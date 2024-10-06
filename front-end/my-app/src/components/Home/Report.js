import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    Text,
    Image,
    Stack,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useDisclosure,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Ícone de pesquisa
  
  export default function Report() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showButton, setShowButton] = useState(true); // Estado para controlar a exibição do botão
    const [searchTerm, setSearchTerm] = useState(""); // Estado para controlar a pesquisa
  
    // Função para fechar o modal e esconder o botão
    const handleClose = () => {
      onClose(); // Fecha o modal
      setShowButton(false); // Esconde o botão ao fechar o modal
    };
  
    // Função para lidar com a pesquisa e salvar o valor
    const handleConfirm = () => {
      console.log("Valor pesquisado:", searchTerm); // Aqui você pode salvar o valor pesquisado
      alert(`Pesquisa salva: ${searchTerm}`);
      // Outras ações, como salvar o valor no banco de dados ou fazer uma requisição API
    };
  
    return (
      <>
        {/* Mostra o botão Ver Detalhes apenas se showButton for true */}
        {showButton && (
          <Button onClick={onOpen} colorScheme="teal">
            Ver Detalhes
          </Button>
        )}
  
        {/* Modal só é renderizado quando isOpen for true */}
        <Modal isOpen={isOpen} onClose={handleClose} size="md">
          <ModalOverlay />
          <ModalContent borderRadius="lg" p={4}>
            <ModalCloseButton />
            
            {/* Barra de pesquisa com botão de confirmar */}
            <ModalBody>
              <InputGroup mb={2}>
                <InputLeftElement pointerEvents="none">
                  <FontAwesomeIcon icon={faSearch} color="gray.300" style={{ fontSize: '12px' }} /> {/* Tamanho da lupa ajustado */}
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Pesquisar produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado da pesquisa
                />
                {/* Botão de Confirmar dentro do fundo cinza */}
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleConfirm} bg="gray.200" marginRight={"8px"}>
                    Confirmar
                  </Button>
                </InputRightElement>
              </InputGroup>
  
              {/* Imagem com borda colorida e bordas arredondadas centralizada */}
              <Image
                src="assets/planta.jpeg" // Substitua pela URL da sua imagem
                alt="Planta"
                borderRadius="350px" // Borda arredondada
                border="4px solid teal" // Borda colorida
                width="120px" // Defina o tamanho da imagem
                mt={10} // Ajuste o espaçamento superior para aproximar da barra de pesquisa
                mx="auto" // Centraliza a imagem horizontalmente
              />
  
              <Box mt={2} textAlign="center">
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
  