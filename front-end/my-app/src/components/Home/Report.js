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
  
  // Simula os dados recebidos
  const metrics = [
    { dimension: "mm³", name: "Evapotranspiration" },
    { dimension: "g/m³", name: "Absolute Humidity" },
    { dimension: "µg/m³", name: "Nitrogen Dioxide Concentration" },
    { dimension: "µg/m³", name: "Nitrogen Oxide Concentration" },
    { dimension: "µg/m³", name: "Ozone concentration" },
    { dimension: "µg/m³", name: "Hydrophilic Black Carbon Concentration" },
    { dimension: "µg/m³", name: "Hydrophobic Black Carbon Concentration" },
    { dimension: "µg/m³", name: "Carbon Monoxide Concentration" },
    { dimension: "µg/m³", name: "Particulate Matter PM10 Concentration" },
    { dimension: "µg/m³", name: "Particulate Matter PM1 Concentration" },
    { dimension: "µg/m³", name: "Particulate Matter PM2-5 Concentration" },
    { dimension: "µg/m³", name: "Sulfur Dioxide Concentration" },
    { dimension: "Cº", name: "Temperature at 2 Meters" },
    { dimension: "m/s", name: "Wind Speed at 2 Meters" },
    { dimension: "%", name: "Relative Humidity at 2 Meters" },
  ];
  
  export default function Report({ coords }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showButton, setShowButton] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
  
    // Função para fechar o modal e esconder o botão
    const handleClose = () => {
      onClose(); 
      setShowButton(false); 
    };
  
    // Função para lidar com a pesquisa e salvar o valor
    const handleConfirm = () => {
      console.log("Valor pesquisado:", searchTerm); 
      alert(`Pesquisa salva: ${searchTerm}`);
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
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
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
  
              <Box mt={2} textAlign="center">
                <Text fontWeight="bold" fontSize="2xl">
                Selected location:
                </Text>
                <Text fontWeight="bold" fontSize="xl" color="green.500">
                  Latitude: {coords.lat}, Longitude: {coords.lng}
                </Text>
  
                {/* Exibindo os retângulos com os nomes das métricas */}
                <Stack direction="column" mt={4} spacing={2}>
                  {metrics.map((metric, index) => (
                    <Box
                      key={index}
                      bg="gray.100"
                      p={2}
                      borderRadius="md"
                      boxShadow="sm"
                      textAlign="center"
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
      </>
    );
  }
  