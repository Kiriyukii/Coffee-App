type CoffeesType = {
  _id: string;
  name: string;
  description: string;
  roasted: string;
  categories: string;
  imagelink_square: {
    public_id: string | any;
    url: string | any;
  };
  imagelink_portrait: {
    public_id: string | any;
    url: string | any;
  };
  ingredients: string;
  special_ingredient: string;
  prices: { size: string; price: number }[];
  average_rating: number;
  ratings_count: string;
  favorites: boolean;
  type: string;
};
type BeansType = {
  _id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: {
    public_id: string | any;
    url: string | any;
  };
  imagelink_portrait: {
    public_id: string | any;
    url: string | any;
  };
  ingredients: string;
  special_ingredient: string;
  prices: { size: string; price: number }[];
  average_rating: number;
  ratings_count: string;
  favorites: boolean;
  type: string;
};
