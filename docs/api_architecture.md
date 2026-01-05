# Ariya 2.0 - API Architectural Design

This document defines the high-level structure, conventions, and architectural patterns for the Ariya 2.0 API.

## 1. Base URL & Versioning
All requests must be prefixed with the version identifier to ensure backward compatibility as the platform evolves.

*   **Production:** `https://api.ariya.io/v1`
*   **Staging:** `https://staging-api.ariya.io/v1`
*   **Development:** `http://localhost:5000/v1`

---

## 2. Resource Nesting Patterns
We follow a **Resource-Centric** nesting strategy. Sub-resources that belong exclusively to a parent resource are nested to clarify ownership.

| Pattern | Example | Description |
| :--- | :--- | :--- |
| **Top-Level** | `/events` | Global collections or resources. |
| **Nested** | `/events/:id/guests` | Guests belonging to a specific event. |
| **Deep-Nested** | `/events/:id/budget/categories` | Fine-grained control within a module. |
| **Cross-Resource**| `/vendors/:id/reviews` | Relationship between two top-level entities. |

---

## 3. Standard Request Headers
| Header | Value | Requirement |
| :--- | :--- | :--- |
| `Authorization` | `Bearer <JWT_TOKEN>` | Required for all protected routes. |
| `Content-Type` | `application/json` | Required for all `POST`/`PATCH`/`PUT` requests. |
| `X-Event-ID` | `UUID` | Recommended for dashboard-scoped operations. |

---

## 4. Response Infrastructure

### 4.1 Successful Response Envelope
Every successful response is wrapped in a standardized envelope for consistent frontend parsing.

```json
{
  "status": "success",
  "data": { ... }, // Can be an object or an array
  "meta": {
    "requestId": "req_8829",
    "timestamp": "2024-03-20T10:00:00Z",
    "pagination": {
      "total": 1250,
      "page": 1,
      "limit": 50,
      "pages": 25
    }
  }
}
```

### 4.2 Error Handling Structure
Errors must return a non-200 status code and a descriptive payload.

```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The provided data is invalid.",
    "details": [
      { "field": "email", "issue": "Must be a valid business email address." },
      { "field": "password", "issue": "Minimum 8 characters required." }
    ]
  }
}
```

---

## 5. Standard HTTP Status Codes
| Code | Meaning | Usage |
| :--- | :--- | :--- |
| `200 OK` | Success | Standard response for successful `GET` or `PATCH`. |
| `201 Created` | Success | Response for successful `POST` (Creation). |
| `204 No Content`| Success | Response for successful `DELETE`. |
| `400 Bad Request`| Client Error | Validation failed or malformed JSON. |
| `401 Unauthorized`| Client Error | Missing or invalid JWT token. |
| `403 Forbidden` | Client Error | User has no permission for this specific resource. |
| `404 Not Found` | Client Error | Resource does not exist. |
| `500 Server Error`| Server Error | Unexpected crash or database failure. |

---

## 6. Query Interface (Filtering & Sorting)
To keep the frontend lean, complex logic is handled via URL query parameters.

### 6.1 Pagination
`GET /v1/events?page=1&limit=20`

### 6.2 Filtering (LHS Brackets)
`GET /v1/vendors?category[eq]=Photographer&location[in]=Lagos,Abuja`

### 6.3 Sorting
`GET /v1/budget/ledger?sort=-date,amount` (Prefix `-` for descending)

### 6.4 Field Selection (Lean Loading)
`GET /v1/events/:id?fields=name,date,budgetUtilization`

---

## 7. Real-time Communication
For high-frequency updates (Chat, Notifications, Budget changes):
*   **WebSocket/Pusher Channel Pattern:** `private-event-:id`, `private-user-:id`
*   **Events:** `message.new`, `task.completed`, `budget.exceeded`
