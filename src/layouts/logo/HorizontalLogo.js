import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import LogoDarkText from '../../assets/images/logos/logo-text.png';
import LogoWhiteText from '../../assets/images/logos/logo-light-text.png';

const HorizontalLogo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const activetopbarBg = useSelector((state) => state.customizer.topbarBg);
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {isDarkMode || activetopbarBg !== 'white' ? (
        <>
          {/* <LogoWhiteIcon /> */}
          <img src={LogoWhiteText} className="d-none d-lg-block" alt='logo-text' style={{width:'200px'}} />
        </>
      ) : (
        <>
          {/* <LogoDarkIcon /> */}
          <img src={LogoDarkText} className="d-none d-lg-block" alt='logo-text' style={{width:'200px'}} />
        </>
      )}
    </Link>
  );
};

export default HorizontalLogo;
