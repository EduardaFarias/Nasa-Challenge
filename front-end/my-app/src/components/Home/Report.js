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
  import axios from 'axios'; // Importando o axios
  
  export default function Report({ coords }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showButton, setShowButton] = useState(true); // Estado para controlar a exibição do botão
    const [searchTerm, setSearchTerm] = useState(""); // Estado para controlar a pesquisa
    const [metrics, setMetrics] = useState([]); // Estado para armazenar os dados da API
    const [selectedMetric, setSelectedMetric] = useState(null); // Estado para armazenar a métrica selecionada
  
    // Função para fechar o modal e esconder o botão
    const handleClose = () => {
      onClose();
      setShowButton(false);
    };
  
    // Função para lidar com a pesquisa e fazer a requisição usando Axios
    const handleConfirm = async () => {
      const lat = coords.lat;
      const lng = coords.lng;
  
      // URL com latitude, longitude e crop do input
      const url = `https://ttimzwkej4tutb5gjkehenrqn40ygeij.lambda-url.us-east-1.on.aws/recommendations?lat=${lat}&long=${lng}&crop=${searchTerm}`;
  
      try {
        const response = await axios.get(url); // Fazendo a requisição com Axios
        setMetrics(response.data); // Atualiza as métricas recebidas
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
  
    // Função para abrir o modal com os detalhes da métrica
    const handleMetricClick = (metric) => {
      setSelectedMetric(metric);
    };
  
    return (
      <>
        {/* Mostra o botão Ver Detalhes apenas se showButton for true */}
        {showButton && (
          <Button onClick={onOpen} colorScheme="teal">
            Ver Detalhes
          </Button>
        )}
  
        {/* Modal principal */}
        <Modal isOpen={isOpen} onClose={handleClose} size="md">
          <ModalOverlay />
          <ModalContent borderRadius="lg" p={4}>
            <ModalCloseButton />
            <ModalBody>
              {/* Barra de pesquisa com botão de confirmar */}
              <InputGroup mb={2}>
                <InputLeftElement pointerEvents="none">
                  <FontAwesomeIcon icon={faSearch} color="gray.300" style={{ fontSize: '12px' }} />
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
                src="assets/planta.jpeg"
                alt="Planta"
                borderRadius="350px"
                border="4px solid teal"
                width="120px"
                mt={10}
                mx="auto"
              />
  
              {/* Exibindo os quadrados das métricas */}
              <Box mt={4}>
                <Stack direction="column" spacing={4}>
                  {metrics.map((metric, index) => (
                    <Box
                      key={index}
                      bg="gray.100"
                      p={4}
                      borderRadius="md"
                      boxShadow="sm"
                      cursor="pointer"
                      onClick={() => handleMetricClick(metric)} // Ao clicar, abre o modal com detalhes
                      _hover={{ bg: "gray.200" }}
                    >
                      <Text fontWeight="bold">{metric.name}</Text>
                      <Text fontSize="sm" color="gray.500">{metric.dimension}</Text>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
  
        {/* Modal de detalhes da métrica */}
        {selectedMetric && (
          <Modal isOpen={Boolean(selectedMetric)} onClose={() => setSelectedMetric(null)}>
            <ModalOverlay />
            <ModalContent borderRadius="lg" p={4}>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold" fontSize="2xl">{selectedMetric.name}</Text>
                <Text fontSize="lg" color="green.500">Value: {selectedMetric.value}</Text>
                <Text mt={4}>{selectedMetric.recommendation}</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }
  