type CoffeesType = {
  _id: string;
  name: string;
  description: string;
  roasted: string;
  categories: string;
  imagelink_square: string;
  imagelink_portrait: string;
  ingredients: string;
  special_ingredient: string;
  prices: { size: string; price: number };
  average_rating: number;
  ratings_count: string;
  favorites: boolean;
  type: string;
  handlePressButton?: any;
};
