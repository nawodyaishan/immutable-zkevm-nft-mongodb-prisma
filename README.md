# Immutable zkEVM NestJS Project

This project, named "Immutable zkEVM NestJS", is a NestJS-based application designed to interact with Ethereum smart contracts, focusing on NFT minting and user authentication. It leverages the power of zkEVM for enhanced privacy and scalability in Ethereum transactions.

## Features

- **NFT Minting**: Allows minting NFTs to a specified recipient.
- **Authentication**: Support for user signup and authentication.
- **User Inventory**: Fetches the inventory of NFTs owned by a user.
- **List NFT Owners**: Lists owners of NFTs for a specific contract.
- **Supported Chains**: Lists supported blockchain networks.

## Getting Started

### Prerequisites

- Node.js (version specified in `package.json` or later)
- PNPM package manager
- An instance of Prisma-compatible database

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd immutable-zkevm-nestjs
```

3. Install dependencies using PNPM:

```bash
pnpm install
```

4. Set up your environment variables:

Create a `.env` file in the root directory. Refer to the `.env.example` for required variables.

5. Initialize the database:

```bash
pnpm run db:sync
```

### Running the Application

To run the application in development mode:

```bash
pnpm run dev
```

For production mode:

```bash
pnpm run start:prod
```

## Project Structure

The project is structured as follows:

- `src/`: Source code of the application, including modules, services, and controllers.
- `prisma/`: Prisma schema and sub-schema files for database models.
- `test/`: Contains e2e tests for the application.

## Contributing

Contributions are welcome! Please read our contributing guidelines for details on how to contribute to this project.

## License

This project is [UNLICENSED]. It's private and proprietary.
