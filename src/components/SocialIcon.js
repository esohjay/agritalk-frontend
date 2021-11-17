import React from "react";
import {
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  // FaHeart,
} from "react-icons/fa";
function SocialIcon({ twitter, facebook, whatsapp, instagram }) {
  const whatsappLink = () => {
    window.location.href = `https://wa.me/${whatsapp}`;
  };
  const twitterLink = () => {
    window.location.href = `https://twitter.com/${twitter}`;
  };
  const instagramLink = () => {
    window.location.href = `https://instagram.com/${instagram}`;
  };
  const facebookLink = () => {
    window.location.href = `https://facebook.com/${facebook}`;
  };
  return (
    <>
      {(facebook || whatsapp || twitter || instagram) && (
        <div className="author-social-icons">
          {facebook && (
            <i onClick={facebookLink} className="facebook">
              <FaFacebook />
            </i>
          )}
          {instagram && (
            <i onClick={instagramLink} className="instagram">
              <FaInstagram />
            </i>
          )}
          {twitter && (
            <i onClick={twitterLink} className="twitter">
              <FaTwitter />
            </i>
          )}
          {whatsapp && (
            <i onClick={whatsappLink} className="whatsapp">
              <FaWhatsapp />
            </i>
          )}
        </div>
      )}
    </>
  );
}

export default SocialIcon;
