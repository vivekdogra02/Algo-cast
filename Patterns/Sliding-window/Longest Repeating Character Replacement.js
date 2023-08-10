/**
 * Given a string, s, of lowercase English characters and an integer, k,
 * return the length of the longest substring after replacing at most k characters
 * with any other lowercase English character so that all the characters in the substring are the same.
 *
 */

/**
 * Optimized approach using sliding window#
 *
 *
 * The solution to this problem can be optimized using the sliding window pattern.
 * For this purpose, we use two pointers to slide our window over the input string.
 * We initialize the start pointer with 0
 * and then iterate over the input string using the end pointer.
 * We keep track of the frequency of characters in the current window using a hash map.
 * We also maintain a variable, lengthOfMaxSubstring,
 * to keep track of the longest substring with same characters after replacements and
 * mostFreqChar to keep track of the frequency of the most occurring character.
 *
 */
/**
 * In each iteration, we check if the new character is present in the hash map.
 * If it is present in the hash map, we increment its frequency by 1
 * otherwise, we add the character in the hash map and set its frequency to 1
 * Next, we compare the frequency of the new character with mostFreqChar to
 * update the frequency of the most occurring character so far using the following expression
 *
 * max(most freq char, frequency of new character)
 *
 * Then, we use the following expression to check if the number of characters in the window other
 * than the most occurring character is greater than k:
 * end − start + 1 − most freq char > k
 *
 */
/**
 * 
 * If the expression above returns TRUE, it means that the number of replacements 
 * required in the current window has exceeded our limit,
 * that is, k. In this case, we slide the window one step forward. 
 * For this purpose, we decrement the frequency of the character to be dropped out of the window
 *  and increment our start pointer by 1. 
 * Then, we update lengthOfMaxSubstring with the current window size if the window size
 *  is greater than lengthOfMaxSubstring.

Finally, when the entire input string has been traversed, 
we return the length of the longest substring such that all the characters in the substring
 are the same.
 */

// Solution 1

/**
 *  T  - O(N), we iterate of input once only
 *  S = O(1) , since we will be storing the frequency of 26 characters at most in hash map
 */

function longestRepeatingCharacterReplacement(s, k) {
  const strLen = s.length;
  let lengthOfMaxSubstring = 0;
  let start = 0;
  let charFreq = new Map();
  let mostFreqChar = 0;

  for (let end = 0; end < strLen; ++end) {
    if (!charFreq.has[s[end]]) {
      charFreq.set(s[end], 1);
    } else {
      charFreq.set(s[end], charFreq.get(s[end]) + 1);
    }

    mostFreqChar = Math.max(mostFreqChar, charFreq.get(s[end]));

    if (end - start + 1 - mostFreqChar > k) {
      charFreq.set(s[start], charFreq.get(s[end]) - 1);
      start += 1;
    }

    lengthOfMaxSubstring = Math.max(end - start + 1, lengthOfMaxSubstring);
  }
  return lengthOfMaxSubstring;
}

// Solution 2

// Time Complexity :  O(n)
// Space Complexity : O(1)
var characterReplacement = function (s, k) {
  // Make a map of size 26...
  var map = [26];
  // Initialize largestCount, maxlen & beg pointer...
  let largestCount = 0,
    beg = 0,
    maxlen = 0;
  // Traverse all characters through the loop...
  for (let end = 0; end < s.length; end++) {
    const c = s[end];
    map[c] = (map[c] || 0) + 1;
    // Get the largest count of a single, unique character in the current window...
    largestCount = Math.max(largestCount, map[c]);
    // We are allowed to have at most k replacements in the window...
    // So, if max character frequency + distance between beg and end is greater than k...
    // this means we have considered changing more than k charactres. So time to shrink window...
    // Then there are more characters in the window than we can replace, and we need to shrink the window...
    if (end - beg + 1 - largestCount > k) {
      // The main equation is: end - beg + 1 - largestCount...
      map[s[beg]] -= 1;
      beg += 1;
    }
    // Get the maximum length of repeating character...
    maxlen = Math.max(maxlen, end - beg + 1); // end - beg + 1 = size of the current window...
  }
  return maxlen; // Return the maximum length of repeating character...
};

