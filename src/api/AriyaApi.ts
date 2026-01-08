/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RegisterDto {
  /** @example "user@example.com" */
  email: string;
  /**
   * @minLength 6
   * @example "password123"
   */
  password: string;
  /** @example "John" */
  firstName: string;
  /** @example "Doe" */
  lastName: string;
  /** @example "personal_planner" */
  role: "personal_planner" | "professional_event_planner" | "vendor" | "admin";
}

export interface LoginDto {
  /** @example "user@example.com" */
  email: string;
  /** @example "password123" */
  password: string;
}

export interface UpdateOnboardingDto {
  /** @example "wedding" */
  eventType?: string;
  /** @example "2025-12-25" */
  eventDate?: string;
  /** @example 50000 */
  preliminaryBudget?: number;
  /** @example "100-200" */
  guestsRange?: string;
  /** @example "Grand Ballroom" */
  businessName?: string;
  /** @example ["venue","catering"] */
  categories?: string[];
  /** @example "New York" */
  city?: string;
  /** @example "NY" */
  state?: string;
}

export interface CreateEventDto {
  /** @example "My Awesome Wedding" */
  title: string;
  /** @example "wedding" */
  type: "wedding" | "corporate" | "birthday" | "other";
  /** @example "2025-12-25" */
  date: string;
  /** @example "18:00" */
  startTime?: string;
  /** @example "Grand Hotel" */
  location?: string;
  /** @example "Romantic & Cozy" */
  atmosphere?: string;
  /**
   * @min 1
   * @example 150
   */
  guestCount?: number;
  /**
   * @min 0
   * @example 50000
   */
  budget: number;
}

export type CreateTableDto = object;

export type UpdateTablePositionDto = object;

export type CreateTaskDto = object;

export type UpdateTaskDto = object;

export type CreateGiftDto = object;

export type CreateFundDto = object;

export type ContributeDto = object;

export interface EntitlementResponseDto {
  role: string;
  limits: object;
  usage: object;
  status: object;
}

export interface CheckoutSessionDto {
  /** @example "extra_event" */
  featureId?: string;
  /** @example "pro_bundle" */
  planId?: string;
}

export interface PayVendorDto {
  /** @example "12345-abcde" */
  bookingId: string;
  /**
   * Amount to pay vendor
   * @example 50000
   */
  amount: number;
}

export type UpdateVendorProfileDto = object;

export type BulkGuestImportDto = object;

export type BulkSeatingUpdateDto = object;

export type CreateInquiryDto = object;

export type SendQuoteDto = object;

export interface GenerateEventDto {
  /**
   * User vision prompt
   * @example "A rustic outdoor wedding for 150 guests"
   */
  visionPrompt: string;
  /** @example 150 */
  guestCount: number;
  /** @example 50000 */
  budgetTotal: number;
}

export interface RecalculateBudgetDto {
  /** @example 60000 */
  newBudgetTotal: number;
}

export type CreateProposalDto = object;

export type UpdateProposalStatusDto = object;

export interface InviteTeamMemberDto {
  /** @example "colleague@example.com" */
  email: string;
  /** @example "member" */
  role: "owner" | "admin" | "member" | "viewer";
  /**
   * Bitmask of permissions
   * @example 4
   */
  permissions?: number;
}

export interface UpdateTeamMemberDto {
  /** @example "admin" */
  role?: string;
  /** @example 8 */
  permissions?: number;
}

export interface TableDto {
  /** @example "table-uuid" */
  id: string;
  /** @example 100 */
  x: number;
  /** @example 200 */
  y: number;
  /** @example 8 */
  capacity: number;
  /** @example "round" */
  type: string;
}

export interface UpdateSeatingLayoutDto {
  tables: TableDto[];
  /** @example 2000 */
  roomWidth?: number;
  /** @example 1000 */
  roomHeight?: number;
}

export interface BulkAssignmentDto {
  /** @example [{"guestId":"g1","tableId":"t1"}] */
  assignments: string[];
}

export interface CreateErrorLogDto {
  /** @example "frontend" */
  errorType: string;
  /** @example "error" */
  severity: string;
  /** @example "Something went wrong" */
  message: string;
  stackTrace?: string;
  userAgent?: string;
  url?: string;
  context?: object;
}

