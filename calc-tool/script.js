
const expenses = [
  { category: '餐饮', amount: 230.90 },
  { category: '购物', amount: 60.60 },
  { category: '医疗', amount: 14.18 },
  { category: '交通', amount: 4.00 },
  { category: '其他', amount: 41.10 },
  // 错误的数据
  { category: '退款', amount: -30.00 },   
  { category: '餐饮', amount: '25.5元' },         
];

const cleanExpenses=(list)=>list.filter(e=>e.amount>=0&&typeof e.amount==='number');
const totalAmount = (list) => list.reduce((sum, e) => sum + e.amount, 0);
const average =(list)=>{
    if(list.length===0)return 0;
    return Number((totalAmount(list)/list.length).toFixed(2));
};

const topCategory = (list) => {
  if (list.length === 0) return null;     
  return list.reduce((max, item) => (item.amount > max.amount ? item : max), list[0]);
};
const withPercent = (list) => {
  const total = totalAmount(list);
  if (total === 0) return [];            
  return list.map((item) => ({
    category: item.category,
    amount: item.amount,
    percent: Number(((item.amount / total) * 100).toFixed(1))
  }));
};

const valid = cleanExpenses(expenses);
console.log('有效数据：', valid);
console.log('平均支出：', average(valid));
console.log('最高支出：', topCategory(valid));
console.log('各类占比：', withPercent(valid));


