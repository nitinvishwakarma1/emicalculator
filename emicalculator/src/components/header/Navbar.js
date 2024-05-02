import logo from '../../assets/logo7.png';
import { Link } from 'react-router-dom';
export const NavbarComponent = () => {
    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand bg-light px-2 ay-0" to="#">
                    <img src={logo} alt="logo" width={50} height={50} className='d-block w-100' />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#emi_navbar" aria-controls="emi_navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="emi_navbar">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home Loan</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Personal Loan</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Car Loan</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </>);
}