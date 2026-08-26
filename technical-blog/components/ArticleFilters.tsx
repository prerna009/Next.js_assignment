"use client";

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchForm";

interface Props {
    initialSearch: string;
    initialTag: string;
    tags: string[];
}

export default function ArticleFilters({
    initialSearch,
    initialTag,
    tags,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleTagChange = (
        event: any
    ) => {
        const value = event.target.value;

        const params = new URLSearchParams(searchParams.toString());

        params.delete("page");

        params.delete("search");

        if (value) {
            params.set("tag", value);
        } else {
            params.delete("tag");
        }

        const query = params.toString();

        router.push(query ? `${pathname}?${params.toString()}` : pathname);
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                mb: 4,
                alignItems: "center",
            }}
        >
            {/* Search */}
            <SearchInput
                key={initialSearch}
                initialValue={initialSearch}
            />

            {/* Tag */}
            <FormControl
                size="small"
                sx={{
                    minWidth: 180,
                }}
            >
                <InputLabel id="tag-label">
                    Tags
                </InputLabel>

                <Select
                    labelId="tag-label"
                    id="tag-select"
                    value={initialTag}
                    label="Tags"
                    onChange={handleTagChange}
                >
                    <MenuItem value="">
                        All Tags
                    </MenuItem>

                    {tags.map((item) => (
                        <MenuItem
                            key={item}
                            value={item}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}