// // src/types/auth.ts
// export default interface User {
//   _id: string; 
//   email: string;
//   // Hapus name
// }

// export default interface AuthResponse { 
//   token: string;
//   user: User;
// }

// src/types/auth.ts
export interface User {
  _id: string; 
  email: string;
  // Hapus name
}

export interface AuthResponse { 
  token: string;
  user: User;
}