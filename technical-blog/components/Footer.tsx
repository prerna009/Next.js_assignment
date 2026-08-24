import {
    Box,
} from "@mui/material";

export default function Footer() {
    return (
        <footer>
            <Box
                sx={{
                    mt: 8,
                    py: 3,
                    backgroundColor: "#111827",
                    color: "white",
                }}
            >
                <p>
                    © 2026 TechBlog. All rights reserved.
                </p>
            </Box>
        </footer>
    );
}