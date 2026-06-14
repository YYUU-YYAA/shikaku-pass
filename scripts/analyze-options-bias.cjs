// 一時解析スクリプト（用途: 選択肢の位置・文字数バイアス調査）。
// 実行: node scripts/analyze-options-bias.cjs
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'data'))
  .filter(f => /^questions-.*\.ts$/.test(f) || f === 'questions.ts')
  .filter(f => f !== 'questions.ts');

const qBlockRe = /\{\s*id:\s*'([^']+)',\s*subject:\s*'([^']+)',\s*category:\s*'([^']*)',[\s\S]*?options:\s*\[([\s\S]*?)\],\s*correctAnswer:\s*'([ABCD])'/g;
const optRe = /\{\s*key:\s*'([ABCD])',\s*text:\s*'((?:[^'\\]|\\.)*)'\s*\}/g;

let total = 0;
const correctCount = { A: 0, B: 0, C: 0, D: 0 };
let correctIsLongest = 0;
let correctIsStrictlyLongest = 0;
let lenRatioSum = 0;
const perFile = {};

for (const file of files) {
  const src = fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf8');
  let m;
  let fileTotal = 0, fileCorrectLongest = 0;
  while ((m = qBlockRe.exec(src))) {
    const [, id, subject, category, optsBlock, correct] = m;
    const opts = [];
    let om;
    optRe.lastIndex = 0;
    while ((om = optRe.exec(optsBlock))) {
      opts.push({ key: om[1], text: om[2] });
    }
    if (opts.length !== 4) continue; // パース失敗はスキップ
    total++;
    fileTotal++;
    correctCount[correct]++;
    const correctOpt = opts.find(o => o.key === correct);
    const others = opts.filter(o => o.key !== correct);
    const correctLen = correctOpt.text.length;
    const maxOtherLen = Math.max(...others.map(o => o.text.length));
    const avgOtherLen = others.reduce((s, o) => s + o.text.length, 0) / others.length;
    if (correctLen >= maxOtherLen) { correctIsLongest++; fileCorrectLongest++; }
    if (correctLen > maxOtherLen) correctIsStrictlyLongest++;
    lenRatioSum += correctLen / (avgOtherLen || 1);
  }
  perFile[file] = { total: fileTotal, correctLongest: fileCorrectLongest };
}

console.log('総問題数(パース成功):', total);
console.log('正解の分布:', correctCount, '(均等なら各', Math.round(total / 4), '前後)');
console.log('正解が最長(同率含む)の問題数:', correctIsLongest, `(${(100 * correctIsLongest / total).toFixed(1)}%)`);
console.log('正解が単独最長の問題数:', correctIsStrictlyLongest, `(${(100 * correctIsStrictlyLongest / total).toFixed(1)}%)`);
console.log('正解文字数 / 他選択肢平均文字数 の平均比:', (lenRatioSum / total).toFixed(2));
console.log('\nファイル別 (正解が最長率):');
for (const [f, v] of Object.entries(perFile)) {
  console.log(`  ${f}: ${v.total}問, 正解最長 ${(100 * v.correctLongest / v.total).toFixed(1)}%`);
}
