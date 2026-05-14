import { toast } from "sonner";
import { useUserDependencies } from "../providers/user-dependencies-provider";

export function useUserErrorToast() {
  const { userExceptionPresenter } = useUserDependencies();

  function showError(error: unknown) {
    const presented = userExceptionPresenter.present(error);

    toast.error(presented.title, {
      description: presented.message,
    });
  }

  return {
    showError,
  };
}
