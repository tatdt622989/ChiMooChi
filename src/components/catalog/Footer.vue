<template>
  <footer>
    <div class="footer-body">
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-lg-4">
            <img src="@/assets/images/white-logo.svg" alt="logo-white">
            <p>奇木奇成立於2020年，已經有超過一年的歷史，將產品做到最好，是我們一直以來的原則。</p>
          </div>
          <div class="offset-xl-5 offset-lg-2 col-xl-4 col-lg-6 footer-nav">
            <ul>
              <li>
                <h4>聯絡我們</h4>
              </li>
              <li>
                <h4>關注我們</h4>
              </li>
            </ul>
            <div class="email">
              <span>chimoochi@example.com</span>
              <button>
                <span class="material-icons">mail_outline</span>
              </button>
            </div>
            <a href="#" class="instagram-logo"></a>
            <a href="#" class="facebook-logo"></a>
            <div class="phone">
              <span>0800-xxx-xxx</span>
              <button>
                <span class="material-icons">phone</span>
              </button>
            </div>
            <a href="#" class="youtube-logo"></a>
            <a href="#" class="twitter-logo"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>僅用於個人學習使用，非商業用途。</p>
      <p>©2020 ChiMooChi by <a href="http://6yuwei.tw/" target="_parent">6yuwei</a></p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  color: $footer-color;
}

.footer-body {
  .footer-nav {
    a {
      &:hover {
        opacity: 0.8;
      }
      height: 44px;
      width: 44px;
      background: no-repeat center/auto;
    }
    button {
    span {
      font-size: 30px;
      line-height: 44px;
    }
    &:focus {
      outline: 0;
    }
    &:hover {
      opacity: 0.8;
    }
    background-color: $footer-btn-bg-color;
    border: 0;
    height: 44px;
    padding: 0 7px 0 7px;
    width: 44px;
    }
    .email, .phone {
      align-items: center;
      display: flex;
      margin-right: 10px;
    }
    .facebook-logo {
      background-image: url("~@/assets/images/facebook-logo.svg");
      margin-right: -10px;
    }
    .instagram-logo {
      background-image: url("~@/assets/images/instagram-logo.svg");
      margin-right: 12px;
    }
    .twitter-logo {
      background-image: url("~@/assets/images/twitter-logo.svg");
      margin-right: -10px;
    }
    .youtube-logo {
      background-image: url("~@/assets/images/youtube-logo.svg");
      margin-right: 12px;
    }
    align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    text-align: right;
  }
  h4 {
    font-size: 20px;
    margin: 0;
  }
  img {
    margin-bottom: 18px;
  }
  span {
    color: $footer-btn-color;
  }
  ul {
    li {
      &:first-child {
        margin-right: 30px;
      }
    }
    display: flex;
    justify-content: flex-end;
    list-style: none;
    padding: 0;
    width: 100%;
  }
  background-color: $footer-about-bg-color;
  padding-top: 45px;
  padding-bottom: 45px;
  text-align: left;
}

.copyright {
  @include media-breakpoint-up (sm) {
    flex-direction: column;
  }
  @include media-breakpoint-up (xl) {
    p:nth-child(1) {
      margin-right: 16px;
    }
    flex-direction: row;
    padding: 16px 0 16px 0;
  }
  align-items: center;
  background-color: $footer-declaration-bg-color;
  display: flex;
  justify-content: center;
}
</style>
