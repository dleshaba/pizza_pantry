Pizza Pantry Inventory App

A mobile app to manage inventory items: add, edit, delete, adjust quantity, and track stock levels. Built with React Native (TypeScript) for the frontend, Node.js + Express + MongoDB for the backend.

Table of Contents

1. Features
2. Prerequisites
3. Project Structure
4. Setup
5. Running the App
6. API Endpoints
7. Usage
8. Troubleshooting

Features

> User authentication (register/login).
> View inventory with search, filter (low stock), and pull-to-refresh.
> Add, edit, delete items.
> Adjust item quantity (add/remove stock).
>  Real-time list refresh after operations.
> Touch-first, mobile/tablet-friendly UI.

Prerequisites

> Make sure you have installed:
> Node.js >= 18
> npm or yarn
> MongoDB (running locally or on a server)
> React Native CLI
> Android Studio or Xcode (for simulator/emulator)
> Optional: Postman to test backend APIs.

Project Structure
/backend            # Node.js + Express + MongoDB API
  server.js         # Entry point
  routes/
  models/
  controllers/
  services/

/frontend           # React Native App
  src/
    screens/        # Login, Register, InventoryList, Add/Edit Item
    services/       # API service files
    components/     # Reusable UI components
App.tsx             # Navigation and root app
types.ts            # TypeScript type definitions

Setup
cd backend
npm install

Ensure App.tsx points to the correct API URL:
const API_URL = "http://127.0.0.1:5000";

Start the app:
npx react-native start
npx react-native run-android   # for Android
npx react-native run-ios       # for iOS

API Endpoints:
| Method | Endpoint              | Description     |
| ------ | --------------------- | --------------- |
| POST   | /api/auth/register    | Register a user |
| POST   | /api/auth/login       | Login a user    |
| GET    | /api/items            | Get all items   |
| POST   | /api/items            | Create an item  |
| PUT    | /api/items/:id        | Update an item  |
| DELETE | /api/items/:id        | Delete an item  |
| POST   | /api/items/:id/adjust | Adjust quantity |

Usage

1. Register/Login: Open the app, register a new user or login.
2. View Inventory: Search items or filter low stock.
3. Add Item: Click Add Item, fill in details, save — the list updates automatically.
4. Edit Item: Tap Edit on an item, update fields, save — the list updates automatically.
5. Delete Item: Tap Delete, confirm — the item disappears from the list.
6. Adjust Quantity: (Optional future feature) — can add or remove stock with reason.

Troubleshooting

1. Blank screen on mobile app
> Ensure NavigationContainer wraps your Stack.Navigator.
> Make sure screens are exported correctly with export default.
> Check API URL in frontend matches backend.
2. “NAVIGATE not handled” error
> Make sure all screens exist in the navigator (Stack.Screen).
Example:
<Stack.Screen name="AddItem" component={AddItemScreen} />
<Stack.Screen name="EditItem" component={EditItemScreen} />
<Stack.Screen name="EditItem" component={EditItemScreen} />

3. Backend connection issues
Verify MongoDB is running (mongod).
Check MONGO_URI in .env file.

4. Token or authentication errors
Make sure the JWT token is stored correctly in AsyncStorage.
Check headers in your API requests: Authorization: Bearer <token>.

5. Auto-refresh issues
Pass a refresh function from InventoryList to Add/Edit screens, and call it after creating/updating items.

