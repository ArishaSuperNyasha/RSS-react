import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../global-state';
import '../styles/main.css';

export function Main() {
  const forms = useSelector((state: RootState) => state.forms.value);

  return (
    <>
      <nav>
        <h2>Navigation</h2>
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
        <h2>Completed forms</h2>
        {[...forms].reverse().map((formData, index) => {
          return (
            <section key={index}>
              <p>
                name: <span>{formData.name}</span>
              </p>
              <p>
                age: <span>{formData.age}</span>
              </p>
              <p>
                email: <span>{formData.email}</span>
              </p>
              <p>
                password: <span>{formData.password}</span>
              </p>
              <p>
                country: <span>{formData.country}</span>
              </p>
              <p>
                gender: <span>{formData.gender}</span>
              </p>
              <div className="img-container">
                <img src={formData.userpic}></img>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
