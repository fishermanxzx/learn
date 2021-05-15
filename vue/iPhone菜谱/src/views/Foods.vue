<template>
  <div>
    <input
      class="search"
      type="text"
      @keyup.enter="getfoods"
      v-model="foodsname"
      :placeholder="placeholder"
      @focus="clearPlaceholder"
      @blur="addPlaceholder"
    />
    <h5>菜谱分类:</h5>
    <div class="foodsname">
      <div
        :class="{foodsmenu:true,foodsclass:choose===index}"
        v-for="(item, index) in foodsMenu"
        :key="item.classid"
        @click="getclasslist(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <h5>菜谱:</h5>
    <div class="foodsname">
      <div
        class="foodsclass"
        v-for="item in foodsClass"
        :key="item.classid"
        @click="getfoodsbyclass(item.classid)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from "../utils/request.js";
export default {
  data() {
    return {
      foodsname: "",
      foodsMenu: [],
      foodsClass: [],
      foods:'',
      placeholder:"请输入想要搜索的菜谱名称",
      choose:0
    };
  },
  created() {
    this.getclass();
  },
  methods: {
    // 跳转路由并传递name查询参数
    getfoods() {
    this.$router.push({path:'/detail',query:{name:this.foodsname}})
      
    },
    // 发起菜谱分类请求
    getclass() {
      instance.get("/class", { params: {} }).then((res) => {
        this.foodsMenu = res.result;
        this.foodsClass = this.foodsMenu[0].list.slice(0, 30);
      });
    },
    // 点击菜谱分类获取对应菜谱
    getclasslist(index) {
      this.choose = index
      this.foodsClass = this.foodsMenu[index].list.slice(0, 30);
    },
    // 跳转路由并传递classid查询参数
    getfoodsbyclass(classid) {
    this.$router.push({path:'/detail',query:{classid}})
    },
    // 获得焦点清除默认提示
    clearPlaceholder(){
        this.placeholder=''
    },
    // 失去焦点填入默认提示
    addPlaceholder(){
        this.placeholder='请输入想要搜索的菜谱名称'
    }
  },
};
</script>

<style scoped>
input {
  display: block;
  width: 90%;
  margin: 10px auto 0;
}
.foodsname {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 10px auto;
}
h5 {
  width: 90%;
  margin: 10px auto 0;
}
.foodsmenu {
  padding: 5px;
  display: inline-block;
  background-color: aquamarine;
  margin: 5px;
}
.foodsclass {
  padding: 5px;
  display: inline-block;
  background-color: lightsalmon;
  margin: 5px;
  color: white;
}
</style>