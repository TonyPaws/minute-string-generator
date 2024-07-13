const stringBox = document.getElementById('string-box');
const generateButton = document.getElementById('generate-button');
const sentenceInput = document.getElementById('sentence-input');
const lookupButton = document.getElementById('lookup-button');
const timestampBox = document.getElementById('timestamp-box');
const timeBox = document.getElementById('time-box');
const useDropdownsCheckbox = document.getElementById('use-dropdowns');
const dropdownsSection = document.getElementById('dropdowns-section');

const noun1Select = document.getElementById('noun1-select');
const adverbSelect = document.getElementById('adverb-select');
const verbSelect = document.getElementById('verb-select');
const adjectiveSelect = document.getElementById('adjective-select');
const noun2Select = document.getElementById('noun2-select');

const hourInput = document.getElementById('hour-input');
const minuteInput = document.getElementById('minute-input');
const timeToSentenceButton = document.getElementById('time-to-sentence-button');

const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#FFC733',
    '#FF8333', '#D433FF', '#33FF83', '#FF5733', '#FF33F5', '#F533FF'
];

const nouns = ["cat", "dog", "car", "tree", "house", "bird", "mouse", "cake", "shoe", "cloud"];
const adverbs = ["quickly", "slowly", "happily", "sadly", "gracefully", "angrily", "eagerly", "lazily", "boldly", "quietly"];
const verbs = ["writes", "draws", "paints", "carries", "builds", "repairs", "reads", "sends", "receives", "offers"];
const adjectives = ["big", "small", "bright", "dark", "shiny", "rough", "smooth", "soft", "hard", "loud"];

function getWordFromList(list, index) {
    return list[index % list.length];
}

function getIndexFromWord(list, word) {
    return list.indexOf(word);
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

function populateDropdowns() {
    nouns.forEach(word => {
        const option = document.createElement('option');
        option.value = word;
        option.textContent = word;
        noun1Select.appendChild(option);
        noun2Select.appendChild(option.cloneNode(true));
    });
    adverbs.forEach(word => {
        const option = document.createElement('option');
        option.value = word;
        option.textContent = word;
        adverbSelect.appendChild(option);
    });
    verbs.forEach(word => {
        const option = document.createElement('option');
        option.value = word;
        option.textContent = word;
        verbSelect.appendChild(option);
    });
    adjectives.forEach(word => {
        const option = document.createElement('option');
        option.value = word;
        option.textContent = word;
        adjectiveSelect.appendChild(option);
    });
}

function getTimestampFromSentence(sentence) {
    const [noun1, adverb, verb, adjective, noun2] = sentence.split(' ');
    const noun1Index = getIndexFromWord(nouns, noun1);
    const adverbIndex = getIndexFromWord(adverbs, adverb);
    const verbIndex = getIndexFromWord(verbs, verb);
    const adjectiveIndex = getIndexFromWord(adjectives, adjective);
    const noun2Index = getIndexFromWord(nouns, noun2) - 1;

    if (noun1Index === -1 || adverbIndex === -1 || verbIndex === -1 || adjectiveIndex === -1 || noun2Index === -1) {
        throw new Error("Invalid sentence structure.");
    }

    const minutes = noun1Index + 
                    (adverbIndex * nouns.length) + 
                    (verbIndex * nouns.length * adverbs.length) + 
                    (adjectiveIndex * nouns.length * adverbs.length * verbs.length);
    return minutes;
}

function lookupTimestamp() {
    let sentence;
    if (useDropdownsCheckbox.checked) {
        const noun1 = noun1Select.value;
        const adverb = adverbSelect.value;
        const verb = verbSelect.value;
        const adjective = adjectiveSelect.value;
        const noun2 = noun2Select.value;
        sentence = `${noun1} ${adverb} ${verb} ${adjective} ${noun2}`;
    } else {
        sentence = sentenceInput.value.trim();
    }

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

function convertTimeToSentence() {
    const hour = parseInt(hourInput.value);
    const minute = parseInt(minuteInput.value);

    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        timestampBox.textContent = "Please enter a valid time.";
        timestampBox.style.backgroundColor = '#FF5733';
        return;
    }

    const minutes = hour * 60 + minute;
    const uniqueString = generateUniqueString(minutes);

    timestampBox.textContent = `The sentence for ${hour}:${String(minute).padStart(2, '0')} is "${uniqueString}".`;
    timestampBox.style.backgroundColor = '#333';
}

useDropdownsCheckbox.addEventListener('change', () => {
    dropdownsSection.style.display = useDropdownsCheckbox.checked ? 'flex' : 'none';
    sentenceInput.style.display = useDropdownsCheckbox.checked ? 'none' : 'block';
});

generateButton.addEventListener('click', updateStringBox);
lookupButton.addEventListener('click', lookupTimestamp);
timeToSentenceButton.addEventListener('click', convertTimeToSentence);

// Populate dropdowns on load
populateDropdowns();

// Update the string and time every minute
updateStringBox(); // Initial call to display the string on page load
setInterval(updateStringBox, 60000); // Update every minute
