"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    const handleBack = () => {
        router.push("/tags");
    };

    return (
        <Box
            sx={{
                minHeight: "60vh",
                height: "62vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <Box>
                <Typography variant="h5" gutterBottom sx={{ color: "red" }}>
                    Something went wrong
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {error.message || "An unexpected error occurred."}
                </Typography>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={reset}
                    >
                        Try Again
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleBack}
                    >
                        Back To Tags
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}