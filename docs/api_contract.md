# Ariya 2.0 - Unified API Specification

This document defines the complete architectural requirements for the Ariya 2.0 ecosystem, supporting the high-fidelity Wedding Planner and Professional Vendor platforms.

---

## 1. Authentication & Identity Layer
| Route | Method | Payload | Description |
| :--- | :--- | :--- | :--- |
| `/auth/login` | `POST` | `{email, pass}` | Returns JWT and User Context (Role/Permissions). |
| `/auth/register` | `POST` | `FormData` | Handles multi-step onboarding for both roles. |
| `/auth/onboarding` | `PATCH` | `{step, data}` | Saves partial progress during registration. |
| `/user/me` | `GET` | - | Fetches current user, session status, and role metadata. |
| `/user/settings` | `PATCH` | `Object` | Privacy, notification toggles, and security config. |

---

## 2. Planner Ecosystem (B2C)

### 2.1 Event Architecture
| Route | Method | Description |
| :--- | :--- | :--- |
| `/events` | `GET` / `POST` | Lifecycle management of events. |
| `/events/:id/dashboard` | `GET` | Aggregated health (Budget, Guests, Tasks) for the dashboard. |
| `/events/:id/ai-insights` | `GET` | AI-generated recommendations and budget allocation rules. |

### 2.2 Project Management (Tasks)
| Route | Method | Description |
| :--- | :--- | :--- |
| `/events/:id/tasks` | `GET` / `POST` | Fetch/Create tasks with priority, category, and assignee. |
| `/tasks/:id` | `PATCH` / `DELETE`| Update status (completed/pending), title, or remove task. |
| `/tasks/categories` | `GET` | Fetch task categories (Venue, Food, Design, etc.). |

### 2.3 Guest & Seating Infrastructure
| Route | Method | Description |
| :--- | :--- | :--- |
| `/events/:id/guests` | `GET` / `POST` | Comprehensive guest list management. |
| `/guests/bulk-import` | `POST` | CSV/VCF processing for mass guest entry. |
| `/events/:id/seating` | `GET` | Table layout, XY coordinates, and guest mappings. |
| `/seating/tables` | `POST` / `PATCH` | Manage table units (Round/Rect) and capacities. |
| `/guests/:id/assign-table`| `PATCH` | Move guest to specific table/seat. |

### 2.4 Financial Hub (Budget)
| Route | Method | Description |
| :--- | :--- | :--- |
| `/events/:id/budget` | `GET` / `PATCH` | Global budget targets and category allocations. |
| `/budget/categories` | `POST` / `PATCH` | Manage spending buckets (Venue, Decor, etc.). |
| `/budget/ledger` | `GET` / `POST` | Full transaction history with payee and status. |

### 2.5 Digital Builder (Website & Design)
| Route | Method | Description |
| :--- | :--- | :--- |
| `/events/:id/website` | `GET` / `PATCH` | Website content state (Hero, Story, Style Config). |
| `/website/templates` | `GET` | List available premium themes by event type. |
| `/website/publish` | `POST` | Triggers deployment and public URL assignment. |
| `/designs/stationery` | `GET` / `POST` | Manage stationery designs (Invitations, Menus). |

---

## 3. Vendor Ecosystem (B2B)

### 3.1 Storefront & Catalog
| Route | Method | Description |
| :--- | :--- | :--- |
| `/vendor/profile` | `GET` / `PATCH` | Business portfolio, bio, and visual identity assets. |
| `/vendor/services` | `GET` / `POST` | Service definitions, pricing tiers (Base/Premium). |
| `/vendor/portfolio` | `POST` / `DELETE`| Multi-asset gallery management (S3/Cloudinary). |

### 3.2 Supply Chain & Logistics
| Route | Method | Description |
| :--- | :--- | :--- |
| `/vendor/calendar` | `GET` | Combined view of bookings, blackout dates, and inquiries. |
| `/vendor/calendar/events`| `POST` | Block dates or add custom business events. |
| `/vendor/pipeline` | `GET` | Active lead tracking (Inquiry → Quote → Contract). |
| `/vendor/bookings/:id` | `PATCH` | Booking status transitions and logistics updates. |

### 3.3 Growth & Reputation
| Route | Method | Description |
| :--- | :--- | :--- |
| `/vendor/growth` | `GET` | Analytics (Impressions, Booking Rate, Revenue Trends). |
| `/vendor/reviews` | `GET` / `POST` | Manage client feedback and public review responses. |
| `/vendor/subscription` | `GET` / `POST` | Pro Tier management and billing portal. |

---

## 4. Communication & Intelligence Layer

### 4.1 Real-time Messaging
| Route | Method | Description |
| :--- | :--- | :--- |
| `/chat/threads` | `GET` | Unified inbox for planners and vendors. |
| `/chat/:threadId` | `GET` | Message history with pagination. |
| `/chat/messages` | `POST` | Send message (Broadcasts via WebSocket/Pusher). |

### 4.2 Intelligence (AI Services)
| Route | Method | Description |
| :--- | :--- | :--- |
| `/ai/generate-milestones` | `POST` | AI generation of wedding/event timelines. |
| `/ai/budget-optimizer` | `POST` | Suggests allocation based on localized market data. |
| `/ai/vendor-match` | `GET` | Weighted recommendations for planners based on budget/style. |

---

## 5. Media & Assets
| Route | Method | Description |
| :--- | :--- | :--- |
| `/media/upload` | `POST` | Generic signed URL or direct upload for assets. |
| `/media/:id` | `DELETE` | Removes asset from cloud storage. |

## Response Envelope Standard
```json
{
  "status": "success",
  "data": { ... },
  "timestamp": "2024-03-20T10:00:00Z",
  "meta": { "total": 0, "page": 1 }
}
```
