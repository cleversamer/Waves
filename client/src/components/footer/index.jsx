import { Contacts, Timelapse, Phone, Email } from "@material-ui/icons";

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container footer-container">
        <div className="logo">WAVES</div>

        <div className="wrapper">
          <div className="left">
            <h2>Contact information</h2>

            <div className="business_nfo">
              <div className="tag">
                <Contacts />
                <div className="nfo">
                  <div>Address</div>
                  <div>Some street 222</div>
                </div>
              </div>

              <div className="tag">
                <Timelapse />
                <div className="nfo">
                  <div>Phone</div>
                  <div>+972 59-736-7603</div>
                </div>
              </div>

              <div className="tag">
                <Phone />
                <div className="nfo">
                  <div>Working hours</div>
                  <div>always closed</div>
                </div>
              </div>

              <div className="tag">
                <Email />
                <div className="nfo">
                  <div>Email</div>
                  <div>thedev.samer@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <h2>Be the first to know</h2>
            <div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
