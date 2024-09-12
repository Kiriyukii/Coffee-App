type onBoardingSwiperDataType = {
  id: number;
  title: string;
  description: string;
  image: any;
};
type User = {
  id: string;
  name: string;
  email: string;
  avatar?: {
    public_id: string | any;
    url: string | any;
  };
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};
type BannerDataTypes = {
  bannerImageUrl: any;
};
