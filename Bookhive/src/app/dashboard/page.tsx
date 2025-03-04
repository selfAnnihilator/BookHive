"use client";
import DashboardHome from "@/components/pages/dashbord/dashbordHome"; // Adjust the path if necessary
import PostList from "@/components/pages/dashboard/PostList"; // Adjust the path if necessary
import { updateLocationData } from "@/redux/slice/location"; // Adjust the path if necessary
import { useDispatch } from "react-redux";
import { useGeolocation, useSessionStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getIp = async () => {
      try {
        const { data } = await axios("https://ipapi.co/json/");
        if (data) {
          dispatch(updateLocationData(data));
        } else {
          const defaultLocation = { lat: 0, long: 0 }; // Example default location
          dispatch(updateLocationData(defaultLocation));
        }
      } catch (error) {
        console.error("Error fetching geolocation data:", error);
        const defaultLocation = { lat: 0, long: 0 }; // Example default location
        dispatch(updateLocationData(defaultLocation));
      }
    };
    getIp();
  }, [dispatch]);

  const [geo, setGeo] = useSessionStorage("user_location", { lat: 0, long: 0 });

  return (
    <>
      <DashboardHome />
      <PostList />
      <button
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#0dba63', // Example color
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          padding: '10px 15px',
          cursor: 'pointer',
        }}
        onClick={() => window.location.href = '/create'}
      >
        +
      </button>
    </>
  );
};

export default Page;
