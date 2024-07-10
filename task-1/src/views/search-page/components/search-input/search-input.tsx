interface SearchInputProps {
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onFocus?: React.FormEventHandler<HTMLInputElement>;
  onBlur?: React.FormEventHandler<HTMLInputElement>;
  inputRef?: (elem: HTMLInputElement) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  return (
    <>
      <input
        ref={props.inputRef}
        onInput={props.onInput}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        placeholder='Cinderella'
        type='text'
        autoFocus={true}
        autoSave='search'
      />
    </>
  );
};
