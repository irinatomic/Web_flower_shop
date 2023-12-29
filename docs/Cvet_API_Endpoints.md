## API Endpoints for Cvet Table
Listed are the API endpoints used to interact with the Cvet table in the database.

| Method      | Address                           |
|-------------|-----------------------------------|
| GET all     | http://localhost:9000/cvet        |
| GET by id   | http://localhost:9000/cvet/:id    |
| POST        | http://localhost:9000/cvet        |
| PUT         | http://localhost:9000/cvet/:id    |
| DELETE      | http://localhost:9000/cvet/:id    |


### GET all

| Info    | Retrieves all data from the API.                            |
|---------|-------------------------------------------------------------|
| Returns | list: A list of all the data retrieved from the API.        |
| Raises  | APIError:  If there is an error while making the API call.  |
| Auth    | None                                                        |

### GET by id

| Info    | Retrieves data from the API based on the provided id.        |
|---------|--------------------------------------------------------------|
| Returns | object: The data retrieved from the API in JSON format.      |
| Raises  | APIError: If there is an error while making the API call.    |
| Auth    | None                                                         |

Returns:
```
{
  "id": 1,
  "naziv": "Crvene ruže"
}
```

### POST

| Info    | Creates a new cvet object                                    |
|---------|--------------------------------------------------------------|
| Returns | object: The created object in JSON format.                   |
| Raises  | APIError: If there is an error while making the API call.    |
| Auth    | Admin                                                        |

Request body:
```
{
  "naziv": "Test"
}
```

Response:
```
{
  "id": 12,
  "naziv": "Test"
}
```

### PUT

| Info    | Modifies an existing cvet object whose id is in the params   |
|---------|--------------------------------------------------------------|
| Returns | object: The modified object in JSON format.                  |
| Raises  | APIError: If there is an error while making the API call.    |
| Auth    | Admin                                                        |

Request body:
```
{
  "naziv": "Test_izmena"
}
```

Response:
```
{
  "id": 12,
  "naziv": "Test_izmena"
}
```

### DELETE

| Info    | Deletes cvet object with the id given in request parameters. |
|---------|--------------------------------------------------------------|
| Returns | object: The id of the deleted cvet object.                   |
| Raises  | APIError: If there is an error while making the API call.    |
| Auth    | Admin                                                        |
