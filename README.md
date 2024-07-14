# Unique Minute String Generator

This project is a web application that generates a unique, human-readable sentence for every minute of the day, for ease of remembering. It allows users to either enter a sentence manually or select words from dropdown lists to find the corresponding time.

## Features

- **Unique Sentence Generation**: Generates a unique sentence for each minute of the day using predefined lists of nouns, adverbs, transitive verbs, and adjectives.
- **Time Lookup**: Allows users to enter a sentence and find the corresponding time.
- **Dropdown Selection**: Users can opt to select each word from dropdown lists instead of entering a sentence manually.
- **Current Time Display**: Displays the current time and updates every minute.
- **Responsive Design**: Simple and clean UI that works well on different screen sizes.

## Project Status

**Note:** This application is currently a proof of concept. The mapping function used to generate sentences from timestamps and vice versa may change in future updates. This could affect the reproducibility of results over different versions.

## Usage

### Generate Unique String

1. Open the web application.
2. The unique string for the current minute will be displayed along with the current time.
3. Click the "Generate String" button to refresh the string and time.

### Lookup Time from Sentence

1. Enter a sentence in the input box or check the "Use dropdowns" checkbox to select words.
2. Click the "Lookup Time" button to find the corresponding time.
3. The corresponding time will be displayed below the button.

## Running the Project Locally

To run the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/minute-string-generator.git

2. Navigate to the project folder:
    ```sh
    cd minute-string-generator

3. Open the `index.html` file in your web browser.

## Deployment

This project is hosted on GitHub Pages and can be accessed at:
https://tonypaws.github.io/minute-string-generator/

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## Future enhancements
- **Localisation**: Strings in different languages, am and pm notation.
- **Improve single word mode**: There are 1440 timestamps, which is just a bit more than the number of unique words in the first five chapters of Winnie-The Pooh (1379), a children's book. There is no technical limitation that requires us to rely on five words, it was simply the first implementation of the idea.
- **N-word mode**: As said before, there are 1440 minutes in a day. The Babylonians left us with a good system : 2^5 × 3^2 × 5 gives 36 factors, which means it can be broken down into word-lists in all manner of ways.
- **Bijectivity**: Currently, there are strings that can give you hours outside the 24h clock, and invalid strings. This is simply due to initial ease of implementing a hash-map and to test whether my memory is better-suited to word-strings. 
- **Colo(u)rs**: Currently, the color also updates based on the time, but this is cosmetic for now. It could match with the adjective, providing a layer of redundancy.
- **Human-readability**: The project assumes that 16:23 is difficult to remember, but "tree boldly offers big house" then *needs* to be more memorable than that. Any way that concepts can be more easily remembered, like emojis, events, colors, shapes, and any layer of redundancy should help. Even with a set of six simple colors (red, orange, yellow, green, blue, violet), 
- **Redundancy**: If 1440 words can prove easy to use for decyphering the time, then unique images, shapes, colors can provide redundancy.
- **Expansion**: All available bits of information can be used to create more precision, or a longer epoch.
- **Image-generation**: We can create rough collages of actions described by a sentence, provided the list only has simple actions or relations between subject and object. If scope is dialed down to 60 minutes in the hour or 720mins in the whole day, we can have pre-genrated AI images corresponding to each sentence.

## License

This project is licensed under the MIT License.


