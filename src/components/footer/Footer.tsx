import "./footer.css";
import linkedin from "../../assets/footer/linkedin.png";
import instagram from "../../assets/footer/instagram.png";
import twitter from "../../assets/footer/twitter.png";
import github from "../../assets/footer/github.png";

export const Footer = () => {
    return (
        <div>
            <div className="footer-bar">
                <footer className="footer-content">
                    <span> Created with ❤ by </span>
                    <a className="link-style" href="https://mohammadsa.netlify.app/">
                        Mohammad S{""}
                    </a>
                    <br />
                    <div className="footer-align">
                        <div>
                            <a href="https://www.linkedin.com/in/themohammadsa/">
                                <img alt="linkedin" className="icon-footer" src={linkedin} />

                                <a href="https://www.instagram.com/themohammadsa/">
                                    <img alt="instagram" className="icon-footer" src={instagram} />
                                </a>
                            </a>
                            <a href="https://github.com/themohammadsa">
                                <img alt="github" className="icon-footer" src={github} />
                            </a>
                            <a href=" https://twitter.com/themohammadsa">
                                <img alt="twitter" className="icon-footer" src={twitter} />
                            </a>
                        </div>
                        <p>© 2021 gortiQuiz </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};
