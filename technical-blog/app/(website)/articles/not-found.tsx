import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
    return (
        <main
            className="flex min-h-[60vh] items-center justify-center"
            aria-label="Not Found"
        >
            <div className="text-center">
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Articles Not Found
                </Typography>

                <Button variant="contained" size="small">
                    <Link href={"/articles"}>
                        Back To Articles
                    </Link>
                </Button>
            </div>
        </main>
    );
}