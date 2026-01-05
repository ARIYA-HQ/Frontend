import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import AuthLayout from '../components/layout/AuthLayout';
import PublicLayout from '../components/layout/PublicLayout';

// Dashboard pages
import PlannerDashboard from '../pages/dashboard/PlannerDashboard';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import BudgetTracker from '../pages/dashboard/BudgetTracker';
import AIPlanner from '../pages/dashboard/AIPlanner';
import Seating from '../pages/dashboard/Seating';
import EventWebsite from '../pages/dashboard/EventWebsite';
// import Registry from '../pages/dashboard/Registry'; // REMOVED: Conflicting import
import Tasks from '../pages/dashboard/Tasks';
import PlannerSettings from '../pages/dashboard/PlannerSettings';
import MyVendors from '../pages/dashboard/MyVendors';

// Vendor dashboard pages
import VendorDashboardPage from '../pages/dashboard/vendor/VendorDashboard';
import VendorBookings from '../pages/dashboard/vendor/VendorBookings';
import VendorInquiries from '../pages/dashboard/vendor/VendorInquiries';
import VendorProfile from '../pages/dashboard/vendor/VendorProfile';
import ServicesAndPricing from '../pages/dashboard/vendor/ServicesAndPricing';
import Availability from '../pages/dashboard/vendor/Availability';
import Reviews from '../pages/dashboard/vendor/Reviews';
import VendorCalendar from '../pages/dashboard/vendor/VendorCalendar';
import VendorFinances from '../pages/dashboard/vendor/VendorFinances';
import VendorGrowth from '../pages/dashboard/vendor/VendorGrowth';
import VendorAnalytics from '../pages/dashboard/vendor/VendorAnalytics';

// Professional Planner pages
import Report from '../pages/dashboard/Report';
import Proposals from '../pages/dashboard/Proposals';
import Team from '../pages/dashboard/Team';

// Auth pages
import { lazy } from 'react';
const Login = lazy(() => import('../pages/auth/LoginPage'));
const Register = lazy(() => import('../pages/auth/SignupPage'));
const VendorSignup = lazy(() => import('../pages/auth/VendorSignup'));
const PlannerSignup = lazy(() => import('../pages/auth/PlannerSignup'));
const ProfessionalPlannerSignup = lazy(() => import('../pages/auth/ProfessionalPlannerSignup'));

// Event pages
import EventList from '../pages/events/EventList';
import EventDetail from '../pages/events/EventDetail';
import CreateEvent from '../pages/events/CreateEvent';
import AIEventDashboard from '../pages/events/AIEventDashboard';

// Vendor pages
import Vendors from '../pages/vendors/Vendors';
import VendorDetail from '../pages/vendors/VendorDetail';

// Guest page
import Guests from '../pages/guests/Guests';
// Designs page
import Designs from '../pages/designs/Designs';
// Clients page
import ClientsPage from '../pages/clients/ClientsPage';
// Portfolio page
import PortfolioPage from '../pages/portfolio/PortfolioPage';


// Registry page
import Registry from '../pages/registry/Registry';

// Public pages
import EventWebsitePublic from '../pages/public/EventWebsite';

import RSVPPage from '../pages/public/RSVPPage';
import RegistryPage from '../pages/public/RegistryPage';
import Checkout from '../pages/registry/Checkout';

// Admin pages
import VendorApproval from '../pages/admin/VendorApproval';
// Messages page
import Messages from '../pages/messages/Messages';
// Onboarding page
import OnboardingPage from '../pages/onboarding/OnboardingPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<EventWebsitePublic />} />
        <Route path="event/:eventId" element={<EventWebsitePublic />} />
        <Route path="event/:eventId/rsvp" element={<RSVPPage />} />
        <Route path="event/:eventId/registry" element={<RegistryPage />} />
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
        <Route path="finances" element={<VendorFinances />} />
        <Route path="growth" element={<VendorGrowth />} />
        <Route path="settings" element={<VendorProfile />} />
        <Route path="availability" element={<Availability />} />
        <Route path="reviews" element={<Reviews />} />
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
    </Routes>
  );
};

export default AppRoutes;