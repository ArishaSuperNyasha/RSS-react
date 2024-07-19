import { useDispatch, useSelector } from 'react-redux';
import { State, addItem, removeItem } from '.';

interface ItemsSelectorProps {
  data: {
    _id: number;
  };
}

export const ItemsSelector = (
  props: ItemsSelectorProps
) => {
  const items = useSelector<
    State,
    State['itemsSelector']['items']
  >((state) => state.itemsSelector.items);
  const dispatch = useDispatch();

  const checkIsItemInStore = (id: number): boolean => {
    return items[id] !== undefined;
  };

  const onClick: React.MouseEventHandler<
    HTMLInputElement
  > = (event) => {
    event.stopPropagation();

    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      dispatch(addItem(props.data));
      checkbox.checked = true;
    } else {
      dispatch(removeItem(props.data._id));
      checkbox.checked = false;
    }
  };

  return (
    <input
      type='checkbox'
      checked={checkIsItemInStore(props.data._id)}
      onClick={onClick}
    />
  );
};
