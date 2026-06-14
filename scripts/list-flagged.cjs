// 一時解析スクリプト: 指定ファイルの「正解が最長(同率含む)」問題のID一覧と詳細を出力
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
const src = fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf8');

const qBlockRe = /\{\s*id:\s*'([^']+)',\s*subject:\s*'([^']+)',\s*category:\s*'([^']*)',[\s\S]*?options:\s*\[([\s\S]*?)\],\s*correctAnswer:\s*'([ABCD])'/g;
const optRe = /\{\s*key:\s*'([ABCD])',\s*text:\s*'((?:[^'\\]|\\.)*)'\s*\}/g;

let m;
const flagged = [];
let total = 0, longest = 0;
while ((m = qBlockRe.exec(src))) {
  const [, id, subject, category, optsBlock, correct] = m;
  const opts = [];
  let om;
  optRe.lastIndex = 0;
  while ((om = optRe.exec(optsBlock))) {
    opts.push({ key: om[1], text: om[2] });
  }
  if (opts.length !== 4) continue;
  total++;
  const correctOpt = opts.find(o => o.key === correct);
  const others = opts.filter(o => o.key !== correct);
  const correctLen = correctOpt.text.length;
  const maxOtherLen = Math.max(...others.map(o => o.text.length));
  if (correctLen >= maxOtherLen) {
    longest++;
    flagged.push({ id, correct, correctLen, maxOtherLen, lens: opts.map(o => `${o.key}:${o.text.length}`).join(' ') });
  }
}
console.log(`${file}: total=${total}, flagged(>=)=${longest}`);
for (const f of flagged) {
  console.log(`${f.id}\t${f.correct}\tcorrectLen=${f.correctLen}\tmaxOther=${f.maxOtherLen}\t${f.lens}`);
}
