// Implement a function to highlight text if searched terms appear within it.

function highlightText(text, searchTerm) {
  if(!text || !searchTerm || searchTerm.length === 0) {
    return text
  }
  let regex = new RegExp(`${searchTerm.join('|')}`, 'gi');
  const highlightedText = text.replace(regex, (match) => `<span class='highlight'>${match}</span>`)
  return highlightedText;
}


const original = 'This is the sample text to be searched';
const keywords = ['sample', 'searched'];

let x = highlightText(original, keywords);