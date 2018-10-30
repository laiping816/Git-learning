<template>
  <div>
  <el-select v-model="value5" filterable multiple placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button type="primary" @click="momentTest">主要按钮</el-button>
  </div>
</template>

<script>
  import moment from 'moment'
  // import { WeekDays} from "../lib/Constants";
  import _ from 'lodash'
  export default {
    components: {
    //  Calendar
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value5: ['选项2'],
      }
    },
    methods:{
      weekday: function(date) {
        let dayOfWeek = moment(date).day();

        return {
          // name: WeekDays[dayOfWeek].name,
          date: date,
          dayOfWeek: dayOfWeek,
          isWeekend: dayOfWeek === 0 || dayOfWeek === 6
        };
      },
      weekOfMonth(date) {
        let momDate = moment(date);
        if (momDate.day() === 0) {
          momDate = momDate.subtract(2, 'days');
          date = new Date(momDate.year(), momDate.month(), momDate.date());
        }

        let weekStart = moment(date).weekday(1);
        let weekEnd = moment(date).weekday(7);
        let weekMiddle = moment(date).weekday(4);

        // console.log(`date=${date} momDate=${momDate.format('YYYY-MM-DD')} weekStart=${weekStart.format('YYYY-MM-DD')} weekEnd=${weekEnd.format('YYYY-MM-DD')}`);

        let weekSeq = 0;
        if (weekMiddle.month() != weekStart.month()) {
          weekSeq = 1;
        } else {
          let firstWeekStart = moment(date).weekday(4).date(1).weekday(1);
          let firstWeekMiddle = moment(date).weekday(4).date(1).weekday(4);
          if (firstWeekMiddle.month() != weekMiddle.month()) {
            firstWeekMiddle = moment(date).weekday(4).date(1).weekday(11);
          }

          weekSeq = (weekMiddle.date() - firstWeekMiddle.date()) / 7 + 1;
        }

        return {
          year: weekMiddle.year(),
          month: weekMiddle.month() + 1,
          weekSeq: weekSeq,
          weekStart: new Date(weekStart.year(), weekStart.month(), weekStart.date()),
          weekMiddle: new Date(weekMiddle.year(), weekMiddle.month(), weekMiddle.date()),
          weekEnd: new Date(weekEnd.year(), weekEnd.month(), weekEnd.date(), 23, 59, 59)
        }
      },
      momentTest(){
        console.log(this.weekday(moment().toDate()));
        console.log(this.weekOfMonth(moment().toDate()));
      }
    },
    updated(){
      console.log(this.value5)
    }
  }
</script>

<style scoped>

</style>
