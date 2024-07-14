interface SearchButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SearchButton = (props: SearchButtonProps) => {
  return (
    <>
      <button onClick={props.onClick}>Search</button>
    </>
  );
};
