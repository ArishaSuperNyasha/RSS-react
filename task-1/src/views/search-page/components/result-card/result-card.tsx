import { Link } from 'react-router-dom';
import { ItemsSelector } from 'src/features';
import { CharData } from 'src/services';

interface ResultCardProps {
  name: string;
  type: string;
  text: string;
  _id: number;
  data: CharData;
}

const onClick: React.MouseEventHandler<
  HTMLAnchorElement
> = (event) => {
  if (
    event.target &&
    (event.target as HTMLElement).closest('.items-selector')
  ) {
    event.preventDefault();
  }
};

export const ResultCard = (
  props: ResultCardProps
): JSX.Element => {
  const { name, type, text, _id, data } = { ...props };

  return (
    <Link to={`characters/${_id}`} onClick={onClick}>
      <section>
        <ItemsSelector data={data}></ItemsSelector>
        <h3>{name}</h3>
        <div>
          <h4>{type}</h4>
          <p>{text}</p>
        </div>
      </section>
    </Link>
  );
};
