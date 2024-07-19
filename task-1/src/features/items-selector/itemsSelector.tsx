import { useDispatch, useSelector } from 'react-redux';
import { State, addItem } from '.';

interface ItemsSelectorProps {
  data: object;
}

export const ItemsSelector = (
  props: ItemsSelectorProps
) => {
  const items = useSelector<State>(
    (state) => state.itemsSelector.items
  );
  const dispatch = useDispatch();

  return (
    <input
      type='checkbox'
      onChange={() => {
        dispatch(addItem(props.data));
        console.log(items);
      }}
    />
  );
};
