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
