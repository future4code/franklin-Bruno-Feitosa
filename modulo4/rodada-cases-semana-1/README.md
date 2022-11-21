## Wirecard API Challenge

### Project

#### Technologies:

- NodeJS + express
- Typescript
- DB: MySQL
- DB Connection: Knex
- Test: Jest

#### Libs:

- IDGenerate: uuid
- HashManager: bcryptjs
- Authenticate: JWT
- CardIssuer: credit-card-type

### Run this project

- To run this project you'll need to install the dependences and check the documentation below to use the requests.

- You need to create these DB tables:

```
CREATE TABLE Wirecard_Buyer (
buyer_id VARCHAR(255) PRIMARY KEY,
buyer_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL UNIQUE,
cpf VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Wirecard_Card (
card_number VARCHAR(255) PRIMARY KEY,
card_holder_name VARCHAR(255) NOT NULL,
card_expiration_date VARCHAR(255) NOT NULL,
card_CVV INTEGER NOT NULL,
card_issuer VARCHAR(255) NOT NULL,
buyer_id VARCHAR(255) NOT NULL,
FOREIGN KEY (buyer_id) REFERENCES Wirecard_Buyer(buyer_id)
);

CREATE TABLE Wirecard_Payment (
payment_id VARCHAR(255) PRIMARY KEY,
buyer_id VARCHAR(255) NOT NULL,
amount INTEGER NOT NULL,
type ENUM("BOLETO", "CREDIT_CARD") NOT NULL,
status ENUM("APROVADO", "PENDENTE") NOT NULL DEFAULT "PENDENTE",
card_number VARCHAR(255),
payment_date VARCHAR(255) NOT NULL,
FOREIGN KEY (card_number) REFERENCES Wirecard_Card(card_number),
FOREIGN KEY (buyer_id) REFERENCES Wirecard_Buyer(buyer_id)
);
```

- https://documenter.getpostman.com/view/20887338/2s83zjqN3C

### Architecture

- The architecture used was Three-Tier Architecture.

In this architecture we divided our program in three tiers: business, controller and database.

#### Controller

- In controller we just receive, wait answers from the other tiers and respond. After all answers received, we can finally sent our final application response.

#### Business

- In business we have all the business rules, with both validations and calls to database. After getting the response from the database, we return the response to the tier above (controller).

#### Database

- In database we do all the job behind the application, we interact directly with our database and return the result to the tier above (business).
