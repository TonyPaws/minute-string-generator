const stringBox = document.getElementById('string-box');
const generateButton = document.getElementById('generate-button');
const sentenceInput = document.getElementById('sentence-input');
const lookupButton = document.getElementById('lookup-button');
const timestampBox = document.getElementById('timestamp-box');
const timeBox = document.getElementById('time-box');

const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#FFC733',
    '#FF8333', '#D433FF', '#33FF83', '#FF5733', '#FF33F5', '#F533FF'
];

const nouns = ["cat", "dog", "car", "tree", "house", "bird", "mouse", "cake", "shoe", "cloud"];
const adverbs = ["quickly", "slowly", "happily", "sadly", "gracefully", "angrily", "eagerly", "lazily", "boldly", "quietly"];
const verbs = ["jumps", "runs", "flies", "sings", "dances", "drives", "writes", "draws", "talks", "walks"];
const adjectives = ["red", "blue", "green", "big", "small", "bright", "dark", "shiny", "rough", "smooth"];

function getWordFromList(list, index) {
    return list[index % list.length];
}

function getTimestampFromSentence(sentence) {
    const [noun1, adverb, verb, adjective, noun2] = sentence.split(' ');
    const noun1Index = nouns.indexOf(noun1);
    const adverbIndex = adverbs.indexOf(adverb);
    const verbIndex = verbs.indexOf(verb);
    const adjectiveIndex = adjectives.indexOf(adjective);
    const noun2Index = nouns.indexOf(noun2);

    if (noun1Index === -1 || adverbIndex === -1 || verbIndex === -1 || adjectiveIndex === -1 || noun2Index === -1) {
        throw new Error("Invalid sentence structure.");
    }

    // Recalculate the minute based on the indexes
    const minutes = noun1Index + 
                    (adverbIndex * nouns.length) + 
                    (verbIndex * nouns.length * adverbs.length) + 
                    (adjectiveIndex * nouns.length * adverbs.length * verbs.length);
    return minutes;
}

function generateUniqueString(minutes) {
    const noun1 = getWordFromList(nouns, minutes);
    const adverb = getWordFromList(adverbs, Math.floor(minutes / nouns.length));
    const verb = getWordFromList(verbs, Math.floor(minutes / (nouns.length * adverbs.length)));
    const adjective = getWordFromList(adjectives, Math.floor(minutes / (nouns.length * adverbs.length * verbs.length)));
    const noun2 = getWordFromList(nouns, minutes + 1);

    const string = `${noun1} ${adverb} ${verb} ${adjective} ${noun2}`;
    return string;
}

function assignColor() {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const colorIndex = minutes % colors.length;
    return colors[colorIndex];
}

function updateStringBox() {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const uniqueString = generateUniqueString(minutes);
    const color = assignColor();
    stringBox.textContent = uniqueString;
    stringBox.style.backgroundColor = color;
    timeBox.textContent = `Current time: ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function lookupTimestamp() {
    const sentence = sentenceInput.value.trim();
    try {
        const minutes = getTimestampFromSentence(sentence);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        timestampBox.textContent = `The sentence corresponds to ${hours}:${String(remainingMinutes).padStart(2, '0')}`;
        timestampBox.style.backgroundColor = '#333';
    } catch (error) {
        timestampBox.textContent = error.message;
        timestampBox.style.backgroundColor = '#FF5733';
    }
}

generateButton.addEventListener('click', updateStringBox);
lookupButton.addEventListener('click', lookupTimestamp);

// Update the string and time every minute
updateStringBox(); // Initial call to display the string on page load
setInterval(updateStringBox, 60000); // Update every minute
