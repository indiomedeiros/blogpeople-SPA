import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard/PostCard";
import { getRquest } from "../Services/Service";
import type Post from "../models/Post";
import { AuthContext } from "../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([] as Post[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userLogged } = useContext(AuthContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts() {
    setIsLoading(true);
    try {
      await getRquest(
        "/postagens",
        { headers: { Authorization: userLogged.token } },
        setPosts,
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  return (
    <main className="flex flex-col items-center gap-y-10 p-4 py-8">
      <div className="flex flex-col gap-2 ">
        <h2 className="text-4xl font-extrabold">Últimas Postagens</h2>
        <p className="text-xl text-gray-500">
          Explorando design, tecnologia e experiências cotidianas.
        </p>
      </div>
      <div className="flex items-center justify-center h-full">
        {isLoading && <ClipLoader color="#0f3ab9" size={128} />}
      </div>
      {posts.length > 0 &&
        posts.map((item) => {
          return (
            <PostCard
              category={item.tema!.descricao}
              date={item.data}
              img={""}
              title={item.titulo}
              text={item.texto}
              photo={item.usuario!.foto}
              userName={item.usuario!.nome}
            />
          );
        })}
    </main>
  );
}

export default FeedPage;