// Solution 3

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  // We're going to track a few things here:
  // First, set up a hashmap to track the frequency of letters
  const frequencies = {};
  // Then, set up a variable to track the most frequent letter we've seen.
  let highestFrequency = 0;
  // Finally, set up a variable to track the size of the longest valid window we encounter.
  let longest = 0;

  // Then we'll start a window with a left and right side pointer, both beginning at position 0,
  // because we want to grow our window as much as possible, and shrink when we have to.
  let left = 0;
  let right = 0;

  // Then we will increment the right pointer until it hits the end of the input string s
  while (right < s.length) {
    // For every character the right side of the window encounters,
    // we either add it to the frequencies hashmap with a frequency of 1,
    // or we increment its existing value
    const rightCharacter = s.charAt(right);
    frequencies[rightCharacter] = frequencies[rightCharacter] + 1 || 1;

    // Then we check if this newly encountered character is also the most frequent
    // we have ever seen in the string (even outside of the current window)
    highestFrequency = Math.max(highestFrequency, frequencies[rightCharacter]);

    // A window is valid if the length of the window,
    // minus the count of the most frequent character we've ever seen,
    // is less than or equal to k.
    // That means if the current window has the most frequent character in it,
    // and we did k replacements of the other letters in that window,
    // we would have enough k replacements to make the entire window that most frequent letter.
    //
    // If the current window is not valid, we want to increment the left pointer until we get
    // to a valid window
    //
    // Each time we do this, decrement the frequency of the character we're truncating,
    // since it's no longer part of the window.
    //
    // We do not, however, have to update highestFrequency,
    // because we'll only get a longer valid window when we encounter a letter that is
    // more frequent in its window than the last highestFrequency count was.
    // In all other cases, even when we find valid windows, they will necessarily be shorter
    // than the last time the highestFrequency gave us a valid result.
    while (right - left + 1 - highestFrequency > k) {
      const leftCharacter = s.charAt(left);
      frequencies[leftCharacter] -= 1;
      left++;
    }

    // Once we have a valid window, check if it's longer than the previous longest valid window,
    // and store that in our longest variable.
    longest = Math.max(longest, right - left + 1);

    // Finally, increment the right pointer to shift the window to the right
    right++;
  }

  // Return the longest valid window we've seen
  return longest;
};

// Solution 4
/**
 * Time complexity:
let n = s.length
26 * n * k
O(nk)

Space complexity:
O(1)
 */

var characterReplacement = function (s, k) {
  let answer = 0;
  for (let c = 65; c < 91; c++) {
    let changes = 0;
    for (let i = 0, j = 0; i < s.length; i++) {
      if (s[i] !== String.fromCharCode(c)) changes++;
      while (k < changes) {
        if (s[j] !== String.fromCharCode(c)) changes--;
        j++;
      }
      // the largest of either what answer currently is or
      // the length of i to j + 1 (+ 1 to account for the single element)
      answer = Math.max(answer, i - j + 1);
    }
  }
  return answer;
};

// Solution 5
/**
 * Maintain left and right pointer, max instances of a single char, and visit counts for each char.
for each char in string
increment visit count for this char
if new visit count is higher than max, update max
if length of current string without max char count is greater than k,
then we know the new char made it such that there are more chars missing than can be replaced by k,
so we will remove the first char
and increment left pointer
increment right pointer to look at next char.
In the end, the answer is whatever the window size is. 
This is because we never shrink the window size.
As we look at new chars, we increase the window size.
Once we see we can no longer increase due to limitation of k, we slide the window forward.
In these inbetween states, it's possible the window doesn't span a valid subset,
but that doesn't matter because the window size at one point did span a valid set.
Instead, we wait until there's a possibility of a better set, 
which is when there is a substring with more instances of some char.
 */
const characterReplacement = (s, k) => {
  let left = 0;
  let right = 0;
  let maxCharCount = 0;
  const visited = {};

  while (right < s.length) {
    const char = s[right];
    visited[char] = visited[char] ? visited[char] + 1 : 1;

    if (visited[char] > maxCharCount) maxCharCount = visited[char];

    if (right - left + 1 - maxCharCount > k) {
      visited[s[left]]--;
      left++;
    }

    right++;
  }

  return right - left;
};

// Solution 6
// two pointer approach
/**
 * Time Complexity = O(26 * 2 * n) ~ O(n)
Space Complexity = O(1)
 */

function characterReplacement(s, k) {
  let maxLen = 0;
  // for each of the 26 characters (upper-case), finding the max length after k char replacements
  for (let i = 0; i < 26; ++i) {
    const char = "A".charCodeAt(0) + i;
    const maxLenForChar = findMaxLenForChar(s, k, char);
    maxLen = Math.max(maxLen, maxLenForChar);
  }
  return maxLen;
}

function findMaxLenForChar(s, k, ch) {
  let maxLen = 0;
  let left = 0,
    right = 0;

  // using two-pointer approach - starting both pointers at the beginning of the string,
  // will move right pointer only when either the char is same or k > 0 (replacement option available)
  // if k < 0, will move left pointer until k == 0.
  // at each iteration we are checking the length of the substring and keeping track of the max length
  // at max each char in the string will be traversed twice (once from right pointer and second from left pointer)
  while (right < s.length) {
    if (s.charCodeAt(right) !== ch) {
      --k;
    }
    while (k < 0 && left < right) {
      if (s.charCodeAt(left) !== ch) {
        ++k;
      }
      ++left;
    }
    maxLen = Math.max(maxLen, right - left + 1);
    ++right;
  }
  return maxLen;
}
