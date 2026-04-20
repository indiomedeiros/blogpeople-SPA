interface Props {
  title: string;
  text: string;
  date: string;
  photo: string;
  userName: string;
  img: string;
  category: string;
  onclick?: () => void;
}

function PostCard({
  title,
  text,
  date,
  photo,
  userName,
  img,
  category,
  onclick,
}: Props) {
  return (
    <article className="flex flex-col container border-2 border-gray-100 bg-white rounded-2xl w-full ">
      <img
        className="rounded-t-2xl w-full h-50"
        src={img}
        alt="Imagem do cartao"
      />
      <div className="flex flex-col p-6 gap-4">
        <div className="flex justify-between items-center">
          <p className="bg-sky-100 px-2 text-blue-600 font-bold  rounded text-md">
            {category.toUpperCase()}
          </p>
          <p className="text-gray-400 font-medium text-xs">{date}</p>
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg text-gray-500 border-b border-gray-200 pb-4">
          {text}
        </p>
      </div>

      <div className="flex justify-between px-5 pb-5">
        <div className="flex gap-4 items-center">
          <img
            className=" size-10 rounded-4xl "
            src={photo}
            alt="Foto do usuário"
          />
          <p>{userName}</p>
        </div>
        <button
          onClick={onclick}
          className="bg-blue-600 text-white py-2 px-5 rounded-lg font-bold"
        >
          Ler mais
        </button>
      </div>
    </article>
  );
}

export default PostCard;
