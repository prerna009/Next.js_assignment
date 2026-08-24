"use client";

import { Box, Pagination as MuiPagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    total: any;
    limit: number;
}

export default function Pagination({
    total,
    limit,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page") || 1);

    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", page.toString());

        router.push(
            `${pathname}?${params.toString()}`
        );
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
            }}
        >
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
            />
        </Box>
    );
}