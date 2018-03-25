<template>
  <div class="lw-area-select" id="lwAreaSelect">
    <div class="lw-virtual-input" @click="openDropDown">{{value}}</div>
    <div v-show="dropDown.open" class="lw-area-dropdown">
      <div class="lw-area-tab"><!--
     --><span
         v-if="innerLevel >= 1"
         :style="`width: calc(100%/${innerLevel});`"
         :class="{active: currentTab === 'province'}"
         @click="handleTabChange('province')">
         省份
        </span><!--
     --><span
         v-if="innerLevel >= 2"
         :style="`width: calc(100%/${innerLevel});`"
         :class="{active: currentTab === 'city'}"
         @click="handleTabChange('city')">
         市区
        </span><!--
     --><span
         v-if="innerLevel >= 3"
         :style="`width: calc(100%/${innerLevel});`"
         :class="{active: currentTab === 'district'}"
         @click="handleTabChange('district')">
         县区
        </span><!--
     --><span
         v-if="innerLevel >= 4"
         :style="`width: calc(100%/${innerLevel});`"
         :class="{active: currentTab === 'street'}"
         @click="handleTabChange('street')">
         街道
        </span><!--
   --></div>
     <div class="lw-area-content">
       <dl v-show="currentTab === 'province'" class="fn-clear fn-clear-province" v-for="(value, key) in areas['86']">
         <dt>{{key}}</dt>
         <dd>
           <a :class="{selected: province.key === ky}" v-for="(val, ky) in value" :title="val" :data-id="ky" href="javascript:;" @click="handleAreaSelect(ky, val)">{{val}}</a>
         </dd>
       </dl>
       <dl v-show="currentTab === 'city'" class="fn-clear fn-clear-city" >
         <dd v-for="(value, key) in areas[province.key]">
           <a :class="{selected: city.key === key}" :title="value" :data-id="key" href="javascript:;" @click="handleAreaSelect(key, value)">{{value}}</a>
         </dd>
       </dl>

       <dl v-show="currentTab === 'district'" class="fn-clear fn-clear-district" >
         <dd v-for="(value, key) in areas[city.key]">
           <a :class="{selected: district.key === key}" :title="value" :data-id="key" href="javascript:;" @click="handleAreaSelect(key, value)">{{value}}</a>
         </dd>
       </dl>

       <dl v-show="currentTab === 'street'" class="fn-clear fn-clear-street" >
         <dd v-for="(value, key) in areas[district.key]">
           <a :class="{selected: street.key === key}" :title="value" :data-id="key" href="javascript:;" @click="handleAreaSelect(key, value)">{{value}}</a>
         </dd>
       </dl>
     </div>

    </div>
  </div>
</template>

<script>
import data from './data.js'
import $ from 'jquery'
export default {
  name: 'AreaSelect',
  model: {
    props: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: function() {
        return ''
      }
    },
    level: {
      type: String,
      default: function() {
        return 'street'
      }
    }
  },
  data() {
    return {
      areas: data,
      innerLevel: 4,
      dropDown: {
        open: false
      },
      currentTab: 'province',
      province: {
        key: '',
        value: ''
      },
      city: {
        key: '',
        value: ''
      },
      district: {
        key: '',
        value: ''
      },
      street: {
        key: '',
        value: ''
      }
    }
  },
  computed: {
    selectedArea() {
      let [key, value] = ['', '']
      if (this.province.key !== '') {
        key += this.province.key
        value += this.province.value
      }
      console.log('province:', this.province.value)
      if (this.city.key !== '') {
        key += '/' + this.city.key
        value += '/' + this.city.value
      }
      console.log('city:', this.city.value)
      if (this.district.key !== '') {
        key += '/' + this.district.key
        value += '/' + this.district.value
      }
      console.log('district:', this.district.value)
      if (this.street.key !== '') {
        key += '/' + this.street.key
        value += '/' + this.street.value
      }
      console.log('street:', this.street.value)
      console.log('------------------------------------------------------')
      return { key, value }
    }
  },
  watch: {
    'selectedArea.value'(newVal, oldVal) {
      this.$emit('change', newVal)
    }
  },
  created() {
    this.innerLevel = this.calcInnerLevel(this.level)
    this.addBlurEvent()
  },
  methods: {
    openDropDown() {
      this.dropDown.open = true
    },
    calcInnerLevel(level) {
      if (level === 'province') return 1
      if (level === 'city') return 2
      if (level === 'district') return 3
      return 4
    },
    addBlurEvent() {
      $(document).click('click', (event) => {
        if (this.dropDown.open) {
          if ($(event.target).closest('#lwAreaSelect')[0] !== $('#lwAreaSelect')[0]) {
            this.$emit('blur')
            this.dropDown.open = false
          }
        }
      })
    },
    handleAreaSelect(key, value) {
      const targetElement = $(`[data-id=${key}]`)
      this.clearNextLevelData()
      if (targetElement.hasClass('selected')) {
        targetElement.removeClass('selected')
      } else {
        this.outputNextLevelData(key, value)
      }
    },
    outputNextLevelData(key, value) {
      this[this.currentTab] = { key, value }// 保存当前级别的地区信息即可遍历生成下一级别的数据
      if (this.currentTab !== this.level) {
        if (this.currentTab === 'province') {
          this.currentTab = 'city'
        } else if (this.currentTab === 'city') {
          this.currentTab = 'district'
        } else if (this.currentTab === 'district') {
          this.currentTab = 'street'
        }
      } else {
        this.$emit('blur')
        this.dropDown.open = false
      }
    },
    handleTabChange(tabName) {
      this.currentTab = tabName
    },
    clearNextLevelData() {
      if (this.currentTab === 'province') {
        this.province = { key: '', value: '' }
        this.city = { key: '', value: '' }
        this.district = { key: '', value: '' }
        this.street = { key: '', value: '' }
      } else if (this.currentTab === 'city') {
        this.city = { key: '', value: '' }
        this.district = { key: '', value: '' }
        this.street = { key: '', value: '' }
      } else {
        this.district = { key: '', value: '' }
        this.street = { key: '', value: '' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lw-area-select {
  position: relative;
  .lw-virtual-input {
    height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  .lw-area-dropdown {
    position: absolute;
    z-index: 2005;
    width: 100%;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    font-size: 12px;
    .lw-area-tab {
      height: 40px;
      >span {
        display: inline-block;
        text-align: center;
        font-size: 14px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background-color: #f0f0f0;
        &:last-child {
          border-right: none;
        }
        &.active {
          background-color: #fff;
          border-bottom-color: #fff;
        }
      }
    }
    .lw-area-content {
      padding: 16px;
      .fn-clear {
        &.fn-clear-city,
        &.fn-clear-district,
        &.fn-clear-street {
          >dd {
            margin-left: 0;
          }
        }
        >dt {
          display: inline-block;
          width: 35px;
          position: absolute;
        }
        >dd {
          display: inline-block;
          >a {
            padding: 0 10px;
            height: 24px;
            display: inline-block;
            line-height: 24px;
            border-radius: 2px;
            &.selected {
              background-color: #f00;
              border-radius: 2px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
