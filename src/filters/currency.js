export default function (num) {
  const n = Number(num);
  /*
  toFixed在這裡用來將小數點取整數(不太參數代表取小數點後0位)
  replace的使用方式
  第一個參數使用正規表達式取得匹配的字串
  第二個參數可以帶入一個函式，而這個函式的參數分別為
  (
  1.匹配的字串,
  2.若在正規表達式有使用捕獲括號，內容會出現在此，並且依照捕獲括號出現次數來決定參數數量,
  3.匹配字串在原字串中開始匹配的索引,
  4.原字串,
  5.若有支援命名捕獲組[ES(2018)9支援]，則會回傳一個物件，屬性是組名，值是匹配的內容
  )
  */
  return `$${n.toFixed().replace(/./g, (match, offset, str) => {
    const currency = (offset && match !== '.' && ((str.length - offset) % 3 === 0) ? `,${match}` : match);
    return currency;
  })}`;
}
