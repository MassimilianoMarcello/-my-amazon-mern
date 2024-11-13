import PropTypes from 'prop-types';

import './Header.css';

const Header = ({ title }) => {
    return (
        <header>
            <img src="/a-maison-logo.png" alt="" />
            <h1>{title}</h1>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string
};

export default Header;
