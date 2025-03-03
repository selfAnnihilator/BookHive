"use client";
import { Box, Avatar, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import { AUTH_COOKIE } from "@/constants";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${AUTH_COOKIE}`,
          },
        });
        console.log("Profile API Response:", response.data);
        if (response.data) {
          setUserData(response.data);
        } else {
          console.error("Invalid profile data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);


  return (
    <Box
      bg={"dark.10"}
      mx={"auto"}
      borderRadius="10px"
      w={["100%", "100%", "700px"]}
      py={"4em"}
      px={"1.5em"}>
      <Box
        display="flex"
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}>
        <Avatar
          size="xl"
          name={`${userData?.firstName} ${userData?.lastName}`}
        />
        <Text my=".6em" fontWeight="medium" fontSize={["20px", "22px"]}>
          {userData?.firstName || "First"} {userData?.lastName || "Last"}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {userData?.email}
        </Text>
      </Box>
    </Box>
  );
};

export default ProfilePage;
