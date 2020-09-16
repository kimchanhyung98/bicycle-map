export function formatDifficulty(difficulty) {
    switch (difficulty) {
        case 'beginner':
            return '초보자'
        case 'intermediate':
            return '중급자'
        case 'advanced':
            return '숙련자'
        default:
            return ''
    }
}
