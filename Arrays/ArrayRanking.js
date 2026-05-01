/**
 * Array Ranking Guide
 * This file demonstrates how to assign ranks to elements in an array, 
 * covering both naive (O(N^2)) and optimized (O(N log N)) approaches.
 */

// ==========================================
// 1. NAIVE APPROACH (The Original)
// ==========================================
/**
 * PROBLEM STATEMENT:
 * Given an array of elements and a comparison function, calculate the rank 
 * of each element by counting how many other elements are "better" than it.
 * 
 * Time Complexity: O(N^2) - For each element, we filter the whole array.
 * Space Complexity: O(N) - Creates a new array for ranks.
 */
const stringArray = ["a", "t", "u", "l"];

const naiveRanking = (arr, compFn) =>
  arr.map((a) => arr.filter((b) => compFn(a, b)).length + 1);

const naiveOp = naiveRanking(stringArray, (a, b) => a.localeCompare(b) < 0);
console.log('Naive Ranking (Ascending):', naiveOp); 
// Output: [4, 2, 1, 3]

// ==========================================
// 2. OPTIMIZED RANKING (O(N log N))
// ==========================================
/**
 * PROBLEM STATEMENT:
 * Efficiently rank a large array of numbers. Instead of using nested loops, 
 * use a sorting-based approach to reduce time complexity to O(N log N).
 * 
 * Time Complexity: O(N log N) due to sorting.
 * Space Complexity: O(N) to store temporary objects and final ranks.
 */
function getOptimizedRanking(arr) {
  // 1. Map to objects with original index to preserve order
  const sorted = arr
    .map((val, index) => ({ val, index }))
    .sort((a, b) => a.val - b.val);

  const ranks = new Array(arr.length);
  
  // 2. Assign ranks based on sorted position
  for (let i = 0; i < sorted.length; i++) {
    ranks[sorted[i].index] = i + 1;
  }
  
  return ranks;
}

const numbers = [80, 50, 90, 100];
console.log('Optimized Ranking:', getOptimizedRanking(numbers));
// Output: [2, 1, 3, 4]

// ==========================================
// 3. ADVANCED: HANDLING TIES (DUPLICATES)
// ==========================================
/**
 * PROBLEM STATEMENT:
 * When duplicate values exist in an array, how should ranks be assigned?
 * 1. Dense Ranking: Identical values get the same rank, and the next rank is the next integer.
 * 2. Standard Ranking: Identical values get the same rank, but the next rank is skipped 
 *    based on the number of duplicates (Olympic style).
 */
const scores = [100, 90, 90, 80];

/**
 * Dense Ranking (1, 2, 2, 3)
 */
function denseRanking(arr) {
  const sortedUnique = [...new Set(arr)].sort((a, b) => b - a); // Sort descending
  return arr.map(x => sortedUnique.indexOf(x) + 1);
}

/**
 * Standard Competition Ranking (1, 2, 2, 4)
 */
function standardRanking(arr) {
  const sorted = [...arr].sort((a, b) => b - a);
  return arr.map(x => sorted.indexOf(x) + 1);
}

console.log('--- Ranking with Ties ---');
console.log('Input Scores:', scores);
console.log('Dense Ranking (1,2,2,3):', denseRanking(scores));
console.log('Standard Ranking (1,2,2,4):', standardRanking(scores));

// ==========================================
// 4. REAL WORLD: RANKING OBJECTS
// ==========================================
/**
 * PROBLEM STATEMENT:
 * Given an array of objects (e.g., players with names and scores), assign 
 * a "rank" property to each object based on their score property while 
 * preserving the original object data.
 */
const players = [
  { name: 'Atul', score: 95 },
  { name: 'Areol', score: 80 },
  { name: 'Atal', score: 95 },
  { name: 'Atil', score: 70 }
];

function rankPlayers(playerList) {
  const sorted = [...playerList].sort((a, b) => b.score - a.score);
  
  return playerList.map(player => {
    const rank = sorted.findIndex(p => p.score === player.score) + 1;
    return { ...player, rank };
  });
}

console.log('--- Ranking Objects ---');
console.table(rankPlayers(players));
