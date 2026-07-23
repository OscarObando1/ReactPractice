import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useTranslation } from "@i18n/context";
import {
  LogoIcon,
  MailIcon,
  TwitterIcon,
  FacebookIcon,
  YoutubeIcon,
} from "../icons/Icons";
import "./Footer.css";

/**
 * Page footer: brand, navigation blocks, newsletter subscription form,
 * language switcher, privacy list and social icons. Text is translated via the
 * i18n context; the language switcher updates the whole app's language.
 *
 * @param {object} props
 * @param {(lang:string) => void} [props.onLanguageChange]
 * @param {(email:string) => void} [props.onSubscribe]
 */
function Footer({ onLanguageChange, onSubscribe }) {
  const { t, language, setLanguage, languages } = useTranslation();
  const [email, setEmail] = useState("");

  const navBlocks = [
    { title: t("footer.product"), links: [t("footer.features"), t("footer.pricing")] },
    {
      title: t("footer.resources"),
      links: [t("footer.blog"), t("footer.userGuides"), t("footer.webinars")],
    },
    { title: t("footer.company"), links: [t("footer.about"), t("footer.contact")] },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubscribe?.(email.trim());
    setEmail("");
  };

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
    const selected = languages.find((l) => l.code === e.target.value);
    onLanguageChange?.(selected?.label ?? e.target.value);
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link className="footer__logo" to="/">
            <LogoIcon className="footer__logo-icon" />
            <span>learn</span>
          </Link>
        </div>

        <div className="footer__nav">
          {navBlocks.map((block) => (
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
          <h4 className="footer__block-title">{t("footer.newsletterTitle")}</h4>
          <p className="footer__subscribe-note">{t("footer.newsletterNote")}</p>
          <form className="footer__form" onSubmit={handleSubscribe}>
            <div className="footer__input">
              <MailIcon className="footer__input-icon" />
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label={t("footer.emailAria")}
              />
            </div>
            <Button type="submit" variant="prime" size="md">
              {t("footer.subscribe")}
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
              aria-label={t("footer.languageAria")}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <p className="footer__copy">
            {t("footer.rights")} · <a href="#">{t("footer.privacy")}</a> ·{" "}
            <a href="#">{t("footer.terms")}</a>
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
