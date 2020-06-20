<template>
  <footer>
    <div class="footer-body">
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-lg-4 col-md-5 col-12">
            <img src="@/assets/images/white-logo.svg" alt="logo-white" />
            <p>奇木奇成立於2020年，已經有超過一年的歷史，將產品做到最好，是我們一直以來的原則。</p>
          </div>
          <div class="offset-xl-5 offset-lg-2 col-xl-4 col-lg-6 col-md-7 col-12 footer-nav">
            <h4>聯絡我們</h4>
            <h4>關注我們</h4>
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
      <p>
        ©2020 ChiMooChi by
        <a href="http://6yuwei.tw/" target="_parent">6yuwei</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  color: $footer-color;
}

.footer-body {
  @include media-breakpoint-up(xs) {
    img {
      margin-bottom: 16px;
    }
    p {
      margin-bottom: 16px;
    }
    .footer-nav {
      .email,.phone {
        flex-basis: 100%;
        justify-content: center;
        margin: 0;
      }
      .email {
        order: 1;
      }
      .phone {
        order: 2;
      }
      h4 {
        margin:  20px 0 12px 0;
        &:nth-last-of-type(1){
          order: 3;
        }
        flex-basis: 100%;
      }
      a {
        margin-right: 30px;
        order: 4;
      }
      .twitter-logo{
        margin-right: 0;
      }
      align-items: center;
      justify-content: center;
    }
    padding-top: 28px;
    padding-bottom: 22px;
    text-align: center;
  }
  @include media-breakpoint-up(md) {
    img {
      margin-bottom: 6px;
    }
    p {
      margin-top: 18px;
      margin-bottom: 6px;
    }
    .footer-nav {
      .email,.phone {
        flex-basis: auto;
        justify-content: flex-end;
        margin-right: 10px;
        order: 0;
      }
      h4 {
        &:nth-last-of-type(1){
          order: 0;
        }
        flex-basis: auto;
        margin: 0 0 0 30px
      }
      .facebook-logo, .twitter-logo {
        margin-right: -10px;
      }
      .instagram-logo, .youtube-logo {
        margin-right: 12px;
      }
      a {
        order: 0;
      }
      align-items: flex-end;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
    padding-top: 45px;
    padding-bottom: 39px;
    text-align: left;
  }
  @include media-breakpoint-up(lg) {
  }
  @include media-breakpoint-up(xl) {
  }
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
    .email,.phone {
      align-items: center;
      display: flex;
    }
    .facebook-logo {
      background-image: url("~@/assets/images/facebook-logo.svg");
    }
    .instagram-logo {
      background-image: url("~@/assets/images/instagram-logo.svg");
    }
    .twitter-logo {
      background-image: url("~@/assets/images/twitter-logo.svg");
    }
    .youtube-logo {
      background-image: url("~@/assets/images/youtube-logo.svg");
    }
    display: flex;
    flex-wrap: wrap;
  }
  h4 {
    font-size: 20px;
  }
  span {
    color: $footer-btn-color;
  }
  background-color: $footer-about-bg-color;
}

.copyright {
  @include media-breakpoint-up(xs) {
    flex-direction: row;
    padding: 14px 0 14px 0;
  }
  @include media-breakpoint-up(md) {
    p:nth-child(1) {
      margin-right: 14px;
    }
    flex-direction: row;
  }
  @include media-breakpoint-up(xl) {
    p:nth-child(1) {
      margin-right: 16px;
    }
    padding: 16px 0 16px 0;
  }
  align-items: center;
  background-color: $footer-declaration-bg-color;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
