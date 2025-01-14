# Blockchain-Mempool-Explorer

## Table of Contents

- [General Info](#general-info)
- [Project Description](#project-description)
- [Technologies](#technologies)
- [Getting Started](#getting-started)

## General Info

Mempool Blockchain Explorer is an application that enables users to view and visualize unconfirmed transactions (mempool) on the blockchain. The application provides detailed insights into key transaction metrics such as size, fee, processing time, and trends over time.

## Project Description

The application is divided into three main sections:

1. **Basic Transaction Data**: Displays all transactions in the mempool in real-time, including basic information such as txid, time of entry into the mempool, value, and fees.
2. **Detailed Transaction View**: Shows detailed information about individual transactions, including inputs, outputs, associated addresses, and derived metrics like total input/output values and fee rates.
3. **Graphical Analysis of Transactions**: Visual representation of transaction data, enabling better understanding and analysis of trends and blockchain transaction metrics through various charts.

## Technologies

![Express.js](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-%23f7df1e.svg?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-%23ca4245.svg?style=for-the-badge&logo=react-router&logoColor=white)
![npm](https://img.shields.io/badge/npm-%23cb3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![React Bootstrap](https://img.shields.io/badge/React%20Bootstrap-51C8E7?style=for-the-badge&logo=react&logoColor=white)
![Bootstrap Icons](https://img.shields.io/badge/Bootstrap%20Icons-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Bitcoin RPC API](https://img.shields.io/badge/Bitcoin_Rpc_API-%23F2A900.svg?style=for-the-badge&logo=bitcoin&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-%23ff6c37.svg?style=for-the-badge&logo=postman&logoColor=white)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mempool-viewer.git
   ```
2. Navigate to the project directory
3. Install dependencies for both server and client:
   ```bash
   cd server
   npm install
   cd client
   npm install
   ```
4. Set up environment variables in .env for both server and client, ensuring your RPC client access and other configurations are correct.
5. Start the server:
   ```bash
   npm run start
   ```
6. Start the client:
   ```bash
   npm run start
   ```
