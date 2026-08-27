import {
    Box,
    Typography,
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
            <Typography component="p" sx={{ textAlign: "center" }}>
                © 2026 TechBlog. All rights reserved.
            </Typography>
        </Box>
    );
}