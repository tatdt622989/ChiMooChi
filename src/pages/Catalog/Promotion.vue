<template>
  <div class="promotion container mb-lg-60 mb-md-45 mb-32">
    <div class="row">
      <div class="col-12 d-flex justify-content-center flex-column">
        <img class="px-12" src="@/assets/images/promotion-title.svg" />
        <p class="instruction f-20">
          {{ playMethod }}交換位置
          <span class="material-icons ml-8">swap_horiz</span>
        </p>
      </div>
      <div class="col-12 puzzle-wrap">
        <div class="puzzle">
          <div class="puzzle-piece" v-for="n in 9" :key="n">
            <img :src="require(`@/assets/images/${currentImgNameOrder[n-1]}.png`)"
                  class="puzzle-piece-img"
                  :class="{ 'start' : targetStartNum === n-1, 'enter' :
                  targetEnterNum === n-1}"
                  draggable="true"
                  @contextmenu="$event.preventDefault()"
                  @mousedown="classChange($event, 'start')"
                  @mouseup="classChange($event, 'cancel')"
                  @dragstart="dragStart"
                  @dragover="dragOver"
                  @dragenter="dragEnter"
                  @dragend="dragEnd"
                  @drop="dropped"
                  @touchstart="touchStart"
                  :data-num="n-1">
          </div>
        </div>
      </div>
    </div>
    <div class="puzzleCompleteModal modal fade" id="puzzleCompleteModal"
    tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">完成拼圖！</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p class="f-28 f-md-32 font-weight-bold">恭喜獲得</p>
              <p class="f-28 f-md-32 font-weight-bold text-primary">免運券序號一組</p>
              <p class="f-16 f-md-20">在購物車輸入此序號可享免運優惠</p>
              <input type="text" class="coupon border border-secondary"
              :value="coupon"
              readonly>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" @click="copyCoupon">複製</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import copyText from '@/copy.js';

export default {
  name: 'Promotion',
  components: {
  },
  data() {
    return {
      // 由左上角開始s型排列
      correctImgNameOrder: [
        'NAgNF3', 'oTFmIM', 'OUOLxK',
        '5mCpxc', 'd2u7eB', 'KDgw03',
        'nRxxZe', '2A1Uz0', 'BHft40',
      ],
      currentImgNameOrder: [],
      targetStartNum: false,
      targetEnterNum: false,
      isComplete: false,
      playMethod: '拖移',
      coupon: '',
    };
  },
  methods: {
    getRandomOrder() {
      const numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const randomNumArray = [];
      let randomIndex;
      let i = 0;
      while (i < 9) {
        randomIndex = Math.floor(Math.random() * numArray.length);
        randomNumArray.push(numArray[randomIndex]);
        numArray.splice(randomIndex, 1);
        i += 1;
      }
      return randomNumArray;
    },
    cancelDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    classChange(e, status) {
      const vm = this;
      switch (status) {
        case 'start':
          vm.targetStartNum = parseInt(e.target.dataset.num, 10);
          break;
        case 'enter':
          vm.targetEnterNum = parseInt(e.target.dataset.num, 10);
          break;
        case 'cancel':
          vm.targetStartNum = false;
          vm.targetEnterNum = false;
          break;
        default:
          break;
      }
    },
    dragStart(e) {
      const vm = this;
      vm.classChange(e, 'start');
      e.dataTransfer.setData('text/plain', e.target.dataset.num);
    },
    dragEnter(e) {
      const vm = this;
      vm.cancelDefault(e);
      vm.classChange(e, 'enter');
    },
    dragOver(e) {
      const vm = this;
      vm.cancelDefault(e);
    },
    dragEnd() {
      const vm = this;
      vm.classChange('none', 'cancel');
    },
    dropped(e) {
      const vm = this;
      vm.cancelDefault(e);
      const dragNum = e.dataTransfer.getData('text/plain');
      const targetNum = parseInt(e.target.dataset.num, 10);
      vm.changePuzzlePlace(dragNum, targetNum);
      vm.classChange('none', 'cancel');
      vm.isPuzzleComplete();
    },
    changePuzzlePlace(num1, num2) {
      const vm = this;
      const data = vm.currentImgNameOrder;
      [data[num1], data[num2]] = [data[num2], data[num1]];
      vm.currentImgNameOrder = data;
    },
    isPuzzleComplete() {
      const vm = this;
      if (vm.correctImgNameOrder.toString() === vm.currentImgNameOrder.toString()) {
        setTimeout(() => {
          vm.coupon = 'CHIMOOCHIOPEN';
          $('#puzzleCompleteModal').modal('show');
        }, 300);
      }
    },
    touchStart(e) {
      const vm = this;
      const currentTargetNum = parseInt(e.target.dataset.num, 10);
      const targetNum = vm.targetStartNum;
      e.preventDefault();
      if (currentTargetNum === targetNum) {
        vm.classChange('none', 'cancel');
        return;
      }
      if (targetNum) {
        vm.classChange('none', 'cancel');
        vm.changePuzzlePlace(currentTargetNum, targetNum);
        vm.isPuzzleComplete();
      } else {
        vm.classChange(e, 'start');
      }
    },
    copyCoupon() {
      const vm = this;
      // 利用jquery選取input元素
      const input = $('.coupon')[0];
      // 執行外部載入的copy.js
      copyText(input);
      vm.$bus.$emit('message:push', '成功', '優惠券已經複製到剪貼簿', 'success');
    },
  },
  created() {
    const vm = this;
    const randomNumArray = vm.getRandomOrder();
    // 檢測是否為觸控裝置
    if (window.ontouchstart === null) {
      vm.playMethod = '點擊';
    }
    // 將圖片亂數打散
    randomNumArray.forEach((obj) => {
      const str = `${vm.correctImgNameOrder[obj]}`;
      vm.currentImgNameOrder.push(str);
    });
  },
};
</script>

