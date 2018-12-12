function generateRangeReplacer(startChar, endChar) {
  const startCharCode = startChar.codePointAt(0);
  const endCharCode = endChar.codePointAt(0);
  return (
    `if(${startCharCode}<=p&&p<=${endCharCode})` +
    `return String.fromCodePoint` +
    `(${startCharCode}+(Math.random()*${endCharCode - startCharCode + 1}|0));`
  );
}

function generatePrivacyConverter(rangeData, customCode = "") {
  //not fully compatible(ie11), polyfill unused
  return new Function(
    "s",
    `return s` +
      `.replace(/[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^\\uD800-\\uDFFF]/g,` +
      `function(c){const p=c.codePointAt(0);` +
      rangeData
        .map(([startChar, endChar]) =>
          generateRangeReplacer(startChar, endChar)
        )
        .join("") +
      customCode +
      `return c})`
  );
}

const jaKanjiReplacer =
  `if(19967<p&&p<40960||63743<p&&p<64256||p===12293)return "` +
  `引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教` +
  `近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市` +
  `矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線` +
  `前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南` +
  `"[Math.random()*128|0];`;

export const privacyConvertEn = generatePrivacyConverter([
  ["a", "z"],
  ["A", "Z"],
  ["0", "9"]
]);
export const privacyConvertJa = generatePrivacyConverter(
  [["a", "z"], ["A", "Z"], ["0", "9"], ["ぁ", "ん"], ["ァ", "ヴ"], ["ｦ", "ﾝ"]],
  jaKanjiReplacer
);
