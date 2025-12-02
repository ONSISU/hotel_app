export interface PopularHotel {
  hotelId: number; 
  location: string;
  name: string;
  tel: string;
  owner : string;
  imagePath? : string;
}
export interface PopularHotelApiResponse {
  data: PopularHotel[];
  message: string;
  statusCode: number;
}

export interface FavoriteHotel {
  hotelId: number; 
  location: string;
  name: string;
  tel: string;
  owner : string;
  imagePath? : string;
}
export interface FavoriteHotelApiResponse {
  data: FavoriteHotel[];
  message: string;
  statusCode: number;
}

export interface BestHotel {
  hotelId: number; 
  location: string;
  name: string;
  tel: string;
  owner : string;
  imagePath? : string;
}
export interface BestHotelApiResponse {
  data: BestHotel[];
  message: string;
  statusCode: number;
}