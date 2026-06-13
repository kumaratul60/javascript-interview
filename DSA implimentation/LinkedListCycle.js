/**
 * @fileoverview
 * Detect cycle in a Linked List and find the node where it starts.
 * (LeetCode Medium: 141. Linked List Cycle & 142. Linked List Cycle II)
 */

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/**
 * 1. Detect if a cycle exists (Floyd's Tortoise and Hare)
 * 
 * Strategy: Use two pointers moving at different speeds.
 * - Slow pointer: moves 1 step at a time.
 * - Fast pointer: moves 2 steps at a time.
 * If they meet, a cycle exists.
 * 
 * Time Complexity: O(N) where N is the number of nodes.
 * Space Complexity: O(1) as we only use two pointers.
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}

/**
 * 2. Find the node where the cycle starts
 * 
 * Strategy:
 * - Phase 1: Detect the meeting point (same as hasCycle).
 * - Phase 2: Reset one pointer to the head. Move both pointers 1 step at a time.
 *   The point where they meet again is the start of the cycle.
 * 
 * Proof:
 * Let L1 be the distance from head to cycle start.
 * Let L2 be the distance from cycle start to meeting point.
 * Let C be the cycle length.
 * Slow distance = L1 + L2
 * Fast distance = L1 + L2 + n*C (where n is number of loops)
 * Since fast is twice as fast: 2(L1 + L2) = L1 + L2 + n*C
 * L1 + L2 = n*C => L1 = n*C - L2
 * This means distance L1 is equivalent to moving from meeting point through the cycle (n*C - L2).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function detectCycleStart(head) {
  let slow = head;
  let fast = head;
  let hasCycle = false;

  // Phase 1: Find meeting point
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }

  if (!hasCycle) return null;

  // Phase 2: Find start node
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

function createLinkedListWithCycle(arr, pos) {
  if (arr.length === 0) return null;
  
  let head = new ListNode(arr[0]);
  let current = head;
  let cycleStartNode = null;
  
  if (pos === 0) cycleStartNode = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
    if (i === pos) cycleStartNode = current;
  }

  if (pos !== -1) {
    current.next = cycleStartNode;
  }

  return head;
}

// Case 1: Cycle at index 1
const head1 = createLinkedListWithCycle([3, 2, 0, -4], 1);
console.log("Has Cycle:", hasCycle(head1)); // true
console.log("Cycle Start Val:", detectCycleStart(head1)?.val); // 2

// Case 2: Cycle at index 0
const head2 = createLinkedListWithCycle([1, 2], 0);
console.log("Has Cycle:", hasCycle(head2)); // true
console.log("Cycle Start Val:", detectCycleStart(head2)?.val); // 1

// Case 3: No cycle
const head3 = createLinkedListWithCycle([1], -1);
console.log("Has Cycle:", hasCycle(head3)); // false
console.log("Cycle Start Val:", detectCycleStart(head3)); // null
