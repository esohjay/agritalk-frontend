import React from "react";

function Footer() {
  return (
    <div>
      <footer>
        <div class="content">
          <div class="left box">
            <div class="upper">
              <div class="topic">About us</div>
              <p>
                AgriTalk is a platform where lovers of agriculture and food
                production shares their views concerning latest trends in
                agricultural and food production industry.
              </p>
            </div>
            <div class="lower">
              <div class="topic">Contact Admin</div>
              <div class="phone">
                <>
                  <i class="fas fa-phone-volume"></i>+2348130680557
                </>
              </div>
              <div class="email">
                <>
                  <i class="fas fa-envelope"></i>oluseye.olusoji@gmail.com
                </>
              </div>
            </div>
          </div>
          <div class="middle box">
            <div class="topic">Enquiries</div>
          </div>

          <div class="right box">
            <div class="topic">Subscribe us</div>
          </div>
        </div>
        <div class="bottom">
          <p>
            Copyright © 2020 <>AgriTalk</> All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
