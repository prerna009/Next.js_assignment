import {
    Box,
} from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                py: 3,
                backgroundColor: "#111827",
                color: "white",
            }}
        >
            <p style={{ textAlign: "center" }}>
                © 2026 TechBlog. All rights reserved.
            </p>
        </Box>
    );
}