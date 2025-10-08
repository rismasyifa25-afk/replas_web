
function ButtonExternal(props:any) {
  const {
    children = "...",
    variant = "",
    onClick = () => {},
    type = "button",
  } = props;
  return (
    <button
      className={`${variant} cursor-pointer`}
      type={type}
      onClick={() => onClick(onClick)}
    >
      {children}
    </button>
  );
}

export default ButtonExternal;
