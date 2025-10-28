// Tipos para productos/tortas
export interface Cake {
  id: string;
  name: string;
  price: number;
  description: string;
  image: any; // Ajustar según el tipo de imagen en React Native
}

// Tipos para el carrito
export interface CartItem extends Cake {
  quantity: number;
}

// Tipos para usuario
export interface User {
  id: string;
  name: string;
  email: string;
}

// Tipos para contextos
export interface CartContextType {
  cart: CartItem[];
  addToCart: (cake: Cake) => void;
  removeFromCart: (cakeId: string) => void;
  clearCart: () => void;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>; 
}