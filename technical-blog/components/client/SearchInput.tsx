"use client";

import { TextField } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchText = searchParams?.get("search") || "";
    
    const handleSearch = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        router.replace(`/search?q=${params}`);
    }

    return (
        <TextField
            placeholder="Search..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
}