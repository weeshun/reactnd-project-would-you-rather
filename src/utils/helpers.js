export function getMaxThreeWords(str) {
  // Get only up to 3 first words from str.
  //
  // Essentially from
  // https://stackoverflow.com/questions/13146613/jquery-return-first-5-words-of-a-string-without-commas
  return str.split(/\s+/).slice(0,3).join(" ");
}
