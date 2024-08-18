import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../global-state';

export function Main() {
  const forms = useSelector((state: RootState) => state.forms.value);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/react-hook-form">React hook form</Link>
          </li>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled form</Link>
          </li>
        </ul>
      </nav>
      <div className="completed-forms">
        {forms.map((formData, index) => {
          return (
            <section key={index}>
              <p>{formData.name}</p>
              <p>{formData.age}</p>
              <p>{formData.email}</p>
              <p>{formData.password}</p>
              <p>{formData.country}</p>
              <p>{formData.gender}</p>
              <img src={formData.userpic}></img>
            </section>
          );
        })}
      </div>
    </>
  );
}
