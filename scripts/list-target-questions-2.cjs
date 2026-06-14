// 一時解析スクリプト: Phase2対象11ファイルで「正解が単独最長」の問題idと文字数差分をリストアップ
// 実行: node scripts/list-target-questions-2.cjs [ファイル名]
const fs = require('fs');
const path = require('path');

const allTargetFiles = [
  'questions-kikenbutsu_ko-law.ts',
  'questions-kikenbutsu_ko-properties.ts',
  'questions-g_kentei-deep-learning.ts',
  'questions-g_kentei-machine-learning.ts',
  'questions-kikenbutsu_ko-chemistry-physics.ts',
  'questions-g_kentei-law-ethics.ts',
  'questions-g_kentei-math-stats.ts',
  'questions-g_kentei-ai-overview.ts',
  'questions-kikenbutsu4-properties.ts',
  'questions-kikenbutsu4-chemistry-physics.ts',
  'questions-kikenbutsu4-law.ts',
];

const arg = process.argv[2];
const targetFiles = arg ? [arg] : allTargetFiles;

const qBlockRe = /\{\s*id:\s*'([^']+)',\s*subject:\s*'([^']+)',\s*category:\s*'([^']*)',[\s\S]*?options:\s*\[([\s\S]*?)\],\s*correctAnswer:\s*'([ABCD])'/g;
const optRe = /\{\s*key:\s*'([ABCD])',\s*text:\s*'((?:[^'\\]|\\.)*)'\s*\}/g;

let grandTotal = 0;
let grandStrict = 0;

for (const file of targetFiles) {
  const src = fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf8');
  let m;
  const strictList = [];
  let fileTotal = 0;
  qBlockRe.lastIndex = 0;
  while ((m = qBlockRe.exec(src))) {
    const [, id, , , optsBlock, correct] = m;
    const opts = [];
    let om;
    optRe.lastIndex = 0;
    while ((om = optRe.exec(optsBlock))) {
      opts.push({ key: om[1], text: om[2] });
    }
    if (opts.length !== 4) continue;
    fileTotal++;
    const correctOpt = opts.find(o => o.key === correct);
    const others = opts.filter(o => o.key !== correct);
    const correctLen = correctOpt.text.length;
    const maxOtherLen = Math.max(...others.map(o => o.text.length));
    if (correctLen > maxOtherLen) {
      strictList.push({ id, correctLen, maxOtherLen, diff: correctLen - maxOtherLen });
    }
  }
  grandTotal += fileTotal;
  grandStrict += strictList.length;
  console.log(`\n=== ${file}: ${fileTotal}問中 ${strictList.length}問が「正解単独最長」 ===`);
  console.log(strictList.map(s => `${s.id}(差+${s.diff})`).join(', '));
}

console.log(`\n合計: ${grandTotal}問中 ${grandStrict}問 (${(100*grandStrict/grandTotal).toFixed(1)}%)`);
