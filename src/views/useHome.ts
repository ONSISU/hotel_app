import {useEffect, useState} from "react";
import {BestHotel, BestHotelApiResponse, FavoriteHotel, FavoriteHotelApiResponse} from "@/app/type/home";
import {SearchType, SearchTypeApiResponse} from "@/app/type/searchType";
import axios from "axios";

export default function useHome() {
	const [isRecommend, setIsRecommend] = useState('ALL');
	//const [popularHotelData, setPopularHotelData] = useState<PopularHotel[]>([]);
	const [favoriteHotelData, setFavoriteHotelData] = useState<FavoriteHotel[]>([]);
	const [bestHotelData, setBestHotelData] = useState<BestHotel[]>([]);
	const [typeList, setTypeList] = useState<SearchType[]>([]);
	const availableTypes: string[] = ['HOTEL', 'VILLA', 'APT', 'MOTEL'];
	const pageAddress = "http://tomhoon.my:33000";
	const [isScrolled, setIsScrolled] = useState(false);
	// 로딩
	const [isLoading, setIsLoading] = useState<boolean>(false);
	
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 70) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	
	useEffect(() => {
		// const popularHotel = async () => {
		//   try {
		//     const response = await axios.get<PopularHotelApiResponse>('http://tomhoon.my:33000/api/v1/hotel/popular');
		//     const popularHotelList: PopularHotel[] = response.data.data;
		//     setPopularHotelData(popularHotelList);
		//   } catch (error) {
		//     console.error('데이터 가져오기 에러:', error);
		//     setPopularHotelData([]);
		//   }
		// }
		const favoriteHotel = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get<FavoriteHotelApiResponse>('/api-proxy/api/v1/hotel/popular');
				const favoriteHotelList: FavoriteHotel[] = response.data.data;
				setFavoriteHotelData(favoriteHotelList);
				setIsLoading(false);
			} catch (error) {
				console.error('데이터 가져오기 에러:', error);
				setFavoriteHotelData([]);
			}
		}
		const bestHotel = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get<BestHotelApiResponse>('/api-proxy/api/v1/hotel/popular');
				const bestHotelList: BestHotel[] = response.data.data;
				setBestHotelData(bestHotelList);
				setIsLoading(false);
			} catch (error) {
				console.error('데이터 가져오기 에러:', error);
				setBestHotelData([]);
			}
		}
		// popularHotel();
		favoriteHotel();
		bestHotel();
		recommendItem("ALL");
	}, []);
	
	const recommendItem = async (type:string) => {
		setIsRecommend(type);
		try {
			setIsLoading(true);
			if (type === 'ALL') {
				const randomIndex = Math.floor(Math.random() * availableTypes.length);
				type = availableTypes[randomIndex]; // 랜덤으로 타입 선택
			}
			const response = await axios.get<SearchTypeApiResponse>(`/api-proxy/api/v1/hotel/search`
				, {
					params: {
						type: type
					}
				});
			setTypeList(response.data.data.content);
			console.log(`${type} 데이터:`, response.data);
			setIsLoading(false);
		} catch (error) {
			console.error(`Error fetching ${type} data:`, error);
			setTypeList([])
		}
	};
	
	return {
		recommendItem,
		isRecommend,
		favoriteHotelData,
		bestHotelData,
		typeList,
		pageAddress,
		isScrolled,
		isLoading
	}
}