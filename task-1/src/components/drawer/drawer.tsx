import { useSelector } from 'react-redux';
import { State } from 'src/features';
import './style.css';
import { useCallback, useRef } from 'react';

export const Drawer = () => {
  const ref = useRef<HTMLDivElement>(null);

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
      <button>Unselect all</button>
      <button>Download</button>
    </div>
  );
};
