"use client";

import { Box, Button, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface Props {
    initialValue: string;
}

export default function SearchInput({ initialValue }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState<string>(initialValue);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();

        const params = new URLSearchParams(searchParams.toString());

        // Reset pagination
        params.delete("page");

        // Search and tag are mutually exclusive
        params.delete("tag");

        if (search.trim()) {
            params.set("search", search.trim());
        } else {
            params.delete("search");
        }

        const query = params.toString();

        router.push(
            query
                ? `${pathname}?${query}`
                : pathname
        );
    }

    return (
        <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
                display: "flex",
                gap: 1,
                flex: 1,
            }}
        >
            <TextField
                size="small"
                fullWidth
                placeholder="Search articles..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <Button
                type="submit"
                variant="contained"
            >
                Search
            </Button>
        </Box>
    );
}