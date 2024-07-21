import { useDispatch, useSelector } from 'react-redux';
import { State, removeAll } from 'src/features';
import './style.css';
import { useCallback, useRef } from 'react';

export const Drawer = () => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const selectedItems = useSelector<
    State,
    State['itemsSelector']['items']
  >((state) => state.itemsSelector.items);

  const itemsNumber = Object.keys(selectedItems).length;
  const hasItems = itemsNumber !== 0;

  const forceHideDrawer = useCallback(() => {
    if (hasItems) {
      ref.current?.classList.toggle('forced');
    } else {
      ref.current?.classList.remove('forced');
    }
  }, [ref, hasItems]);

  const unselectAll = useCallback(() => {
    dispatch(removeAll());
  }, [dispatch]);

  return (
    <div
      className={`drawer ${hasItems ? 'opened' : 'closed'}`}
      ref={ref}
    >
      <button
        disabled={!hasItems}
        onClick={forceHideDrawer}
      >
        &gt;
      </button>
      <p>
        {itemsNumber} item
        {itemsNumber < 2 ? ' is' : 's are'} selected
      </p>
      <button onClick={unselectAll}>Unselect all</button>
      <button>Download</button>
    </div>
  );
};
