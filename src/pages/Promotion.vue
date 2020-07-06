<template>
  <div class="promotion container mb-lg-90 mb-md-60 mb-45">
    <div class="row">
      <div class="col-12 d-flex justify-content-center flex-column">
        <img src="@/assets/images/promotion-title.svg" />
        <div class="instruction">
          <p class="f-20 mr-30">
            點擊旋轉90度
            <span class="material-icons ml-8">refresh</span>
          </p>
          <p class="f-20 ml-30">
            拖移交換位置
            <span class="material-icons ml-8">swap_horiz</span>
          </p>
        </div>
      </div>
      <div class="col-12 puzzle-wrap">
        <div class="puzzle">
          <div class="puzzle-piece">
            <img src="@/assets/images/NAgNF3.png" class="w-100">
          </div>
          <div class="puzzle-piece"></div>
          <div class="puzzle-piece"></div>
          <div class="puzzle-piece"></div>
          <div class="puzzle-piece"></div>
          <div class="puzzle-piece"></div>
          <div class="puzzle-piece"></div>
          <div class="puzzle-piece"></div>
          <div class="puzzle-piece"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 由左上角開始s型排列
      correctOrderImgName: [
        'NAgNF3', 'oTFmIM', 'OUOLxK',
        '5mCpxc', 'd2u7eB', 'KDgw03',
        'nRxxZe', '2A1Uz0', 'BHft40',
      ],
      randomOrderImgName: [],
    };
  },
  methods: {
    getRandomOrder() {
      console.log([].indexOf(1));
      const orderArray = [];
      let randomNum;
      let orderArrayLen = 0;
      while (orderArrayLen < 9) {
        randomNum = Math.floor(Math.random() * 9);
        if (orderArray.indexOf(randomNum) === -1) {
          orderArray.push(randomNum);
          console.log(orderArray);
        }
        console.log(orderArrayLen);
        orderArrayLen = orderArray.length;
      }
      return orderArray;
    },
  },
  created() {
    console.log(this.getRandomOrder());
  },
};
</script>

<style lang="scss">
.promotion {
  .row {
    align-content: center;
    height: 800px;
  }
  background: no-repeat url('~@/assets/images/promotion-bg.svg') center content-box;
  height: 800px;
}
.instruction {
  .material-icons {
    line-height: 30px;
  }
  color: #fff;
  display: flex;
  justify-content: center;
  margin: 32px 0;
}
.puzzle-wrap {
  display: flex;
  justify-content: center;
}
.puzzle {
  @include media-breakpoint-up(lg) {
    height: 540px;
    width: 540px;
  }
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  outline: 1px solid $light;
  outline-offset: -6px;
  padding: 6px;
}
.puzzle-piece {
  border: 1px solid $light;
  height: 176px;
  width: 176px;
}
</style>
