# Ariya 2.0 - Data Structure Deep Dive (DTOs)

This document specifies the exact request and response shapes for the core Ariya 2.0 features.

## 1. Authentication & Onboarding

### POST `/auth/register` (Multi-step DTO)
**Request Body:**
```json
{
  "role": "planner | vendor",
  "email": "user@example.com",
  "password": "hashed_password",
  "onboardingData": {
    "planner": {
      "firstName": "Tosin",
      "lastName": "John",
      "eventType": "Wedding",
      "eventDate": "2025-06-15",
      "budgetRange": "Elite (₦10M - ₦25M)",
      "estimatedGuests": "250-500",
      "preferredStyle": "Modern"
    },
    "vendor": {
      "businessName": "Lens Queen Studios",
      "categories": ["Photographer", "Videographer"],
      "location": { "country": "Nigeria", "state": "Lagos", "city": "Ikoyi" },
      "assets": { "portraitUrl": "id_image.jpg", "logoUrl": "brand_logo.png" }
    }
  }
}
```

---

## 2. Planner Ecosystem

### GET `/events/:id/dashboard`
**Response Shape:**
```json
{
  "event": {
    "id": "e123",
    "name": "Alex & Jordan's Gala",
    "countdown": 45, // days
    "health": {
      "budget": 85.5, // % utilized
      "tasks": 60.0,  // % completed
      "guests": 72.0  // % RSVP confirmed
    },
    "recentActivity": [
      { "id": 1, "type": "task", "msg": "Venue booked", "time": "2h ago" }
    ]
  }
}
```

### POST `/budget/transactions`
**Request Body:**
```json
{
  "eventId": "e123",
  "categoryId": "cat_456",
  "payee": "Grand Ballroom",
  "amount": 500000,
  "date": "2024-03-20",
  "status": "CLEARED | PENDING",
  "note": "Initial deposit for venue"
}
```

### GET `/events/:id/seating`
**Response Shape:**
```json
{
  "tables": [
    {
      "id": "t1",
      "name": "Head Table",
      "type": "rectangle",
      "capacity": 10,
      "coordinates": { "x": 450, "y": 120 },
      "guests": [
        { "id": "g1", "name": "Sarah J.", "avatar": "url", "group": "Family" }
      ]
    }
  ],
  "unassignedGuests": [
    { "id": "g2", "name": "Mike B.", "avatar": "url", "group": "Friends" }
  ]
}
```

---

## 3. Vendor Ecosystem

### GET `/vendor/growth`
**Response Shape:**
```json
{
  "analytics": {
    "totalRevenue": 15500000,
    "revenueTrend": "+12.5%",
    "profileImpressions": 4500,
    "conversionRate": 3.2,
    "monthlyEarnings": [
      { "month": "Jan", "value": 1200000 },
      { "month": "Feb", "value": 2500000 }
    ]
  }
}
```

### GET `/vendor/calendar`
**Response Shape:**
```json
{
  "events": [
    {
      "id": "b_789",
      "type": "booking | blackout | inquiry",
      "title": "Bakare Wedding",
      "start": "2024-06-15T09:00:00Z",
      "end": "2024-06-15T22:00:00Z",
      "status": "confirmed",
      "clientName": "Alex Bakare"
    }
  ]
}
```

---

## 4. Communication Layer

### POST `/chat/messages`
**Request Body:**
```json
{
  "threadId": "th_001",
  "recipientId": "u_999",
  "content": "Hello! Just confirming the catering menu.",
  "attachments": ["image_url_1.jpg"]
}
```

## 5. AI Intelligence Layer

### POST `/ai/generate-milestones`
**Request:** `{ eventType: "Wedding", date: "2025-06-15" }`
**Response Body:**
```json
{
  "milestones": [
    { "phase": "Planning Phase", "task": "Book Venue", "due": "2024-06-15" },
    { "phase": "Logistics", "task": "Initial Catering Tasting", "due": "2024-12-15" }
  ]
}
```
