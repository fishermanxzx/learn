<template>
  <div>
    <div class="foods" v-for="item in foods" :key="item.id">
      <div class=" clear">
        <img :src="item.pic" class="foodsimg" />
        <h3>{{ item.name }}</h3>
        <!-- 格式化数据 -->
        <p v-html="item.content.replace(/\s/g,'').replace(/(<br\/>){2,}/g, '<br/>')"></p>
      </div>

      <h5>
        准备时间:{{ item.preparetime }},烹饪时间:{{
          item.cookingtime
        }},适合人数:{{ item.peoplenum }}
      </h5>
      <h5>准备食材:</h5>
      <div>
        <span v-for="(data, index) in item.material" :key="index"
          >{{ data.mname }}:{{ data.amount + "," }}</span
        >
      </div>
      <h5>烹饪步骤:</h5>
      <div v-for="(data, index) in item.process" :key="index">
          <!-- 格式化数据 -->
        <p v-html="index + 1 + '、' + data.pcontent.replace(/\s/g,'').replace(/(<br\/>){2,}/g, '<br/>')"></p>
        <img :src="data.pic" />
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from "../utils/request.js";
export default {
  data() {
    return {
      foods: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
        // 判断查询参数是classid还是name，对不同参数发起不同的请求
      if (this.$route.query.classid) {
        const classid = this.$route.query.classid;
        instance
          .get("/byclass", {
            params: {
              classid,
              start: 0,
              num: 10,
            },
          })
          .then((res) => {
            this.foods = res.result.list;
          });
      } else if (this.$route.query.name) {
        const foodsname = this.$route.query.name;
        instance
          .get("/search", {
            params: { keyword: foodsname, num: 10 },
          })
          .then((res) => {
            this.foods = res.result.list;
          });
      }
    },
  },
};
</script>

<style scoped>
.foods {
    margin: 10px;
  padding: 20px;
  background-color:#fff;
}
.clear::after {
  content: "";
  display: block;
  clear: both;
}
.foodsimg {
  float: right;
  margin: 0 0 5px 10px;
}
</style>