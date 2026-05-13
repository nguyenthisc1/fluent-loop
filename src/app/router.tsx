import DashboardPage from "@/features/dashboard/presentation/pages/dashboard.page";
import FeedbackPage from "@/features/feedback/presentation/pages/feedback.page";
import HistoryPage from "@/features/history/presentation/pages/history.page";
import InterviewSetupPage from "@/features/practice/presentation/pages/Interview-setup.page";
import PracticeSessionPage from "@/features/practice/presentation/pages/practice-session.page";
import PracticeSetupPage from "@/features/practice/presentation/pages/practice-setup.page";
import OnboardingPage from "@/features/user/presentation/pages/onboarding.page";
import SignInPage from "@/features/user/presentation/pages/sign-in.page";
import SignUpPage from "@/features/user/presentation/pages/sign-up.page";
import VocabularyPage from "@/features/vocabulary/presentation/pages/vocabulary.page";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthGate } from "./auth-gate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/sign-in",
    element: (
      <AuthGate type="guest">
        <SignInPage />
      </AuthGate>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <AuthGate type="guest">
        <SignUpPage />
      </AuthGate>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <AuthGate type="onboarding">
        <OnboardingPage />
      </AuthGate>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AuthGate type="protected">
        <DashboardPage />
      </AuthGate>
    ),
  },
  {
    path: "/practice",
    element: (
      <AuthGate type="protected">
        <PracticeSetupPage />
      </AuthGate>
    ),
  },
  {
    path: "/practice/:sessionId",
    element: (
      <AuthGate type="protected">
        <PracticeSessionPage />
      </AuthGate>
    ),
  },
  {
    path: "/interview",
    element: (
      <AuthGate type="protected">
        <InterviewSetupPage />
      </AuthGate>
    ),
  },
  {
    path: "/interview/:sessionId",
    element: (
      <AuthGate type="protected">
        <PracticeSessionPage />
      </AuthGate>
    ),
  },
  {
    path: "/feedback/:reportId",
    element: (
      <AuthGate type="protected">
        <FeedbackPage />
      </AuthGate>
    ),
  },
  {
    path: "/history",
    element: (
      <AuthGate type="protected">
        <HistoryPage />
      </AuthGate>
    ),
  },
  {
    path: "/vocabulary",
    element: (
      <AuthGate type="protected">
        <VocabularyPage />
      </AuthGate>
    ),
  },
  // {
  //   path: "/settings",
  //   element: (
  //     <AuthGate type="protected">
  //       <SettingsPage />
  //     </AuthGate>
  //   ),
  // },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
