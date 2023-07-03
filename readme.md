# Design Tokens Mapping Tool

This is a web service for mapping color hex codes with existing design tokens. It provides functionality to convert hex codes to OKLCH values, calculate contrast ratios, and match them with the closest design tokens in a database.

## Features

- Conversion of hex codes to OKLCH values and contrast ratios.
- Matching algorithm to find the closest design token.
- Admin panel for managing design tokens.
- User interface for entering hex codes and viewing corresponding tokens.

## Technologies Used

- Node.js
- Express.js
- SQLite (or another suitable database system)
- Chroma.js

## Setup and Usage

1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Set up the database and configure the connection in `database.js`.
4. Run the server using `node server.js`.
5. Access the web service at `http://localhost:3000`.

## API Endpoints

- `GET /convert/:hex`: Convert a hex code to OKLCH values and contrast ratio.
- `GET /match/:lightness/:chroma/:hue/:contrast_ratio`: Match OKLCH values and contrast ratio to the closest design token.
- `POST /tokens`: Add a new design token to the database.
- `GET /tokens`: Retrieve all design tokens from the database.
- `DELETE /tokens/:id`: Delete a design token from the database.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
