/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {useEffect, useRef, useState, useCallback} from "react";
import { useSearchParams  } from 'next/navigation';
import axios from "axios";
import { HotelDetail, HotelDetailApiResponse } from "@/app/type/hotelDetail";
type hotelType = {
  hotelId: number;
  hotelName: string;
  latitude: number;
  longitude: number;
};

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const mapRef = useRef<any>(null);
  const searchParams = useSearchParams();
  // null 체크 및 기본값 처리
  const latitudeStr = searchParams?.get('latitude');
  const longitudeStr = searchParams?.get('longitude');
  const hotelId = searchParams?.get('hotelId');

  const [hotelDetail, setHotelDetail] = useState<HotelDetail | null>(null);
  useEffect(() => {
    if (!hotelId) return; // hotelId가 없으면 실행하지 않음
    const fetchHotelDetail = async () => {
      try {
        const response = await axios.get<HotelDetailApiResponse>(`/api-proxy/api/v1/hotel/detail?hotelId=${hotelId}`);
        const hotelDetailDate: HotelDetail = response.data.data; 
        setHotelDetail(hotelDetailDate);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotelDetail();
  }, [hotelId]);



  // string이 없으면 fallback 값 또는 undefined 처리
  const latitude1 = latitudeStr ? Number(latitudeStr) : undefined;
  const longitude1 = longitudeStr ? Number(longitudeStr) : undefined;
  const safeLatitude: number = latitude1 ?? 0;
  const safeLongitude: number = longitude1 ?? 0;
  // 현위치 조회
  const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number }>({ latitude : safeLatitude, longitude:safeLongitude });
  useEffect(() => {
    if(safeLatitude != 0 && safeLongitude != 0){
      if (hotelDetail) {
        setMyLocation({
          latitude: hotelDetail.latitude,
          longitude: hotelDetail.longitude,
        });
      }
    }else{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      }
    }
  }, [safeLatitude, safeLongitude, hotelDetail]);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.naver && window.naver.maps && mapContainer.current) {
      const map = new window.naver.maps.Map(mapContainer.current, {
        // center: new window.naver.maps.LatLng(37.4979, 127.0276 ),
        center: new window.naver.maps.LatLng(myLocation.latitude, myLocation.longitude ),
        zoom: 17,
      });
      mapRef.current = map;
      // Listen to map changes (zoom, pan)
      const onBoundsChanged = () => {
        if (map.getZoom() <= 14) {
          markersRef.current.forEach((marker: any) => marker.setMap(null));
          return;
        }

        const bounds = map.getBounds();
        // Get corners of visible area
        const sw = bounds.getSW(); // Southwest (bottom-left)
        const ne = bounds.getNE(); // Northeast (top-right)

        const startLat = sw.lat(); // min latitude
        const startLng = sw.lng(); // min longitude
        const endLat = ne.lat(); // max latitude
        const endLng = ne.lng(); // max longitude
        const zoomLevel = map.getZoom();
        console.log(map.getZoom());
        console.log("Bounds:", {startLat, startLng, endLat, endLng});

        // Send to backend
        searchHotels(startLat, startLng, endLat, endLng, zoomLevel);
      };
      window.naver.maps.Event.addListener(map, 'bounds_changed', onBoundsChanged);

      onBoundsChanged();
    }
  }, [myLocation.latitude, myLocation.longitude]);

  const searchHotels = async (
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
    zoomLevel: number
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/hotel/markers?startLat=${startLat}&startLng=${startLng}&endLat=${endLat}&endLng=${endLng}&zoomLevel=${zoomLevel}`
    );
    const {data: hotels} = await response.json();

    markersRef.current.forEach((marker: any) => marker.setMap(null));
    markersRef.current = [];

    hotels.forEach((hotel: hotelType) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(hotel.latitude, hotel.longitude),
        map: mapRef.current,
        title: hotel.hotelName,
        icon: {
          content: `
              <div style="
                width: 44px;
                height: 44px !important;
                background: white;
                border-radius: 50%;
                border: 2px solid #FFFFFF;
                font-size: 12px;
                font-weight: bold;
                color: #333;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                background-image: url('/images/map/testMapImage.jpg');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                object-fit: contain;
                z-index: 15;
                position:relative;
              ">
                <div
                  style="
                    width: 40px;
                    height: 16px !important;
                    border-radius: 40px;
                    position:absolute;
                    bottom: -10px;
                    left: -3px;
                    background-color:#ffffff;
                    font-size:12px;
                    font-weight:500;
                    display:flex;
                    gap:5px;
                    align-items: center;
                    justify-content: center;
                  "
                >                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                  <img src='/icons/map/star.png'/>
                  4.7
                </div>
              </div>
            `,
          anchor: new window.naver.maps.Point(50, 30),
        },
      });
      markersRef.current.push(marker);
    });
  };
  // Debounce (500ms) – Don't search on every pixel movement
  // Bounds caching – Skip if bounds are same
  // requestAnimationFrame – Batch marker creation
  // Extract HTML – Avoid recreating marker HTML every time
  // Error handling – Catch fetch errors
  return (
    <>
      <div ref={mapContainer} className={"content"} style={{width: "100%", height: "100vh"}} />
    </>
  );
}
