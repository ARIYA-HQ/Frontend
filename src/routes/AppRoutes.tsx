import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Layouts
const DashboardLayout = lazy(() => import('../components/layout/DashboardLayout'));
const AuthLayout = lazy(() => import('../components/layout/AuthLayout'));
const PublicLayout = lazy(() => import('../components/layout/PublicLayout'));

// Dashboard pages
const PlannerDashboard = lazy(() => import('../pages/dashboard/PlannerDashboard'));
const AdminDashboard = lazy(() => import('../pages/dashboard/AdminDashboard'));
const BudgetTracker = lazy(() => import('../pages/dashboard/BudgetTracker'));
const AIPlanner = lazy(() => import('../pages/dashboard/AIPlanner'));
const Seating = lazy(() => import('../pages/dashboard/Seating'));
const EventWebsite = lazy(() => import('../pages/dashboard/EventWebsite'));
// import Registry from '../pages/dashboard/Registry'; // REMOVED: Conflicting import
const Tasks = lazy(() => import('../pages/dashboard/Tasks'));
const PlannerSettings = lazy(() => import('../pages/dashboard/PlannerSettings'));
const MyVendors = lazy(() => import('../pages/dashboard/MyVendors'));

// Vendor dashboard pages
const VendorDashboardPage = lazy(() => import('../pages/dashboard/vendor/VendorDashboard'));
const VendorBookings = lazy(() => import('../pages/dashboard/vendor/VendorBookings'));
const VendorInquiries = lazy(() => import('../pages/dashboard/vendor/VendorInquiries'));
const VendorProfile = lazy(() => import('../pages/dashboard/vendor/VendorProfile'));
const ServicesAndPricing = lazy(() => import('../pages/dashboard/vendor/ServicesAndPricing'));
const Availability = lazy(() => import('../pages/dashboard/vendor/Availability'));
const Reviews = lazy(() => import('../pages/dashboard/vendor/Reviews'));
const VendorCalendar = lazy(() => import('../pages/dashboard/vendor/VendorCalendar'));
const VendorFinances = lazy(() => import('../pages/dashboard/vendor/VendorFinances'));
const VendorGrowth = lazy(() => import('../pages/dashboard/vendor/VendorGrowth'));
const VendorAnalytics = lazy(() => import('../pages/dashboard/vendor/VendorAnalytics'));
const VendorPortfolio = lazy(() => import('../pages/dashboard/vendor/VendorPortfolio'));

// Professional Planner pages
const Report = lazy(() => import('../pages/dashboard/Report'));
const Proposals = lazy(() => import('../pages/dashboard/Proposals'));
const Team = lazy(() => import('../pages/dashboard/Team'));

// Auth pages
const Login = lazy(() => import('../pages/auth/LoginPage'));
const Register = lazy(() => import('../pages/auth/SignupPage'));
const VendorSignup = lazy(() => import('../pages/auth/VendorSignup'));
const PlannerSignup = lazy(() => import('../pages/auth/PlannerSignup'));
const ProfessionalPlannerSignup = lazy(() => import('../pages/auth/ProfessionalPlannerSignup'));

// Event pages
const EventList = lazy(() => import('../pages/events/EventList'));
const EventDetail = lazy(() => import('../pages/events/EventDetail'));
const CreateEvent = lazy(() => import('../pages/events/CreateEvent'));
const AIEventDashboard = lazy(() => import('../pages/events/AIEventDashboard'));

// Vendor pages
const Vendors = lazy(() => import('../pages/vendors/Vendors'));
const VendorDetail = lazy(() => import('../pages/vendors/VendorDetail'));

// Guest page
const Guests = lazy(() => import('../pages/guests/Guests'));
// Designs page
const Designs = lazy(() => import('../pages/designs/Designs'));
// Clients page
const ClientsPage = lazy(() => import('../pages/clients/ClientsPage'));
// Portfolio page
const PortfolioPage = lazy(() => import('../pages/portfolio/PortfolioPage'));

// Registry page
const Registry = lazy(() => import('../pages/registry/Registry'));

// Public pages
const EventWebsitePublic = lazy(() => import('../pages/public/EventWebsite'));

const RSVPPage = lazy(() => import('../pages/public/RSVPPage'));
const RegistryPage = lazy(() => import('../pages/public/RegistryPage'));
const Checkout = lazy(() => import('../pages/registry/Checkout'));

