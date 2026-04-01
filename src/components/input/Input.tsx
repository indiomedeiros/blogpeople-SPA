type InputProps = {
  id: string;
  inputText: string;
  type: string;
  inputName: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: string;
  alt?: string;
};

function Input(props: InputProps) {
  return (
    <div className="flex flex-col  gap-2 ">
      <label htmlFor={props.id}>{props.inputText}</label>
      <div className=" flex flex-col relative">
        <input
          id={props.id}
          type={props.type}
          name={props.inputName}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className="  border rounded border-gray-300 py-3.5 px-12"
          required
        />
        <img
          className="absolute left-4 top-3"
          src={props.icon}
          alt={props.alt}
        />
      </div>
    </div>
  );
}

export default Input;
