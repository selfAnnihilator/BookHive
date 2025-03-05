"use client";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Box, Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";

const CreateBookClub = () => {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [motive, setMotive] = useState("");
  const toast = useToast();

  const handleCreateClub = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bookclubs', { clubName, description });
      toast({
        variant: "solid",
        status: "success",
        description: "Book club created successfully!",
        position: "top",
      });
      setClubName("");
      setDescription("");
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
