import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

export default function Mapa() {
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lng) {
      // Carregar o Google Maps apenas após a localização ser obtida
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdJ_z74sxFupjWP7LuQ7e2hIi_3PsYFp4&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);

      window.initMap = function () {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: location,
          zoom: 14,
        });

        new google.maps.Marker({
          position: location,
          map: map,
          title: "Você está aqui!",
        });
      };
    }
  }, [location]);

  return (
    <Box height="400px">
      <div id="map" style={{ height: "100%", width: "100%" }}></div>
    </Box>
  );
}
