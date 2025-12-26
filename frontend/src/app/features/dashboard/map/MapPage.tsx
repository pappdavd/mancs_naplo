import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Play, Square, Navigation } from 'lucide-react';
import Button from '../../../../marketing/shared/components/Button';
import { logActivity } from '../../../services/logger';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RecenterAutomatically = ({ lat, lng }: { lat: number, lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

export const MapPage = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [path, setPath] = useState<[number, number][]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const watchId = useRef<number | null>(null);
  const timerId = useRef<any>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("GPS Hiba:", err);
        alert("Nem sikerült lekérni a pozíciót. Engedélyezd a helymeghatározást a böngészőben!");
      },
      { enableHighAccuracy: true }
    );

    return () => {
        stopTracking();
    };
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const startTracking = () => {
    setIsTracking(true);
    setPath([]);
    setDistance(0);
    setElapsedTime(0);

    timerId.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
    }, 1000);

    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newLat = pos.coords.latitude;
          const newLng = pos.coords.longitude;
          const newPos: [number, number] = [newLat, newLng];

          setPosition(newPos);
          
          setPath(prevPath => {
             if (prevPath.length > 0) {
                 const lastPoint = prevPath[prevPath.length - 1];
                 const dist = calculateDistance(lastPoint[0], lastPoint[1], newLat, newLng);
                 if (dist > 2) { 
                     setDistance(prevDist => prevDist + dist);
                     return [...prevPath, newPos];
                 }
                 return prevPath;
             }
             return [newPos];
          });
        },
        (err) => console.error("GPS Hiba séta közben:", err),
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
      );
    }
  };

  const stopTracking = async () => {
    if (!isTracking) return;
    
    setIsTracking(false);
    if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    if (timerId.current) clearInterval(timerId.current);

    const km = (distance / 1000).toFixed(2);
    const minutes = Math.floor(elapsedTime / 60);
    
    if (distance > 10) {
        await logActivity(1, 'walk', `Séta befejezve: ${km} km (${minutes} perc)`);
        alert(`Szép séta! Megtettél ${km} kilométert.`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="h-[calc(100vh-100px)] relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
      
      {position ? (
          <MapContainer center={position} zoom={15} scrollWheelZoom={true} className="w-full h-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker position={position}>
              <Popup>Itt vagy most! 🐶</Popup>
            </Marker>
            
            <Polyline positions={path} color="orange" weight={5} opacity={0.7} />

            <RecenterAutomatically lat={position[0]} lng={position[1]} />
          </MapContainer>
      ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
             <div className="text-center">
                <Navigation className="mx-auto mb-2 animate-pulse" size={40} />
                <p>GPS jel keresése...</p>
             </div>
          </div>
      )}

      {/* VEZÉRLŐPULT */}
      {/* JAVÍTVA: z-[1000] helyett z-1000 */}
      <div className="absolute bottom-6 left-6 right-6 z-1000">
         <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200 flex items-center justify-between">
            
            <div className="flex gap-6">
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Távolság</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {(distance / 1000).toFixed(2)} <span className="text-sm font-normal text-gray-600">km</span>
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Idő</p>
                    <p className="text-2xl font-bold text-gray-900 font-mono">
                        {formatTime(elapsedTime)}
                    </p>
                </div>
            </div>

            {!isTracking ? (
                <Button 
                    onClick={startTracking} 
                    className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 pl-1"
                >
                    <Play size={24} fill="currentColor" />
                </Button>
            ) : (
                <Button 
                    onClick={stopTracking} 
                    className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30"
                >
                    <Square size={24} fill="currentColor" />
                </Button>
            )}
         </div>
      </div>

    </div>
  );
};