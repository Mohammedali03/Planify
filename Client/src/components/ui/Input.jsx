const Input = ({
  id,
  name,
  type = "text",
  errors = "",
  onChange,
  ...inputProps
}) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        className={`${
          errors[name] ? "outline-red-500" : "outline-gray-300"
        } block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1
                  -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                  focus:outline-indigo-600 sm:text-sm/6`}
        onChange={onChange}
        {...inputProps}
      />
    </>
  );
};

export default Input;
