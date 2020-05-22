class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList) -> int:
        if endWord not in wordList:
            return 0
        ljb = {}
        for word in [beginWord] + wordList:
            for i in range(len(word)):
                tmp = str(word[0:i]) + '*' + str(word[i + 1:])
                if tmp not in ljb:
                    ljb[tmp] = set([word])
                else:
                    ljb[tmp].add(word)
        q = []
        q.append(beginWord)
        level = 1
        while len(q) != 0:
            cur_len = len(q)
            level += 1
            for i in range(cur_len):
                cur_word = q[i]
                for j in range(len(cur_word)):
                    tmp_word = str(cur_word[0:j]) + '*' + str(cur_word[j + 1:])
                    if tmp_word in ljb:
                        tmp_set = set(ljb[tmp_word])
                        for j_word in tmp_set:
                            if j_word == endWord:
                                return level
                            else:
                                q.append(j_word)
                                ljb[tmp_word].remove(j_word)
            q = q[cur_len:]
        return 0


if __name__ == '__main__':
    beginword = 'hot'
    endword = 'dog'
    wordList = ['hot', 'dog','dot']
    solution = Solution()
    print(solution.ladderLength(beginword, endword, wordList))