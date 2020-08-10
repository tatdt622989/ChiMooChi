<template>
  <footer class="container">
    <div class="footer-body">
      <div class="footer-content">
        <img src="@/assets/images/white-logo.svg" alt="logo-white"/>
        <p class="w-100 mb-0">奇木奇成立於2020年，已經有超過一年的歷史，將產品做到最好，是我們一直以來的原則。</p>
      </div>
      <div class="footer-nav">
        <div class="contact">
          <h4>聯絡我們</h4>
          <div class="email">
            <p class="mr-12 my-0">chimoochi@example.com</p>
            <button>
              <font-awesome-icon :icon="['fas', 'envelope-square']" />
            </button>
          </div>
          <div class="phone">
            <p class="mr-12 my-0">0800-xxx-xxx</p>
            <button>
              <font-awesome-icon :icon="['fas', 'phone-square']" />
            </button>
          </div>
        </div>
        <div class="about">
          <h4>關注我們</h4>
          <div class="btn-group">
            <a href="#" class="instagram-logo">
            <font-awesome-icon :icon="['fab', 'instagram-square']" />
            </a>
            <a href="#" class="youtube-logo">
              <font-awesome-icon :icon="['fab', 'youtube-square']" />
            </a>
            <a href="#" class="facebook-logo">
              <font-awesome-icon :icon="['fab', 'facebook-square']" />
            </a>
            <a href="#" class="twitter-logo">
              <font-awesome-icon :icon="['fab', 'twitter-square']" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>僅用於個人學習使用，非商業用途。</p>
      <p>
        ©2020 ChiMooChi by
        <a class="text-tertiary font-weight-bold" href="http://6yuwei.tw/" target="_parent">6yuwei</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  color: $footer-color;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
}

.footer-body {
  @include media-breakpoint-up(xs) {
    img {
      margin-bottom: 16px;
    }
    p {
      margin-bottom: 16px;
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
    align-items: center;
    display: flex;
    height: 284px;
    justify-content: space-between;
    padding-top: 45px;
    padding-bottom: 39px;
    text-align: left;
  }
  h4 {
    font-size: 20px;
  }
  span {
    color: $footer-btn-color;
  }
  background-color: $footer-about-bg-color;
}

.footer-content {
  @include media-breakpoint-up(xs){
    justify-content: center;
    margin:  0 16px 24px 16px;
  }
  @include media-breakpoint-up(md) {
    justify-content: flex-start;
    margin:  0 0 16px 16px;
    width: 200px;
  }
  @include media-breakpoint-up(lg){
    margin-left: 24px;
    width: 300px;
  }
  display: flex;
  flex-wrap: wrap;
}

.footer-nav {
  @include media-breakpoint-up(xs) {
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
    a {
      margin-right: 30px;
      order: 4;
    }
    .twitter-logo{
      margin-right: 0;
    }
    .contact, .about {
      h4 {
        text-align: center;
        width: 100%;
      }
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 24px;
      width: 100%;
    }
    align-items: center;
    justify-content: center;
  }
  @include media-breakpoint-up(md) {
    .email,.phone {
        flex-basis: auto;
        justify-content: flex-end;
        margin-right: 24px;
        order: 0;
    }
    .youtube-logo, .twitter-logo {
      margin-right: -10px;
    }
    .instagram-logo, .facebook-logo {
      margin-right: 12px;
    }
    a {
      order: 0;
    }
    .contact, .about {
      h4 {
        text-align: center;
        width: 100%;
      }
      margin-bottom: 0;
    }
    .about {
      width: 100px;
    }
    .contact {
      h4 {
        margin-right: 32px;
        text-align: right;
      }
      display: flex;
      justify-content: flex-end;
      width: 300px;
    }
    align-items: flex-end;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    margin-right: 6px;
  }
  @include media-breakpoint-up(lg){
    margin-right: 14px;
  }
  a, button {
    color: #fff;
    font-size: 28px;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  a {
    &:hover {
      opacity: 0.8;
    }
    background: no-repeat center/auto;
    transition: $transition-base;
    width: 44px;
  }
  button {
    span {
      font-size: 28px;
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
    padding: 0 7px 0 7px;
    transition: $transition-base;
    width: 44px;
  }
  .btn-group {
    @include media-breakpoint-up(xs){
      width: auto;
    }
    @include media-breakpoint-up(md){
      width: 100px;
    }
    display: flex;
    flex-wrap: wrap;
  }
  .email, .phone {
    align-items: center;
    display: flex;
  }
  display: flex;
  flex-wrap: wrap;
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
  a {
    transition: $transition-base;
  }
  align-items: center;
  background-color: $copyright-bg-color;
  color: $copyright-color;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
