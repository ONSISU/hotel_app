declare global {
  interface Window {
    naver: {
      maps: {
        Map: MapConstructor;
        LatLng: LatLngConstructor;
        Marker: MarkerConstructor;
        Event: EventConstructor;
        Point: PointConstructor; // Add this
        InfoWindow: InfoWindowConstructor; // Add this too
      };
    };
  }
}
interface PointConstructor {
  new (x: number, y: number): Point;
}

interface Point {
  x: number;
  y: number;
}

interface InfoWindowConstructor {
  new (options: InfoWindowOptions): InfoWindow;
}

interface InfoWindow {
  open(map: MapInstance, marker?: Marker): void;
}

interface InfoWindowOptions {
  content?: string;
}
interface MapConstructor {
  new (container: HTMLElement, options: MapOptions): MapInstance;
}

interface MapInstance {
  getCenter(): LatLngLiteral;
  setCenter(center: LatLngLiteral): void;
  getBounds(): Bounds;
  getZoom(): number;
}

interface Bounds {
  getSW(): LatLng;
  getNE(): LatLng;
}

interface EventConstructor {
  addListener(target: MapInstance, eventName: string, callback: (event: any) => void): void;
}

interface LatLngConstructor {
  new (lat: number, lng: number): LatLng;
}

interface LatLng {
  lat(): number;
  lng(): number;
}

interface MapOptions {
  center: LatLng;
  zoom: number;
}

interface MarkerConstructor {
  new (options: MarkerOptions): Marker;
}

interface MarkerOptions {
  position?: LatLng;
  title?: string;
  map?: MapInstance; // Add this
  icon?: MarkerIcon; // Add this too
}
interface Marker {
  setMap(map: MapInstance | null): void;
  getPosition(): LatLng;
}
interface MarkerIcon {
  content?: string;
  anchor?: Point;
}

interface Point {
  x: number;
  y: number;
}

interface LatLngLiteral {
  lat: number;
  lng: number;
}

export {};
