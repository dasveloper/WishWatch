import React from "react";
import icon from "../assets/images/wand-icon.svg";
import heroProdImage1 from "../assets/images/photo_camera_1.svg";
import heroProdImage2 from "../assets/images/watch.svg";
import heroProdImage3 from "../assets/images/computer.svg";

const heroImages = [
  { imageSrc: heroProdImage1, color: "#00B14F" },
  { imageSrc: heroProdImage2, color: "#FF3D1E" },
  { imageSrc: heroProdImage3, color: "#781EA7" }
];
class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroImageIndex: 0,
      heroImage: heroImages[0],
      intervalId: null
    };
    this.timer = this.timer.bind(this);
  }
  componentDidMount() {
    var intervalId = setInterval(this.timer, 2000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  timer() {
    let newHeroImage =
      this.state.heroImageIndex === heroImages.length - 1
        ? 0
        : this.state.heroImageIndex + 1;
    // setState method is used to update the state
    this.setState({
      heroImageIndex: newHeroImage,
      heroImage: heroImages[newHeroImage]
    });
  }
  render() {
    let { heroImage } = this.state;
    let { imageSrc, color } = heroImage;
    return (
      <div className={`browser ${this.props.loaded ? "loaded" : ""}`}>
        <div className="browser-header">
          <div className="browser-button red" />
          <div className="browser-button yellow" />
          <div className="browser-button green" />
        </div>
        <div className="main">
          <div className="main-left">
            <div style={{ backgroundColor: color }} className="hero">
              <img alt="browser product mockup" src={imageSrc} />
            </div>
            <div className="wrapper">
              <span className="beacon" />
              <span className="beacon" />
              <span className="beacon" />
              <span className="beacon" />
              <span className="beacon blink">
                <img alt= "wishwatch social icon" src={icon} />
              </span>
            </div>
          </div>
          <div className="main-right hidden-sm">
            <div className="prod-name" />
            <div className="sub-title" />
            <div className="text-line" />
            <div className="text-line" />
            <div className="text-line" />
            <div className="column-wrapper">
              <div className="left-column">
                <div className="text-line" />
                <div className="text-line" />
                <div className="text-line" />
              </div>
              <div className="right-column" />
            </div>
            <div className="buyButton" />
          </div>
        </div>
      </div>
    );
  }
}
export default Browser;
