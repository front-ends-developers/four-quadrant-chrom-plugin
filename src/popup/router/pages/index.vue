<template>
  <div class="pop-content">
    <div class="app-name">
      <div class="flex flex-space-between">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangxiansandiantu"></use>
          </svg><span class="app-name-txt">象限法则</span>
        </div>
        <div class="app-recycle" @click.stop="showRecycle">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huishouzhan"></use>
          </svg>
          <div v-if="showRecycleFlag" class="app-recycle-list" v-clickoutside="handleClose">
            <ul>
              <li v-for="(item, index) in recycleData" :key="index+'i'">
                <span :class="['p-l-10 color-909399']">{{item.name}}</span>
                <svg v-if="item.status" class="icon del-icon" aria-hidden="true" @click.stop="delData(index, item, 'recycleData')">
                  <use xlink:href="#icon-shanchu1-copy"></use>
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="view-body">
      <div class="level-body">
        <div class="level-body-title bg-f5222d color-f5222d">重要且紧急</div>
        <div class="level-body-content">
          <ul>
            <li v-for="(item, index) in importantUrgent" :key="index+'i'">
              <input type="checkbox" name="favorite" :checked="item.status" value="1" @change="changeBox($event, index, item, 'importantUrgent')"/><span :class="['p-l-10' ,item.status? 'color-909399' :'']">{{item.name}}</span>
              <svg v-if="item.status" class="icon del-icon" aria-hidden="true" @click="delBox(index, item, 'importantUrgent')">
                <use xlink:href="#icon-yunpanlogo-"></use>
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <div class="level-body border-left">
        <div class="level-body-title bg-faad14 color-faad14">重要不紧急</div>
        <div class="level-body-content">
          <ul>
            <li v-for="(item, index) in importantNoUrgent" :key="index+'i'">
              <input type="checkbox" name="favorite" :checked="item.status" value="1" @change="changeBox($event, index, item, 'importantNoUrgent')"/><span :class="['p-l-10' ,item.status? 'color-909399' :'']">{{item.name}}</span>
              <svg v-if="item.status" class="icon del-icon" aria-hidden="true" @click="delBox(index, item, 'importantNoUrgent')">
                <use xlink:href="#icon-yunpanlogo-"></use>
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <div class="level-body">
        <div class="level-body-title bg-597ef7 color-597ef7">紧急不重要</div>
        <div class="level-body-content">
          <ul>
            <li v-for="(item, index) in urgentNoImportant" :key="index+'i'">
              <input type="checkbox" name="favorite" :checked="item.status" value="1" @change="changeBox($event, index, item, 'urgentNoImportant')"/><span :class="['p-l-10' ,item.status? 'color-909399' :'']">{{item.name}}</span>
              <svg v-if="item.status" class="icon del-icon" aria-hidden="true" @click="delBox(index, item, 'urgentNoImportant')">
                <use xlink:href="#icon-yunpanlogo-"></use>
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <div class="level-body border-left">
        <div class="level-body-title bg-52c41a color-52c41a">不紧急不重要</div>
        <div class="level-body-content">
          <ul>
            <li v-for="(item, index) in noUrgentNoImportant" :key="index+'i'">
              <input type="checkbox" name="favorite" :checked="item.status" value="1" @change="changeBox($event, index, item, 'noUrgentNoImportant')"/><span :class="['p-l-10' ,item.status? 'color-909399' :'']">{{item.name}}</span>
              <svg v-if="item.status" class="icon del-icon" aria-hidden="true" @click="delBox(index, item, 'noUrgentNoImportant')">
                <use xlink:href="#icon-yunpanlogo-"></use>
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="add-btn" @click="addItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tianjia"></use>
      </svg>
    </div>
    <div v-if="addShow" class="add-dialog">
      <div class="add-mask"></div>
      <div class="add-dialog-body">
        <div class="add-dialog-head">添加</div>
        <div class="add-dialog-content">
          <form class="add-form">
            <div class="el-form-item is-required">
              <label for="name" class="el-form-item__label" style="width: 90px;">名称：</label>
              <div class="el-form-item__content" style="margin-left: 90px;">
                <div class="el-input">
                  <input type="text" autocomplete="off" class="el-input__inner" maxlength="55" @input="changeValue" />
                </div>
              </div>
            </div>
            <div class="el-form-item is-required">
              <label for="name" class="el-form-item__label" style="width: 90px;">选择类型：</label>
              <div class="el-form-item__content" style="margin-left: 90px;">
                <div class="el-radio">
                  <div><label><input name="type" type="radio" value="importantUrgent" @click="changeItem('importantUrgent')" /> 重要且紧急</label></div>
                  <div><label><input name="type" type="radio" value="importantNoUrgent" @click="changeItem('importantNoUrgent')" /> 重要不紧急</label></div>
                  <div><label><input name="type" type="radio" value="urgentNoImportant" @click="changeItem('urgentNoImportant')" /> 紧急不重要</label></div>
                  <div><label><input name="type" type="radio" value="noUrgentNoImportant" @click="changeItem('noUrgentNoImportant')"/> 不紧急不重要</label></div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="add-dialog-foot">
          <button class="add-dialog__btn add-dialog__btn_default" @click="cancel">取消</button>
          <button class="add-dialog__btn add-dialog__btn_primary" @click="onSubmit">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import localForage from "localforage";
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};
export default {
  components: {
  },
  directives: { clickoutside },
  data() {
      return {
        importantUrgent: [],
        importantNoUrgent: [],
        urgentNoImportant: [],
        noUrgentNoImportant: [],
        recycleData: [],
        addShow: false,
        formData: {
          name: '',
          type: '',
          status: false, // 1：未完成
        },
        showRecycleFlag: false
      };
  },
  mounted() {
    const that = this;
    that.getData('importantUrgent');
    that.getData('importantNoUrgent');
    that.getData('urgentNoImportant');
    that.getData('noUrgentNoImportant');
    that.getData('recycleData');
  },
  methods: {
    /**
     * @description: 关闭回收站
     * @param {Object} e
     * @author: 无尘
     */
    handleClose(e) {
      this.showRecycleFlag = false;
    },
    /**
     * @description: 删除数据
     * @param {Number} index
     * @param {Object} item
     * @param {String} type
     * @author: 无尘
     */
    delData(index, item, type) {
      const that = this;
      that[type].splice(index, 1);
      localStorage.setItem(type, JSON.stringify(that[type]));
    },
    /**
     * @description: 显示回收站
     * @author: 无尘
     */
    showRecycle() {
      const that = this;
      that.showRecycleFlag = true;
    },
    /**
     * @description: 删除
     * @param {Number} index
     * @param {Object} item
     * @param {String} type
     * @author: 无尘
     */
    delBox(index, item, type) {
      const that = this;
      // 先添加回收站
      let arr = [];
      if (localStorage.getItem('recycleData')) {
        arr = JSON.parse(localStorage.getItem('recycleData'));
      }
      arr.push(item);
      localStorage.setItem('recycleData', JSON.stringify(arr));
      that[type].splice(index, 1);
      localStorage.setItem(type, JSON.stringify(that[type]));
      that.getData('recycleData');
    },
    /**
     * @description: 勾选完成
     * @param {Object} e
     * @param {Number} index
     * @param {Object} item
     * @param {String} type
     * @author: 无尘
     */
    changeBox(e, index, item, type) {
      const that = this;
      if (e.target.checked) {
        item.status = true;
      }else {
        item.status = false;
      }
      localStorage.setItem(type, JSON.stringify(that[type]));
    },
    /**
     * @description: 获取存储数据
     * @param {String} type
     * @author: 无尘
     */
    getData(type) {
      const that = this;
      if (localStorage.getItem(type)) {
        let arr = JSON.parse(localStorage.getItem(type));
        that[type] = arr;
      }
    },
    /**
     * @description: 显示添加弹窗
     * @author: 无尘
     */
    addItem() {
      const that = this;
      that.addShow = true;
    },
    /**
     * @description: 添加
     * @returns {Boolean}
     * @author: 无尘
     */
    onSubmit() {
      const that = this;
      if (!that.formData.name || !that.formData.type) {
        return false;
      }
      that.addShow = false;
      let arr = [];
      if (localStorage.getItem(that.formData.type)) {
        arr = JSON.parse(localStorage.getItem(that.formData.type));
      }
      arr.push(that.formData);
      localStorage.setItem(that.formData.type, JSON.stringify(arr));
      that.getData('importantUrgent');
      that.getData('importantNoUrgent');
      that.getData('urgentNoImportant');
      that.getData('noUrgentNoImportant');
      that.getData('recycleData');
    },
    /**
     * @description: 关闭添加弹窗
     * @author: 无尘
     */
    cancel() {
      const that = this;
      that.addShow = false;
    },
    /**
     * @description: 选择添加类型
     * @param {String} val
     * @author: 无尘
     */
    changeItem(val) {
      const that = this;
      that.formData.type = val;
    },
    /**
     * @description: 选择添加类型
     * @param {Object} e
     * @author: 无尘
     */
    changeValue(e) {
      const that = this;
      that.formData.name = e.target.value;
    }
  }
};
</script>
<style lang="scss" scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    &.del-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #fff;
      z-index: 1;
      cursor: pointer;
    }
  }
  .app-recycle {
    position: relative;
    .icon {
      cursor: pointer;
      font-size: 22px;
    }
    .app-recycle-list {
      position: absolute;
      top: 30px;
      right: 20px;
      z-index: 3;
      width: 200px;
      min-height: 100px;
      max-height: 200px;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      overflow-x: hidden;
      overflow-y: auto;
      white-space: nowrap;
      text-overflow: ellipsis;
      .del-icon {
        font-size: 16px;
      }
    }
  }
  .app-name {
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #2f54ed;
    font-weight: 600;
    .app-name-txt {
      padding-left: 12px;
    }
  }
  .view-body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .level-body {
      min-width: 50%;
      min-height: 250px;
      .level-body-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        box-sizing: border-box;
      }
      .level-body-content {
        max-height: 250px;
        max-width: 230px;
        overflow-x: hidden;
        overflow-y: auto;
      }
    }
  }
  .add-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 2;
    cursor: pointer;
    .icon {
      font-size: 30px;
    }
  }
  .add-dialog {
    .add-dialog-foot {
      position: relative;
      line-height: 40px;
      min-height: 40px;
      font-size: 14px;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      &::after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid rgba(0,0,0,0.1);
        color: rgba(0,0,0,0.1);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      .add-dialog__btn_default {
        color: #323233;
      }
      .add-dialog__btn_primary {
        color: #2f54ed;
        &::after {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          bottom: 0;
          border-left: 1px solid rgba(0,0,0,0.1);
          color: rgba(0,0,0,0.1);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
        }
      }
    }
  }
</style>