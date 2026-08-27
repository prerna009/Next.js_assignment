import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "TechBlog",
        short_name: "TechBlog",
        description: "A technology blog for developers.",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#111827",
        icons: [
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/apple-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    }
}