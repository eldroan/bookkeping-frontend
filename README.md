# Bookkeping Frontend

A user management CRUD application using a mock api with in-memory persistance.

Some of the tech used:

- React
- Typescript
- NextJS with pages router
- Tailwind
- React hook forms
- Yup
- Radix-ui

## Testing on vercel

Visit the deployed version [here](https://bookkeping-frontend.vercel.app/)

> Note: The data is persisted in memory so it will be reset if there is no traffic for a while.

## Running dev environment

Run the development server:

```bash
npm i && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Postman collection for api

If you want to test the api you can import the following postman collection:

```json
{
  "info": {
    "_postman_id": "353eb212-812d-4776-9750-60513d303b15",
    "name": "bookkeping-frontend",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "7928774"
  },
  "item": [
    {
      "name": "Get all users (Local)",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/users",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "users"]
        }
      },
      "response": []
    },
    {
      "name": "Create user (Local)",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"firstName\": \"Leandro\",\n    \"lastName\": \"Amarillo\",\n    \"age\": 29,\n    \"gender\": \"male\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/api/users",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "users"]
        }
      },
      "response": []
    },
    {
      "name": "Get user by id (Local)",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/users/:uuid",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "users", ":uuid"],
          "variable": [
            {
              "key": "uuid",
              "value": "f796a0ec-b34c-4a10-9b6b-44c715f667de"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "Remove user by id (Local)",
      "request": {
        "method": "DELETE",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"firstName\": \"Leandro\",\n    \"lastName\": \"Amarillo\",\n    \"age\": 29,\n    \"gender\": \"male\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/api/users/:uuid",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "users", ":uuid"],
          "variable": [
            {
              "key": "uuid",
              "value": "f796a0ec-b34c-4a10-9b6b-44c715f667de"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "Update user by id (Local)",
      "request": {
        "method": "PATCH",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"id\": \"fsadfasdf715f667de\",\n    \"firstName\": \"Ricardo\",\n    \"lastName\": \"Carlos\",\n    \"age\": 15\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/api/users/f796a0ec-b34c-4a10-9b6b-44c715f667de",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "users", "f796a0ec-b34c-4a10-9b6b-44c715f667de"]
        }
      },
      "response": []
    },
    {
      "name": "Get users (Vercel)",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "https://bookkeping-frontend.vercel.app/api/users",
          "protocol": "https",
          "host": ["bookkeping-frontend", "vercel", "app"],
          "path": ["api", "users"]
        }
      },
      "response": []
    },
    {
      "name": "Remove user by id (Vercel)",
      "request": {
        "method": "DELETE",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"firstName\": \"Leandro\",\n    \"lastName\": \"Amarillo\",\n    \"age\": 29,\n    \"gender\": \"male\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://bookkeping-frontend.vercel.app/api/users/:uuid",
          "protocol": "https",
          "host": ["bookkeping-frontend", "vercel", "app"],
          "path": ["api", "users", ":uuid"],
          "variable": [
            {
              "key": "uuid",
              "value": "f796a0ec-b34c-4a10-9b6b-44c715f667de"
            }
          ]
        }
      },
      "response": []
    }
  ]
}
```
