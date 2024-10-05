import { Box, Text, Button, Link, VStack, HStack } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import MenuTop from "./MenuTop";
import Mapa from "./Mapa";

export default function HomePage() {
  return (
    <>
     <Box bg="rgb(217,217,217)" minHeight="100vh" width="100%">
       <MenuTop width="20px"/>
       <Mapa></Mapa>
     </Box> 
      
    </>
  );
}
