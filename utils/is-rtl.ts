export default function isRTL(text: string) {
  const rtlCharPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlCharPattern.test(text);
}
