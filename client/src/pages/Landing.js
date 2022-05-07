import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import {Logo } from "../components/index"
import {Link } from "react-router-dom"
const Landing = () => {
  return (
    <Wrapper>
      <nav>
          <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby intelligentsia kale chips kickstarter sustainable, brunch
            DSA gochujang plaid DIY franzen enamel pin readymade glossier
            schlitz meggings. Banh mi VHS gluten-free, hella poutine deep v man
            braid sustainable ennui kinfolk retro PBR&B meh typewriter. Franzen
            cold-pressed authentic skateboard coloring book bitters organic man
            bun everyday carry woke succulents sartorial kickstarter plaid. Pok
            pok mumblecore fashion axe irony succulents deep v meggings.
            Wayfarers snackwave green juice dreamcatcher, praxis ennui scenester
            typewriter.
          </p>
          <Link to = "/register" className="btn btn-hero" > Login/Register </Link>
        </div>
        <img src={main} alt="Job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
