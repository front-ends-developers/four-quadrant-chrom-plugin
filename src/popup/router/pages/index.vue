<template>
  <div class="pop-content">
    <div class="app-name">
      <div class="flex flex-space-between">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangxiansandiantu"></use>
          </svg><span class="app-name-txt">象限法则</span>
        </div>
        <div class="app-recycle" @click="showRecycle">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huishouzhan"></use>
          </svg>
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
                <use xlink:href="#icon-shanchu1-copy"></use>
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
                <use xlink:href="#icon-shanchu1-copy"></use>
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
                <use xlink:href="#icon-shanchu1-copy"></use>
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
                <use xlink:href="#icon-shanchu1-copy"></use>
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
export default {
  components: {
  },
  data() {
      return {
        importantUrgent: [],
        importantNoUrgent: [],
        urgentNoImportant: [],
        noUrgentNoImportant: [],
        addShow: false,
        formData: {
          name: '',
          type: '',
          status: false, // 1：未完成
        }
      };
  },
  mounted() {
    const that = this;
    that.getData('importantUrgent');
    that.getData('importantNoUrgent');
    that.getData('urgentNoImportant');
    that.getData('noUrgentNoImportant');
  },
  methods: {
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
      if (localStorage.getItem('recycle')) {
        arr = JSON.parse(localStorage.getItem('recycle'));
      }
      arr.push(item);
      localStorage.setItem('recycle', JSON.stringify(arr));
      that[type].splice(index, 1);
      localStorage.setItem(type, JSON.stringify(that[type]));
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
      z-index: 1;
      cursor: pointer;
    }
  }
  .app-recycle {
    .icon {
      cursor: pointer;
      font-size: 22px;
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
        ul {
          li {
            position: relative;
            width: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            height: 32px;
            line-height: 32px;
            font-size: 12px;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &::after {
              content: " ";
              position: absolute;
              left: 0;
              bottom: 0;
              right: 0;
              height: 1px;
              border-bottom: 1px solid rgba(0,0,0,0.1);
              color: rgba(0,0,0,0.1);
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              -webkit-transform: scaleY(0.5);
              transform: scaleY(0.5);
            }
          }
        }
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
    .add-mask {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0,0,0,0.6);
    }
    .add-dialog-body {
      position: fixed;
      z-index: 5000;
      top: 50%;
      left: 16px;
      right: 16px;
      -webkit-transform: translate(0,-50%);
      transform: translate(0,-50%);
      width: 320px;
      margin: 0 auto;
      background-color: #fff;
      text-align: center;
      border-radius: 12px;
      overflow: hidden;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: column;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      max-height: 90%;
    }
    .add-dialog-head {
      padding: 20px;
    }
    .add-dialog-content {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 0 24px;
      margin-bottom: 32px;
      font-size: 17px;
      line-height: 1.4;
      word-wrap: break-word;
      -webkit-hyphens: auto;
      hyphens: auto;
      color: rgba(0,0,0,0.5);
    }
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
      .add-dialog__btn {
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        color: #576b95;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: relative;
        background: #fff;
        border: none;
        outline: none;
        cursor: pointer;
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