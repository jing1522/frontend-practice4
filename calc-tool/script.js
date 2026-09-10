const expenses = [
  { category: '餐饮', amount: 230.90 },
  { category: '购物', amount: 60.60 },
  { category: '医疗', amount: 14.18 },
  { category: '交通', amount: 4.00 },
  { category: '其他', amount: 41.10 },
  { category: '退款', amount: -30.00 },      // 负金额
  { category: '餐饮', amount: '25.5元' }      // 非数字金额
];
console.table(expenses);

// 清洗数据：过滤掉负数金额和非数字金额
const cleanExpenses = (list) => list.filter(e => e.amount >= 0 && typeof e.amount === 'number');

// 计算总金额
const totalAmount = (list) => list.reduce((sum, e) => sum + e.amount, 0);

// 计算平均支出（空数组返回0）
const average =(list)=>{
    if(list.length===0)return 0;
    return Number((totalAmount(list)/list.length).toFixed(2));
};

// 找出金额最高的一笔消费
const topCategory = (list) => {
  if (list.length === 0) return null;     
  return list.reduce((max, item) => (item.amount > max.amount ? item : max), list[0]);
};

// 为每条记录追加占总支出的百分比
const withPercent = (list) => {
  const total = totalAmount(list);
  if (total === 0) return [];
  return list.map((item) => ({
    category: item.category,
    amount: item.amount,
    percent: Number(((item.amount / total) * 100).toFixed(1))
  }));
};

console.log('清洗后：', cleanExpenses(expenses));
console.log('平均支出：', average(cleanExpenses(expenses)));
console.log('最高单笔：', topCategory(cleanExpenses(expenses)));

// 格式化报告
const report = (list) => {
  const valid = cleanExpenses(list);
  if (valid.length === 0) {
    return '没有有效消费记录';
  }
  const topItem = topCategory(valid);
  const dist = withPercent(valid)
    .map(item => `${item.category}${item.percent}%`)
    .join('、');
  return `有效消费${valid.length}笔，总支出¥${totalAmount(valid).toFixed(2)}，平均¥${average(valid)}，最高单笔${topItem.category}¥${topItem.amount.toFixed(2)}；
各类占比：${dist}；
数据来源：近10天消费记录`;
};

try {
  console.log(report(expenses));
} catch (err) {
  console.error('报告生成失败：', err.message);
}




