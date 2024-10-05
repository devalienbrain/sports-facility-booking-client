export type TFacility = {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
  imageUrl: string;
};
export type TFacilities = {
  data: TFacility;
};
