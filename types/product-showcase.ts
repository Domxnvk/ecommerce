export interface ProductShowcase {
  id: string;
  category: string;
  title: string;
  description?: string;
  image: string;
  isNew?: boolean;
  buttonText?: string;
  buttonAction?: string;
  user?: {
    name: string;
    avatar: string;
  };
}
