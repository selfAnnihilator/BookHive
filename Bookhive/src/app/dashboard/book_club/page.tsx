"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Box, Container, FormControl, FormLabel, Input, Button, Heading, Textarea } from "@chakra-ui/react";

const BookClubPage = () => {
  const router = useRouter();
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [bookClubs, setBookClubs] = useState([]);
  const toast = useToast();

  const handleCreateClub = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bookclubs', { clubName, description });
      setBookClubs([...bookClubs, response.data]);
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

  const handleSearch = async (e) => {
    const query = e.target.value;
    if (query) {
      const response = await axios.get(`http://localhost:5000/api/bookclubs/search?query=${query}`);
      setBookClubs(response.data);
    } else {
      setBookClubs([]);
    }
  };

  useEffect(() => {
    const fetchBookClubs = async () => {
      const response = await axios.get('http://localhost:5000/api/bookclubs');
      setBookClubs(response.data);
    };
    fetchBookClubs();
  }, []);

return (
  <Container maxW="container.md" py={8}>
      <FormControl mb={6} mt={8}>
        <FormLabel>Search Book Clubs</FormLabel>
        <Input
          onChange={handleSearch}
          placeholder="Search for book clubs..."
          focusBorderColor="green.400"
        />
      </FormControl>
      <Button
        colorScheme="green"
        size="sm"
        borderRadius="md"
        position="fixed"
        bottom="20px"
        right="20px"
        onClick={() => router.push('/dashboard/create')}
      >
      Create Book Club
      </Button>
      <Box mt={4}>
        {bookClubs.map((club) => (
          <Box key={club.id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
            <Heading size="md">{club.name}</Heading>
            <Button colorScheme="blue" mt={2}>Join Club</Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BookClubPage;
