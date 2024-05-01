import {useOutletContext} from "react-router-dom";
import {User} from "@/data/types.ts";
export type UserContextType = { user: User | undefined };

export default function useUserContext() {
    return useOutletContext<UserContextType>();
}