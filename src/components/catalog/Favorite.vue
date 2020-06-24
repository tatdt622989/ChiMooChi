<template>
  <div class="favorite-modal modal fade" id="exampleModal">
    <div class="modal-dialog modal-sm modal-lg" role="document">
      <div class="modal-content" tabindex="-1" role="dialog">
        <div class="modal-header">
          <h5 class="modal-title">我的最愛</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="favorite-item">
            <a href="#">
              <img src alt />
            </a>
            <div class="item-content">
              <p class="product-title">雙噴多功能氣墊椅雙噴多功能氣墊椅</p>
              <div class="counter">
                <button>
                  <span class="material-icons fz-4">add</span>
                </button>
                <p>
                  <span>0</span>個
                </p>
                <button>
                  <span class="material-icons fz-4">remove</span>
                </button>
              </div>
              <p class="price">
                $
                <span>20000000</span>
              </p>
              <div class="btn-group">
                <button>
                  <span class="material-icons fz-4">shopping_cart</span>
                </button>
                <button>
                  <span class="material-icons fz-4">close</span>
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div class="empty">
            <p class="mb-3 fz-3">還沒有最愛的商品喔！</p>
            <a href class="btn btn-primary text-white">去逛逛</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.favorite-modal {
  @include media-breakpoint-up(xs) {
    .modal-dialog {
      margin-top: 76px;
    }
  }
  @include media-breakpoint-up(sm) {
    .modal-dialog {
      margin-top: 76px;
    }
  }
  @include media-breakpoint-up(md) {
    .modal-dialog {
      margin-top: 76px;
      max-width: 630px;
    }
  }
  @include media-breakpoint-up(lg) {
    .modal-dialog {
      margin-top: 100px;
      max-width: 730px;
    }
  }
}

.modal-content {
  @include media-breakpoint-up(xs) {
    .modal-header {
      padding: 12px;
    }
    .modal-body {
      .favorite-item {
        .item-content {
          .product-title {
            flex-basis: 70%;
            text-align: left;
          }
          .counter {
            p {
              width: 40px;
            }
            font-size: 14px;
            order: 1;
          }
          .price {
            flex-basis: 30%;
            text-align: right;
          }
          .btn-group {
            order: 2;
          }
          flex-wrap: wrap;
          font-size: 16px;
          height: auto;
          margin-left: 12px;
          min-width: 190px;
          flex-grow: 1;
        }
        a {
          flex-shrink: 0;
          height: 68px;
          width: 68px;
        }
        align-items: center;
      }
      padding: 0 12px 12px 12px;
    }
    min-height: 510px;
  }
  @include media-breakpoint-up(sm) {
    .modal-header {
      padding: 20px;
    }
    .modal-body {
      .favorite-item {
        a {
          height: 60px;
          width: 80px;
        }
        .item-content {
          .product-title {
            flex-basis: 100px;
          }
          .counter {
            p {
              width: 60px;
            }
            order: 0;
          }
          .price {
            flex-basis: 60px;
          }
          .btn-group {
            order: 0;
          }
          flex-grow: 1;
          flex-wrap: nowrap;
          margin-left: 16px;
          max-width: none;
        }
        display: flex;
      }
      padding: 0 20px 20px 20px;
    }
    min-height: 570px;
  }
  @include media-breakpoint-up(md) {
    .modal-body {
      .favorite-item {
        a {
          height: 60px;
          width: 80px;
        }
        .item-content {
          .product-title {
            flex-basis: 150px;
          }
          .price {
            flex-basis: 80px;
          }
          font-size: 16px;
          margin-left: 16px;
        }
      }
    }
    min-height: 570px;
  }
  @include media-breakpoint-up(lg) {
    .modal-body {
      .favorite-item {
        .item-content {
          .product-title {
            flex-basis: 180px;
          }
          .price {
            flex-basis: 100px;
          }
          margin-left: 24px;
        }
        a {
          height: 75px;
          width: 100px;
        }
      }
    }
    min-height: 730px;
  }
  .favorite-item {
    .item-content {
      .counter {
        > span {
          &:hover {
            background-color: $favorite-modal-btn;
            color: #fff;
          }
        }
        > p {
          align-items: center;
          border-right: 1px solid $favorite-modal-btn;
          border-left: 1px solid $favorite-modal-btn;
          display: flex;
          font-weight: bold;
          justify-content: center;
          overflow: hidden;
          padding: 0 6px 0 6px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        border: 1px solid $secondary;
        display: flex;
      }
      .btn-group {
        span {
          border: 1px solid $favorite-modal-btn;
        }
        button {
          span {
            &:hover {
              background-color: $favorite-modal-btn;
              color: #fff;
            }
            color: $favorite-modal-btn;
          }
          height: 44px;
          width: 44px;
        }
        button:nth-of-type(2) {
          span {
            &:hover {
              background-color: $favorite-modal-btn-2;
              color: #fff;
            }
            border: 1px solid $favorite-modal-btn-2;
            color: $favorite-modal-btn-2;
          }
        }
        margin-right: -5px;
      }
      button {
        &:focus {
          outline: 0;
        }
        border: 0;
        background-color: #fff;
        padding: 0;
      }
      span {
        padding: 2px;
        transition: $transition-base;
      }
      .product-title,
      .price {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
    a {
      background-color: $gray-400;
    }
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .empty {
    height: 100px;
    left: 50%;
    margin-left: -150px;
    margin-top: -50px;
    position: absolute;
    top: 50%;
    width: 300px;
  }
  box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.4);
}
</style>
