## API Endpoints for Narudzbina Table
Listed are the API endpoints used to interact with the Narudzbina table in the database.

| Method      | Address                                             |
|-------------|-----------------------------------------------------|
| GET all     | http://localhost:9000/narudzbina                    |
| GET by id   | http://localhost:9000/narudzbina/:id                |
| POST        | http://localhost:9000/narudzbina                    |
| PUT         | http://localhost:9000/narudzbina/:id                |
| PUT         | http://localhost:9000/narudzbina/promeni-status/:id |
| DELETE      | http://localhost:9000/narudzbina/:id                |

### GET all

| Info    | Retrieves all data from the API.                            |
|---------|-------------------------------------------------------------|
| Returns | list: A list of all the data retrieved from the API.        |
| Raises  | APIError:  If there is an error while making the API call.  |

### GET by id

| Info    | Retrieves data from the API based on the provided id.        |
|---------|--------------------------------------------------------------|
| Returns | object: The data retrieved from the API in JSON format.      |
| Raises  | APIError: If there is an error while making the API call.    |

Returns:
```
{
  "id": 1,
  "zakazano_vreme": "2023-10-05T18:30:00.000Z",
  "status_narudzbine": "Nova",
  "adresa": "Kralja Milana 12/2",
  "telefon": "0641234567",
  "email": "ime_prezime",
  "ime_prezime": "ime_prezime",
  "stavke": [
    {
      "id": 1,
      "kolicina": 1,
      "jedinicna_cena": 1440,
      "proizvod_id": 2,
      "narudzbina_id": 1,
      "Proizvod": {
        "id": 2,
        "naziv": "I love you",
        "opis": "Savršen poklon za voljenu osobu (12 crvenih ruža)",
        "cena": 1440,
        "kategorija_id": 1
      }
    },
    {
      "id": 2,
      "kolicina": 1,
      "jedinicna_cena": 1800,
      "proizvod_id": 3,
      "narudzbina_id": 1,
      "Proizvod": {
        "id": 3,
        "naziv": "Warm summer day",
        "opis": "Kada želite da osunčate Vaš dom (6 karanfila, 2 astromerije i 2 ljiljana).",
        "cena": 1800,
        "kategorija_id": 1
      }
    }
  ]
}
```

### POST

| Info    | Creates a new Narudzbina object                              |
|---------|--------------------------------------------------------------|
| Returns | object: The created object in JSON format.                   |
| Raises  | APIError: If there is an error while making the API call.    |

Request body:
```
{
  "zakazano_vreme": "2023-10-05T18:30:00.000Z",
  "adresa": "Kralja Milana 25/2",
  "telefon": "0641234567",
  "email": "ime_prezime",
  "ime_prezime": "ime_prezime",
  "sadrzaj": {
			"1": "2",
			"3": "1"
	}
}
```

Response:
```
{
  "id": 5,
  "zakazano_vreme": "2023-10-05T18:30:00.000Z",
  "status_narudzbine": "Nova",
  "adresa": "Kralja Milana 25/2",
  "telefon": "0641234567",
  "email": "ime_prezime",
  "ime_prezime": "ime_prezime"
}
```

### PUT

| Info    | Modifies an existing Narudzbina object whose id is in the params   |
|---------|--------------------------------------------------------------------|
| Returns | object: The modified object in JSON format.                        |
| Raises  | APIError: If there is an error while making the API call.          |

Request body:
```
{
  "zakazano_vreme": "2023-10-05T18:30:00.000Z",
  "adresa": "Kralja Milana 25/2",
  "telefon": "0641234567",
  "email": "ime_prezime_novo",
  "ime_prezime": "ime_prezime",
  "sadrzaj": {
			"1": "2",
			"2": "1"
	}
}
```

Response:
```
{
  "id": 5,
  "zakazano_vreme": "2023-10-05T18:30:00.000Z",
  "status_narudzbine": "Nova",
  "adresa": "Kralja Milana 25/2",
  "telefon": "0641234567",
  "email": "ime_prezime_novo",
  "ime_prezime": "ime_prezime"
}
```

### PUT promeni-status

| Info    | Modifies status of an existing Narudzbina object whose id is in the params |
|---------|----------------------------------------------------------------------------|
| Returns | object: The modified object in JSON format.                                |
| Raises  | APIError: If there is an error while making the API call.                  |


Request body:
```
{
  "status_narudzbine": "Odbijeno" 
}
```

Response:
```
{
  "id": 1,
  "zakazano_vreme": "2023-10-05T18:30:00.000Z",
  "status_narudzbine": "Odbijeno",
  "adresa": "Kralja Milana 12/2",
  "telefon": "0641234567",
  "email": "ime_prezime",
  "ime_prezime": "ime_prezime"
}
```

### DELETE

| Info    | Deletes Proizvod object with the id given in request parameters. |
|---------|------------------------------------------------------------------|
| Returns | object: The id of the deleted Narudzbina object.                 |
| Raises  | APIError: If there is an error while making the API call.        |
