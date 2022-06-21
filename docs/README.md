# Documentation

## Purpose

Front end developers needs to know what has been built, this documentation exists for this reason, so Front end devs don't have to dig through the backend files to know what is accessible or not

## Documentation url

[https://musosy.github.io/jahbaf-back/index.html](https://musosy.github.io/jahbaf-back/index.html)

## How to update

Resolvers are sorted by categories, please follow the following pattern when adding a resolver

```javascript
category_name: {
    resolver_name: {
        type: Query | Mutation,
        description: string,
        usage: Function call signature,
        returns: Types of what is returned,
        exceptions: [
            {
                name: Name of the exception,
                description: Description of the exception,
                code: Error code
            }
        ]
    }
}
```

### Example

```json
"authentication": {
        "signIn": {
            "type": "Query",
            "description": "Create an account for the user",
            "usage": "signIn(email: $email, password: $password)",
            "returns": "{ user: User, token: String }",
            "exceptions": [
                {
                    "name": "InvalidEmailException",
                    "description": "The email entered by the user is not valid",
                    "code": 1002
                }
            ]
        }
    }
```