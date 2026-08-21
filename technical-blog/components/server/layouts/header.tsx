import { Box } from "@mui/material";
import Link from "next/link";

export default function Header() {
    return (
        <Box sx={{ py: 2, px: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Logo */}
                <h2>Technical Blog</h2>

                {/* Navbar */}
                <nav>
                    <Link href={"/"}>Articles</Link>
                </nav>
            </Box>
        </Box>
    );
}