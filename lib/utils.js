function isChinese(value) {
  return /^[\u4e00-\u9fa5]*$/.test(value);
}

function getPostWords(content) {
  return content.split(" ").filter(Boolean).length;
}

const WORDS_PER_MINUTE = 200;
function readingTime(wordsCount) {
  return Math.ceil(wordsCount / WORDS_PER_MINUTE);
}
