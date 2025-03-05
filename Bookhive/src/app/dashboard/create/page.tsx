"use client";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Box, Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";

const CreateBookClub = () => {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [motive, setMotive] = useState("");
  const [image, setImage] = useState(null);
  const toast = useToast();

  const handleCreateClub = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bookclubs', { clubName, description, motive, image });
      toast({
        variant: "solid",
        status: "success",
        description: "Book club created successfully!",
        position: "top",
      });
      setClubName("");
      setDescription("");
      setMotive("");
      setImage(null);
    } catch (error) {
      toast({
        variant: "solid",
        status: "error",
        description: "Failed to create book club.",
        position: "top",
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <FormControl mb={6}>
        <Box display="flex" justifyContent="center" mb={6}>
          <Box position="relative" borderRadius="full" overflow="hidden" width="150px" height="150px" border="2px dashed green" mb={6}>
            <Input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              focusBorderColor="green.400"
              display="none"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                colorScheme="green"
              >
                Browse
              </Button>
            </label>
          </Box>
        </Box>
        <FormLabel>Club Name</FormLabel>
        <Input
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          placeholder="Enter club name"
          focusBorderColor="green.400"
        />
      </FormControl>
      <FormControl mb={6}>
        <FormLabel>Description</FormLabel>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter club description"
          focusBorderColor="green.400"
        />
      </FormControl>
      <FormControl mb={6}>
        <FormLabel>Motive</FormLabel>
        <Input
          value={motive}
          onChange={(e) => setMotive(e.target.value)}
          placeholder="Enter the motive of the book club"
          focusBorderColor="green.400"
        />
      </FormControl>
      <Button colorScheme="green" onClick={handleCreateClub}>
        Create Book Club
      </Button>
    </Container>
  );
};

export default CreateBookClub;
