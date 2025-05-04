const getMood = (createdAt) => {
    const now = new Date();
    const diffMs = now - new Date(createdAt);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    if (diffDays < 1) return 'Happy';
    if (diffDays <= 3) return 'Excited';
    return 'Sad';
};

module.exports = { getMood };
