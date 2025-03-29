# Telegram - Online Members Percentage Overlay

This userscript displays a fixed overlay on Telegram Web that shows the percentage of online members in a group. The overlay updates in real time without modifying the original DOM of the page.

## Features

- **Real-time updates:** The overlay automatically updates when the number of online or total members changes.
- **Non-intrusive:** The overlay is fixed and does not interfere with Telegram Web's original layout.
- **Easy installation:** Works with popular userscript managers like Tampermonkey.

## Installation

1. **Install a userscript manager:**  
   If you haven't already, install [Tampermonkey](https://www.tampermonkey.net/) for your browser.

2. **Add the userscript:**  
   - Click the Tampermonkey extension icon in your browser.
   - Select "Create a new script..."
   - Replace the default code with the contents of the script in this repository.
   - Save the script.

3. **Visit Telegram Web:**  
   Navigate to [Telegram Web](https://web.telegram.org/) and the overlay will appear on the page showing the online members percentage.

## Usage

- The overlay displays the format:  
  `Online: [online members] / [total members] ([percentage]%)`
- The script automatically observes changes in the Telegram Web interface and updates the overlay accordingly.

## Customization

You can modify the appearance or behavior of the overlay by editing the style properties in the script. Look for the `Object.assign` block in the `getOverlay` function to change properties like position, color, padding, etc.

## Contributing

Contributions are welcome! If you find bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the Tampermonkey community for providing a robust platform to run userscripts.
- Inspired by various community scripts and contributions for enhancing Telegram Web functionality.

Happy coding!
