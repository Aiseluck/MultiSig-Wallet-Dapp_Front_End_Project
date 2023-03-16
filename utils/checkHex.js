function checkHex(s) {
  s = s.toUpperCase();
  let n = s.length;

  if (n % 2 == 1) return false;
  if (s[0] != "0") return false;
  if (s[1] != "X") return false;

  for (let i = 2; i < n; i++) {
    let ch = s[i];
    if ((ch < "0" || ch > "9") && (ch < "A" || ch > "F")) {
      return false;
    }
  }

  return true;
}

export default checkHex;
