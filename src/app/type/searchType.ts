export interface SearchType {
  hotelId: number;
  hotelType: string;
  hotelName: string;
  businessNumber: number;
  registNumber: number;
  price: number;
  maxPrice: number;
  hotelPictureList: string[] | null;
  minPrice: number;
  location: string;
  ownHotelList: OwnHotel[];
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
  platform_discount: number;
  owner_discount: number;
}
export interface SearchTypeApiResponse {
  data: {
    content: SearchType[]; 
  }
  message: string;
  statusCode: number;
}
