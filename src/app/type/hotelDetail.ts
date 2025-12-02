export interface HotelDetail {
  hotelId: number;
  pictureUrl: string | null; 
  location: string;
  latitude: number;
  longitude: number;
  ownHotelList: OwnHotel[];
  roomCounts : number;
}
export interface OwnHotel {
  ownHotelId: number;
  price: number;
  countRoom: number;
  checkInTime: string;
  checkOutTime: string;
  roomType: string;
  roomName: string;
  maxPerson: number;
  minPerson: number;
  pictureList: string[] | null; 
  createdAt: string;
  updatedAt: string;
}
export interface HotelDetailApiResponse {
  data: HotelDetail;
  message: string;
  statusCode: number;
}
