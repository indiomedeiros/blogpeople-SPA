import type Theme from "./Theme";
import type User from "./User";

export default interface Post {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  tema: Theme | null;
  usuario: User | null;
}
