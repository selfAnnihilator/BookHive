"use client";

import { Box, Text, Input, Button, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

const BooksPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Flex mb={8} gap={2}>
        <Input
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchBooks()}
        />
        <Button colorScheme="blue" onClick={searchBooks} isLoading={loading}>
          Search
        </Button>
      </Flex>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {books.map((book) => (
          <Box key={book.id} borderWidth="1px" borderRadius="lg" p={4}>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <Image
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                mb={2}
                mx="auto"
              />
            )}
            <Text fontWeight="bold" fontSize="lg">
              {book.volumeInfo.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {book.volumeInfo.authors?.join(", ")}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BooksPage;
