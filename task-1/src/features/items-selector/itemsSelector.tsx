import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '.';
import { useEffect, useRef } from 'react';
import { State } from '../stateInterface';

interface ItemsSelectorProps {
  data: {
    _id: number;
  };
}

export const ItemsSelector = (
  props: ItemsSelectorProps
) => {
  const ref = useRef() as React.RefObject<HTMLInputElement>;

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
    } else {
      dispatch(removeItem(props.data._id));
    }
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.checked = checkIsItemInStore(
      props.data._id
    );
  });

  return (
    <input ref={ref} type='checkbox' onClick={onClick} />
  );
};
