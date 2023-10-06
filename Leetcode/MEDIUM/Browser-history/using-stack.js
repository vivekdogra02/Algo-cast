/**
 * Design custom Browser History based on given operations
You have a browser of one tab where you start on the homepage and you can visit another URL, 
get back in the history number of steps or move forward in the history number of steps.
 The task is to design a data structure and implement the functionality of visiting a URL 
 starting from the homepage and moving back and forward in the history.
  The following functionalities should be covered:

visit(page)
forward(step)
back(step)
Note: The starting page of the tab will always be the homepage.

Examples: 

Input: 
homepage = “geeksforgeeks.org”
visit(“amazon.com”);
back(2);
Output: geeksforgeeks.org
Explanation:  We need to move 2 steps back but since only 1 step is available 
we would land up at the homepage, i.e., geeksforgeeks.org
 */

/**
 * Approach 1:   The problem can be solved efficiently using stack based on the following idea:

We can implement a browser history design by employing two stacks.
 We need a stack to keep track of the previously visited URLs
 and another stack to store the current URL on the browser tab.
 */
/**
 * Steps
 * 
 * Follow the steps mentioned below to implement the idea:

Create two stacks, backStack, and forwardStack. 
A backStack stores the current URL, while a forwardStack keeps track of previously visited URLs. 
The constructor BrowserHistory(string homepage) initializes the object with the homepage of the browser.
 Push the homepage into backStack. 
We have a visit() function to visit a URL from the current page: 
While visiting a URL, the forward history gets cleared up. 
Since there will be nothing beyond the last visited URL.
So, pop all the elements from the forwardStack and then push the URL we need to visit in the backSTack.
We have a back() function to move backward in history and return to the current page. 
The steps represent the number of steps we need to move.
To move steps back, run a while loop till there is at least one element left in the backStack or 
we have moved step number of times.
Push the top of the backStack into the forwardStack and then pop it from the backStack.
 Return the topmost element from the backStack. 
If we can only return x steps in the history and steps > x, we will return only x steps.
There is a forward() function to move steps forward in history and return the current page. 
To move steps forward, run a while loop for steps numbers of times and 
till the stack is not empty push the top element of forwardStack into backStack and 
then pop it from the forwardStack. 
Return the top value of backStack.
 * 
 */

/**
 * Time complexity: O(N)
Auxiliary Space: O(K)
 */

class BrowserHistory {
  constructor(homepage) {
    this.currentStack = [];
    this.forwardStack = [];

    // initialize with homepage
    this.currentStack.push(homepage);
  }

  visit(url) {
    this.forwardStack = [];
    this.currentStack.push(url);
  }

  back(steps) {
    while (this.currentStack.length > 1 && steps-- > 0) {
      // put top ele into forward stack for history
      this.forwardStack.push(this.currentStack[this.currentStack.length - 1]);
      this.currentStack.pop();
    }
    return this.currentStack[this.currentStack.length - 1];
  }
  forward(steps) {
    while (this.forwardStack.length > 1 && steps-- > 0) {
      // put top ele of
      this.currentStack.push(this.forwardStack[this.forwardStack.length - 1]);
      this.forwardStack.pop();
    }
    return this.currentStack[this.currentStack.length - 1];
  }
}

/**
 * let homepage = "gfg.org";
 
// Initialize the object of BrowserHistory
let obj = new BrowserHistory(homepage);
 
let url = "google.com";
obj.visit(url);
 
url = "facebook.com";
obj.visit(url);
 
url = "youtube.com";
obj.visit(url);
 
console.log(obj.back(1));
console.log(obj.back(1));
console.log(obj.forward(1));
obj.visit("linkedin.com");
console.log(obj.forward(2));
console.log(obj.back(2));
console.log(obj.back(7));
 */
