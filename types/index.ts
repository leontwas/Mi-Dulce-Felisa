// Tipos para imágenes de galería
export interface GalleryImage {
  id: string;
  name: string;
  description?: string;
  image: any; // Ajustar según el tipo de imagen en React Native
}

// Tipos para usuario
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

// Tipos para torta personalizada
export interface CustomCakeData {
  size: string;
  servings: number;
  fillings: string[];
  frostings: string[];
  decorations: string[];
  message: string;
  theme: string;
  name: string;
  email: string;
  phone: string;
  deliveryOption: 'delivery' | 'pickup';
  address?: string;
}

// Tipos para contextos
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string, address?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}