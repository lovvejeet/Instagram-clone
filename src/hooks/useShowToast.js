import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();
  // eslint-disable-next-line no-unused-vars
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title: title,
        description: description,
        status: status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );
  return showToast;
};

export default useShowToast;
