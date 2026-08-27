import { getArticleById } from "@/lib/services/articles";
import { ImageResponse } from "next/og";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;

    const article = await getArticleById(Number(id));

    const title = article?.title || "TechBlog Article";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "70px",
                    background: "#111827",
                    color: "white",
                }}
            >
                <div style={{ fontSize: 40 }}>
                    TECHBLOG
                </div>

                <div
                    style={{
                        fontSize: 64,
                        fontWeight: "bold",
                        marginTop: 30,
                    }}
                >
                    {title}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}