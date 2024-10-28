import "./footer.css";
import { FaGithub, FaLinkedin, FaCodepen } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer py-4">
      <div>
        &#9829; made by
        <a
          href="https://www.instagram.com/haciogluerayy/"
          target="_blank"
          rel="noreferrer"
          className="footer_link"
        >
          &nbsp;@erayhacioglu
        </a>
      </div>
      <div style={{ marginTop: "20px" }}>
        <a
          href="https://github.com/erayhacioglu"
          target="_blank"
          className="footer_link"
          rel="noreferrer"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://codepen.io/erayhacioglu"
          target="_blank"
          className="footer_link"
          rel="noreferrer"
          style={{ margin: "0 20px" }}
        >
          <FaCodepen size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/eray-hac%C4%B1o%C4%9Flu/"
          target="_blank"
          className="footer_link"
          rel="noreferrer"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
