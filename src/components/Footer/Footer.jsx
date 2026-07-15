import { useState } from "react";
import Button from "../Button/Button";
import {
  LogoIcon,
  MailIcon,
  TwitterIcon,
  FacebookIcon,
  YoutubeIcon,
} from "../icons/Icons";
import "./Footer.css";

const NAV_BLOCKS = [
  { title: "Product", links: ["Features", "Pricing"] },
  { title: "Resources", links: ["Blog", "User guides", "Webinars"] },
  { title: "Company", links: ["About us", "Contacts us"] },
];

const LANGUAGES = ["English", "Español", "Deutsch", "Français"];

/**
 * Page footer: brand, navigation blocks, newsletter subscription form,
 * language switcher, privacy list and social icons.
 *
 * @param {object} props
 * @param {(lang:string) => void} [props.onLanguageChange]
 * @param {(email:string) => void} [props.onSubscribe]
 */
function Footer({ onLanguageChange, onSubscribe }) {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubscribe?.(email.trim());
    setEmail("");
  };

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
    onLanguageChange?.(e.target.value);
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a className="footer__logo" href="#home">
            <LogoIcon className="footer__logo-icon" />
            <span>learn</span>
          </a>
        </div>

        <div className="footer__nav">
          {NAV_BLOCKS.map((block) => (
            <div className="footer__block" key={block.title}>
              <h4 className="footer__block-title">{block.title}</h4>
              <ul>
                {block.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__subscribe">
          <h4 className="footer__block-title">Subscribe to our newsletter</h4>
          <p className="footer__subscribe-note">
            For product announcements and exclusive insights
          </p>
          <form className="footer__form" onSubmit={handleSubscribe}>
            <div className="footer__input">
              <MailIcon className="footer__input-icon" />
              <input
                type="email"
                placeholder="Input your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
            </div>
            <Button type="submit" variant="prime" size="md">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <div className="footer__lang">
            <select
              value={language}
              onChange={handleLanguage}
              aria-label="Select language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <p className="footer__copy">
            © 2023 Learn, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a>
          </p>

          <div className="footer__social">
            <a href="#" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="#" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="YouTube">
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