export interface CreatePerformanceMetricDto {
  /** @example "/api/events" */
  endpoint: string;
  /** @example "GET" */
  method: string;
  /** @example 150 */
  duration: number;
  /** @example 200 */
  status: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Ariya API
 * @version 2.0
 * @contact
 *
 * The Ariya Event Planning Platform API description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @summary Register a new user
     * @request POST:/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary Login user
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefresh
     * @summary Refresh access token
     * @request POST:/auth/refresh
     * @secure
     */
    authControllerRefresh: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/refresh`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetMe
     * @request GET:/users/me
     */
    usersControllerGetMe: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/me`,
        method: "GET",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags Onboarding
     * @name OnboardingControllerUpdate
     * @summary Update role-specific onboarding data [AUTH-02]
     * @request PATCH:/user/onboarding/{id}
     * @secure
     */
    onboardingControllerUpdate: (
      id: string,
      data: UpdateOnboardingDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/user/onboarding/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Onboarding
     * @name OnboardingControllerUploadAvatar
     * @summary Upload user avatar [AUTH-03]
     * @request POST:/user/avatar
     * @secure
     */
    onboardingControllerUploadAvatar: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/user/avatar`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  events = {
    /**
     * No description
     *
     * @tags Events
     * @name EventsControllerCreate
     * @summary Create a new event
     * @request POST:/events
     * @secure
     */
    eventsControllerCreate: (
      data: CreateEventDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name EventsControllerFindAll
     * @summary Get all events for current user
     * @request GET:/events
     * @secure
     */
    eventsControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name EventsControllerFindOne
     * @summary Get event details by ID
     * @request GET:/events/{id}
     * @secure
     */
    eventsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name EventsControllerGetDashboard
     * @summary Get event dashboard metrics
     * @request GET:/events/{id}/dashboard
     * @secure
     */
    eventsControllerGetDashboard: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${id}/dashboard`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name EventsControllerGetSummary
     * @summary Get event summary stats and activity [PLAN-02]
     * @request GET:/events/{id}/summary
     * @secure
     */
    eventsControllerGetSummary: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${id}/summary`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerGetSeating
     * @request GET:/events/{eventId}/seating
     */
    seatingControllerGetSeating: (
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/seating`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerAddTable
     * @request POST:/events/{eventId}/seating/tables
     */
    seatingControllerAddTable: (
      eventId: string,
      data: CreateTableDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/seating/tables`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerUpdateTablePosition
     * @request PATCH:/events/{eventId}/seating/tables/{id}/position
     */
    seatingControllerUpdateTablePosition: (
      id: string,
      eventId: string,
      data: UpdateTablePositionDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/seating/tables/${id}/position`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerAssignGuest
     * @request PATCH:/events/{eventId}/seating/guests/{guestId}/assign
     */
    seatingControllerAssignGuest: (
      guestId: string,
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/seating/guests/${guestId}/assign`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerSaveLayout
     * @request PATCH:/events/{eventId}/seating/layout
     */
    seatingControllerSaveLayout: (
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/seating/layout`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksControllerFindAll
     * @request GET:/events/{eventId}/tasks
     */
    tasksControllerFindAll: (eventId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${eventId}/tasks`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksControllerCreate
     * @request POST:/events/{eventId}/tasks
     */
    tasksControllerCreate: (
      eventId: string,
      data: CreateTaskDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/tasks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksControllerUpdate
     * @request PATCH:/events/{eventId}/tasks/{id}
     */
    tasksControllerUpdate: (
      id: string,
      eventId: string,
      data: UpdateTaskDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/tasks/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksControllerDelete
     * @request DELETE:/events/{eventId}/tasks/{id}
     */
    tasksControllerDelete: (
      id: string,
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/tasks/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Registry
     * @name RegistryControllerGetRegistry
     * @request GET:/events/{eventId}/registry
     */
    registryControllerGetRegistry: (
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/registry`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Registry
     * @name RegistryControllerAddGift
     * @request POST:/events/{eventId}/registry/gifts
     */
    registryControllerAddGift: (
      eventId: string,
      data: CreateGiftDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/registry/gifts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Registry
     * @name RegistryControllerAddFund
     * @request POST:/events/{eventId}/registry/funds
     */
    registryControllerAddFund: (
      eventId: string,
      data: CreateFundDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/registry/funds`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Registry
     * @name RegistryControllerContribute
     * @request POST:/events/{eventId}/registry/contribute
     */
    registryControllerContribute: (
      eventId: string,
      data: ContributeDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/registry/contribute`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guests
     * @name GuestsControllerFindAll
     * @request GET:/events/{eventId}/guests
     */
    guestsControllerFindAll: (eventId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${eventId}/guests`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guests
     * @name GuestsControllerImport
     * @request POST:/events/{eventId}/guests/import
     */
    guestsControllerImport: (
      eventId: string,
      data: BulkGuestImportDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/guests/import`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guests
     * @name GuestsControllerUpdateSeating
     * @request PATCH:/events/{eventId}/guests/seating
     */
    guestsControllerUpdateSeating: (
      eventId: string,
      data: BulkSeatingUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/guests/seating`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Guests
     * @name GuestsControllerCheckin
     * @summary Real-time guest check-in [GST-02]
     * @request POST:/events/{eventId}/guests/{guestId}/checkin
     */
    guestsControllerCheckin: (
      guestId: string,
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/${eventId}/guests/${guestId}/checkin`,
        method: "POST",
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags Billing
     * @name BillingControllerGetEntitlements
     * @summary Get user entitlements and usage
     * @request GET:/api/v1/user/entitlements
     * @secure
     */
    billingControllerGetEntitlements: (params: RequestParams = {}) =>
      this.request<EntitlementResponseDto, any>({
        path: `/api/v1/user/entitlements`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name BillingControllerCreateCheckoutSession
     * @summary Create a checkout session for upgrades
     * @request POST:/api/v1/billing/checkout-session
     * @secure
     */
    billingControllerCreateCheckoutSession: (
      data: CheckoutSessionDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/billing/checkout-session`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name BillingControllerPayVendor
     * @summary Pay a vendor for a booking
     * @request POST:/api/v1/payments/pay-vendor
     * @secure
     */
    billingControllerPayVendor: (
      data: PayVendorDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/payments/pay-vendor`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name BillingControllerGetSubscription
     * @summary Get user subscription tier [MON-01]
     * @request GET:/api/v1/user/subscription
     * @secure
     */
    billingControllerGetSubscription: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/user/subscription`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notifications
     * @name NotificationsControllerFindAll
     * @summary Get notifications
     * @request GET:/api/notifications
     * @secure
     */
    notificationsControllerFindAll: (
      query: {
        cursor: string;
        limit: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/notifications`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notifications
     * @name NotificationsControllerMarkRead
     * @summary Mark notification as read
     * @request PATCH:/api/notifications/{id}/read
     * @secure
     */
    notificationsControllerMarkRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/notifications/${id}/read`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notifications
     * @name NotificationsControllerMarkAllRead
     * @summary Mark all notifications as read
     * @request POST:/api/notifications/mark-all-read
     * @secure
     */
    notificationsControllerMarkAllRead: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/notifications/mark-all-read`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI
     * @name AiControllerGenerateEvent
     * @summary Generate event details from vision prompt
     * @request POST:/api/ai/generate-event
     * @secure
     */
    aiControllerGenerateEvent: (
      data: GenerateEventDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ai/generate-event`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI
     * @name AiControllerRecalculateBudget
     * @summary Recalculate budget allocation
     * @request PATCH:/api/ai/events/{id}/recalculate
     * @secure
     */
    aiControllerRecalculateBudget: (
      id: string,
      data: RecalculateBudgetDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ai/events/${id}/recalculate`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI
     * @name AiControllerSuggestVendors
     * @summary Get AI vendor suggestions
     * @request POST:/api/ai/suggest-vendors/{eventId}/{category}
     * @secure
     */
    aiControllerSuggestVendors: (
      eventId: string,
      category: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/ai/suggest-vendors/${eventId}/${category}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI
     * @name AiControllerSyncContext
     * @summary Sync frontend state for contextual tips [AI-01]
     * @request POST:/api/ai/context/sync
     * @secure
     */
    aiControllerSyncContext: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ai/context/sync`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags AI
     * @name AiControllerGenerateConcept
     * @summary Generate visual concept from keywords [AI-02]
     * @request POST:/api/ai/generate/concept
     * @secure
     */
    aiControllerGenerateConcept: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ai/generate/concept`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Team
     * @name TeamControllerInviteTeamMember
     * @summary Invite a new team member
     * @request POST:/api/team/invite
     * @secure
     */
    teamControllerInviteTeamMember: (
      data: InviteTeamMemberDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/team/invite`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Team
     * @name TeamControllerAcceptInvitation
     * @summary Accept a team invitation
     * @request POST:/api/team/accept/{token}
     * @secure
     */
    teamControllerAcceptInvitation: (
      token: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/team/accept/${token}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Team
     * @name TeamControllerGetTeamMembers
     * @summary Get all team members
     * @request GET:/api/team/members
     * @secure
     */
    teamControllerGetTeamMembers: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/team/members`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Team
     * @name TeamControllerUpdateTeamMember
     * @summary Update a team member role/permissions
     * @request PATCH:/api/team/members/{id}
     * @secure
     */
    teamControllerUpdateTeamMember: (
      id: string,
      data: UpdateTeamMemberDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/team/members/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Team
     * @name TeamControllerRemoveTeamMember
     * @summary Remove a team member
     * @request DELETE:/api/team/members/{id}
     * @secure
     */
    teamControllerRemoveTeamMember: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/team/members/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Team
     * @name TeamControllerGetInvitations
     * @summary Get pending invitations
     * @request GET:/api/team/invitations
     * @secure
     */
    teamControllerGetInvitations: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/team/invitations`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Analytics
     * @name AnalyticsControllerGetVendorAnalytics
     * @summary Get analytics for a vendor
     * @request GET:/api/analytics/vendor/{id}
     * @secure
     */
    analyticsControllerGetVendorAnalytics: (
      id: string,
      query?: {
        /** @example "12m" */
        timeRange?: "7m" | "12m" | "YTD" | "ALL";
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/analytics/vendor/${id}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Analytics
     * @name AnalyticsControllerExportReport
     * @summary Export analytics report (CSV/PDF)
     * @request POST:/api/analytics/export
     * @secure
     */
    analyticsControllerExportReport: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/analytics/export`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerGetLayout
     * @summary Get seating layout
     * @request GET:/api/seating/layout/{eventId}
     * @secure
     */
    seatingControllerGetLayout: (eventId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/seating/layout/${eventId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerUpdateLayout
     * @summary Update seating layout
     * @request PUT:/api/seating/layout/{eventId}
     * @secure
     */
    seatingControllerUpdateLayout: (
      eventId: string,
      data: UpdateSeatingLayoutDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/seating/layout/${eventId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerAssignGuests
     * @summary Bulk assign guests to seats
     * @request PATCH:/api/seating/assignments/{eventId}
     * @secure
     */
    seatingControllerAssignGuests: (
      eventId: string,
      data: BulkAssignmentDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/seating/assignments/${eventId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerValidateConflicts
     * @summary Validate seating conflicts
     * @request POST:/api/seating/validate/{eventId}
     * @secure
     */
    seatingControllerValidateConflicts: (
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/seating/validate/${eventId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Seating
     * @name SeatingControllerGetConflicts
     * @summary Get seating conflicts
     * @request GET:/api/seating/conflicts/{eventId}
     * @secure
     */
    seatingControllerGetConflicts: (
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/seating/conflicts/${eventId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Copilot
     * @name CopilotControllerGetSuggestions
     * @request GET:/api/copilot/suggestions/{eventId}
     */
    copilotControllerGetSuggestions: (
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/copilot/suggestions/${eventId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Copilot
     * @name CopilotControllerTriggerScan
     * @request POST:/api/copilot/scan/{eventId}
     */
    copilotControllerTriggerScan: (
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/copilot/scan/${eventId}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Copilot
     * @name CopilotControllerDismiss
     * @request PATCH:/api/copilot/suggestions/{id}/dismiss
     */
    copilotControllerDismiss: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/copilot/suggestions/${id}/dismiss`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Telemetry
     * @name TelemetryControllerLogError
     * @summary Log a frontend/backend error
     * @request POST:/api/telemetry/errors
     */
    telemetryControllerLogError: (
      data: CreateErrorLogDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/telemetry/errors`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Telemetry
     * @name TelemetryControllerLogMetric
     * @summary Log performance metric
     * @request POST:/api/telemetry/performance
     */
    telemetryControllerLogMetric: (
      data: CreatePerformanceMetricDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/telemetry/performance`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Telemetry
     * @name TelemetryControllerHealth
     * @summary Get system health
     * @request GET:/api/telemetry/health
     */
    telemetryControllerHealth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/telemetry/health`,
        method: "GET",
        ...params,
      }),
  };
  vendors = {
    /**
     * No description
     *
     * @tags Vendors
     * @name VendorsControllerSearch
     * @request GET:/vendors
     */
    vendorsControllerSearch: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vendors`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vendors
     * @name VendorsControllerFindOne
     * @request GET:/vendors/{id}
     */
    vendorsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vendors/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vendors
     * @name VendorsControllerGetProfile
     * @request GET:/vendors/profile/me
     */
    vendorsControllerGetProfile: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vendors/profile/me`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vendors
     * @name VendorsControllerUpdateProfile
     * @request PATCH:/vendors/profile/me
     */
    vendorsControllerUpdateProfile: (
      data: UpdateVendorProfileDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/vendors/profile/me`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vendors
     * @name VendorsControllerGetAnalytics
     * @request GET:/vendors/me/analytics
     */
    vendorsControllerGetAnalytics: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vendors/me/analytics`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vendors
     * @name VendorsControllerGetReviews
     * @request GET:/vendors/me/reviews
     */
    vendorsControllerGetReviews: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vendors/me/reviews`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vendors
     * @name VendorsControllerGetFinance
     * @request GET:/vendors/me/finance
     */
    vendorsControllerGetFinance: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vendors/me/finance`,
        method: "GET",
        ...params,
      }),
  };
  rsvp = {
    /**
     * No description
     *
     * @tags Public RSVP
     * @name PublicRsvpControllerRsvp
     * @summary Public RSVP endpoint [GST-03]
     * @request PATCH:/rsvp/{code}
     */
    publicRsvpControllerRsvp: (code: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rsvp/${code}`,
        method: "PATCH",
        ...params,
      }),
  };
  bookings = {
    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerCreateInquiry
     * @request POST:/bookings/event/{eventId}/inquiry
     */
    bookingsControllerCreateInquiry: (
      eventId: string,
      data: CreateInquiryDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/bookings/event/${eventId}/inquiry`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerSendQuote
     * @request POST:/bookings/{id}/quote
     */
    bookingsControllerSendQuote: (
      id: string,
      data: SendQuoteDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/bookings/${id}/quote`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerUpdateStatus
     * @request PATCH:/bookings/{id}/status
     */
    bookingsControllerUpdateStatus: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bookings/${id}/status`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerFindAllForEvent
     * @request GET:/bookings/event/{eventId}
     */
    bookingsControllerFindAllForEvent: (
      eventId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/bookings/event/${eventId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerFindAllForVendor
     * @request GET:/bookings/vendor/me
     */
    bookingsControllerFindAllForVendor: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bookings/vendor/me`,
        method: "GET",
        ...params,
      }),
  };
  chat = {
    /**
     * No description
     *
     * @tags Chat
     * @name ChatControllerGetConversations
     * @summary Get list of active conversations [MSG-01]
     * @request GET:/chat/conversations
     * @secure
     */
    chatControllerGetConversations: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/chat/conversations`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  pro = {
    /**
     * No description
     *
     * @tags Proposals
     * @name ProposalsControllerFindAll
     * @request GET:/pro/proposals
     */
    proposalsControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/pro/proposals`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Proposals
     * @name ProposalsControllerCreate
     * @request POST:/pro/proposals
     */
    proposalsControllerCreate: (
      data: CreateProposalDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/pro/proposals`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Proposals
     * @name ProposalsControllerUpdateStatus
     * @request PATCH:/pro/proposals/{id}/status
     */
    proposalsControllerUpdateStatus: (
      id: string,
      data: UpdateProposalStatusDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/pro/proposals/${id}/status`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Proposals
     * @name ProposalsControllerDelete
     * @request DELETE:/pro/proposals/{id}
     */
    proposalsControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/pro/proposals/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  reports = {
    /**
     * No description
     *
     * @tags Reports
     * @name ReportsControllerGetRoiReport
     * @summary Get ROI and risk exposure metrics [PRO-03]
     * @request GET:/reports/roi
     * @secure
     */
    reportsControllerGetRoiReport: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reports/roi`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
