import { privacyConvertEn, privacyConvertJa } from "./index";

function escapeRegExp(s) {
  return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function generateCheckPattern(checkRange) {
  const checkList = checkRange.map(([startChar, endChar]) => {
    const startCharCP = startChar.codePointAt(0);
    const endCharCP = endChar.codePointAt(0);
    let target = "";
    for (let cp = startCharCP; cp <= endCharCP; cp++)
      target += String.fromCodePoint(cp);
    if (target.length > 512) {
      //comprehensive -> boundary
      target = target.slice(0, 256) + target.slice(-256);
    }
    const matcher_base = `[${escapeRegExp(startChar)}-${escapeRegExp(
      endChar
    )}]{${[...target].length}}`;
    return {
      name: `${startChar}-${endChar}`,
      target,
      matcher_base
    };
  });
  checkList.push(
    checkList.reduce(
      (
        a = { name: "", target: "", matcher_base: "" },
        { target, matcher_base }
      ) => ({
        name: "(ALL)",
        target: a.target + target,
        matcher_base: a.matcher_base + matcher_base
      })
    )
  );
  return checkList.map(({ name, target, matcher_base }) => ({
    name,
    target,
    matcher: new RegExp(`^${matcher_base}$`, "u")
  }));
}

const testCases = [
  {
    name: "privacyConvertEn()",
    checkFunction: privacyConvertEn,
    checkRange: [["a", "z"], ["A", "Z"], ["0", "9"]]
  },
  {
    name: "privacyConvertJa()",
    checkFunction: privacyConvertJa,
    checkRange: [
      ["a", "z"],
      ["A", "Z"],
      ["0", "9"],
      ["ぁ", "ん"],
      ["ァ", "ヴ"],
      ["ｦ", "ﾝ"],
      ["一", "龯"]
    ]
  }
];

describe.each(testCases)(
  "check result",
  ({ name, checkFunction, checkRange }) => {
    describe(name, function() {
      const checkList = generateCheckPattern(checkRange);
      for (let { name: checkName, target, matcher } of checkList) {
        it(checkName, function() {
          const convertResult = checkFunction(target);
          expect(convertResult.match(matcher)).not.toBeNull();
          expect(convertResult).not.toEqual(target);
        });
      }
    });
  }
);
