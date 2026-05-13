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
    element: <AuthGate access="guest" />,
    children: [
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <AuthGate access="onboarding" />,
    children: [
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
    ],
  },
  {
    element: <AuthGate access="protected" />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/practice",
        element: <PracticeSetupPage />,
      },
      {
        path: "/practice/:sessionId",
        element: <PracticeSessionPage />,
      },
      {
        path: "/interview",
        element: <InterviewSetupPage />,
      },
      {
        path: "/interview/:sessionId",
        element: <PracticeSessionPage />,
      },
      {
        path: "/feedback/:reportId",
        element: <FeedbackPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/vocabulary",
        element: <VocabularyPage />,
      },
      // {
      //   path: "/settings",
      //   element: <SettingsPage />,
      // },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
