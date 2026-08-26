import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
    return (
        <main
            className="flex min-h-[100vh] items-center justify-center"
            aria-label="Not Found"
        >
            <div className="text-center">
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    Page Not Found
                </Typography>

                <Button variant="contained">
                    <Link href={"/"}>
                        Back To Home
                    </Link>
                </Button>
            </div>
        </main>
    );
}