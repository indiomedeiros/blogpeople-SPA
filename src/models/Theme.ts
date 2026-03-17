import type Post from "./Post";

export default interface Theme {
  id: number;
  descricao: string;
  postagem?: Post[] | null;
}
