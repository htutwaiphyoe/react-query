import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import fetchWithError from "../helpers/fetchWithError";

export const addIssueMutate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addIssueMutate = useMutation(
    (payload) =>
      fetchWithError("/api/issues", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["issues"], { exact: true });
        queryClient.setQueryData(["issues", data.number.toString()], data);
        navigate(`/issue/${data.number}`);
      },
    }
  );
  return addIssueMutate;
};
