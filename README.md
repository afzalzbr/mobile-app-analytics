# Mobile App Analytics Dashboard

This project is a React-based analytics dashboard for monitoring mobile app performance metrics such as downloads and revenue across different time periods.

## Overview

The dashboard provides data visualization and analysis capabilities for tracking app performance metrics. It includes:

- Interactive line charts showing downloads or revenue over time
- Tabular data display with app details
- Date range filtering
- Toggle between downloads and revenue metrics

## Features

- **Interactive Charts**: Visualize app performance data using Highcharts
- **Data Table**: View and analyze raw data in tabular format
- **Date Range Selection**: Filter data by customizable date ranges
- **Metric Selection**: Toggle between downloads and revenue metrics
- **Responsive Design**: Works across different screen sizes

## Tech Stack

- React 18
- TypeScript
- [Highcharts](https://www.highcharts.com/) for data visualization
- Material UI components (@mui/material, @mui/x-data-grid)
- Day.js for date manipulation
- React Testing Library for unit tests

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd fe-assignment-react
```

1. Install dependencies

```bash
npm install
# or
yarn install
```

1. Start the development server

```bash
npm start
# or
yarn start
```

1. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner in interactive watch mode
- `npm run build`: Builds the app for production to the `build` folder
- `npm run eject`: Ejects the create-react-app configuration

## Project Structure

```text
src/
  ├── components/
  │   ├── chart/          # Chart visualization components
  │   ├── controls/       # UI controls for filtering data
  │   ├── table/          # Data table components
  │   └── ui/             # Common UI components
  ├── hooks/              # Custom React hooks
  │   ├── useFilters.tsx  # Hook for managing filter state
  │   └── useSalesData.tsx # Hook for fetching and processing app data
  ├── lib/                # Utility functions
  └── tests/              # Test files
```

## Data Structure

The application works with app data in the following format:

- App metadata (id, name, icon)
- Time series data for each app (date, downloads, revenue)

## License

This project is private and confidential.

## Acknowledgments

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Uses [Highcharts](https://www.highcharts.com/) for data visualization.
