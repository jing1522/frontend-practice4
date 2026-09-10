const scores = [
  { name: '李四', score: 92 },
  { name: '王五', score: 45 },
  { name: '赵六', score: 77 },
  { name: '孙七', score: 59 },
  { name: '周八', score: 88 },
  { name: '吴九', score: 105 },   // 超出满分
  { name: '郑十', score: -3 }     // 负分
];
const cleanScores = (list)=>list.filter(s=>s.score>=0&&s.score<=100);
const average =(list)=>{
    if(list.length===0)return0;
    const total =list.reduce((sum,s)=>sum+s.score,0);
    return (total/list.length).toFixed(2);
};

const highest=(list)=> list.reduce((max,s)=>s.score>max?s.score:max,list[0]);

const failed=(list)=> list.filter(s=>s.score<60).map(s=>s.name);


