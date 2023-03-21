

function countWords(fileContents) {
    // Converts all words to lowercase and removes special characters
    const words = fileContents
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/);

    // Counts the frequency of each word using a hashmap
    const frequencyMap = new Map();
    for (const word of words) {
        if (frequencyMap.has(word)) {
            frequencyMap.set(word, frequencyMap.get(word) + 1);
        } else {
            frequencyMap.set(word, 1);
        }
    }

    // Sort the frequency map by value in descending order
    // spread operator converts object into array of key-value pairs
    const sortedFrequencyMap = new Map([...frequencyMap.entries()].sort((a, b) => b[1] - a[1]));

    // Calculate the total number of words
    const wordCount = words.length;

    // Return the sorted frequency map and word count as an object
    return {
        frequencyMap: sortedFrequencyMap,
        wordCount
    };
}

