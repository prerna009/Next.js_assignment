import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <Box
                sx={{
                    py: 2,
                    px: 4,
                    mb: 4,
                    backgroundColor: "#111827",
                    color: "white",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    {/* Logo */}
                    <Typography variant="h6">TechBlog</Typography>

                    {/* Navbar */}
                    <nav
                        style={{
                            display: "flex",
                            gap: "20px",
                            fontWeight: 500
                        }}
                        aria-label="Main Navigation"
                    >
                        <Link href="/articles">Articles</Link>
                        <Link href="/tags">Tags</Link>
                        <Link href="/about">About</Link>
                    </nav>
                </Box>
            </Box>
        </header>
    );
}