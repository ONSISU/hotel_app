import MainHeader from "@/components/common/MainHeader";
import Map from "@/components/common/Map";
import SearchBar from "@/components/common/SearchBar";

export default function MapPage() {
  return (
    <>
      <div>
        <MainHeader title="Nearby Hotel" subIconType={2} />
        <SearchBar />
        <Map />
      </div>
    </>
  );
}