// Admin pages
const VendorApproval = lazy(() => import('../pages/admin/VendorApproval'));
// Messages page
const Messages = lazy(() => import('../pages/messages/Messages'));
// Onboarding page
const OnboardingPage = lazy(() => import('../pages/onboarding/OnboardingPage'));
// 404 Not Found page
const NotFound = lazy(() => import('../pages/public/NotFound'));
// 503 Maintenance page
const Maintenance = lazy(() => import('../pages/public/Maintenance'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Navigate to="/auth/signup" replace />} />
          <Route path="event/:eventId" element={<EventWebsitePublic />} />
          <Route path="event/:eventId/rsvp" element={<RSVPPage />} />
          <Route path="event/:eventId/registry" element={<RegistryPage />} />
          <Route path="maintenance" element={<Maintenance />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="vendor-signup" element={<VendorSignup />} />
          <Route path="planner-signup" element={<PlannerSignup />} />
          <Route path="professional-planner-signup" element={<ProfessionalPlannerSignup />} />
        </Route>

        {/* Dashboard Routes - Unified Planner Dashboard (Personal & Professional) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<PlannerDashboard />} />
          <Route path="vendor" element={<VendorDashboardPage />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="ai-planner" element={<AIPlanner />} />
          <Route path="seating" element={<Seating />} />
          <Route path="event-website" element={<EventWebsite />} />
          <Route path="registry" element={<Registry />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<PlannerSettings />} />
          <Route path="my-vendors" element={<MyVendors />} />
        </Route>

        {/* Vendor Routes */}
        <Route path="/dashboard/vendor" element={<DashboardLayout />}>
          <Route index element={<VendorDashboardPage />} />
          <Route path="pipeline" element={<VendorInquiries />} />
          <Route path="operations" element={<VendorBookings />} />
          <Route path="analytics" element={<VendorAnalytics />} />
          <Route path="services" element={<ServicesAndPricing />} />
          <Route path="calendar" element={<VendorCalendar />} />
          <Route path="portfolio" element={<VendorPortfolio />} />
          <Route path="finances" element={<VendorFinances />} />
          <Route path="growth" element={<VendorGrowth />} />
          <Route path="settings" element={<VendorProfile />} />
          <Route path="availability" element={<Availability />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* Event Routes */}
        <Route path="/events" element={<DashboardLayout />}>
          <Route index element={<EventList />} />
          <Route path="create" element={<CreateEvent />} />
          <Route path=":eventId" element={<EventDetail />} />
          <Route path="ai-dashboard" element={<AIEventDashboard />} />
        </Route>

        {/* Vendor Routes */}
        <Route path="/vendors" element={<DashboardLayout />}>
          <Route index element={<Vendors />} />
          <Route path=":vendorId" element={<VendorDetail />} />
          <Route path="profile" element={<VendorProfile />} />
        </Route>

        {/* Guests Route */}
        <Route path="/guests" element={<DashboardLayout />}>
          <Route index element={<Guests />} />
        </Route>

        {/* Website Route */}
        <Route path="/website" element={<DashboardLayout />}>
          <Route index element={<EventWebsite />} />
        </Route>

        {/* Budget Route */}
        <Route path="/budget" element={<DashboardLayout />}>
          <Route index element={<BudgetTracker />} />
        </Route>

        {/* Designs Route */}
        <Route path="/designs" element={<DashboardLayout />}>
          <Route index element={<Designs />} />
        </Route>

        {/* Registry Route */}
        <Route path="/registry" element={<DashboardLayout />}>
          <Route index element={<Registry />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Messages Route */}
        <Route path="/messages" element={<DashboardLayout />}>
          <Route index element={<Messages />} />
        </Route>

        {/* Clients Route */}
        <Route path="/clients" element={<DashboardLayout />}>
          <Route index element={<ClientsPage />} />
        </Route>

        {/* Professional Planner Routes */}
        <Route path="/report" element={<DashboardLayout />}>
          <Route index element={<Report />} />
        </Route>

        <Route path="/proposals" element={<DashboardLayout />}>
          <Route index element={<Proposals />} />
        </Route>

        <Route path="/team" element={<DashboardLayout />}>
          <Route index element={<Team />} />
        </Route>

        {/* Portfolio Route */}
        <Route path="/portfolio" element={<DashboardLayout />}>
          <Route index element={<PortfolioPage />} />
        </Route>

        <Route path="/settings" element={<DashboardLayout />}>
          <Route index element={<PlannerSettings />} />
        </Route>

        {/* Onboarding Route */}
        <Route path="/onboarding" element={<DashboardLayout />}>
          <Route index element={<OnboardingPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="vendor-approval" element={<VendorApproval />} />
        </Route>

        {/* 404 Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;