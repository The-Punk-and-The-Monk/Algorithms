from typing import List
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:

        def is_overlap(interval_1, interval_2):
            if interval_1[0] > interval_2[0]:
                interval_1, interval_2 = interval_2, interval_1
            if interval_2[0] < interval_1[1]:
                return True
            return False

        removed_idx = set()

        def get_next():
            max_idx, max_diff = -1, 0
            for i in range(len(intervals)):
                if i not in removed_idx and intervals[i][1] - intervals[i][0] > max_diff:
                    max_diff = intervals[i][1] - intervals[i][0]
                    max_idx = i
            return max_idx

        def remove_intervals():
            max_idx = get_next()
            max_interval = intervals[max_idx]
            for i in range(len(intervals)):
                if i != max_idx and i not in removed_idx and is_overlap(max_interval, intervals[i]):
                    removed_idx.add(max_idx)
                    remove_intervals()

        remove_intervals()
        return len(removed_idx)

if __name__ == '__main__':
    intervals = [[1,2],[1,2],[1,2]]
    solution = Solution()
    print(solution.eraseOverlapIntervals(intervals))