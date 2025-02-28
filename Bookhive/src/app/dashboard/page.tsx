"use client";
import DashboardHome from "@/components/pages/dashbord/dashbordHome";
import { updateLocationData } from "@/redux/slice/location";
import { useDispatch } from "react-redux";
import { useGeolocation, useSessionStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect } from "react";

const Page = () => {
  const { longitude, latitude } = useGeolocation();
  const location = {
    lat: latitude,
    long: longitude,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const getIp = async () => {
      const { data } = await axios("https://ipapi.co/json/");

      if (data) {
        dispatch(updateLocationData(data));
      }
    };
    getIp();
  }, [dispatch]);

  const parseLocation = JSON.stringify(location);
  const [geo, setGeo] = useSessionStorage("user_location", location);

  return (
  <>
    <DashboardHome />
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
    >
      +
    </button>
  </>
);
};

export default Page;