<style lang="scss">
.promotion {
  .row {
    @include media-breakpoint-up (xs) {
      height: auto;
      padding: 45px 0;
    }
    @include media-breakpoint-up (md) {
      height: 700px;
      padding: 0;
    }
    @include media-breakpoint-up (lg) {
      height: 800px;
    }
    align-content: center;
  }
  background: no-repeat url('~@/assets/images/promotion-bg.svg') center content-box;
}
.instruction {
  .material-icons {
    line-height: 30px;
  }
  color: #fff;
  margin: 32px 0;
}
.puzzle-wrap {
  display: flex;
  justify-content: center;
}
.puzzle {
  @include media-breakpoint-up(xs) {
    height: auto;
    margin: auto;
    width: 288px;
  }
  @include media-breakpoint-up(sm) {
    height: 450px;
    width: 450px;
  }
  @include media-breakpoint-up(lg) {
    height: 540px;
    width: 540px;
  }
  background-color: white;
  outline: 1px solid white;
  display: flex;
  flex-wrap: wrap;
}
.puzzle-piece, .puzzle-piece-img {
  @include media-breakpoint-up(xs) {
    height: 96px;
    width: 96px;
  }
  @include media-breakpoint-up(sm) {
    height: 150px;
    width: 150px;
  }
  @include media-breakpoint-up(lg) {
    height: 180px;
    width: 180px;
  }
}
.puzzle-piece-img {
  &.start {
    box-shadow: 0px 0px 6px 1px $primary;
    border: 0;
    cursor: grabbing;
    transform: scale(1.05);
  }
  &.enter {
    opacity: 0.7;
    transform: scale(0.9);
  }
  &:hover {
    border-color: $primary;
  }
  border: 1px solid white;
  cursor: grab;
  transform: none;
  transition: all .1s ease-in;
}
.puzzleCompleteModal {
  .modal-dialog {
    @include media-breakpoint-up(xs) {
      margin: auto;
      width: 300px;
    }
    @include media-breakpoint-up(md) {
      width: 400px;
    }
  }
  .modal-content {
    min-height: 300px;
  }
  .modal-footer {
    justify-content: center;
  }
}
.close {
  transition: $transition-base;
}
.coupon {
  @include media-breakpoint-up(xs){
    margin: 20px 0 16px 0;
    width: 260px;
  }
  @include media-breakpoint-up(md){
    margin: 32px 12px 20px 12px;
  }
  color: $primary;
  font-size: 24px;
  font-weight: bold;
  height: 44px;
  text-align: center;
}
</style>
