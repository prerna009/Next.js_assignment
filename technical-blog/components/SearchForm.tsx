"use client";

import { Box, Button, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
    initialValue: string;
}

export default function SearchInput({ initialValue }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState<string>(initialValue);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (search.trim()) {
            params.set("search", search.trim());
        } else {
            params.delete("search");
        }

        router.push(`${pathname}?${params.toString()}`);
    }

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                flex: 1,
            }}
        >
            <TextField
                size="small"
                fullWidth
                label="Search articles"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                onKeyDown={handleKeyDown}
            />

            <Button
                variant="contained"
                onClick={handleSearch}
            >
                Search
            </Button>
        </Box>
    );
}